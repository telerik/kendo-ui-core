---
title: Export to Excel
page_title: Export to Excel | Kendo UI Spreadsheet
description: "Learn how to export the Kendo UI Spreadsheet widget to an Excel file in the browser."
slug: export_toexcel_spreadsheet_widget
position: 2
---

# Export to Excel

The Spreadsheet utilizes the [Excel export module](/framework/excel/introduction) framework to produce Excel files directly in the browser.

The output files are in the OOXML Spreadsheet format with an `.xlsx` extension. The legacy `.xls` binary format is not supported.

## User Interface

The default toolbar configuration includes an **Excel Export** button. Clicking on it opens a dialog box for entering the file name.

**Figure 1: Exporting to Excel**

![Export to Excel](export-to-excel.png)

## API Export Reference

The Spreadsheet client-side API includes the [`saveAsExcel`](/api/javascript/ui/spreadsheet#methods-saveAsExcel) method for initiating the export via JavaScript. This method does not ask you to specify a file name. Instead, it sets the value in [`excel.fileName`](/api/javascript/ui/spreadsheet.html#configuration-excel.fileName).

## Known Issues

Currently, the export module does not handle sorting and filtering. This limitation will be addressed before the widget goes out of its Beta version.

## See Also

* [Spreadsheet API Reference](/api/javascript/ui/spreadsheet)
* [Load and Save Data as JSON]({% slug loadand_saveas_json_spreadsheet_widget %})
* [Data Source Binding]({% slug bind_todata_source_spreadsheet_widget %})
* [Server-Side Processing]({% slug serverside_processing_spreadsheet_widget %})
* [Custom Functions]({% slug custom_functions_spreadsheet_widget %})
* [Cell Formatting]({% slug cell_formatting_spreadsheet_widget %})
