---
title: Pack Fonts for PDF Export with the Drawing Library
page_title: Pack Fonts for PDF Export with the Drawing API Library
description: "Learn how to transform the content during export while applying the Kendo UI Drawing API."
slug: howto_packfontsforpdfexport_drawingapi
previous_url: /framework/drawing/how-to/pack-fonts-for-export
tags: telerik, kendo, jquery, drawing, api, library, pack, fonts, for, pdf, export 
component: drawing
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Drawing API</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
 <tr>
  <td>Visual Studio version</td>
  <td>Visual Studio 2017</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How can I transform the content during the PDF export while applying the Kendo UI Drawing API?

## Solution

To provide better quality for the output in PDF, the library requires access to the same fonts as the browser uses to display the elements that are produced. Otherwise, neither the layout of the PDF, nor the non-ASCII characters are properly displayed.

To declare the fonts, you need to:   

1. Write the appropriate `@font-face` rules in the CSS.
1. Host the CSS file on the same domain as the page.
1. Keep the font files on the same domain too. Otherwise, you need to make sure that the server, which hosts the fonts, sends the proper [HTTP access control (CORS) headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS).

Also, when declaring the fonts, it is not possible to serve the page over the `file:///` URLs when needed&mdash;for example, in mobile applications.

The [`@telerik/kendo-pack-fonts`](https://www.npmjs.com/package/@telerik/kendo-pack-fonts) module packs one or more fonts into JavaScript code. In this way, you can load that code by using a `<script>` tag.

The packed code works:  
* Regardless of the location you store it&mdash;this means that you do not need CORS headers.   
* Even if the page is loaded to the `file://` URL, because you do not need an AJAX request to load the fonts into the Kendo UI PDF library.   

For more information, refer to [the project on GitHub](https://github.com/telerik/kendo-pack-fonts).

## See Also

* [PDF Options JavaScript API Reference](/api/javascript/drawing/pdfoptions)
* [Overview of the Drawing API]({% slug overview_kendoui_drawingapi %})
