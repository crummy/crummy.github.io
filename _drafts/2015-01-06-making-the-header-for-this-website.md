---
title: Making the header for this website
author: Malcolm
layout: post
---

When redesigning my website, I wanted something slick but simple to show off with, an animation that wouldn't take long to load but would catch the eye. At a mapping meetup I was struck by a shot of buildings extruding at a sharp angle and decided to attempt to recreate this for the web.

My first thought was to draw this in 3D, and so I began an attempt using Three.js. It turned out OK, and allowed some cool stuff like a slow flyover of the city. I tried to get fancy and use a shader to provide a blur effect but got stuck and then realised the Three.js library is nearly half a megabyte and figured I didn't really need 3D, I could fake it.

![Threes.js extruding city](/assets/extruding-city.png)

So, I downloaded Raphael.js, which I'd used for 2D JS drawing before. I actually got a little further than the attempt you see below, but my method for chaining animations (two methods forever callbacking each other) seemed to kill the framerate. Apparently Raphael is slow and leaks memory like a sieve.

![Raphael.js extruding... something](/assets/extruding-raphael.png)

The author of Raphael.js has now moved on to Snap.svg - faster, more modern, and without the weight of old browser support. With this I set to work rewriting my Raphael.js program, which you can see the result of above.

To emulate the 3D effect I created three polygons - two for the long sides and one for the endcap. Snap.svg supports gradients, so I applied these to give the illusion of lighting.

My only issue was applying a gentle movement animation to some of the "extrusions", while at the same time shifting them when scrolled to provide the parallax effect. It appears that you can do only one of these at a time. There may be a solution if I group up elements and apply transformations to the group, but this complicates things further.