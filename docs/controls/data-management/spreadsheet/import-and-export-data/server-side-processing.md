---
title: Server-Side Processing
page_title: Server-Side Processing | Kendo UI Spreadsheet
description: "Learn how to process Kendo UI Spreadsheet data using the Telerik Document Processing library."
slug: serverside_processing_spreadsheet_widget
position: 4
---

# Server-Side Processing

The native data format for the Spreadsheet widget is [JSON]({% slug loadand_saveas_json_spreadsheet_widget %}). There is also the built-in support for [exporting to Excel]({% slug export_toexcel_spreadsheet_widget %}) that runs in the browser.

For anything beyond that, Kendo UI ships a .NET based server-side module established on [Telerik RadSpreadProcessing](http://docs.telerik.com/devtools/wpf/controls/radspreadprocessing/overview), part of the Document Processing Library.

It allows importing, exporting, and processing data from various formats:

* Excel Microsoft Office Open XML Spreadsheet (.xlsx)
* Comma separated values (.csv)
* Tab separated values (.txt)
* Portable document format (.pdf) (export only)

The .NET server-side module is distributed as a part of the [UI for ASP.NET MVC bundle](/aspnet-mvc/introduction).

Continue to the [Spreadsheet Processing]({% slug spreadsheet_processing_spreadsheet_mvc %}) help topic for more information.

## Licensing

The DPL module is available with the Kendo UI Enterprise and DevCraft bundles.

## See Also

Other articles on Kendo UI Spreadsheet:

* [API Reference](/api/javascript/ui/spreadsheet)
* [Load and Save Data as JSON]({% slug loadand_saveas_json_spreadsheet_widget %})
* [Data Source Binding]({% slug bind_todata_source_spreadsheet_widget %})
* [Export to Excel]({% slug export_toexcel_spreadsheet_widget %})
* [Custom Functions]({% slug custom_functions_spreadsheet_widget %})
* [Cell Formatting]({% slug cell_formatting_spreadsheet_widget %})
