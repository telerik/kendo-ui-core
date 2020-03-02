---
title: Export Support
page_title: Export Support
description: "Get started with Telerik UI for ASP.NET MVC and learn about the versions of the Pako and JSZip libraries supported by the library and used for PDF and Excel export."
slug: exportsupport_aspnetmvc
position: 4
permalink: /getting-started/prerequisites/export-support
---

# Export Support

Telerik UI for ASP.NET MVC integrates the Pako and JSZip libraries to support the content export of its components to PDF and Excel.

## Pako Library

The [Pako Deflate library](https://nodeca.github.io/pako/#Deflate) enables the compression of the files that will be exported to PDF. To enable the PDF export, you need to load Pako in the specified page.

    <!-- Load Pako Deflate library to enable PDF compression -->
    <script src="https://kendo.cdn.telerik.com/{{ site.mvcCoreVersion }}/js/pako_deflate.min.js"></script>

For more information on the available PDF export options by Kendo UI, refer to the articles on [PDF Export](https://docs.telerik.com/kendo-ui/framework/pdf/overview) and [PDF output by the Drawing library](https://docs.telerik.com/kendo-ui/framework/drawing/pdf-output/overview).

## JSZip Library

Since Excel files are a zipped collection of XML files, the [JSZip library](https://stuk.github.io/jszip/) is necessary to process the generated workbook to an `.xslx` file.

Include the JSZip library:

* To support client-side Excel export (all components)
* To support Excel imports with the [`fromFile()`](https://docs.telerik.com/kendo-ui/api/javascript/ui/spreadsheet/methods/fromfile) method (Spreadsheet component)

To take full advantage of the Excel export feature, download the [JSZip](http://stuk.github.io/jszip/) library and include the file before the Kendo UI JavaScript files.

    <script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
    <script src="http://cdnjs.cloudflare.com/ajax/libs/jszip/2.4.0/jszip.js"></script>
    <script src="https://kendo.cdn.telerik.com/{{ site.mvcCoreVersion }}/js/kendo.all.min.js"></script>

JSZip is part of the Kendo UI distribution and is also available through the Kendo UI CDN.

    <script src="https://kendo.cdn.telerik.com/{{ site.mvcCoreVersion }}/js/jszip.min.js"></script>

> * If you do not include JSZip in the page, Kendo UI will raise a runtime exception.
> * As of the Kendo UI R3 2017 release, the Excel Export feature supports JSZip 2.x and 3.x versions. Kendo UI releases prior to R2 2017 SP1 provided Excel export of JSZip 2.x versions only.

When you use JSZip in scenarios where the packages are loaded from NPM, explicitly assign the JSZip object to a field in the `window` object. To properly load JSZip in the application:

1. Install the library and save it to the `package.json` file by running `npm install jszip --save`.
1. Import the library in the module where it will be used through `import JSZip from 'jszip'`.
1. Assign the library object to a field of the `window` by setting `window.JSZip = JSZip`.

## Globalizejs Library

To use [Globalizejs](https://github.com/globalizejs/globalize) in your project, include it after the Kendo UI scripts.

## Browser Support

Excel generation is available for all [supported browsers]({% slug webbrowsersupport_aspnetmvc %}). Saving a file needs a server-side proxy for older browser versions. For more information, refer to the [article on saving files with Kendo UI for jQuery](https://docs.telerik.com/kendo-ui/framework/saving-files).

> Some mobile browsers do not support the saving of files.

## See Also

* [PDF Export by Kendo UI for jQuery](https://docs.telerik.com/kendo-ui/framework/pdf/overview)
* [PDF Output by the Kendo UI for jQuery Drawing Library](https://docs.telerik.com/kendo-ui/framework/drawing/pdf-output/overview)
* [Excel Export by Kendo UI for jQuery](https://docs.telerik.com/kendo-ui/framework/excel/introduction)
