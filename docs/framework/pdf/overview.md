---
title: Overview
page_title: PDF Export Overview - Kendo UI PDF Export
description: "Learn about the Kendo UI PDF Export."
slug: pdfderawingexport_drawingapi
position: 0
---

# PDF Export Overview

Out of the box, the Kendo UI suite provides built-in PDF export and configuration options.

Under the hood, most of the PDF export options use the [Drawing library]({% slug overview_kendoui_drawingapi %}).

## Component PDF Export Support

The following Kendo UI widgets support PDF export implementations:
* [Grid (demo)](https://demos.telerik.com/kendo-ui/grid/pdf-export)
* [TreeList (demo)](https://demos.telerik.com/kendo-ui/treelist/pdf-export)
* [PivotGrid (demo)](https://demos.telerik.com/kendo-ui/pivotgrid/pdf-export)
* [Scheduler (demo)](https://demos.telerik.com/kendo-ui/scheduler/pdf-export)
* [Gantt (demo)](https://demos.telerik.com/kendo-ui/gantt/pdf-export)
* [Spreadsheet (demo)](https://demos.telerik.com/kendo-ui/spreadsheet/index)
* [Editor (demo)](https://demos.telerik.com/kendo-ui/editor/pdf-export)

The Charts and Diagram provide PDF export by using their implementation of the `saveAsPDF()` method.
* [Diagram (demo)](https://demos.telerik.com/kendo-ui/diagram/pdf-export)
* [Chart (demo)](https://demos.telerik.com/kendo-ui/chart-api/pdf-export)

The Gauges and Barcodes can be exported to PDF by using the `exportPDF()` method together with the `kendo.saveAs()` method to save the file.
* [ArcGauge (demo)](https://demos.telerik.com/kendo-ui/arc-gauge/export)
* [CircularGauge (demo)](https://demos.telerik.com/kendo-ui/circular-gauge/export)
* [LinearGauge (demo)](https://demos.telerik.com/kendo-ui/linear-gauge/export)
* [RadialGauge (demo)](https://demos.telerik.com/kendo-ui/radial-gauge/export)
* [BarCode (demo)](/api/javascript/dataviz/ui/barcode/methods/exportpdf)
* [QRCode (demo)](/api/javascript/dataviz/ui/qrcode/methods/exportpdf)

## Functionality and Features

* [Page Templates]({% slug templates_drawing %})&mdash;When you request multi-page output, you can additionally specify a page template.
* [PDF Options]({% slug configuration_drawing %})&mdash;The PDF Export provides options for specifying the basic parameters of the generated PDF file.
* [Scaling]({% slug scalingofcontent_drawing %})&mdash;The PDF Export enables you to export a PDF document that is bigger or smaller than its original elements.
* [Customizing the Appearance]({% slug customizingappearance_drawing %})&mdash;You can change the appearance of the PDF by using CSS rules that apply only to the PDF output.
* [Exporting Tabular Data]({% slug tabulardata_drawingapi %})&mdash;The PDF Export enables you to export a table with a large number of columns.
* [Repeat Headers]({% slug recurrenttableheaders_drawing %})&mdash;You can repeat the headers of components such as the Grid on every page that is exported.
* [Multi-Page Content]({% slug multipagecontent_drawing %})&mdash;You can export content to multiple pages.
* [Hyperlinks]({% slug hyperlinks_drawing %})&mdash;The PDF Export enables you to configure the behavior of the hyperlinks.
* [Embedded Fonts]({% slug embeddedfonts_drawing %})&mdash;You can embed fonts to export non-standard ASCII characters.
* [Dimensions]({% slug dimensionscssunits_drawing %})&mdash;You can configure the dimensions of the PDF file.

## Compression

The PDF generator supports compression through the JavaScript [Pako library](https://github.com/nodeca/pako). To automatically enable the compression, load Pako with a `<script>` tag (`window.pako` is available). Compression can make a big difference in the output file size when you are using custom TTF fonts or images with alpha channel, such as PNGs with transparency.

> Besides drastically reducing the output size, Pako enables the browser to use less memory while rendering the PDF. Chrome often crashes on generating very large PDF files and including this library will mitigate the problem. The Pako library is bundled with Kendo UI as `pako_deflate.min.js`.

## Supported Browsers

For more information on the provided browser support, see the [Web Browser Support](({% slug wbe_browserand_operating_system_support %}#support-for-pdf-export)) article. For more information on the Drawing library's API-specific limitations, check the [Limitations and Browser Support for Kendo UI Drawing API]({% slug supportedbrowsers_drawingapi %})

## Next Steps 

* [Getting Started with the PDF Export]({% slug getting_started_kendoui_pdf_export %})
* [PDF Options JavaScript API Reference](/api/javascript/drawing/pdfoptions)
* [Knowledge Base](https://docs.telerik.com/kendo-ui/knowledge-base)

## See Also

* [jQuery Forums](https://www.telerik.com/forums/kendo-ui)
* [jQuery Blog](https://www.telerik.com/blogs/tag/jquery)
* [jQuery Videos](https://www.telerik.com/videos/kendo-jquery-ui)
* [jQuery Roadmap](https://www.telerik.com/support/whats-new/kendo-ui/roadmap)
* [jQuery Pricing](https://www.telerik.com/purchase/kendo-ui)
* [jQuery Training](https://learn.telerik.com/learn/course/external/view/elearning/30/kendo-ui-for-jquery-with-javascript)