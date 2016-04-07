---
title: PDF Drawing Backend
page_title: PDF Drawing Backend | Kendo UI Drawing API
description: "Learn how to export a drawing in a PDF file when using the Kendo UI Drawing API."
slug: pdfderawingexport_drawingapi
position: 3
---

# PDF Drawing Backend

The [Kendo UI Drawing API](http://demos.telerik.com/kendo-ui/drawing/index) can export your drawing to a PDF file.

## Getting Started

Since PDF files cannot be displayed by a browser inside an HTML element, you cannot create a `Surface` object for this kind of output.

### Employ Functions

Use a few functions exported to `kendo.drawing.pdf` to generate the binary data instead.

###### Example

    var drawing = kendo.drawing;
    var geo = kendo.geometry;

    // this will contain all our drawing
    var group = new drawing.Group();

    // draw a circle
    var circleGeometry = new geo.Circle([ 100, 100 ], 50);
    var circle = new drawing.Circle(circleGeometry).stroke("red", 1);

    // and add it to the group
    group.append(circle);

    // add some text
    var text = new drawing.Text("Hello World", new geo.Point(100, 200));
    group.append(text);

    // (Optional) set PDF arguments, see the "PDF options" section below
    group.options.set("pdf", {
        paperSize: "A4",
        margin: {
            left   : "20mm",
            top    : "40mm",
            right  : "20mm",
            bottom : "40mm"
        }
    });

    // you can offer the file for download now
    drawing.pdf.saveAs(group, "filename.pdf", proxyUrl, callback);

The `proxyUrl` and `callback` arguments are optional. The `proxyUrl` is necessary for the download to work with Internet Explorer 9 and Safari and is not going to be used for other browsers. The `callback` will be invoked when the file has been successfully generated (generation could be asynchronous).

For more information on the `proxyURL`, refer to [`kendo.saveAs`](/api/javascript/kendo.html#methods-saveAs).

### Use Blob Object

The example below demonstrates how to get the PDF as a `Blob` object in browsers that support it, such as all but Internet Explorer 9 or older.

###### Example

    drawing.pdf.toBlob(group, function(blob){
        // you can now upload it to a server
        // this form simulates an <input type="file" name="pdfFile" />
        var form = new FormData();
        form.append("pdfFile", blob);

        var xhr = new XMLHttpRequest();
        xhr.open("POST", "/posturl", true);
        xhr.send(form);
    });

    // or, you can get it as a data URL
    drawing.pdf.toDataURL(group, function(dataURL){ ... });

## Configuration

### PDF Options

The following options are currently supported:

- `paperSize`&mdash;This option can be either a paper name, such as A4, an array of two numbers, such as paper width and height, or `"auto"`. By default, it is `"auto"`, which means the paper size will be just enough to fit the drawing. If numbers are specified, they are assumed to be in a typographic points unit. A point is 1/72 of an inch. Strings of the form `297mm`" can also be used. The supported units are `mm`, `cm`, `in` and `pt`. The available paper sizes are: `A0-A10`, `B0-B10`, `C0-C10`, `Executive`, `Folio`, `Legal`, `Letter`, `Tabloid`.
- `margin`&mdash;Tis option indicates the paper margins. It must be an object containing `top`, `left`, `right`, and `bottom` numbers which specify the paper margins. Again, if numbers are passed, they are assumed to be in points. By using strings you can specify units. When `paperSize` is `"auto"`, the dimensions are adjusted to include the margin. 
- `landscape` (Boolean, default `false`)&mdash;If `true` is specified, the paper dimensions will be rotated if needed, so that the width is the larger edge.
- `title`, `author`, `subject`, `keywords`, `creator`&mdash;These are the optional strings to be included in the PDF information dictionary.
- `date`&mdash;This `Date` object is optional and specifies the creation date of the document. The default value is the current date/time (`new Date()`).
- `multiPage` (Boolean, default `false`)&mdash;Pass `true` to enable support for multiple page output, which is explained in the next section.

### Multi-Page PDF Output

To render a multiple pages PDF file, pass `multiPage: true` to the `Group` object, which you pass to `drawing.pdf.toDataURL` (master group). This group is then expected to contain in turn only `Group` shapes, one for each page (page groups). The PDF options that you pass to the master group apply to each page group, unless the page group overrides them. The following options can be overridden:

- `paperSize`
- `margin`
- `landscape`

Note that if `paperSize` on the master group is `"auto"` and the page groups do not override it, then the paper size for each individual page is determined by its corresponding group. This means the final document could have pages of different sizes.

### Custom Fonts

The Kendo UI Drawing API allows you to specify fonts with the `font` option of `Text` elements, as demonstrated in the example below.

###### Example

    var text = new drawing.Text("Hello World", new geo.Point(100, 100));
    text.options.set("font", "30px Verdana");

In order for this to render correctly as PDF, your code must have access to the TTF files. Ideally, they must be the same fonts that the browser uses to render on screen. However, you cannot access the fonts from the client-side JavaScript on the machine where the browser runs, so they must be provided on the server, and the paths to them must be declared as demonstrated in the example below.

###### Example

    kendo.pdf.defineFont({
        "Verdana"             : "/fonts/Verdana.ttf", // this is a URL
        "Verdana|Bold"        : "/fonts/Verdana_Bold.ttf",
        "Verdana|Bold|Italic" : "/fonts/Verdana_Bold_Italic.ttf",
        "Verdana|Italic"      : "/fonts/Verdana_Italic.ttf"
    });

This code must run before a PDF is requested. You can simply include it into a `<script>` tag in your page. The object passed to `kendo.pdf.defineFont` must map between font name/style to an URL with the `TrueType` file. The same origin policy applies, so you cannot specify URLs to different hosts.

Fonts are loaded on-demand, so you can declare more fonts than might be needed without worrying that any data will be needlessly downloaded or parsed. On the other hand, they will be cached, so if you are building a Single-Page Application (SPA), the overhead will occur only once.

Currently, only TTF fonts having an Unicode mapping are supported. If you do not declare any fonts, the Kendo UI PDF generator will fallback to the standard PDF fonts, listed below.

    "serif"                  : "Times-Roman",
    "serif|bold"             : "Times-Bold",
    "serif|italic"           : "Times-Italic",
    "serif|bold|italic"      : "Times-BoldItalic",
    "sans-serif"             : "Helvetica",
    "sans-serif|bold"        : "Helvetica-Bold",
    "sans-serif|italic"      : "Helvetica-Oblique",
    "sans-serif|bold|italic" : "Helvetica-BoldOblique",
    "monospace"              : "Courier",
    "monospace|bold"         : "Courier-Bold",
    "monospace|italic"       : "Courier-Oblique",
    "monospace|bold|italic"  : "Courier-BoldOblique"

The right-side font names above are reserved and cannot be used as URLs to TrueType fonts with `kendo.pdf.defineFont`. Note that non-ASCII characters are unsupported with the standard PDF fonts.

### Unicode Characters

Unicode is supported only if the fonts you provide contain glyphs for the referenced characters. Otherwise, a default glyph will be displayed, which depends on the font, but is usually a blank rectangle. Currently, Kendo UI does not support font substitution, so if the text contains glyphs that are not available in the current font, but are perhaps available in another font that was declared, the default glyph will still be used.

### Compression

The PDF generator supports compression via the JavaScript [pako library](https://github.com/nodeca/pako). Just load pako with a `<script>` tag (`window.pako` should be available) and compression will be automatically enabled.

Compression can make a big difference in the output file size when you are using custom TTF fonts or images with alpha channel, such as PNGs with transparency.

> **Important**
>
> Besides drastically reducing the output size, pako enables the browser to use less memory while rendering the PDF. Chrome is known to crash on generating very large PDF files and simply including this library will mitigate the problem. It is bundled with Kendo UI as `pako_deflate.min.js`.

## Supported Browsers

Kendo UI PDF generator has been tested in recent versions of Chrome, Firefox, Safari, Blink-based Opera, and Internet Explorer 9 and later. Use [typed arrays](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) where available to improve speed (all browsers except IE9).

Internet Explorer 8 and older are not supported.

## See Also

Other articles on Kendo UI Drawing API:

* [Overview of the Drawing API]({% slug overview_kendoui_drawingapi %})
* [Drawing of Basic Shapes]({% slug basicshapes_drawingapi %})
* [Drawing of HTML Elements]({% slug drawingofhtmlelements_drawingapi %})
* [Supported Browsers for Kendo UI Drawing API]({% slug drawingofhtmlelements_drawingapi %})
