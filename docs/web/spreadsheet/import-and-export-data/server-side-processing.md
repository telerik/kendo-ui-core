---
title: Server-side Processing
page_title: Server-side processing of Kendo UI Spreadsheet data | Kendo UI Documentation
description: How to process Kendo UI Spreadsheet data using the Telerik Document Processing library
---

# Server-side processing using the Telerik Document Processing Library

The native data format for the Spreadsheet widget is [JSON](json).
There's also built-in support for [exporting to Excel](/web/spreadsheet/import-and-export-data/export-to-excel) that runs in the browser.

For anything beyond that, we ship a .NET based server-side module based on [Telerik RadSpredProcessing](http://docs.telerik.com/devtools/wpf/controls/radspreadprocessing/overview), part of the Document Processing Library.

It allows importing, exporting and processing data from various formats:
* Excel Microsoft Office Open XML Spreadsheet (.xlsx)
* Comma separated values (.csv)
* Tab separated values (.txt)
* Portable document format (.pdf) (export only)

# Overview

The implementation is contained in the Telerik.Web.Spreadsheet assembly.
It's distributed as part of the UI for ASP.NET MVC bundle (/spreadsheet).

The main entry point is the Telerik.Web.Spreadsheet.Workbook class.
This is a POCO object that mirrors the object structure of the JSON and provides format conversion methods.

Under the hood it uses the Telerik DPL to perform the actual conversion.

# Supported Scenarios

TODO

# Document Processing Library documentation

The full documentation of the [RadSpreadProcessing module](http://docs.telerik.com/devtools/wpf/controls/radspreadprocessing/overview) is available as part of the [UI for WPF](http://docs.telerik.com/devtools/wpf/introduction).

# Licensing

The DPL module is available with the Kendo UI Enterprise and DevCraft bundles.
