---
title: Increasing WordPress max upload size on Dreamhost
author: Malcolm
layout: post
redirect_from: wp/increasing-wordpress-max-upload-size-on-dreamhost/12/
categories:
  - blog
tags:
  - tips
  - wordpress
---
WordPress has a maximum upload size for files which may be annoying for anything but images and small documents. The limit comes from an internal PHP setting, which can be changed with access to the *php.ini* file.

  1. Download the '[Custom PHP auto-installer][1].'
  2. Upload *dh-phpini.php* via FTP to your website
  3. Access the file via your web browser (e.g. www.malcolmcrum.com/dh-phpini.php), and follow the brief instructions.
  4. You'll now have a *php.ini* file in a 'cgi-bin' folder which you may freely edit. Open it, and edit these lines to whatever size you wish:  
    *post\_max\_size = 50mb*  
    *upload\_max\_filesize = 50mb*
  5. SSH into your Dreamhost account, and run this command:  
    *$ touch ~/domain.tld/cgi-bin/dispatch.fcgi*

Note that you need to change your account manually to support SSH, if you have not already done so. You can follow [these steps][2] for Dreamhost's instructions on this.

 [1]: http://sxi.sabrextreme.com/phpini
 [2]: http://wiki.dreamhost.com/Enabling_Shell_Access