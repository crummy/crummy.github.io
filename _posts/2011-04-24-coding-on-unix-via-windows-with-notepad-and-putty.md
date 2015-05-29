---
title: Coding on Unix via Windows with Notepad++ and Putty
author: Malcolm
layout: post
permalink: /coding-on-unix-via-windows-with-notepad-and-putty/14/
categories:
  - Uncategorized
tags:
  - coding
  - tips
---
Many universities and colleges require a Unix coding environment for students, with SSH access for remote editing. If you&#8217;re familiar with vi or emacs then that&#8217;s probably all fine, but for the children of the GUI era, something a little more modern may be in order. With Notepad++ you can code as if it was on your machine, and with Putty you can run your code it as if it was on your machine. Here&#8217;s how:

### Installing and configuring Notepad++

  1. [Install Notepad++][1]
  2. Click Plugins > NppFTP > Show NppFTP window*  
    *
  3. Click the gear icon on the right, and select *Edit Profile Settings* 
    <div id="attachment_15" style="width: 310px" class="wp-caption alignnone">
      <a href="http://www.malcolmcrum.com/wp/wp-content/uploads/2011/04/nppftp.png"><img class="size-medium wp-image-15" title="NppFTP" src="http://www.malcolmcrum.com/wp/wp-content/uploads/2011/04/nppftp-300x219.png" alt="NppFTP > Options > Profile Settings" width="300" height="219" /></a>
      
      <p class="wp-caption-text">
        NppFTP > Options > Profile Settings
      </p>
    </div></li> 
    
      * Click *Add New* and enter a suitable name.
      * Type in the address of your SSH server, with your username and password. You don&#8217;t need to change any other settings here, unless you&#8217;re accessing via FTP instead. Click *Close* when done. 
        <div id="attachment_16" style="width: 310px" class="wp-caption alignnone">
          <a href="http://www.malcolmcrum.com/wp/wp-content/uploads/2011/04/npp_profile.png"><img class="size-medium wp-image-16" title="Profile Settings" src="http://www.malcolmcrum.com/wp/wp-content/uploads/2011/04/npp_profile-300x240.png" alt="NppFTP > Options > Profile Settings" width="300" height="240" /></a>
          
          <p class="wp-caption-text">
            Profile Settings
          </p>
        </div></li> 
        
          * Click the connect button and select your connection 
            <div id="attachment_17" style="width: 310px" class="wp-caption alignnone">
              <a href="http://www.malcolmcrum.com/wp/wp-content/uploads/2011/04/npp_connect.png"><img class="size-medium wp-image-17" title="Connect" src="http://www.malcolmcrum.com/wp/wp-content/uploads/2011/04/npp_connect-300x192.png" alt="Select your connection" width="300" height="192" /></a>
              
              <p class="wp-caption-text">
                Select your connection
              </p>
            </div></li> 
            
              * Voila! Browse your files on the right, and double click them to edit.</ol> 
            
            ### Installing and configuring PuTTY
            
            Setting up PuTTY is not much more work. PuTTY offers a console interface to your Unix (or similar) environment.
            
              1. [Download PuTTY][2] and install it.
              2. Enter your server&#8217;s address, then type a name for the connection and click Save for easy access later. 
                <div id="attachment_18" style="width: 310px" class="wp-caption alignnone">
                  <a href="http://www.malcolmcrum.com/wp/wp-content/uploads/2011/04/putty.png"><img class="size-medium wp-image-18" title="PuTTY" src="http://www.malcolmcrum.com/wp/wp-content/uploads/2011/04/putty-300x288.png" alt="Enter your server name and save the connection" width="300" height="288" /></a>
                  
                  <p class="wp-caption-text">
                    Enter your server name and save the connection
                  </p>
                </div></li> 
                
                  * Highlight the connection in the list and click Open.
                  * Enter your username and password as prompted.  
                    Note: You may not see your password as you type. Don&#8217;t worry, just press Enter when done.&nbsp;</p> 
                    <div id="attachment_19" style="width: 310px" class="wp-caption alignnone">
                      <a href="http://www.malcolmcrum.com/wp/wp-content/uploads/2011/04/putty_terminal.png"><img class="size-medium wp-image-19" title="PuTTY terminal" src="http://www.malcolmcrum.com/wp/wp-content/uploads/2011/04/putty_terminal-300x188.png" alt="Done!" width="300" height="188" /></a>
                      
                      <p class="wp-caption-text">
                        Done!
                      </p>
                    </div></li> 
                    
                      * Done! You may now type commands and compile code as if you were at a local terminal.</ol> 
                    
                    These tools provide a much friendlier environment for coding.

 [1]: http://notepad-plus-plus.org/download
 [2]: http://www.chiark.greenend.org.uk/~sgtatham/putty/download.html