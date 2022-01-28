---
title: Unicode Characters Are Rendered as Emojis
description: Font icons fall back to emojis on iOS and Safari
type: kb
page_title: Prevent emojis from rendering instead of Kendo icons | Kendo UI for jQuery
slug: icons-rendered-as-emojis-on-ios
tags: icons, font, emoji, shoe, woman, man, tshirt, numerictextbox, menu, unicode, characters, render, ios, safari, mac, apple
ticketid: 1405468, 1129136
res_type: kb
component: fonticons
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI</td>
 </tr>
</table>

## Description

I have a very simple application that uses several kendo controls.  Some are used in the MVC wrapper, some directly with Kendo HTML5.  They all look fine using a PC based browser, but when viewed on an IOS the icons within the widgets are incorrect.  The down arrow is a shirt, the up arrow is (I think) sponge bob.

## Suggested Workarounds

The icons get loaded from another font(in this case it looks like the emoji built in Apple font) where the content codes for up and down arrow load ("\e006" and "\e004") the man and the T-shirt. If the icons are not immediately available Safari will go on and use its own icons.

We have logged an item in the official Kendo UI Feedback Portal for enhancing the themes with a font-loading strategy that handles the reserved unicode numbers. Vote for it [here](https://feedback.telerik.com/kendo-jquery-ui/1405895-add-font-loading-strategy-to-handle-reserved-unicode-numbers-in-ios).

Meanwhile, add the styles folder with the styles files on the server. This will reduce the time it takes for the styles to get loaded and should solve the issue with the man and the T-shirt. [Here](/styles-and-layout/appearance-styling#theme-related-folders) is a list of the folders which should be placed inside a `/styles` folder.