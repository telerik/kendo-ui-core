---
title: Overview
page_title: PDF Output Overview | Kendo UI Drawing Library
description: "Learn how to export a drawing in a PDF file when using the Kendo UI Drawing API."
previous_url: /framework/drawing/pdf-output
slug: pdfderawingexport_drawingapi
position: 1
---

# PDF Output Overview

The Drawing library provides configuration options for handling and exporting content in PDF.

> * To export content in PDF, you can use the built-in PDFExport of the widgets that offer it or the capabilities of the Drawing library
> * While the Drawing library provides a [`low-level API`](/api/javascript/drawing) that is flexible, it is also harder to use as compared to the simple configuration options of Kendo UI PDF Export which is built-in the majority of the Kendo UI widgets.

## Employing Functions

Since PDF files cannot be displayed by a browser inside an HTML element, you cannot create a `Surface` object for this kind of output. To generate the binary data, use the specific functions that are exported to `kendo.drawing.pdf` instead.

In the following example, the `proxyUrl` and `callback` arguments are optional. The `proxyUrl` is necessary for the download to work with Internet Explorer 9 and Safari and will not be used for other browsers. The `callback` will be invoked when the file is successfully generated (generation may be asynchronous). For more information on the `proxyURL`, refer to [`kendo.saveAs`](/api/javascript/kendo/methods/saveas).

```dojo
    <script>
        var drawing = kendo.drawing;
        var geo = kendo.geometry;
        var proxyUrl = "/someUrl";
        var callBack = function(){
          kendo.alert("PDF successfully created!");
        }

        // This will contain all our drawing.
        var group = new drawing.Group();

        // Draw a circle.
        var circleGeometry = new geo.Circle([ 100, 100 ], 50);
        var circle = new drawing.Circle(circleGeometry).stroke("red", 1);

        // And add it to the group.
        group.append(circle);

        // Add some text.
        var text = new drawing.Text("Hello World", new geo.Point(100, 200));
        group.append(text);

        // (Optional) set PDF arguments, see the "PDF options" section below.
        group.options.set("pdf", {
            paperSize: "A4",
            margin: {
                left   : "20mm",
                top    : "40mm",
                right  : "20mm",
                bottom : "40mm"
            }
        });

        // You can offer the file for download now.
        drawing.pdf.saveAs(group, "filename.pdf", proxyUrl, callBack);
    </script>
```

## Using the Blob Object

The following example demonstrates how to get the PDF as a `Blob` object in browsers that support it, such as all but Internet Explorer 9 or earlier.

    drawing.pdf.toBlob(group, function(blob){
        // You can now upload it to a server.
        // This form simulates an <input type="file" name="pdfFile" />.
        var form = new FormData();
        form.append("pdfFile", blob);

        var xhr = new XMLHttpRequest();
        xhr.open("POST", "/posturl", true);
        xhr.send(form);
    });

    // Alternatively, you can get it as a data URL.
    drawing.pdf.toDataURL(group, function(dataURL){ ... });

## Compression

The PDF generator supports compression through the JavaScript [Pako library](https://github.com/nodeca/pako). To automatically enable the compressions, load Pako with a `<script>` tag (`window.pako` is available). Compression can make a big difference in the output file size when you are using custom TTF fonts or images with alpha channel, such as PNGs with transparency.

> Besides drastically reducing the output size, Pako enables the browser to use less memory while rendering the PDF. Chrome is known to crash on generating very large PDF files and simply including this library will mitigate the problem. It is bundled with Kendo UI as `pako_deflate.min.js`.

## Supported Browsers

For more information on the provided [browser support]({% slug wbe_browserand_operating_system_support %}), refer to the section on [PDF export]({% slug wbe_browserand_operating_system_support %}#pdf-export). For more information on the Drawing API specific limitations, check the [Limitations and Browser Support for Kendo UI Drawing API]({% slug supportedbrowsers_drawingapi %})

## See Also

* [Overview of the Drawing Library]({% slug overview_kendoui_drawingapi %})
* [Drawing Basic Shapes]({% slug basicshapes_drawingapi %})
* [Drawing DOM Elements]({% slug drawingofhtmlelements_drawingapi %})
* [Exporting Drawings to PDF]({% slug pdfderawingexport_drawingapi %})
* [Exporting Drawings to Images]({% slug exportpng_kendoui_drawingapi %})
* [Exporting Drawings to SVG]({% slug exportpng_kendoui_drawingapi %})
* [Limitations and Browser Support for Kendo UI Drawing API]({% slug supportedbrowsers_drawingapi %})
