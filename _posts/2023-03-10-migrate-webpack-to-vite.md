---
title: "Migrating a Webpack project to Vite"
author: Malcolm
layout: post
categories:
- blog
---

At work we have a moderately sized React project that uses Webpack to build.
We have a few customizations for Webpack, mainly to try to get it to go a bit
faster, but I decided to look into [Vite](https://vitejs.dev/) primarily
because I want to try to improve our build speeds. I was surprised at the
amount of obstacles we encountered along the way, so I've tried to lay them
out here in case anyone else is looking to do the same.

# Multiple entrypoints

I think most Vite users have a single page that forms the basis of their
application - a SPA or single page app. React Router or something will handle
different paths, but it'll all start from one index.html. Not us, however.

We render our index.html equivalent on the server-side (using Javalin with
Pebble templates) so we can server-side inject some variables for our
React code. We also have a bunch of different pages that serve as individual
React pages. This means we might have a template like this:

```
{% raw  %}
{% block head %}
    {% include 'web/react.html.twig' %}
{% endblock %}

{% block body %}
<div>
    <script>
        const username = "{{ username }}";
    </script>
	<div id='user-root'></div>
	<script src="/dist/user-bundle.js"></script>
</div>
{% endblock %}
{% endraw %}
```

So, our Webpack config takes a bunch of entrypoints like `src/user.tsx` and
outputs `dist/user-bundle.js`. Vite supports this but it took me a lot longer
than I thought to figure it out. Documentation around this area expects
you to be building a *library* with multiple entrypoints, which will get you
code that won't easily run in a browser. The Vite config is actually pretty
simple:

```ts
export default defineConfig({
    plugins: [react()],
    build: {
        manifest: true, // crucial for our backend integration
        rollupOptions: {
            input: {
                user: 'src/user.tsx',
                foo: 'src/foo.tsx', //etc
            }
        }
    }
})
```

While Webpack would output a single bundled JS file, which somehow included
CSS as well, Vite outputs dozens of JS and CSS files. Pointing our backend
to it is easy in dev mode, after running `vite`:

```
{% raw  %}
{% block head %}
    <script type="module">
        import RefreshRuntime from 'http://localhost:5173/@react-refresh'
        RefreshRuntime.injectIntoGlobalHook(window)
        window.$RefreshReg$ = () => {}
        window.$RefreshSig$ = () => (type) => type
        window.__vite_plugin_react_preamble_installed__ = true
    </script>
    <script type="module" src="http://localhost:5173/@vite/client"></script>
{% endblock %}

{% block body %}
<div>
    <script>
        const username = "{{ username }}";
    </script>
	<div id='user-root'></div>
	<script src="http://localhost:4568/src/user.tsx"></script>
</div>
{% endblock %}
{% endraw %}
```

We no longer include `react.html.twig` - previously we had shared `react.js`
and `react-dom.js` between all our entrypoints, handling the code splitting
ourselves. But Vite does all that for us.

Instead we inject a bit of custom code which handles hot-reloading for us
(that's something we didn't have before!). And where before we pointed to our
bundled js file, now we point straight to the .tsx file. This is an unexpected
bit of magic but from here Vite's dev server will provide the compiled JS,
CSS, and whatever other resources we need.

## Building for production

Getting production working, on the other hand, was a fair bit more complicated.
For any given entrypoint, like `src/users.tsx`, we get a bunch of files like
`dist/users-abc123.js`, `dist/users-foo456.css`, and `dist/users-789def.js`.
To know which ones we need to import, we read the `dist/manifest.json` file,
which contains a key/value mapping of every dependency for every file. Look up
`src/users.tsx` and you'll get something like this:

```json
{
    "src/users.tsx": {
        "file": "/dist/users-abc123.js",
        "imports": [ "/dist/users-789def.js" ],
        "css": [ "/assets/users-foo456.css" ]
    }
}
```

The `file` is the entrypoint to our app, which will import our other dependencies.
But `css` contains only the CSS files necessary for this JS file - important to
note that we need to recursively add the CSS files for all the imports to ensure
we get all the CSS needed. Then our template will look like this:

```
<script src="/dist/{{ manifest.file() }" type="module"></script>
{% for css in manifest.css() %}
    <link rel="stylesheet" href="/assets/{{ css }}">
{% endfor %}
```

So! If we've done our recursion right we should end up with a rendered HTML file
linking the entry point JS and all the CSS files we'll need.

# React error #130 in prod

Once you have your production build going, you might discover something unexpected:
crashes that did not appear in the dev build. To be honest I'm a bit shocked that this
is [an open issue since early 2021](https://github.com/vitejs/vite/issues/2139) -
discovering a bug only when you hit prod seems like a big deal! Apparently it is caused
by an older-style export syntax that is not supported by Vite. Tracking down the library,
on the other hand, is non-trivial: I did it by commenting out significant chunks of code
bit by bit until I'd found the culprit. Once I'd found it (`react-modal` was the cause)
the fix is relatively easy. Change this code:

```ts
import * as ReactModal from 'react-modal/lib';
```

To this:

```ts
import * as RM from 'react-modal/lib';
const ReactModal = (RM as any).default || RM;
```

An easy fix... but can be a little painful to find.

# Circular references breaking createContext

Fixing this one was easier than I thought, thankfully. If you have a file like this,
with a React context:

```tsx
export const Context = React.createContext(null);

export default function () {
    return <Context.Provider value={42}>
        <Child/>
    </Context.Provider>;
}
```

And elsewhere you have a `child.tsx` that references this context:
```tsx
export function Child() {
    const value = useContext(Context);
}
```

You have a circular reference: the first includes `child.tsx`, while `child.tsx` imports
`Context` from its parent. Apparently this is no big deal for Webpack but Vite can't handle it -
something to do with hot module reloading, so at least this error only happens in dev.

[The Github bug](https://github.com/vitejs/vite/issues/3033) has some helpful tips. Here's how I
fixed it:

1. `npx madge src/index.tsx --circular` to find the circular references
2. This listed entries like `src/idnex.tsx > Child.tsx`
3. From here I discovered the circular reference above
4. I moved the `Context` into its own file, `src/context.tsx`, and imported it from both `index.tsx`
   and `child.tsx`

# import { Foo } → import type { Foo }

Typescript 3.8 added [Type-Only Imports](https://devblogs.microsoft.com/typescript/announcing-typescript-3-8-beta/#type-only-imports-exports)
which I hadn't heard of before this migration. They reduce a little bit of ambiguity when calling
`import { Foo }` - is `Foo` something in Javascript (e.g. a class) or is a type (i.e. something that
will disappear in the compiled JS)? To reduce ambiguity, you can use `import type { Foo }`.

This option is not an option in Vite - it's a requirement.

Luckily, there are a couple ways to make this fix easy. There's an [eslint plugin](https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/consistent-type-imports.md)
to enforce this, and you can immediately apply it to your whole codebase. And if you use a
[Jetbrains IDE like IntelliJ](https://youtrack.jetbrains.com/issue/WEB-43269), it'll use the
`import type` syntax if your `tsconfig.json` has `importsNotUsedAsValues: 'error'`.

# Typechecking

Like other modern "blazingly-fast" build tools, Vite does not attempt to typecheck your code,
instead suggesting you rely on your IDE for it. There are some plugins to help though. I used
[vite-plugin-tsc-watch](https://www.npmjs.com/package/vite-plugin-tsc-watch) which only had one
small hiccup - without `noEmit: true` in your `tsconfig.json` you'll end up with transpiled .js
files throughout your codebase.

# Some dependencies will break

We used an old notification library called Noty. I was unable to get this to work with Vite at all.
Turns out the library is [no longer maintained](https://github.com/needim/noty) and there are plenty
of replacements so it wasn't a big deal. Bowser was another one that I replaced with `detect-browser`.

My favourite calendar library, FullCalendar, needs its imports to be in a particular order which
Vite seems to ignore. Luckily FullCalendar have a new release out to
[fix the issue](https://github.com/fullcalendar/fullcalendar-react/issues/150).

# Conclusion

There have been a couple other small issues - CSS imports sometimes seem to be in a slightly different order to
Webpack (but again, only in prod, not dev). HMR in certain cases causes UI elements to disappear.
But the instant updates on editing is *so* fast that it's easily worth it - plus
shaving a couple minutes of our build time is a nice bonus.

On the other hand, I'm surprised at just how much work it takes to use what the community seems to have settled on
as the future of build tooling in the ecosystem. With the restrictions and caveats I ran into, it feels
like I must be on the bleeding edge. I (naively) expected that Vite would be just plain better, and while I'm still
happy with it there are more drawbacks than I expected.
