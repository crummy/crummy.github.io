---
title: Shacknews Chatty Visualiser
author: Malcolm
layout: post
permalink: wp/shacknews-chatty-visualiser/60/
categories:
  - blog
---
I took CMPS161 this quarter, a class about data visualisation. In addition to several lab projects we had a quarter-long personal project, which was essentially to take some data and visualise it in an interesting way to gain some kind of insight to the data.

<iframe width="560" height="315" src="https://www.youtube.com/embed/TcoAUknAhHg" frameborder="0" allowfullscreen></iframe>
  
I decided to build a force-based visualisation to represent current threads on Shacknews' chatty system. Shacknews uses a tree structure for replies within threads, and this lends itself well to visualisation with a force-based algorithm.

I coded my visualisation using XNA  - probably an odd choice but it makes drawing in 2D pretty easy and I had some experience with it. I grabbed JSON data from [StoneDonkey's API][1], and drew it using pretty much the [simplest algorithm I could find][2].

Upon loading the software, the 40 most recent threads from Shacknews appear as nodes, with their size and colour indicating their reply count and category, respectively. Clicking a thread brings up a sub-diagram of all the replies to that thread, and this is where the real insight appears, as the layout of the diagram directly correlates with the reply structure. Users can easily recognize common thread structures such as hit-and-run posts (star emanating from thread with no additional replies from original poster), arguments or involved discussions (a long tail of replies), or a sub-thread that has gained more interest than its root post.

This was the largest project I'd worked on just on my own and it was an interesting experience. I started out with a burst of coding, starting with a prototype constructed over a weekend, but when building the real thing I lost steam about halfway through. I think this was when I was doing backend work and changes didn't have much obvious effect; the final sprint to completion went much faster as the whole project finally coalesced into something actually useful.

Lastly, out of the fifteen or so visualisations that the class presented on the final day, we voted on our favourites and mine managed to come out on top! Makes me proud to do well on my capstone course.

  * [XNA 4.0 project][3]
  * [Prototype video][4]
  * [Alpha 1 video][5]
  * [Alpha 2 video][6]

 [1]: http://shackapi.stonedonkey.com/readme/
 [2]: http://blog.ivank.net/force-based-graph-drawing-in-as3.html
 [3]: /assets/ShackCommunityJSON.zip
 [4]: http://www.youtube.com/watch?v=9w9TwP43_I0
 [5]: http://www.youtube.com/watch?v=BZwt8XlPtyU
 [6]: http://www.youtube.com/watch?v=_PWmwNuA6ys