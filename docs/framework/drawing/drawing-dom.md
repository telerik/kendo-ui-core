---
title: Drawing of HTML Elements
page_title: Drawing of HTML Elements | Kendo UI Drawing API
description: "Learn how to draw a piece of HTML that is available in the DOM using the Kendo UI Drawing API."
slug: drawingofhtmlelements_drawingapi
position: 4
---

# Drawing of HTML Elements

The [Kendo UI Drawing API](http://demos.telerik.com/kendo-ui/drawing/index) supports the conversion of an existing page, or part of it, to drawing primitives. This allows you to further process the content and export it in various formats such as Portable Document Format (PDF), Scalable Vector Graphics (SVG), and Portable Network Graphics (PNG) ones.

## Getting Started

Using the `drawing.drawDOM` function you can draw a DOM element into a [`drawing.Group`](/api/dataviz/drawing/group), which you are then able to render with one of the supported backends into SVG, PDF, HTML5 `<canvas>`, or VML format.

The DOM element must be appended to the document and must be visible, meaning that you cannot draw an element which has the `display: none`, or the `visibility: hidden` options. Assume that you have the following HTML in the page:

    <div id="drawMe" class="...">
      ... more HTML code here...
    </div>

Then you are able to draw it from JavaScript with the call demonstrated in the example below.

###### Example

    drawing.drawDOM("#drawMe").then(function(group){
        // here group is a drawing.Group object

        // you can now draw it to SVG for example:
        var svg = drawing.Surface.create($("#container"), { type: "svg" });
        svg.draw(group);

        // or you can save it as PDF.
        // optionally:
        group.options.set("pdf", {...pdf options...});
        drawing.pdf.saveAs(group, "filename.pdf", proxyUrl);
    });

The `drawing.drawDOM` takes a jQuery selector or object, or a plain DOM node, and returns a promise which delivers a `drawing.Group` object.

## Configuration

### Custom Fonts in PDF

If you need PDF output, your document should declare the fonts that it uses using [CSS `font-face` declarations](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face) for optimal layout and Unicode support. Since Kendo UI 2014 Q3 SP1, the Kendo UI PDF generator is able to dig such declarations directly from the CSS and you do not need to manually call [`pdf.defineFont`](/framework/drawing/pdf-output.html#using-custom-fonts).

The example below demonstrates a sample CSS declaration.

###### Example

    @font-face {
      font-family: "DejaVu Sans";
      src: url("fonts/DejaVu/DejaVuSans.ttf") format("truetype");
    }

Next, to make sure the elements that you are trying to export are using this font, specify `font-family: "DejaVu Sans"` in their styles.

The example below demonstrates how to make all Kendo widgets use this font.

###### Example

    .k-widget {
      font-family: "DejaVu Sans";
    }

> **Important**
> * The PDF generator supports only TrueType fonts with Unicode mappings.
> * In order for automatic font discovery to work, your CSS must reside on the same domain as the web page.
> * Kendo UI bundles the DejaVu font family and will fall back to it for a few names, such as Times New Roman, Arial, or Courier, or generics, such as serif, sans-serif, or monospace, if no alternate fonts are specified. This is so that Unicode works by default. However, the layout problem will remain&mdash;the PDF output will be slightly different from the browser unless the exact same fonts are used.

### Images in PDF

Images are exported correctly only if they have the correct extension. For example, if PNG images with a JPG extension are displayed on the page, they might not show up in the exported PDF, or might cause exceptions in the PDF reader.

To check for possible notes on loading images from different domains, refer to the [section on known limitations](#known-limitations).

### Hyperlinks in PDF

By default the [`drawDOM`](/api/javascript/drawing#methods-drawDOM) method creates clickable hyperlinks in the generated PDF document. You can disable this behavior with the `avoidLinks` option, as demonstrated in the example below.

###### Example

```html
    <div id="content">
        This is <a href="http://www.telerik.com">a non-clickable link</a>.
    </div>
    <script>
        var draw = kendo.drawing;

        draw.drawDOM($("#content"), {
            avoidLinks: true,
            paperSize: "A4"
        })
        .then(function(root) {
            return draw.exportPDF(root);
        })
        .done(function(data) {
            kendo.saveAs({
                dataURI: data,
                fileName: "avoid-links.pdf"
            });
        });
    </script>
```

### Multi-Page PDF Output

The `drawing.drawDOM` allows you to create a [multi-page PDF](/framework/drawing/pdf-output.html#multiple-pages-output) by specifying manual page breaks. A page break occurs before each element that matches the `forcePageBreak` CSS selector.

The example below demonstrates how to draw a multi-page Kendo UI Grid.

###### Example

```html
    <div id="grid" style="width: 900px;"></div>

    <script>
      $(document).ready(function() {
        var data = [];
        for (var i = 1; i < 50; ++i) {
          data.push({ title: "Item " + i, id: i });
        }

        $("#grid").kendoGrid({
          dataSource: data,
          rowTemplate: $("#rowTemplate").html()
        });

        kendo.drawing
        .drawDOM("#grid", { forcePageBreak: ".page-break" })
        .then(function(group){
          kendo.drawing.pdf.saveAs(group, "multipage.pdf")
        });
      });
    </script>

    <script id="rowTemplate" type="x/kendo-template">
      <!-- to every tenth row we add the "page-break" class -->
      <tr data-uid="#= uid #" class="#= (id%10 == 0 ? 'page-break' : '') #">
        <td>#: title #</td>
        <td>#: id #</td>
      </tr>
    </script>
```

### Automatic Page Breaking

Since Kendo UI 2015 Q1 Kendo UI supports automatic page breaking. When your target is the output in PDF format, you can solicit automatic page breaking by informing the `drawDOM` what the desired page size and margins are. Note that the automatic page breaking is subject to a few limitations detailed below. The options are `paperSize` and `margin`, the same as documented in the [section on the PDF options]({% slug pdfderawingexport_drawingapi %}#configuration-PDF). You are still able to use the `forcePageBreak` in this case to manually specify break points.

###### Example

    <div id="grid"></div>
    <script>
      var data = [];
      for (var i = 1; i < 200; ++i) {
        data.push({ title: "Item " + i, id: i });
      }

      $("#grid").kendoGrid({ dataSource: data });

      drawing.drawDOM("#grid", {
        paperSize: "A4",
        margin: "2cm"
      }).then(function(group){
        drawing.pdf.saveAs(group, "grid.pdf");
      });
    </script>

### Page Break Limitations

Page breaking happens only inside text nodes. Therefore, if an element has no text content, it cannot be split across pages. For example, an `<img>` or a `<div>`, which has perhaps a border or background image, but otherwise no content, is not split. If such elements fall on a page boundary, they are moved to the next page along with all the following DOM nodes. If they do not fit on a single page, they are truncated.

The current list of nodes that will not be split includes:

* `<img>`
* `<tr>`
* `<iframe>`
* `<svg>`
* `<object>`
* `<canvas>`
* `<input>`
* `<textarea>`
* `<select>`
* `<video>`

Automatic page breaking cannot occur inside a positioned element (`position: absolute`). Moreover, elements with `position: fixed` are not supported at all and, most likely, they will not show up in the output. Such elements will simply be skipped over by the algorithm. For example, for the input demonstrated below on an A4 page, the output will just display the Foo and Baz paragraphs. The positioned `<div>` would appear on the first page at height 1000, but since this is beyond the page boundary, it will be clipped.

###### Example

    <p>Foo</p>
    <div style="position: absolute; top: 1000px">Bar</div>
    <p>Baz</p>

If the algorithm decides to move a node to the next page, all the DOM nodes which follow it, will be moved as well, even if there might be potentially room for some of them on the current page. This is demonstrated with floating elements in the example below.

###### Example

    <p>
      some text before
      <img style="float: left" ... />
      some text after
    </p>

It can happen that this element ends up in a position where all the text fits on the current page, but the image is higher and would fall on the boundary. In this case, the image and some text after will move to the next page.

### Template: Headers and Footers

When multi-page output is requested via `forcePageBreak` or `paperSize`, you can additionally specify a page template. This template will be inserted into each page before producing the output. You can easily position it relatively to the page via CSS. The template can be a function, or a Kendo UI template, and it receives the number of the current page (`pageNum`) and the total number of pages (`totalPages`).

###### Example

```html
    <script type="x/kendo-template" id="page-template">
        <div class="page-template">
            <div class="header">
                <div style="float: right">Page #:pageNum# of #:totalPages#</div>
                This is a header.
            </div>
            <div class="footer">
                This is a footer.
                Page #:pageNum# of #:totalPages#
            </div>
        </div>
    </script>

    <div id="grid"></div>

    <style>
        /*
            Make sure everything in the page template is absolutely positioned.
            All positions are relative to the page container.
        */
        .page-template > * {
            position: absolute;
            left: 20px;
            right: 20px;
            font-size: 90%;
        }
        .page-template .header {
            top: 20px;
            border-bottom: 1px solid #000;
        }
        .page-template .footer {
            bottom: 20px;
            border-top: 1px solid #000;
        }

        /*
            Use the DejaVu Sans font for display and embedding in the PDF file.
            The standard PDF fonts have no support for Unicode characters.
        */
        .k-grid {
            font-family: "DejaVu Sans", "Arial", sans-serif;
            width: 400px;
        }

    </style>

    <script>
        $("#grid").kendoGrid({
            dataSource: {
                type: "odata",
                transport: {
                    read: {
                        url: "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Products",
                    }
                }
            },
            scrollable: false,
            columns: [{
              title: "Name",
              field: "ProductName"
            }, {
              title: "Units",
              field: "UnitsInStock"
            }],
            dataBound: function() {
              kendo.drawing.drawDOM("#grid", {
                  paperSize: "A4",
                  margin: "3cm",
                  template: $("#page-template").html()
              }).then(function(group){
                  kendo.drawing.pdf.saveAs(group, "filename.pdf");
              });
            }
        });
    </script>

    <script>
        // Import DejaVu Sans font for embedding

        // NOTE: Only required if the Kendo UI stylesheets are loaded
        // from a different origin, e.g. cdn.kendostatic.com
        kendo.pdf.defineFont({
            "DejaVu Sans"             : "http://cdn.kendostatic.com/{{ site.cdnVersion }}/styles/fonts/DejaVu/DejaVuSans.ttf",
            "DejaVu Sans|Bold"        : "http://cdn.kendostatic.com/{{ site.cdnVersion }}/styles/fonts/DejaVu/DejaVuSans-Bold.ttf",
            "DejaVu Sans|Bold|Italic" : "http://cdn.kendostatic.com/{{ site.cdnVersion }}/styles/fonts/DejaVu/DejaVuSans-Oblique.ttf",
            "DejaVu Sans|Italic"      : "http://cdn.kendostatic.com/{{ site.cdnVersion }}/styles/fonts/DejaVu/DejaVuSans-Oblique.ttf"
        });
    </script>
```

### Scaling

By using the `scale` option you can obtain a drawing that is bigger or smaller than the original elements. This is useful when you are generating a multi-page PDF output using the automatic page breaking feature. In most cases, the original dimensions look too big in PDF, so you can specify, for example, a scale factor of 0.8 to get a more suitable output for print.

###### Example

    drawing.drawDOM("#content", {
      paperSize: "A4",
      margin: "2cm",
      scale: 0.8
    }).then(function(group){
      drawing.pdf.saveAs(group, "filename.pdf");
    });

Note that `scale` affects only the content, so in the case above the output paper size is still A4 and has a 2cm margin. However, you need to take scaling into account when you position headers and footers while using a page template.

If you need different horizontal or vertical scale factors, pass either an array&mdash;`[ xScale, yScale ]`&mdash;or an object&mdash;`{ x: xScale, y: yScale }`.

### Split Page Content

To prevent elements from being split across pages, use the `keepTogether` option. It should be a CSS selector, passable to jQuery.  

###### Example

    drawing.drawDOM("#content", {
      paperSize: "A4",
      margin: "2cm",
      keepTogether: ".prevent-split"
    }).then(function(group){
      drawing.pdf.saveAs(group, "filename.pdf");
    });

Now all elements having the CSS class `"prevent-split"` are kept within the boundaries of pages and their content is not split. If they fall on a margin, they are altogether moved to the next page instead.

### Recurrent Table Headers

If you want the `<thead>` elements, or the headers of Kendo UI Grid widgets, to be repeated on each page, pass the `repeatHeaders: true` option.

## Customize Appearance

If you want to change the appearance of the PDF output as it appears in the browser, you have several options to write CSS rules that apply only to the PDF output.

### The `.k-pdf-export` Class

This CSS class is applied to a DOM element just before the drawing starts, and is removed shortly afterwards.

The example below demonstrates how to define a style that places a border around all paragraphs in the PDF output.

###### Example

    <style>
      .k-pdf-export p {
        border: 2px solid black;
      }
    </style>

Since drawing is essentially synchronous and there is no timeout between the moment the class is added and the moment when it is removed, there will be no flash in the browser when the generation happens.

One drawback of this approach is that you cannot add background images. The code in the example below is likely to fail.

###### Example

    <style>
      .k-pdf-export p {
        background: url("image.jpg");
      }
    </style>

The reason is that images are cached upfront, and this one will miss. If you want to add any background images, use the next option.

### The `<kendo-pdf-document>` Element

The `<kendo-pdf-document>` approach only works when multi-page documents are requested, that is, only when either of `forcePageBreak` or `paperSize` is given. To make it work in the cases when you need only a single page, pass some dummy value to the `forcePageBreak` such as `forcePageBreak: "-"`.

In this case, the DOM renderer will create a clone of the element so that it is able to do the page-breaking without destroying the original content, and it will place it inside a custom `<kendo-pdf-document>` element, which is hidden from the view. Therefore, you can apply custom styles under `kendo-pdf-document` by restricting the rules to elements.

###### Example

    <style>
      kendo-pdf-document p {
        border: 2px solid black;
        background: url("image.jpg");
      }
    </style>

Images are safe to add here.

## Dimensions and CSS Units

If you target PDF output, the only unit which is safe to use in CSS is `px`. Using `cm`, `in`, `mm`, `pt`, or any other than `px` will have unpredictable results. This section explains this counter-intuitive fact.

To draw the DOM, you inspect the computed styles of the elements and at that stage all dimensions are converted to pixels. For example, look at a `<div style='width: 1cm'>`. Assuming a correct display of the dots-per-inch (DPI) setting, this element should be rendered by the browser on screen as being `1cm` wide. When you query the width in its computed style, however, you get back `37.78125px`. Note that this may vary depending on the display.

For simplicity, and since the computed style yields back pixels, the PDF generator keeps a 1:1 mapping between the screen pixels and the default PDF unit, which is the [typographic point](http://en.wikipedia.org/wiki/Point_%28typography%29) (`pt`). This means that the same element will be rendered to PDF with a length of `37.78125pt`. Here are the conversion rules for these units:

- `1 pt = 1/72 in` (points to inches)
- `1 in = 2.54 cm` (inches to centimeters)

If you put them together, you get:

```
37.78125 pt = 37.78125/72 in
            = 2.54 * 37.78125/72 cm
            = 1.33 cm
```

So you specified you want 1cm but the actual size on PDF is 1.33cm, which is quite a difference.

In conclusion, to get a predictable layout in PDF, apply pixels to set all your dimensions. Use the following rules to calculate the values:

- `N cm = N * 72/2.54 px`
- `N in = N * 72 px`

An exception to this are the `paperSize` and `margin` options that you pass to `drawDOM`. It is safe to use any units there since they have nothing to do with CSS or the display resolution.

## Supported Browsers

The HTML renderer has been tested in recent versions of Chrome, Firefox, Safari, Blink-based Opera, Internet Explorer 9 or later.

> **Important**
>
> Mobile browsers and Internet Explorer 8 or older are not supported.

## Known Limitations

- Right-to-left text is not supported.
- Images hosted on different domains might not be rendered, unless permissive [Cross-Origin HTTP headers](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image) are provided by the server. Similarly, fonts might not be possible to load cross-domain. Even with the proper CORS headers, Internet Explorer 9 will not be able to load images or fonts from another domain, and could raise an uncatchable security exception. If you need to support Internet Explorer 9, make sure to host images and fonts on the same domain as the application.
- Images will not be exported in IE if their source is an SVG document. These are considered to be tainted.
- Exporting might not work when loading the page from a local file (`file://` protocol) due to CORS restrictions.
- The content of the `<iframe>` and `<svg>` elements is not rendered.
- A `<canvas>` will be rendered as an image, but only if it is non-tainted, meaning if it does not display images from another domain.
- CSS box-shadow, text-shadow, and radial gradients are omitted. Linear gradients are supported.
- Using browser zoom other than 100% is not supported.
- Only border-style `solid` is rendered.
- The `border-collapse:collapse` style of tables is not supported. Avoid using adjacent borders for separate table cells to prevent double borders in the PDF output.
- Maximum document size is limited to 5080x5080mm (200x200 inches) by the PDF 1.5 specification. Larger files might not open in some viewers.
- Shadow DOM is not rendered.
- SVG referenced with the `<img>` tag will not render in Internet Explorer, because [IE taints the canvas](http://stackoverflow.com/questions/31484379/ie-canvas-datauri-security-error).
- Rendering of the `<select>` elements is imperfect. Some minor issues can be noticed, like wrong padding or missing the drop down arrow. It is recommended to use a Kendo UI DropDown or ListView widget instead of a plain `<select>`.
- When the generated document is opened with Acrobat Reader and you try to use the `Save As` option from the file menu, the following error is thrown: `The document could not be saved. There was a problem reading(23)`. The solution is to open the Acrobat Reader options (**Edit** > **Preferences**) and to uncheck `Save As optimizes for Fast Web View` in the **Documents** section, which is enabled by default. After this, **Save As** works without errors.

## See Also

Other articles on Kendo UI Drawing API:

* [Overview of the Drawing API]({% slug overview_kendoui_drawingapi %})
* [Drawing of Basic Shapes]({% slug basicshapes_drawingapi %})
* [Export a Drawing in PDF]({% slug pdfderawingexport_drawingapi %})
* [Supported Browsers for Kendo UI Drawing API]({% slug drawingofhtmlelements_drawingapi %})
