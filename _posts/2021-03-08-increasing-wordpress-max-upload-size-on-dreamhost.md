---
title: "JetBrains Projector in WSL2"
author: Malcolm
layout: post
categories:
  - blog
---

So: You've got a nice fast Windows desktop, and a nice portable laptop, and you want to edit code in IntelliJ on
the laptop and run it on the desktop. Seems easy enough, right? VS Code does this pretty much out-of-the-box with
its Remote Development feature. But for (apparently complex architectural) reasons this is not so easily done on
JetBrains IDEs, so instead they've released software called Projector that allows them to run the IDE on the
server, but rendering the GUI over HTTP to your web browser. Sounds a little crazy but it works quite well!

# Maybe avoid Docker

You can try Jetbrains Projector out right now with their Docker setup: https://github.com/JetBrains/projector-docker

However, beyond clicking around and marvelling at how much like local IntelliJ it is, you'll quickly run into some
limitations: you've got to mount your user folder for persistence (easy enough), the Docker container is missing
permissions and tools you'll soon want to install (possible to fix) and once you want to run a service and expose
a port... it all gets a bit hairy.

Don't get me wrong: I love Docker. But if you want to use Projector heavily I suggest skipping it here.

# Step one: Install Jetbrains Projector

I'll assume you have WSL2 installed. To install, pull the Projector repo and follow their install steps. I'm
on Ubuntu, so I ran:

```
git pull https://github.com/JetBrains/projector-installer
sudo apt install python3 python3-pip 
pip3 install projector-installer --user 
```
You might need to restart your session if you have a fresh WSL2 install - the installer would have created a
`~/local/bin` folder and your `PATH` won't have noticed it.

`projector run` will let you confirm it's working, though you'll only be able to access this from your
Windows machine.

# Step two: Expose WSL2 ports to the local network

There are a variety of ways of doing this, but as far as I can tell, this is the easiest and most reliable.

WSL2 does automatically expose ports from the Linux environment to your local machine so you can access them
in Windows - but only your local machine, so you can't access them from your laptop on the same network. There's
a tool that modifies this behaviour so the ports are exposed to all listeners, called WSLHostPatcher:

1. Download the latest release from https://github.com/CzBiX/WSLHostPatcher/releases (I tested v0.1.0)
2. Unzip the file
3. Run the WSLHostPatcher.exe

Now you can run `projector run` in WSL2 and access `http://windows-computer-name:9999` from any machine on your
network.

# Step three (optional): Set up SSL

Browsers lock some functionality behind SSL connections only - for example, if you don't have HTTPS, then copy
and paste might not work super reliable. The easiest way to fix this is with Caddy.

First, install Caddy on your WSL2 instance: https://caddyserver.com/docs/install#debian-ubuntu-raspbian . Then,
create a Caddyfile like so:
```
localhost {
        reverse_proxy localhost:9999
}
<windows-computer-name> {
        tls internal
        reverse_proxy localhost:9999
}
```
Now you can `curl https://localhost` from within WSL2 - but notice if you access `https://localhost` you get SSL
errors. That's because Caddy generates its own SSL root certificate, and though it automatically trusts them
on the machine you have Caddy on (WSL2), we have to manually trust them elsewhere.

Find the root certificate in [Caddy's data directory](https://caddyserver.com/docs/conventions#data-directory),
and copy it to your laptop (either via SCP, or copy+paste). Then add it to your local keystore (on a Mac, by
double clicking it, then opening Keychain Access, searching for Caddy, then marking it as Trusted.)

Now you can visit `https://windows-computer-name` from your laptop while IntelliJ runs on your desktop. Enjoy!
