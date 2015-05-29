---
title: Python implementation of RK4 with variable timestep
author: Malcolm
layout: post
permalink: wp/python-implementation-of-rk4-with-variable-timestep/94/
categories:
  - Uncategorized
---
In previous dabbles with physics in video games I discovered that simply adding velocity to position each frame sometimes ran into issues with certain simulations, like a rope or force-based graph. The [helpful crew at Stack Exchange][1] explained why this was so and pointed me to some better solutions.

As a result I ended up reading [an article by Glenn Fiedler][2] on implementing RK4 integration for a more accurate simulation, and he posted sample code demonstrating his implementation in C. As I've been messing with Python lately I decided to try my hand at porting his code to Python.

The process was surprisingly easy. Most of the code is directly copied over, though due to lack of structs in Python I just used dictionaries. Pygame simplifies a lot of things that were required in GLUT for the C version, so I ended up using just 100 lines instead of 150.

Unfortunately it runs very slowly, and I realised this is because pygame uses software rendering by default. I might see if I can easily fix that next.

  * [Timestep in Python][3] (zipped source)

 [1]: http://gamedev.stackexchange.com/questions/27734/why-is-it-that-there-are-invalid-dt-values-in-physics-simulations
 [2]: http://gafferongames.com/game-physics/fix-your-timestep/
 [3]: /assets/timestep.zip