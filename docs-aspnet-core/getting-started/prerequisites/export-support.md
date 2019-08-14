---
title: Export Support
page_title: Export Support | Prerequisites | Telerik UI for ASP.NET Core
description: "Get started with Telerik UI for ASP.NET Core and learn about the versions of the Pako and JSZip libraries supported by the library and used for PDF and Excel export."
slug: exportsupport_core
position: 5
---

# Export Support

Telerik UI for ASP.NET Core integrates the Pako and JSZip libraries to support the content export of its components to PDF and Excel.

## Pako Library

The [Pako Deflate library](https://nodeca.github.io/pako/#Deflate) enables the compression of the files that will be exported to PDF. To enable the PDF export, you need to load Pako in the specified page.

    <!-- Load Pako Deflate library to enable PDF compression -->
    <script src="http://kendo.cdn.telerik.com/{{ site.cdnVersion }}/js/pako_deflate.min.js"></script>

For more information on the available PDF export options by Kendo UI, refer to the articles on [PDF Export](https://docs.telerik.com/kendo-ui/framework/pdf/overview) and [PDF output by the Drawing library](https://docs.telerik.com/kendo-ui/framework/drawing/pdf-output/overview).

## JSZip Library

The [JSZip library](https://stuk.github.io/jszip/) is necessary for the components to support Excel export and for the Spreadsheet to support the import of Excel files. You need to include the JSZip library only if you have to provide support for export to or import from ([`fromFile()`](https://docs.telerik.com/kendo-ui/api/javascript/ui/spreadsheet/methods/fromfile)) Excel files.

For more information on the available Excel export options by Kendo UI, refer to the section on [Excel export](https://docs.telerik.com/kendo-ui/framework/excel/introduction).

## See Also

* [PDF Export by Kendo UI for jQuery](https://docs.telerik.com/kendo-ui/framework/pdf/overview)
* [PDF Output by the Kendo UI for jQuery Drawing Library](https://docs.telerik.com/kendo-ui/framework/drawing/pdf-output/overview)
* [Excel Export by Kendo UI for jQuery](https://docs.telerik.com/kendo-ui/framework/excel/introduction)
