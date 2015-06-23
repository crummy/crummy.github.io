---
title: Procedural City in Javascript
author: Malcolm
layout: post
categories:
  - blog
---

Inspired by Shamus Young's [Procedural City](http://www.shamusyoung.com/twentysidedtale/?p=2940) series, where he builds a randomly generated city set at night, I decided to attempt to recreate his metropolis in Javascript, using Three.js, a library I'd experimented with briefly but never really used.

![Procedural City screenshot](/assets/procedural-city-js.png)

My work was kickstarted with @mrdoob's similar work, [City 0.1](http://mrdoob.com/lab/javascript/webgl/city/01/). I took that as a basis, set it at night, and created three types of buildings by combining simple geometry, as Young had done.

Unfortunately I ran into some issues combining geometry and applying matrices. The approach I took involved keeping every element of every building in one single giant piece of geometry, which made for very fast rendering (only one trip to the GPU) but meant manipulating individual parts was tricky at best. I'm not totally sure there is a solution for this approach.

A better option would be either working with individual polygons, as Young did originally, or building actual Object3Ds. The former is more complex and the latter loses speed. I may take the time to do this in future but for now I'm releasing the project as is.

You can view the city here, and fly around if you'd like: [malcolmcrum.com/procedural-city-js/](http://malcolmcrum.com/procedural-city-js/)