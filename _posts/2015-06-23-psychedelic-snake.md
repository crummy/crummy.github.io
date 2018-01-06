---
title: Psychedelic Snake in CSS
author: Malcolm
layout: post
categories:
  - blog
tags:
  - css
  - creativecoding
  - dev
---
Phantogram always puts on a great concert and at the last one I was struck by a black and white animated backdrop of concentric circles giving the illusion of a slithering snake. As a challenge I decided to see if I could recreate this effect in a web browser. After starting out with Snap.svg I realised I could probably do the whole thing in CSS.

![Trippy!](/assets/snake.png)

The circles are just elements with rounded corners of size 50%. Each uses the same animation, but with a different delay, to get the wiggling effect.

I hadn't touched CSS transformations before but they are surprisingly powerful (and actually easier to use than Snap.svg in some ways, like looping). The one limitation I ran up against was choosing which dimension to scale against: currently I use the width of the screen, but that means on a portrait screen (e.g. a phone) you get a somewhat zoomed out effect. I don't think I can fix that without Javascript.

Check it out in tiny form below, or [click here to see it big](/assets/snake.html). Tested in Chrome and Firefox; IE seems to align the elements wrong.

<iframe src="/assets/snake.html" width="100%"></iframe>