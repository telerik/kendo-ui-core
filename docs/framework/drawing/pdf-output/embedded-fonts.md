---
title: Unicode and Embedded Fonts
page_title: Unicode and Embedded Fonts | Kendo UI Drawing Library
description: "Embed and render fonts when you export content to PDF by using the Kendo UI Drawing library."
previous_url: /framework/drawing/pdf-output#custom-fonts
slug: embeddedfonts_drawing
position: 3
---

# Unicode and Embedded Fonts

The PDF standard fonts cover only the basic ASCII character set.

To render Unicode characters and to match the output that is rendered by the browser, enable the embedding of fonts by obtaining and hosting the `.ttf` files and declaring the URLs.

> * The fonts that you use may require a separate license for their embedding in PDF documents.
> * The system fonts that the browser uses to render the content on the screen are not available for embedding.
> * All characters that you use must be present in the embedded font. For more information, refer to the section on [font substitution](#font-substitution).

## Using CSS Declarations

For optimal layout and Unicode support, declare the fonts by using the [CSS `font-face` declarations](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face).

The following example demonstrates a sample CSS declaration.

```html
    <style>
      /*
          Use the DejaVu Sans font for displaying and embedding in the PDF file.
          The standard PDF fonts do not support Unicode characters.
      */
      div {
        font-family: "DejaVu Sans", "Arial", sans-serif;
        font-size: 12px;
      }

      /*
        The example loads the DejaVu Sans from the Kendo UI CDN.
        Other fonts have to be hosted from your application.
        The official site of the Deja Vu Fonts project is
        https://dejavu-fonts.github.io/.
      */
      @font-face {
        font-family: "DejaVu Sans";
        src: url("https://kendo.cdn.telerik.com/{{ site.cdnVersion }}/styles/fonts/DejaVu/DejaVuSans.ttf") format("truetype");
      }

      @font-face {
        font-family: "DejaVu Sans";
        font-weight: bold;
        src: url("https://kendo.cdn.telerik.com/{{ site.cdnVersion }}/styles/fonts/DejaVu/DejaVuSans-Bold.ttf") format("truetype");
      }

      @font-face {
        font-family: "DejaVu Sans";
        font-style: italic;
        src: url("https://kendo.cdn.telerik.com/{{ site.cdnVersion }}/styles/fonts/DejaVu/DejaVuSans-Oblique.ttf") format("truetype");
      }

      @font-face {
        font-family: "DejaVu Sans";
        font-weight: bold;
        font-style: italic;
        src: url("https://kendo.cdn.telerik.com/{{ site.cdnVersion }}/styles/fonts/DejaVu/DejaVuSans-Oblique.ttf") format("truetype");
      }
    </style>
```

## Using Code

1. To use the built-in [`defineFont`](/api/javascript/pdf/methods/definefont) method from the Drawing library, you have to call it before the PDF file is requested. The object you pass to the `defineFont` method has to map the font name or the style to a URL with the `TrueType` file. The same-origin policy applies and, unless [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) is configured, you are not allowed to specify URLs of different origin (domain, protocol, and port).

        ```
            // Import DejaVu Sans font for embedding
            kendo.pdf.defineFont({
                "DejaVu Sans":
                     "https://cdn.kendostatic.com/{{ site.cdnVersion }}/styles/fonts/DejaVu/DejaVuSans.ttf",

                "DejaVu Sans|Bold":
                    "https://cdn.kendostatic.com/{{ site.cdnVersion }}/styles/fonts/DejaVu/DejaVuSans-Bold.ttf",

                "DejaVu Sans|Bold|Italic":
                     "https://cdn.kendostatic.com/{{ site.cdnVersion }}/styles/fonts/DejaVu/DejaVuSans-Oblique.ttf",

                "DejaVu Sans|Italic":
                     "https://cdn.kendostatic.com/{{ site.cdnVersion }}/styles/fonts/DejaVu/DejaVuSans-Oblique.ttf"
            });
        ```

1. To make sure the elements that you are trying to export are using this font, specify `font-family: "DejaVu Sans"` in their styles. The following example demonstrates how to make all Kendo widgets use this font.

        .k-widget {
          font-family: "DejaVu Sans";
        }


You can also use fonts without having to host them on the same domain. For more information on this alternative approach which also works when the page is loaded over the `file://` URLs, refer to the article on how to [pack fonts for PDF export]({% slug howto_packfontsforpdfexport_drawingapi %}).

## Font Substitution

> If no alternate fonts are specified, Kendo UI will bundle the DejaVu font family and will fall back to it for a few names, such as Times New Roman, Arial, or Courier, or generics, such as serif, sans-serif, or monospace. This is the default way Unicode works. However, the layout problem will remain&mdash;the PDF output will be slightly different from the browser unless the exact same fonts are used. To match the output from the browser, embed the same fonts in the exported PDF document.

All characters (glyphs) which are not available in the set font are substituted by the browser with characters from a fallback font. The PDF Export module has no access to the information about these substitutions. As a result, the substituted characters are rendered as the default glyph which is typically a rectangle. To work around this limitation, use fonts that contain all characters that you use. If you declare no fonts, the PDF generator will fall back to the standard PDF fonts which support only [ASCII characters](https://www.asciitable.com/).

The following table lists the standard PDF fonts&mdash;the font names in the right column are reserved and cannot be used as URLs to TrueType fonts with the `defineFont` method.

```ts-no-run
'serif'                  : 'Times-Roman',
'serif|bold'             : 'Times-Bold',
'serif|italic'           : 'Times-Italic',
'serif|bold|italic'      : 'Times-BoldItalic',
'sans-serif'             : 'Helvetica',
'sans-serif|bold'        : 'Helvetica-Bold',
'sans-serif|italic'      : 'Helvetica-Oblique',
'sans-serif|bold|italic' : 'Helvetica-BoldOblique',
'monospace'              : 'Courier',
'monospace|bold'         : 'Courier-Bold',
'monospace|italic'       : 'Courier-Oblique',
'monospace|bold|italic'  : 'Courier-BoldOblique'
```

## Font Support

* The PDF generator supports only TrueType fonts with Unicode mappings.
* In order for the automatic font discovery to work, your CSS must reside on the same domain as the web page.

## See Also

* [Drawing Basic Shapes]({% slug basicshapes_drawingapi %})
* [Drawing DOM Elements]({% slug drawingofhtmlelements_drawingapi %})
* [Limitations and Browser Support for Kendo UI Drawing API]({% slug supportedbrowsers_drawingapi %})
