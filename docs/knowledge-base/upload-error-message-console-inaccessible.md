---
title: Cannot Access the Upload Error Message Console
page_title: Cannot Access the Upload Error Message Console
description: "Learn how to handle the Kendo UI for jQuery Upload if you are not able to access the error message console of the component."
slug: upload_error_message_console_inaccessible
tags: telerik, progress, kendoui, jquery, upload, cannot, access, error, message, console
type: troubleshooting
res_type: kb
component: upload
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Upload for jQuery</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
</table>

## Description 

I'm not able to access the error message console when working with the jQuery Upload. 

## Solution

When a server error occurs, the complete server response is logged in the console. The console is accessible in a specific manner for each browser as listed below:

* Internet Explorer&mdash;Open the developer tools (`F12`) and choose the **Script** tab. The console is visible on the right.
* Firefox&mdash;Install [Firebug](https://getfirebug.com) and enable the **Console** tab.
* Chrome&mdash;Open the JavaScript console (`Ctrl`+`Shift`+`J`).
* Safari&mdash;Enable the **Develop** menu from the **Preferences**/**Advanced** dialog. Open the error console from the **Develop** menu.
* Any browser&mdash;Use a debugging proxy like [Fiddler](https://www.telerik.com/fiddler) or [Charles](http://www.charlesproxy.com/) to obtain the server response.

## See Also

* [JavaScript API Reference of the Upload](/api/javascript/ui/upload)
