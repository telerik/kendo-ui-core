---
title: Overview
page_title: PDF Export Overview | Kendo UI PDF Export
description: "Learn about the Kendo UI PDF Export."
slug: introduction_pdfexport_kendoui
position: 1
---

# PDF Export Overview

Out of the box, the Kendo UI suite provides built-in PDF export and configuration options.

Under the hood, most of the PDF export options use the [Drawing library]({% slug overview_kendoui_drawingapi %}).

## Widget PDF Export Support

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
* [LinearGauge (demo)](https://demos.telerik.com/kendo-ui/linear-gauge/export)
* [RadialGauge (demo)](https://demos.telerik.com/kendo-ui/radial-gauge/export)
* [BarCode (demo)](/api/javascript/dataviz/ui/barcode/methods/exportpdf)
* [QRCode (demo)](/api/javascript/dataviz/ui/qrcode/methods/exportpdf)

## Drawing Library

The Kendo UI Drawing library supports the conversion of an existing page or part of it to drawing primitives. This approach allows you to further process the content and export it to Portable Document Format (PDF) if you wish to export your own custom page or scene. For more information, refer to the [Drawing API PDF Output section]({% slug pdfderawingexport_drawingapi %})

## Embedding of Fonts

The Kendo UI distribution includes a `/fonts/` folder where the `KendoUIGlyphs` and `DejaVu` font files reside. The `KendoUIGlyphs` font describes the Kendo UI font icons that are used by the web widgets. The `DejaVu` font is used by default during PDF export. To use a different font for the exported document, check the [article on embedding fonts]({% slug embeddedfonts_drawing %})

## See Also

* [Page Templates]({% slug templates_drawing %})
* [PDF Options]({% slug configuration_drawing %})
* [Scaling]({% slug scalingofcontent_drawing %})
* [Customizing the Appearance]({% slug customizingappearance_drawing %})
* [Drawing Basic Shapes]({% slug basicshapes_drawingapi %})
* [Drawing DOM Elements]({% slug drawingofhtmlelements_drawingapi %})
* [Exporting Drawings to PDF]({% slug pdfderawingexport_drawingapi %})
* [Exporting Drawings to Images]({% slug exportpng_kendoui_drawingapi %})
* [Exporting Drawings to SVG]({% slug exportingtosvg_drawing %})
* [PDF Output]({% slug pdfderawingexport_drawingapi %})
* [Limitations and Browser Support for Kendo UI Drawing API]({% slug supportedbrowsers_drawingapi %})
