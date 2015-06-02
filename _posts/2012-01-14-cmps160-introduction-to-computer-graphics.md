---
title: 'CMPS160 - Introduction to Computer Graphics'
author: Malcolm
layout: post
permalink: wp/cmps160-introduction-to-computer-graphics/38/
categories:
  - blog
tags:
  - class
  - opengl
  - programming
  - project
---
Amidst ultra-dry classes like Compiler Design and Computational Modeling, last quarter I took a class that I really enjoyed: Introduction to Computer Graphics. It effectively was an openGL class, going over coordinate systems, transformations, shading techniques and such, but what I really enjoyed were the labs. They probably had a similar level of coding to previous CS classes, but something about being able to get a visual result so immediately was very satisfying. Plus it's easier to show off a 3d model to your friends than a sort algorithm, I suppose.

<iframe width="420" height="315" src="https://www.youtube.com/embed/WE8OGoaLR3s" frameborder="0" allowfullscreen></iframe>

  After lab 1 taught us how to use basic 2D drawing techniques, we moved on to 3D primitives - building an animated model with multiple hinged joints solely out of modified cubes and spheres. Extra points for duplicating said model. I initially had visions of building the Strider from Half-life 2 but failed for the simple reason that three legs are really hard to animate. Adding an extra leg made it more reasonable.

<iframe width="420" height="315" src="https://www.youtube.com/watch?v=GRFUcGu0yvk" frameborder="0" allowfullscreen></iframe>

For lab 3, we took an image describing height and another for a texture and built a terrain from it. I added first-person controls, as well as allowed the terrain's height to be morphed. Not visible in this video is ability to move the light source, too.  
This was probably the hardest lab. We had to calculate face and vertex normals, and I didn't quite grasp what that involved. I'm still not sure if I have vertex normals working perfectly in the video.

<iframe width="420" height="315" src="https://www.youtube.com/watch?v=iW6y53E1y6c" frameborder="0" allowfullscreen></iframe>

After briefly touching on GLSL in Lab 4, we were free to do whatever we liked for Lab 5. The idea was to try to reproduce an effect from a real life video or photo, but the grading criteria was pretty much 'make something cool.' I took the terrain map from lab 3, and combined it with what I'd learned about GLSL from lab 4, plus a water ripple effect to make what you see above.

This quarter I'm taking the next class in the sequence, CMPS161, named 'Data Visualization.' Looking forward to seeing what comes out of it!