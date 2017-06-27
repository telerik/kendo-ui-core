---
title: Icons Do Not Display in Kendo UI MVC Project 
description: Kendo UI Web Font Icons do not display after switching to local Kendo UI files.
type: troubleshooting
page_title: Web Font Icons Are Missing After Switching to Local Files
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
The Kendo UI CDN loads the required glyphs files automatically after including the CSS files. However, when working with a local copy of the CSS files, the glyphs files are not present.

## Solution
To resolve the issue, try the following solutions:

* Include the missing files in the **fonts/glyphs** folder. These files could be found in the [Kendo UI zip file](https://www.telerik.com/account/product-download?product=KENDOUICOMPLETE).
* Disable the CDN support by using the [Project Configuration Wizard](http://docs.telerik.com/aspnet-mvc/vs-integration/configure-project-wizard).

Now, the Web Font Icons should be present in the project.

## See Also

* [Theme-Related Folders](http://docs.telerik.com/kendo-ui/styles-and-layout/appearance-styling#theme-related-folders)
* [Font icons are not loaded in IE11 / Edge running on Windows 10](http://www.telerik.com/forums/font-icons-are-not-loaded-in-ie11-edge-running-on-windows-10)
