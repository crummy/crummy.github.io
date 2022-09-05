---
title: "Tight Websocket communication with Kotlin and TypeScript"
author: Malcolm
layout: post
categories:
- blog
---

Inspired by
[recent work on an automatically-generated HTTP API](/blog/2022/07/30/hand-rolled-api-generator.html)
I took a look at our WebSocket API. We had types defined on our backend, and some were
shared by our frontend thanks to the [typescript-generator](https://github.com/vojtechhabarta/typescript-generator)
plugin, but it was a hodge-podge of hand written TypeScript types and for loops with casts
to try to ensure the frontend and backend stayed in sync - in other words,
we had a lot of code that described the plumbing rather than doing useful things.
Here I'll demonstrate how we manage to share WebSocket calls, listeners, and types across our frontend
and backend, ending up with a single clear and concise interface for us to use. 

Want to skip the explanation and just check out the code?
[Here you go](https://github.com/crummy/kotlin-typescript-websocket-api).

# The old way: Building a bridge from both ends

Our websocket client code would send messages to our backend, which would
handle the message and forward it on, hopefully to the right destination.

![Websocket communication... in theory.](assets/simple.png)

In reality, keeping track of what messages contained what fields,
where they were supposed to go, and who was allowed access got messy pretty
quickly.

![Websocket communication in reality](assets/messy.png)

# The new way: A clearly defined interface(s)

Let's group our messages in two: 

* Messages sent from the client
* Messages sent from the server

![Separating WebSockets into two groups](assets/interface.png)

This separation gives us a hint on how we can separate our calls
in code in terms of how we handle it. So we build two interfaces for
our WebSocket service, one for each category:

* `ChatApi`, with methods like `sendMessage()` for when a client
initiates an action
* `ChatEvents`, with methods like `onSendMessage()` for when a client
receives an action from the server

These two can be combined into a single TypeScript file for clients
to use. The server side is a little more complicated; here's how I did
it:

1. Bind all methods from `ChatApi` to an implementation, and 
redirect websocket messages to this implementation
2. Create a proxy object that implements `ChatEvents`, redirecting
any calls to it to a list of WebSocket sessions that have
registered for that event
3. Add a special extra "register" method to our WebSocket connection,
that allows clients to add themselves to the list of sessions 
in the client.

![The TypeScript and backend integration](assets/websockets.png)

The result is client code that looks like this:

```typescript
const api = new ChatApi({onOpen: () => console.log("connected")})
api.onMessage(msg => setMessages([...messages, msg]))
//...
api.sendMessage("Wow, that was easy!")
```

With our TypeScript file clearly defining how to interact with
our backend, a little bit of reflective Kotlin code connecting
our WebSocket connection to our backend implementation, and
[typescript-generator](https://github.com/vojtechhabarta/typescript-generator)
to share types, we couldn't have a safer, easier to use API.

# Who listens to what?

Not every message should go to every client. For example, in a chat
app, private messages should only go to their destination. I handled this
with a special annotation on method parameters that allow filtering
of destinations:

```kotlin
interface ChatEvents {
    // listening to the "onMessage" event will get all group message events
    fun onMessage(message: String, from: String)
    // In this case, you'll listen for "onPrivateMessage/<username>" events
    // to ensure you only receive messages meant for you
    fun onPrivateMessage(@Filter to: String, message: String, from: String)
}
```

By default messages are sent to every listener - but perhaps you might want
to filter messages from being sent back to the caller? I haven't done so
but depending on your use case this might be worth considering.

# Show me the code!

I've uploaded
[a simple demonstration on Github](https://github.com/crummy/kotlin-typescript-websocket-api)
if you'd like to dig into the details on how it works.

