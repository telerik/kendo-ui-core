---
title: Pack fonts for PDF export
page_title: Pack fonts for PDF export | Kendo UI Drawing API
description: "Learn how to transform the content during export while applying the Kendo UI Drawing API."
slug: howto_packfontsforpdfexport_drawingapi
---

# Pack fonts for PDF export

For a quality PDF output, it is essential that our library has access to the same fonts that the browser uses to display the elements that you need to output.  Otherwise the layout of the PDF will look broken and non-ASCII characters might not be displayed properly.

Declaring fonts is somewhat painful:

- you must write the appropriate `@font-face` rules in the CSS
- you must host the CSS file on the same domain as the page
- you must keep the font files on the same domain too, or otherwise, make sure that the server hosting the fonts sends the proper [HTTP access control (CORS) headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS).
- you cannot serve the page over `file:///` URL-s (which can be useful, for example in mobile apps)

The [@telerik/kendo-pack-fonts](https://www.npmjs.com/package/@telerik/kendo-pack-fonts) utility packs one or more fonts into JavaScript code. You can then load that code with a `<script>` tag and it will work no matter where you store it (no need for CORS headers).  It will also work if the page is loaded on `file://` URL, because no AJAX request is needed to load the fonts in Kendo PDF library.

Please see the project README for more information.

## See Also

Other articles and how-to examples on Kendo UI Drawing API:

* [PDF Options JavaScript API Reference](/api/javascript/drawing/pdfoptions)
* [Overview of the Drawing API]({% slug overview_kendoui_drawingapi %})
* [How to Embed Font Awesome in Exported PDF]({% slug howto_embedfontawesome_inexportedpdf_drawingapi %})
* [How to Implement Free-Form Drawing]({% slug howto_embedfontawesome_inexportedpdf_drawingapi %})
