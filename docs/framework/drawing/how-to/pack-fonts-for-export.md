---
title: Pack Fonts for PDF Export
page_title: Pack Fonts for PDF Export | Kendo UI Drawing API
description: "Learn how to transform the content during export while applying the Kendo UI Drawing API."
slug: howto_packfontsforpdfexport_drawingapi
---

# Pack Fonts for PDF Export

To provide better quality for the output in PDF, the library needs to have access to the same fonts as the browser uses to display the elements that are produced. Otherwise, neither the layout of the PDF, nor the non-ASCII characters are properly displayed.

To declare the fonts, you need to:   
- Write the appropriate `@font-face` rules in the CSS.
- Host the CSS file on the same domain as the page.
- Keep the font files on the same domain too. Otherwise, you need to make sure that the server, which hosts the fonts, sends the proper [HTTP access control (CORS) headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS).

Also, when declaring the fonts, it is not possible to serve the page over the `file:///` URLs when needed&mdash;for example in mobile applications. 

Thе [`@telerik/kendo-pack-fonts`](https://www.npmjs.com/package/@telerik/kendo-pack-fonts) module packs one or more fonts into JavaScript code. In this way, you can load that code by using a `<script>` tag. 

The packed code works:  
* Regardless of the location you store it&mdash;this means that you do not need CORS headers.   
* Even if the page is loaded to the `file://` URL, because you do not need an AJAX request to load the fonts into the Kendo UI PDF library.   

For more information, refer to [the project on GitHub](https://github.com/telerik/kendo-pack-fonts).

## See Also

Other articles and how-to examples on Kendo UI Drawing API:

* [PDF Options JavaScript API Reference](/api/javascript/drawing/pdfoptions)
* [Overview of the Drawing API]({% slug overview_kendoui_drawingapi %})
* [How to Embed Font Awesome in Exported PDF]({% slug howto_embedfontawesome_inexportedpdf_drawingapi %})
* [How to Implement Free-Form Drawing]({% slug howto_embedfontawesome_inexportedpdf_drawingapi %})
