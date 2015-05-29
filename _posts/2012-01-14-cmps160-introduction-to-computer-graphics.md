---
title: 'CMPS160 &#8211; Introduction to Computer Graphics'
author: Malcolm
layout: post
permalink: /cmps160-introduction-to-computer-graphics/38/
categories:
  - Uncategorized
tags:
  - class
  - opengl
  - programming
  - project
---
Amidst ultra-dry classes like Compiler Design and Computational Modeling, last quarter I took a class that I really enjoyed: Introduction to Computer Graphics. It effectively was an openGL class, going over coordinate systems, transformations, shading techniques and such, but what I really enjoyed were the labs. They probably had a similar level of coding to previous CS classes, but something about being able to get a visual result so immediately was very satisfying. Plus it&#8217;s easier to show off a 3d model to your friends than a sort algorithm, I suppose.

<p style="text-align: center;">
  <span class='embed-youtube' style='text-align:center; display: block;'></span>
</p>

<p style="text-align: left;">
  After lab 1 taught us how to use basic 2D drawing techniques, we moved on to 3D primitives &#8211; building an animated model with multiple hinged joints solely out of modified cubes and spheres. Extra points for duplicating said model. I initially had visions of building the Strider from Half-life 2 but failed for the simple reason that three legs are really hard to animate. Adding an extra leg made it more reasonable.
</p>

<p style="text-align: center;">
  <span class='embed-youtube' style='text-align:center; display: block;'></span>
</p>

For lab 3, we took an image describing height and another for a texture and built a terrain from it. I added first-person controls, as well as allowed the terrain&#8217;s height to be morphed. Not visible in this video is ability to move the light source, too.  
This was probably the hardest lab. We had to calculate face and vertex normals, and I didn&#8217;t quite grasp what that involved. I&#8217;m still not sure if I have vertex normals working perfectly in the video.

<p style="text-align: center;">
  <span class='embed-youtube' style='text-align:center; display: block;'></span>
</p>

After briefly touching on GLSL in Lab 4, we were free to do whatever we liked for Lab 5. The idea was to try to reproduce an effect from a real life video or photo, but the grading criteria was pretty much &#8220;make something cool.&#8221; I took the terrain map from lab 3, and combined it with what I&#8217;d learned about GLSL from lab 4, plus a water ripple effect to make what you see above.

This quarter I&#8217;m taking the next class in the sequence, CMPS161, named &#8220;Data Visualization.&#8221; Looking forward to seeing what comes out of it!