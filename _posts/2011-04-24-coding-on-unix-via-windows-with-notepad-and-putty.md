---
title: Coding on Unix via Windows with Notepad++ and Putty
author: Malcolm
layout: post
permalink: wp/coding-on-unix-via-windows-with-notepad-and-putty/14/
categories:
  - blog
tags:
  - coding
  - tips
---
Many universities and colleges require a Unix coding environment for students, with SSH access for remote editing. If you're familiar with vi or emacs then that's probably all fine, but for the children of the GUI era, something a little more modern may be in order. With Notepad++ you can code as if it was on your machine, and with Putty you can run your code it as if it was on your machine. Here's how:

### Installing and configuring Notepad++

1. [Install Notepad++][1]
2. Click Plugins > NppFTP > Show NppFTP window
3. Click the gear icon on the right, and select *Edit Profile Settings* 
![NppFTP > Options > Profile Settings](nppftp.png)
   * Click *Add New* and enter a suitable name.
   * Type in the address of your SSH server, with your username and password. You don't need to change any other settings here, unless you're accessing via FTP instead. Click *Close* when done. 

![Profile Settings](/assets/npp_profile.png)

   * Click the connect button and select your connection 

![Select your connection](/assets/npp_connect.png)

   * Voila! Browse your files on the right, and double click them to edit.
            
### Installing and configuring PuTTY

Setting up PuTTY is not much more work. PuTTY offers a console interface to your Unix (or similar) environment.
            
1. [Download PuTTY][2] and install it.
2. Enter your server's address, then type a name for the connection and click Save for easy access later. 

![Enter your server name and save the connection](/assets/putty.png)

* Highlight the connection in the list and click Open.
* Enter your username and password as prompted.  
  Note: You may not see your password as you type. Don't worry, just press Enter when done.
 
![Done!](/assets/putty_terminal.png)
* Done! You may now type commands and compile code as if you were at a local terminal.
                    
These tools provide a much friendlier environment for coding.

 [1]: http://notepad-plus-plus.org/download
 [2]: http://www.chiark.greenend.org.uk/~sgtatham/putty/download.html