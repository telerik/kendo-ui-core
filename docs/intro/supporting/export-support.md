---
title: Export Support
page_title: Export Support | Support and Distribution | Kendo UI for jQuery
description: "Get started with Kendo UI for jQuery and learn about the versions of the Pako and JSZip libraries supported by the Kendo UI for jQuery and used for PDF and Excel export."
slug: export_support_kendoui
position: 4
---

# Export Support

Kendo UI for jQuery integrates the Pako and JSZip libraries to support the content export of its controls to PDF and Excel.

## Pako Library

The [Pako Deflate library](https://nodeca.github.io/pako/#Deflate) enables the compression of the files that will be exported to PDF. To enable the PDF export, you need to load Pako in the specified page.

    <!-- Load Pako Deflate library to enable PDF compression -->
    <script src="https://kendo.cdn.telerik.com/{{ site.cdnVersion }}/js/pako_deflate.min.js"></script>

For more information on the available PDF export options by Kendo UI, refer to the articles on [PDF Export]({% slug introduction_pdfexport_kendoui %}) and [PDF output by the Drawing library]({% slug pdfderawingexport_drawingapi %}).

## JSZip Library

The [JSZip library](https://stuk.github.io/jszip/) is necessary for the widgets to support Excel export and for the Spreadsheet to support the import of Excel files. The Excel export feature is available as of the [Kendo UI 2014.3.1119 (Q3 2014) release]({% slug breakingchanges2014_kendoui%}) and you need to include the JSZip library only if you have to provide export to Excel or to import the [`fromFile()`](/api/javascript/ui/spreadsheet/methods/fromfile) functionalities.

For more information on the available Excel export options by Kendo UI, refer to the section on [Excel export]({% slug introduction_excelexport_kendoui %}).

## See Also

* [PDF Export]({% slug introduction_pdfexport_kendoui %})
* [PDF Output by the Drawing Library]({% slug pdfderawingexport_drawingapi %})
* [PDF Output Known Limitations]({% slug supportedbrowsers_drawingapi %})
* [Excel Export]({% slug introduction_excelexport_kendoui %})
