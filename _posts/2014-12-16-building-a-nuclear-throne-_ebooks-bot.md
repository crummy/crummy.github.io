---
title: Building a Nuclear Throne _ebooks Bot
author: Malcolm
layout: post
permalink: wp/building-a-nuclear-throne-_ebooks-bot/167/
categories:
  - Uncategorized
---
A little background: @horse_ebooks at some point was a spam Twitter account that followed some algorithm to tweet odd amalgamations of sentences that people decided was cute or interesting. Eventually it turned into a weird art project thing but that's not too important - eventually people took the idea and built their own little Twitter bots that did something similar.

Nuclear Throne is an amazing game by [Vlambeer][1] that [I've written about before][2] here, and it features little tips on load screens which are at times useful, at times amusing, and sometimes a bit inscrutable.

I decided to make an Nuclear Throne ebooks bot to combine the two.

First I had to extract the load screen tips from the game. I was hoping they'd be in a simple text file, but it turns out that GameMaker (the tool used to create Nuclear Throne) bundles everything up, art and sounds and text and all, into one big data.win file. I thought briefly about a tool to parse this but instead just opened it in a hex editor, and searched for a load screen tip that I already knew.

![data.win open in a hex editor](/assets/Screenshot-2014-12-15-17.34.52.png)

Luckily, I found all the tips near each other, so I took the hex of this and saved it elsewhere. I then created a Python script to turn the ASCII hex into actual strings:

  * Convert each 8bit hex value to a character, discarding the 00s for padding and non-alphanumeric characters (not sure what they are used for)
  * Concatenate characters to form strings, but splitting where the discarded characters were
  * Skip any strings that were all caps (these seem to be used for weapon names)
  * Go through by hand and remove the few entries (index entries?) like 'maxskill'; or 'area' that are not tips

My initial plan was to at least just tweet these - doing some kind of language processing on them with markov chains (whatever they are) seemed a bit out of my league, but [@BooDooPerson][4] has [a guide on making your own ebooks bot][5].

I thought I'd run into a hitch - the guide expects you to download a CSV containing the tweets of a real person. Turns out all it uses is the 'text' field from the CSV, and the only difference between a CSV with a column labelled 'text' and a bunch of strings separated with newlines is the word 'text' at the top. And no empty lines or the script will choke.

So, I used [mispy's script][6] to process the load screen tips into a 'pseudo-Markov generator', which analyzed the strings and mashed them together. All that was left was to tweet them.

Unfortunately, Twitter doesn't make it easy to make a bunch of bot accounts (you can probably figure out why). In particular, if you want to use Twitter's API to tweet, you need to have your account authorized with a phone number. I registered @nuclear_ebooks but my phone number was tied to my personal account. Thankfully, [Dalton Hubble describes a process][7] where a primary account creates the Twitter app with the ability to tweet, which I created and added to @nuclear_ebooks.

The proof is in the pudding: a few times a day, [@nuclear_ebooks][8] will tweet an odd message that should sound familiar to Nuclear Throne players, if a little off. And if you message him directly, you can start a conversation with the little guy.

 [1]: http://vlambeer.com/
 [2]: http://www.malcolmcrum.com/wp/nuclear-throne-a-case-study-in-player-feedback/165/ "Nuclear Throne: a case study in player feedback"
 [4]: https://twitter.com/BooDooPerson
 [5]: http://blog.boodoo.co/how-to-make-an-_ebooks/
 [6]: https://github.com/mispy/twitter_ebooks
 [7]: http://dghubble.com/blog/posts/twitter-app-write-access-and-bots/
 [8]: https://twitter.com/nuclear_ebooks