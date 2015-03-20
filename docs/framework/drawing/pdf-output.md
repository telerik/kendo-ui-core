---
title: PDF drawing backend
page_title: Export a drawing as a PDF file
position: 50
---

# PDF drawing backend

The Kendo UI Drawing API can export your drawing to a PDF file.  However, because PDF-s can't be displayed by a browser inside an HTML element, you cannot create a `Surface` object for this kind of output; instead, you will use a few functions exported into `kendo.drawing.pdf` to generate the binary data.  Example usage:

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

    // set PDF arguments (optional, see the "PDF options" section below)
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

The `proxyUrl` and `callback` arguments are optional.  `proxyUrl` is necessary for the download to work with Internet Explorer 9 and Safari; it won't be used for other browsers.  See [kendo.saveAs](/api/javascript/kendo.html#methods-saveAs) for more information about the `proxyURL`.  The `callback` will be invoked when the file has been successfully generated (generation could be asynchronous).

    // or, you can get the PDF as Blob object in browsers that support it
    // (all except IE < 10).
    drawing.pdf.toBlob(group, function(blob){
        // you can now upload it to a server.
        // this form simulates an <input type="file" name="pdfFile" />
        var form = new FormData();
        form.append("pdfFile", blob);

        var xhr = new XMLHttpRequest();
        xhr.open("POST", "/posturl", true);
        xhr.send(form);
    });

    // or, you can get it as a data URL
    drawing.pdf.toDataURL(group, function(dataURL){ ... });


## PDF options

The following options are currently supported:

- `paperSize` — can be either a paper name (i.e. "A4"), an array of two numbers (paper width and height), or "auto".  By default it's "auto" which means the paper size will be just enough to fit the drawing.  If numbers are specified they are assumed to be in typographic points unit.  A point is 1/72 of an inch.  Strings of the form "297mm" can also be used.  The supported units are: "mm", "cm", "in" and "pt".

- `margin` — paper margins.  Must be an object containing `top`, `left`, `right` and `bottom`, numbers which specify the paper margins.  Again, if numbers are passed they will be assumed to be in points; with strings you can specify units. When `paperSize` is "auto", the dimensions will be adjusted to include the margin.

- `landscape` (boolean, default `false`) — if `true` is specified the paper dimensions will be rotated if needed such that the width is the larger edge.

- `title`, `author`, `subject`, `keywords`, `creator` — optional strings to be included in the PDF information dictionary.

- `date` — optional `Date` object to specify the creation date of the document.  Default is current date/time (`new Date()`).

- `multiPage` (boolean, default `false`) — pass `true` to enable support for multiple page output (see the next section).


## Multiple pages output

For rendering a multiple pages PDF, you must pass `multiPage: true` to the `Group` object that you pass to `drawing.pdf.toDataURL` (let's call this the “master group”).  This group is then expected to contain in turn only `Group` shapes, one for each page (“page groups”).  The PDF options that you pass to the master group will apply to each page group, unless the page group overrides them.  The following options can be overridden:

- paperSize
- margin
- landscape

Note that if `paperSize` is `"auto"` on the master group and page groups do not override it, then the paper size for each individual page will be determined by its corresponding group—this means the final document could have pages of different sizes.


## Using custom fonts

The drawing API allows you to specify fonts with the `font` option of `Text` elements:

    var text = new drawing.Text("Hello World", new geo.Point(100, 100));
    text.options.set("font", "30px Verdana");

In order for this to render correctly as PDF, our code must have access to the TTF files.  Ideally they must be the same fonts that the browser uses to render on screen.  However, we cannot access the fonts from client-side JavaScript on the machine where the browser runs, so they must be provided on the server, and the paths to them must be declared as follows:

    kendo.pdf.defineFont({
        "Verdana"             : "/fonts/Verdana.ttf", // this is a URL
        "Verdana|Bold"        : "/fonts/Verdana_Bold.ttf",
        "Verdana|Bold|Italic" : "/fonts/Verdana_Bold_Italic.ttf",
        "Verdana|Italic"      : "/fonts/Verdana_Italic.ttf"
    });

This code must run before a PDF is requested; you could simply include it into a `<script>` tag in your page.

The object passed to `kendo.pdf.defineFont` must map between font name/style to an URL with the TrueType file.  The “same domain policy” applies, you can't specify URLs to different hosts.

Fonts are loaded on-demand, so you can declare more fonts than might be needed without worrying that data will be needlessly downloaded or parsed.  On the other hand, they will be cached so if you are building a "SPA" (Single-Page Application) the overhead will occur only once.

Currently only TTF fonts having an Unicode mapping are supported.

If you do not declare any fonts, our PDF generator will fallback to the following standard PDF fonts:

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

The font names above (on the right) are reserved and cannot be used as URLs to TrueType fonts with `kendo.pdf.defineFont`.

Note that non-ASCII characters are unsupported with the standard PDF fonts.

### Unicode notes

Unicode is supported only if the fonts you provide contain glyphs for the referenced characters.  Otherwise, a default glyph will be displayed (it depends on the font, but it's usually a blank rectangle).  Currently we don't do font substitution, so if the text contains glyphs that are not available in the current font, but are perhaps available in another font that was declared, the default glyph will still be used.


## Compression

The PDF generator supports compression via the JavaScript [pako library](https://github.com/nodeca/pako).  Just load pako with a `<script>` tag (window.pako should be available) and compression will be automatically enabled.

Compression can make a big difference in the output file size when you're using custom TTF fonts or images with alpha channel (i.e. PNGs with transparency).

> **Note:** besides drastically reducing the output size, Pako enables the browser to use less memory while rendering
> the PDF.  Chrome is known to crash on generating very large PDF-s and simply including this library will mitigate the
> problem.  It is bundled with Kendo as `pako_deflate.min.js`.


## Supported browsers

Kendo PDF Generator has been tested in recent versions of Chrome, Firefox, Safari, Blink-based Opera, Internet Explorer 9 or later.  We use [typed arrays](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) where available to improve speed (all browsers except IE9).

Internet Explorer <= 8 is not supported.
