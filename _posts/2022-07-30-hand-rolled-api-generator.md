---
title: "Java/TypeScript API generation"
author: Malcolm
layout: post
categories:
- blog
---

At work we have a Java backend that exposes HTTP endpoints for our frontend to
call. Some do simple create/read/update/delete, some do specific requests, and
there are a bunch to remember with many different types of objects that are
returned. Because we rely on these API calls so much, we've put a lot of effort
into tooling to make the frontend/backend communication as seamless as possible
for our developers. Here is a brief overview before I go into detail:

* Java interfaces describe each API and its endpoints
* Each interface is connected to its backend implementation with a special Javalin
handler which exposes each endpoint via HTTP, parses arguments, then calls the
implementation
* Some custom tooling loops through every interface and generates a Typescript
class for each one, with methods to call each endpoint
* The Java library [typescript-generator](https://github.com/vojtechhabarta/typescript-generator)
generates Typescript definitions for all the classes used in arguments and return
values of the APIs

The end result is that as we add endpoints to our backend, our API client 
automatically generates the methods to call it, making frontend-to-backend calls
almost as easy as native calls. Read on for details on how it works, or view the
[demonstration](https://github.com/crummy/java-typescript-api-generator) on Github.

# API definitions

This is the easy part. Our API interfaces look something like this:

```java
interface UserApi {
    UserDto getUser(int userId);
}
```

# Backend implementation for our API

Javalin is a great webserver that provides exactly the balance of 
power-to-simplicity that we need. A backend call might look something like this:

```
POST /api/UsersApi/getUser
{
    'userId': 1001
}
```

So, we create a handler for each of these calls. It involves a bit of reflection
which is a bit hairy but makes things easier for devs:

```java
public static void main(){
    var app = Javalin.create();
    // UsersApi is the interface that defines the endpoints.
    // UsersService is the backend implementation of UsersApi.
    // We repeat the below for every API we want to expose.
    expose(app,UsersApi.class, new UsersService())
    app.start()
}

private <T> void expose(Javalin app, Class<T> api, T implementation) {
    String apiName = api.getSimpleName();
    for (Method method : api.getMethods()) {
        // handle calls to, for example, POST /api/UsersAPI/getUser
        app.post("/api/" + apiName + "/" + method.getName(), (ctx) -> {
            Map<String, String> body = ctx.bodyAsClass(Map.class);
            List<Object> args = new ArrayList<>();
            for (Parameter param : method.getParameters()) {
                String json = body.get(param.getName());
                var arg = GSON.fromJson(json, param.getParameterizedType());
                args.add(arg);
            }
            try {
                Object result = method.invoke(implementation, args.toArray());
                String json = objectMapper.writeValueAsBytes(result);
                ctx.result(json);
            } catch (Exception e) {
                throw new RuntimeException("Failed to invoke " + apiName + "/" + method, e);
            }
        });
    }
}
```

That's pretty much it. For every API, then every method, expose an endpoint that
deserializes the arguments given, then calls the actual implementation's method
with those arguments.

The only special thing I'd note here is that the body of our request is not a single
object we can deserialize immediately, but instead is better thought of as a key-value
pair of parameter names to a JSON string. So it's essentially doubly-serialized JSON.

So! Our backend is ready to receive requests. Next up is the API client.

# Typescript client

The code here works a little like the above again - given an interface like UsersAPI,
iterate over its methods, and iterate over its arguments. However, along the way,
we build a string by appending bits of Typescript to it. The code here is a bit ugly so
I'm going to write some pseudocode to describe it:

```
String toTypescript(Class... api) {
    for each api:
        typescript += "class ${api.getSimpleName()} {"
        for each method:
            typescript += "${method.getName()}("
            for each parameter:
                typescript += "${parameter.getName()}: ${getType(parameter)}, "
            typescript += "): Promise<${getType(method.returnType)}">
            var body = Map<String, String>
            typescript += "return fetch('/api/${api}/${method}', {"
            typescript += "   method: 'POST',"
            typescript += "   headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},"
            typescript += "   body: JSON.stringify({"
            for each parameter:
                typescript += "${parameter.getName()}: JSON.stringify(${parameter.getName}), 
            typescript += "   }"
            typescript += "}).then(res => res.json())
        typescript += "}"
    return typescript
}
```

Hmm... is that more readable? If you'd prefer you can read the
[actual code](https://github.com/crummy/java-typescript-api-generator/blob/main/src/main/java/com/malcolmcrum/typescriptapigenerator/typescriptgenerator/TypeScriptApiGenerator.java#L44)
instead. Here's what you might expect to see in the generated Typescript, as an example:

```typescript
class UsersAPI {
    getUser(userId: number): UserDto {
        return fetch('/api/UsersApi/getUser', {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
            body: JSON.stringify({userId: JSON.stringify(userId)})
        }).then(res => res.json())
    }
}
```

We store the above file in `target/ts/api.ts`, and generate this file using the
[Exec Maven Plugin](https://www.mojohaus.org/exec-maven-plugin/) which lets us run the
client generator when we run `mvn package`.

One bit of magic I'm skipping over is the `getType(parameter)` call. This converts Java
classes to Typescript equivalents. Here's basically how the conversions work:

* String -> string
* int, Integer, float, Float, double, Double, long, Long -> number
* Object -> any
* Array, List, Set, Collection of T ->  T[]
* Map<K, V> -> Record<K, V>
* Otherwise, just use the object's class name (e.g. UserDto)

Now you're almost ready to call `new UsersApi().getUser(1001)` - we're just missing the
Typescript type for the UserDto returned.

# Typescript definitions for our Java types

This one's pretty easy. We have a Java package that contains all the types that we want to use
on the frontend (`com.company.dtos`), and we point the Maven plugin
[typescript-generator](https://github.com/vojtechhabarta/typescript-generator) to it:

```xml
<plugin>
    <groupId>cz.habarta.typescript-generator</groupId>
    <artifactId>typescript-generator-maven-plugin</artifactId>
    <version>2.32.889</version>
    <executions>
        <execution>
            <id>generate</id>
            <goals>
                <goal>generate</goal>
            </goals>
            <phase>compile</phase>
        </execution>
    </executions>
    <configuration>
        <classPatterns>
            <classPattern>com.company.dto.**</classPattern>
        </classPatterns>
        <outputFile>target/ts/types.ts</outputFile>
    </configuration>
</plugin>
```

Assuming we have a UserDto class like this:

```java
public record UserDto(int userId, String username) {}
```

We'll end up with a `types.ts` file like this:

```typescript
interface UserDto {
    userId: number,
    username: string
}
```

# Putting it all together

So, now we have:

* A Javalin server with endpoints ready to deserialize parameters for each of our backend methods
* An `api.ts` file with classes ready to query each of those endpoints
* A `types.ts` file that describes the types for both the parameters and returns of those endpoints

The end result is that adding a new endpoint looks like this:

1. Add `void changeUsername(int userId, String newUsername)` call to interface, and implement it
on the backend
2. Run `mvn package` to update our Typescript files
3. In the frontend, write `new UsersService().changeUsername(1001, "foo")` - that's it!

# Conclusions

I'm a big fan of typed languages (hence Java backend and Typescript frontend) but traditionally
there is a disconnect between types on the two domains. This tooling allows us to modify a method
or class in one place and immediately be comfortable using it everywhere else, or see errors
during compile time when we're misusing it. This tooling catches so many bugs and allows development
to be so much faster that I can't imagine working without it now. I know there are some
similar tools out there but they either add a significant amount of complexity (OpenAPI) or are
locked into a certain stack (Remix). Building our own offers significant control at a relatively
minor cost (i.e. it's just not that complicated).

As an example: we pass dates around to the frontend with epoch millis. But sometimes when you're
staring at a `long` you might think it stores epoch *seconds*. Java has a better class for this:
`Instant`, which you can retrieve either from. I wanted our devs to use `Instant`s instead of
`long`s in our DTOs, so:

1. I added a `long` to `Instant` deserializer and `Instant` to `long` serializer to our JSON serializer
2. I told `typescript-generator` to convert `Instant`s to `number`s with a `<customTypeMapping>`
in `types.d.ts`
3. I adjusted my `getType(parameter)` class to convert `Instant`s to `number`s instead in `api.ts`

That was it! Having written our own tooling this was an easy task and allowed us to further
strengthen our use of types to reduce another source of bugs.

# Complete demo

You can find a full demo on Github here:
[crummy/java-typescript-api-generator](https://github.com/crummy/java-typescript-api-generator)