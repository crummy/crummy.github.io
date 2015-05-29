---
title: Ambient light controller
author: Malcolm
layout: post
permalink: /ambient-light-controller/145/
categories:
  - Uncategorized
---
<center>
  <div id="attachment_147" style="width: 310px" class="wp-caption aligncenter">
    <a href="http://www.malcolmcrum.com/wp/wp-content/uploads/2013/04/2013-04-21-22.27.49.jpg"><img class="size-medium wp-image-147" alt="My lamp is placed behind my monitor" src="http://www.malcolmcrum.com/wp/wp-content/uploads/2013/04/2013-04-21-22.27.49-300x224.jpg" width="300" height="224" /></a>
    
    <p class="wp-caption-text">
      My lamp is placed behind my monitor
    </p>
  </div>
</center>

A while ago I saw [amBX][1] online, a lighting system for your computer that changes colours depending what is on screen. Kind of cool but not really necessary. However, after receiving my [Phillips Hue lights][2], I wondered if I could hack together the same thing.

So I did, and it was surprisingly easy &#8211; less than 80 lines of code! Here&#8217;s the general idea:

Five times a second:

  * <span style="line-height: 13px;">Get the average colour on-screen.</span> 
      * For performance reasons, I only looked at a pixel every 8 across and 8 down, so&#8230; I think that&#8217;s 1/64th of the total pixels.
      * For average colour I just added up all the RGB values and divided them by total pixels.
  * Get the average brightness 
      * I calculated average brightness by taking the final value, adding up R+G+B and dividing by three.
  * Convert the colour from RGB to the Hue&#8217;s XY colour space 
      * Tricky, until I found [Phillips&#8217; page on this][3]. There&#8217;s some matrix multiplication I guess, but I just followed their formulas.
  * Set the specified light to the average colour and brightness.

It&#8217;s a little awkward to use right now but works pretty well as a proof of concept. I&#8217;d like to make the transitions a little smoother, and work out exactly how fast I can trigger this to occur. Preferably I&#8217;d have the light go out when the computer shuts off, too &#8211; but that might be better as a separate script I think. We&#8217;ll see.

In the mean time, check it out on Github if you&#8217;d like:

  * <a href="https://github.com/crummy/ambihue">Ambient Hue Lighting Controller</a>

 [1]: http://www.ambx.com/
 [2]: http://www.meethue.com/en-US
 [3]: https://github.com/PhilipsHue/PhilipsHueSDKiOS/blob/master/ApplicationDesignNotes/RGB%20to%20xy%20Color%20conversion.md