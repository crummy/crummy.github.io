---
title: "Seamless Deployments with Nginx + Docker Compose + Websockets"
author: Malcolm
layout: post
categories:
  - blog
---

Docker is becoming the de facto standard for packaging web applications, and Docker Compose
is a pretty simple way to deploy it. One downside is that during a deployment, the old version
is taken down before the new version is deployed, causing a brief service outage for clients:

1. Docker Compose runs
2. The old web app is taken down
3. The new web app is started

Between steps 2 and 3, users will see error messages on our website (for a few seconds). Not
long but long enough that we'd avoid deploys during busy times, and I wanted our developers
to be able to deploy as often and as easily as possible.

# Seamlessly deploying the app

The engineering team at Tines
[came up with a solution](https://engineering.tines.com/blog/simple-zero-downtime-deploys
which I have adopted. The process involves, with a simple bash script:

1. Spin up a new instance of the web app using Docker Compose
2. Wait until it has booted
3. Reload Nginx
4. Stop the old instance of the web app
5. Reload Nginx

This is what more complex systems do during deployments but the simplicity of a bash script
and Compose is pretty nice.

# Seamlessly handling WebSocket clients

Even if the above ensures no HTTP requests are dropped, any live websocket connections
will be interrupted. There's a 
[simple solution for that:](https://nimblea.pe/monkey-business/2015/05/19/achieving-zero-downtime-deployments-with-nodejs-and-websockets/)

1. Register a shutdown hook in the web app: on disconnect, send a special "RECONNECT" message
to all WebSocket clients
2. Clients, upon receipt of the message, disconnect their WebSocket connections, pause a moment,
then try to reconnect
3. Their new connection is handled by the new web app instance

# Reducing complexity with Caddy

I was proud of the above work, but it did bug me a bit. We had made our deployments seamless
enough that we could deploy without anyone noticing, but our simple "docker-compose up -d"
script had been replaced with something fairly esoteric, even if it was plain Bash.

An unrelated problem had lead me towards thinking of replacing Nginx with Caddy, a new-on-the-block
webserver that is a lot simpler to operate. I wasn't sure how it would work with the seamless
deployment script we'd created, so I dug in to see how hard it would be to replicate and discovered
a simple difference between Caddy and Nginx:

* With Nginx, if a request comes in and a backend is not available to handle it, an error
is returned to the client immediately
* With Caddy, if a request comes in and a backend is not available to handle it, Caddy
waits for a while for the backend, giving up only after a timeout is reached.

This change in behaviour means that we are able to achieve near-seamless deployments - 
if you happen to visit our website at the wrong time, you might experience a brief delay
(probably not noticeable due to caching) but you won't see any ugly error messages.

# Simplicity wins

So, with Caddy instead of Nginx, we can throw away the ugly bash script and go back to plain
Docker Compose deploys. As long as our web app boots up quickly, it's difficult to notice
a deploy happening even if you're watching closely.

Sacrificing a small amount of functionality for a big decrease in systemic complexity is
a definite win in my opinion.

You can find a full working demonstration of the Nginx solution on
[Github](https://github.com/crummy/zero-downtime-websockets).