---
title: Troubleshooting
page_title: Troubleshooting guide for Upload UI widget | Kendo UI Documentation
description: Most common issues, associated with Upload UI Widget and suggested solutions in quick steps.
position: 6
---

## Problem: The "Select..." button is partially visible and has no text

The Upload uses an opacity filter to overlay the default file input's Select button.
This filter is implemented as an ActiveX control in IE versions 8 and below.
As such, it is subject to security settings and can be disabled.

Sample image of an affected component:

![](/web/upload/upload-activex.png)

#### Solution

Set the following option to "Enable" in Internet Explorer: "Internet Options -> Security -> Internet (or Local intranet) -> Custom Level -> Binary and script behaviors"

![](/web/upload/upload-ie-script-behaviors.png)

## Problem: Async uploads randomly fail when using IE10/11 with Windows Authentication

The upload either freezes indefinitely or times out if a 401 challenge is received on the HTTP POST.

#### Solution

For IE10 see [KB2980019](http://support.microsoft.com/kb/2980019)

No official fix for IE 11 as of November 6, 2014.
See bug ID [819941](https://connect.microsoft.com/IE/feedback/details/819941/file-upload-stop-working-on-ie-with-windows-authentication)

## Problem: Incorrect progress readings when using IE10/11 with Windows Authentication

The upload progress indicator can go over 100% or freeze. This doesn't indicate that the request has completed.
It seems that the issue only occurs when accessing a web server on localhost.

#### Solution

Deploy the application on a remote web server.

## Problem: Incorrect behavior in the Opera browser

Symptom include:

* The `success` is fired when the file upload fails
* The server response cannot be accessed in the `success` event
* The `success` event fires before the upload is complete

#### Solution

Turn off Opera Dragonfly. This debugging tool will interfere with the upload by firing an extra Load event for the IFRAME.

## Tip: How to see a message logged in the console

When a server error occurs the complete server response is logged in the console.
The console is accessible in a manner specific for each browser:

*   Internet Explorer - Open the developer tools (F12) and choose the Script tab. The console is visible on the right.
*   Firefox - Install [Firebug](http://getfirebug.com/downloads) and enable the Console tab.
*   Chrome - Open the JavaScript console (Ctrl + Shift + J).
*   Safari - Enable the Develop menu from the Preferences / Advanced dialog. Open the error console from the Develop menu.
*   Any browser - Use a debugging proxy like [Fiddler](http://www.telerik.com/fiddler) or [Charles](http://www.charlesproxy.com/) to obtain the server response.
