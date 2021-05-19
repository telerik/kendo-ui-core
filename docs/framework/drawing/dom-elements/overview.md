---
title: Overview
page_title: Drawing DOM Elements Overview | Kendo UI Drawing Library
description: "Learn how to draw a piece of HTML that is available in the DOM using the Kendo UI Drawing API."
slug: drawingofhtmlelements_drawingapi
position: 1
---

# Drawing DOM Elements

The [Kendo UI Drawing library](https://demos.telerik.com/kendo-ui/drawing/index) supports the conversion of an existing page, or part of it, to drawing primitives.

This approach allows you to further process the content and export it in various formats such as Portable Document Format (PDF), Scalable Vector Graphics (SVG), and Portable Network Graphics (PNG) ones.

## Getting Started

By using the `drawing.drawDOM` function you can draw a DOM element into a [`drawing.Group`](/api/dataviz/drawing/group) which you are then able to render with one of the supported backends into SVG, PDF, or HTML5 `<canvas>` format.

The DOM element must be appended to the document and fully rendered which means that you cannot draw an element that has the `display: none` or the `visibility: hidden` options.

The following example demonstrates a sample piece of HTML you may have on a page.

    <div id="drawMe" class="...">
      ... more HTML code here...
    </div>

The following example demonstrates how you can draw the HTML from the previous example from JavaScript. The `drawing.drawDOM` method takes a jQuery selector or object, or a plain DOM node, and returns a promise which delivers a `drawing.Group` object.

    drawing.drawDOM("#drawMe").then(function(group){
        // Here group is a drawing.Group object.

        // You can now draw it to SVG, for example.
        var svg = drawing.Surface.create($("#container"), { type: "svg" });
        svg.draw(group);

        // You can also save it as PDF.
        // Optionally:
        group.options.set("pdf", {...pdf options...});
        drawing.pdf.saveAs(group, "filename.pdf", proxyUrl);
    });

## See Also

* [Overview of the Drawing Library]({% slug overview_kendoui_drawingapi %})
* [Drawing Basic Shapes]({% slug basicshapes_drawingapi %})
* [Exporting Drawings to PDF]({% slug pdfderawingexport_drawingapi %})
* [Supported Browsers for Kendo UI Drawing API]({% slug drawingofhtmlelements_drawingapi %})
