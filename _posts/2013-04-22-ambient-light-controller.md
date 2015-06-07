---
title: Ambient light controller
author: Malcolm
layout: post
redirect_from: wp/ambient-light-controller/145/
categories:
  - blog
---
![My lamp is placed behind my monitor](/assets/2013-04-21-22.27.49.jpg)

A while ago I saw [amBX][1] online, a lighting system for your computer that changes colours depending what is on screen. Kind of cool but not really necessary. However, after receiving my [Phillips Hue lights][2], I wondered if I could hack together the same thing.

So I did, and it was surprisingly easy - less than 80 lines of code! Here's the general idea:

Five times a second:

  * Get the average colour on-screen.
      * For performance reasons, I only looked at a pixel every 8 across and 8 down, so... I think that's 1/64th of the total pixels.
      * For average colour I just added up all the RGB values and divided them by total pixels.
  * Get the average brightness 
      * I calculated average brightness by taking the final value, adding up R+G+B and dividing by three.
  * Convert the colour from RGB to the Hue's XY colour space 
      * Tricky, until I found [Phillips' page on this][3]. There's some matrix multiplication I guess, but I just followed their formulas.
  * Set the specified light to the average colour and brightness.

It's a little awkward to use right now but works pretty well as a proof of concept. I'd like to make the transitions a little smoother, and work out exactly how fast I can trigger this to occur. Preferably I'd have the light go out when the computer shuts off, too - but that might be better as a separate script I think. We'll see.

In the mean time, check it out on Github if you'd like:

  * [Ambient Hue Lighting Controller][4]

 [1]: http://www.ambx.com/
 [2]: http://www.meethue.com/en-US
 [3]: https://github.com/PhilipsHue/PhilipsHueSDKiOS/blob/master/ApplicationDesignNotes/RGB%20to%20xy%20Color%20conversion.md
 [4]: https://github.com/crummy/ambihue