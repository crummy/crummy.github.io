---
title: Penguin Pull
author: Malcolm
layout: post
permalink: wp/penguin-pull-project/26/
categories:
  - blog
tags:
  - coding
  - penguinpull
  - project
---
In Winter 2011, I took CMPS20 at UCSC, taught by Arnav Jhala. The course title is 'The Game Design Experience,' and involved forming a team of four students (with a grad or teacher as mentor) and creating a game from scratch using XNA, for the eventual submission to the [Imagine Cup][1]. Penguin Pull was my group's creation: a retro-styled arcade game involving dodging obstacles and picking up penguins, while keeping your ice floe in the shade of clouds as you traveled onwards.

<iframe width="420" height="315" src="https://www.youtube.com/embed/ngCvc3BnQWg" frameborder="0" allowfullscreen></iframe>

### Grouping up

Though none of us knew each other more than recognizing faces, Alex Hurley, Michael Olson, Adam Wardell and I formed a team (which we named Mediocre Megagames, only slightly tongue-in-cheek) and began throwing around ideas for a game. It had to be relatively simple (we only had a quarter), it had to be low on art assets (we were all programmers only), and had to confirm to the UN Millennium Goals (as a requirement for the Imagine Cup). We considered an action game where you chopped down trees and then at the end were rewarded with negative points (shocking twist!), or a game where you climbed trees in a rainforest with a ninja rope, but ended up settling on a game where you carry penguins on an ice-floe pulled behind your tugboat.

I think one of the best things we did was set realistic goals. We'd seen some of the previous years' games demoed so we had a reasonable idea of what was possible, plus three of us were juniors so we had some programming experience, or at least knew what we were capable of. Our first assignment, after creating our group, was to write up a design document. We decided on an art style (8-bit), obstacles, difficulty increases, and had a pretty decent idea early on of how our game would work. In fact, the only thing I can think of that didn't make it to the final product was a seal enemy that would jump out of the water and steal a penguin off your ice floe... too much animation work, and implementing it would have been tough.

### Coding

Because the class took a while to actually get into design details on how actual gameplay should be coded, I created the intro and menu early on, before there was anything to play, in fact. This was made a lot easier after learning about [Game State Management with a stack of GameScreens][2]. We next got player movement working, with some basic collisions, then began scrolling the level down after Adam created custom linkedlists for each object.

We planned initially to use the [Farseer physics engine][3] to manage collisions and the pulling of the ice floe, but it turned out to be too complicated for our small project. Instead Mike manually coded 'fake' physics that push the player away from objects post-collision, and that has the icefloe follow the tugboat reasonably realistically. I'm pretty happy with how that turned out - the post-collision push especially.

One thing I'd like to mention is that I'd come from C++ and C in other classes, usually in unix environments, and working with XNA in C# was an absolute breeze.

### Art assets

Our '8-bit' retro art style was perhaps the best decision we made, judging by feedback from the demo we did in the last week of class. We knew none of us could reasonably put out detailed artwork, so we decided to create 'sprites' with a 16:1 pixel ratio (though we deviated from this for fonts). Alex and I created most of the images with MSPaint and Photoshop. I created the tugboat first and I think this helped set a &#8220;style' for the rest of the art.

All music was found on the [8 bit collective][4] - an excellent repertoire of music for a game like ours. Sound effects were a little bit harder to come by - usually a lot of trawling through free sound databases on the web.

### Post-mortem

I think we were all proud of Penguin Pull upon release. In the last week, everyone demoed their games in class, and I think ours might have been the closest to completion, versus being just a test level which many were. Our art style was very strong, which many commented on. However, the largest problem with the game is that it just isn't fun to play. I think we could have combined  a faster moving boat with a faster moving level, but this would be a small stop gap. Biggest lesson learned: It's not hard to make a game, but it's hard to make a *fun* game.

One thing I discovered over that spring break was the concept of a [texture manager][5] - I wish I'd known about this earlier; it would have made things significantly easier.

I really enjoyed working on Penguin Pull. I came away feeling like making a simple game was really within my reach, and I can't wait to get some free time to work on something that people might actually want to play!

  * Download the [Penguin Pull final design doc][6]
  * Download the [Penguin Pull][7] XNA project (includes two fonts required for installation, and zero documentation)
  * Download the [Penguin Pull installer][8] to try it yourself (Windows only)

 [1]: http://www.imaginecup.us/
 [2]: http://create.msdn.com/en-US/education/catalog/sample/game_state_management
 [3]: http://farseerphysics.codeplex.com/
 [4]: https://8bc.org/
 [5]: http://roecode.wordpress.com/2008/01/16/xna-framework-gameengine-development-part-5-texturemanagergamecomponent/
 [6]: /assets/PenguinPulldesigndoc.pdf
 [7]: /assets/penguinpull.zip
 [8]: /assets/penguin.zip