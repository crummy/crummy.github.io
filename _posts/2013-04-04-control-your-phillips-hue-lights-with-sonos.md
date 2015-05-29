---
title: Control your Phillips Hue lights with Sonos
author: Malcolm
layout: post
permalink: /control-your-phillips-hue-lights-with-sonos/139/
categories:
  - Uncategorized
---
&nbsp;

<div id="attachment_142" style="width: 310px" class="wp-caption aligncenter">
  <a href="http://www.malcolmcrum.com/wp/wp-content/uploads/2013/04/Photo-Apr-04-12-38-10-AM.jpg"><img class="size-medium wp-image-142" alt="My Sonos Desktop Controller with the reflection of a Hue light" src="http://www.malcolmcrum.com/wp/wp-content/uploads/2013/04/Photo-Apr-04-12-38-10-AM-300x224.jpg" width="300" height="224" /></a>
  
  <p class="wp-caption-text">
    My Sonos Desktop Controller (with the reflection of a Hue light)
  </p>
</div>

Once a quarter, we hold an &#8220;Innovation Week&#8221; at Sonos, where employees are mostly free to take a break from their regularly assigned work and make something cool that&#8217;s Sonos related. Sometimes these hacks can make it into future products or software releases, sometimes they are more funny than useful, sometimes they end up not even seeing the light of day (a week isn&#8217;t a very long time it turns out!). For me it&#8217;s a great way to put my rusting programming skills to use and learn a thing or two while I&#8217;m at it.

Last year I&#8217;d picked up three of the [Phillips Hue][1] lights and, after discovering they are controllable by a reasonably functional API, figured they&#8217;d be perfect for some kind of integration with Sonos. This plan came into action with our latest innovation week, where I used Python to build a fake &#8220;music service&#8221; that Sonos could access that, instead of returning music when you pressed play, controlled my light bulbs.

I started simple: could I make the most basic &#8220;SMAPI server&#8221; (as the Sonos music services that use our API are known internally) in Python? I fumbled around with many SOAP libraries and Python web services, just trying to build a server that would provide a single hard coded container to my Sonos system. My coworker Jason had done some similar experimentation in the past so I was able to look over his partially complete code, though it used web2py &#8211; a powerful server but a little too complex for me, I felt. In the end I used PySimpleSOAP to speak Sonos&#8217; language and just BaseHTTPServer to communicate with &#8211; as lightweight as possible.

Satisfyingly, once I finally got the initial server running everything else largely fell into place. By mid Thursday I was controlling my lamp via my Sonos system, and even had time to clear up some of the uglier error messages before the demos on Friday.

The result I&#8217;ve uploaded to Github, after some minor reworking (i.e. removal of all the hardcoded stuff I&#8217;d hacked in during the week):

  * <https://github.com/crummy/sonoshue>

I&#8217;m proud of it; the code is nowhere near the kludge I normally produce, and the end product could actually be useful to some people (I hope). Lessons learned:

  * <span style="line-height: 13px;">Spent a fair bit of time exploring and experimenting. I tried a whole bunch of Python libraries before settling on one I liked (i.e. that I could figure out&#8230;)</span>
  * Build one step at a time. First I got a SOAP server running, then got it talking to my Sonos system, then got it to play an MP3, then added control of one light.
  * [Wireshark][2] is great for anything network related. I used it to examine SOAP requests and responses then compare mine to the spec.

 [1]: http://www.meethue.com/en-US
 [2]: http://www.wireshark.org/