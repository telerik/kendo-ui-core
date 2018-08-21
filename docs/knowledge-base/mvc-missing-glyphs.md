---
title: Cannot Find Icons to Display in Kendo UI MVC Project
description: The Kendo UI Web Font Icons are missing in MVC projects after I switch to the local Kendo UI files.
type: troubleshooting
page_title: Web Font Icons Are Missing after Switching to Local Files | UI for ASP.NET MVC
slug: mvc-missing-glyphs
tags: mvc, font icons
ticketid: 1110130, 1106399, 1095375
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Telerik UI for ASP.NET MVC</td>
 </tr>
</table>

## Description

The Kendo UI CDN loads the required glyph files automatically after including the CSS files. However, when I work with a local copy of the CSS files, the glyph files are missing.

## Solution

When a new project is created or updated by using the Project Configuration Wizard, all of the files are expected to be automatically placed in the correct folders. If the CDN option is disabled, the themes and the font icons will be added to the project. The font icons are internally requested within the theme files and are loaded from the `fonts/glyph` folder which has to be located in the same main folder where the theme files are.

To make the Web Font Icons available, either:

* Include the missing files in the `fonts/glyphs` folder. These files are located in the [Kendo UI `.zip` file](https://www.telerik.com/account/product-download?product=KENDOUICOMPLETE), or
* Disable the CDN support by using the [Project Configuration Wizard](http://docs.telerik.com/aspnet-mvc/vs-integration/configure-project-wizard).

## See Also

* [Theme-Related Folders](http://docs.telerik.com/kendo-ui/styles-and-layout/appearance-styling#theme-related-folders)
* [Forum Thread on Not Loading Font Icons in IE11 or Edge that Runs on Windows 10](http://www.telerik.com/forums/font-icons-are-not-loaded-in-ie11-edge-running-on-windows-10)
