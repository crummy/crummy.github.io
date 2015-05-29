---
title: Control your Phillips Hue lights with Sonos
author: Malcolm
layout: post
permalink: wp/control-your-phillips-hue-lights-with-sonos/139/
categories:
  - Uncategorized
--

![My Sonos Desktop Controller with the reflection of a Hue light](/assets/Photo-Apr-04-12-38-10-AM.jpg)

Once a quarter, we hold an 'Innovation Week' at Sonos, where employees are mostly free to take a break from their regularly assigned work and make something cool that's Sonos related. Sometimes these hacks can make it into future products or software releases, sometimes they are more funny than useful, sometimes they end up not even seeing the light of day (a week isn't a very long time it turns out!). For me it's a great way to put my rusting programming skills to use and learn a thing or two while I'm at it.

Last year I'd picked up three of the [Phillips Hue][1] lights and, after discovering they are controllable by a reasonably functional API, figured they'd be perfect for some kind of integration with Sonos. This plan came into action with our latest innovation week, where I used Python to build a fake 'music service' that Sonos could access that, instead of returning music when you pressed play, controlled my light bulbs.

I started simple: could I make the most basic 'SMAPI server' (as the Sonos music services that use our API are known internally) in Python? I fumbled around with many SOAP libraries and Python web services, just trying to build a server that would provide a single hard coded container to my Sonos system. My coworker Jason had done some similar experimentation in the past so I was able to look over his partially complete code, though it used web2py - a powerful server but a little too complex for me, I felt. In the end I used PySimpleSOAP to speak Sonos' language and just BaseHTTPServer to communicate with - as lightweight as possible.

Satisfyingly, once I finally got the initial server running everything else largely fell into place. By mid Thursday I was controlling my lamp via my Sonos system, and even had time to clear up some of the uglier error messages before the demos on Friday.

The result I've uploaded to Github, after some minor reworking (i.e. removal of all the hardcoded stuff I'd hacked in during the week):

  * [https://github.com/crummy/sonoshue](https://github.com/crummy/sonoshue)

I'm proud of it; the code is nowhere near the kludge I normally produce, and the end product could actually be useful to some people (I hope). Lessons learned:

  * Spent a fair bit of time exploring and experimenting. I tried a whole bunch of Python libraries before settling on one I liked (i.e. that I could figure out...)
  * Build one step at a time. First I got a SOAP server running, then got it talking to my Sonos system, then got it to play an MP3, then added control of one light.
  * [Wireshark][2] is great for anything network related. I used it to examine SOAP requests and responses then compare mine to the spec.

 [1]: http://www.meethue.com/en-US
 [2]: http://www.wireshark.org/