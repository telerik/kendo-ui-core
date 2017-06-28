---
title: Web Font Icons Are Missing after Switching to Local Files in MVC
description: A solution to show the Kendo UI Web Font Icons in your MVC project when they do not display after switching to the local Kendo UI files.
type: troubleshooting
page_title: Web Font Icons Are Missing after Switching to Local Files in MVC
slug: mvc_missing_glyphs
position: 0
tags: mvc, font icons
teampulseid:
ticketid: 1110130, 1106399, 1095375
pitsid:
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Telerik UI® for ASP.NET MVC</td>
 </tr>
</table>

## Description

The Kendo UI CDN loads the required glyph files automatically after including the CSS files. However, when I work with a local copy of the CSS files, the glyph files are not present.

## Possible Solution

To resolve this issue, either:

* Include the missing files in the `fonts/glyphs` folder. These files are located in the [Kendo UI `.zip` file](https://www.telerik.com/account/product-download?product=KENDOUICOMPLETE), or
* Disable the CDN support by using the [Project Configuration Wizard](http://docs.telerik.com/aspnet-mvc/vs-integration/configure-project-wizard).

## See Also

* [Theme-Related Folders](http://docs.telerik.com/kendo-ui/styles-and-layout/appearance-styling#theme-related-folders)
* [Forum Thread on Not Loading Font Icons in IE11 or Edge that Runs on Windows 10](http://www.telerik.com/forums/font-icons-are-not-loaded-in-ie11-edge-running-on-windows-10)
