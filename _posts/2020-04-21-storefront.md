---
title: "Storefront.nz: a minimal online shop"
author: Malcolm
layout: post
categories:
  - blog
tags:
  - project
---

For the last few weeks I've been in COVID-19 self isolation, and on unpaid
leave, so things have been pretty quiet. My parents, on the other hand, own
a small orchard and are classed as essential personnel, so they've been hard
at work picking plums, grading them, packing, and (as the market is closed)
hand delivering fruit around the region, and sometimes shipping boxes further
afield. A lot of the manual labour is unavoidable but the sales and payments
seemed like a lot of wasted work, so I thought I'd try to help with a simple
website where customers could order fruit.

My goals were:

* As cheap as possible to run - margins are pretty thin on the orchard and
you can only sell during the season so we don't want regular monthly fees.
Plus any small cost and you start running into Squarespace territory.
* As simple as possible to use - for customers, this is a page where they can
choose what they want and buy it, no fancy marketing or gloss.
* Flexible enough for other stores - there's a local grocery store that's
doing delivery during COVID-19 and ordering is a painful process with a PDF
to print. It made me think there must be other small shops out there with a
need for this.

[Here's what I built](https://www.storefront.nz/windsong), and how:

![Windsong Orchard page on Storefront.nz](/assets/storefront_windsong.png)

# AWS

Amazon has a bunch of tech to host a website, and to hook you they have a free
tier on a bunch of their services. I used AWS Lambda for my backend, S3 and
CloudFront to host the frontend, and DynamoDB to store shop configuration and
order data - all of which should be free, unless I get some extremely unusual
load. The only AWS service that's not totally free is SES to send notification
emails to the store owner when a purchase has been made - and that's 14c/GB,
which is a looot of emails.

I used Serverless Framework to deploy most of this stuff, though the static
website is deployed separately, set up with CloudFormation. Initially I felt
a little iffy about adding a layer of abstraction but Serverless has a lot
of useful plugins and frankly writing CloudFormation is a real pain.

# Stripe

Stripe will let you integrate as much as you want with them - hooking deeply
into their APIs to handle payments and handling everything else on your end.
But they also have something called Stripe Checkout which lets you push as
much onto them as possible. My backend gives Stripe a list of items and a
price, then I redirect the customer to Stripe which collects shipping address,
email, and payment. When the charge has been successfull, Stripe notifies
the backend (with the payment and address details) and the customer is
redirected back to an order completion page I made. Super easy.

They also have a really nice test data toggle with separate API keys. Testing
third party integrations is often a painful experience and this really
made it easy.

# Google Sheets

Almost the highlight of this project is the use of a single Google Sheet as
a CMS. 

![Google Sheet backing the Windsong Orchard page](/assets/storefront_sheet.png)

Crucially, this allows clients to easily manage inventory in an interface
they're already familiar with, and saves me not only from building a UI and
backend to manage all this but more importantly removes the need for an admin
login which saves us from a whole set of problems. Much easier to use the Google
Sheet's permission system to manage things.

The API is a liiittle slow to respond but it's a small issue and it would be easy
to cache the spreadsheet in DynamoDB if needed. (Actually, if I really wanted
to do this right, when the spreadsheet updated I'd trigger a Lambda to generate
a static page generated from the spreadsheet...)

# What went wrong

The backend is built in NodeJS, but it didn't actually start that way. I built
the entire thing in Kotlin using the Ktor web framework, planning to run it in
Fargate, an AWS service that hosts Docker containers - but it turns out Fargate
doesn't have a free plan. AWS Lambda looked nice but as much as I love Kotlin,
it runs on the JVM which runs very fast but takes an unusually long time to 
boot up.

How Lambda works is when an HTTP request comes in from a user, it boots up the
service to respond to it, handles the request, and then shuts down the service
later - everything is done on the fly. This comes with a lot of advantages but
it does mean that if your service takes a while to boot, users will suffer
slow response times.

So, I threw out all my Kotlin code and rewrote it in NodeJS, known for fast
boot times. I went with Typescript which was a pleasant experience, particularly
when querying the Google Sheets API.

# Conclusions

* For someone who isn't a frontend developer, Svelte was a pleasure to work with.
I understand its advantages are being responsive and small but I appreciated
being able to write actual HTML+CSS+JS and it all working like I expected.
* Google Sheets as a CMS is a highly underrated option! Reading and writing
to it is easy and it's so good not to have to deal with security on your own app.
Obviously you wouldn't want to use it for something huge but there are lots of
small sites out there.
* Writing CloudFormation reminds me of the worst parts of programming: googling
for a solution, copy pasting code, hoping it works. I can't imagine ever writing
it from scratch and I can see why abstractions like Serverless Framework are
popular.
