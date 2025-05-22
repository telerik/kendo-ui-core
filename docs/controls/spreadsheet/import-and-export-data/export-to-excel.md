---
title: Excel Export
page_title: jQuery Spreadsheet Documentation - Excel Export
description: "Get started with the jQuery Spreadsheet by Kendo UI and learn how to export the content of the component in an Excel file in the browser."
slug: export_toexcel_spreadsheet_widget
position: 2
---

# Excel Export

The Spreadsheet utilizes the [Excel export module](/framework/excel/introduction) framework to produce Excel files directly in the browser.

The output files are in the OOXML Spreadsheet format with an `.xlsx` extension. The legacy `.xls` binary format is not supported.

## User Interface

The default toolbar configuration includes an **Export** button. Clicking it opens a dialog box for entering the file name and selecting the desired output format for the exported document.

![Kendo UI for jQuery Spreadsheet Export to Excel dialog](activate-export.png)

The following image demonstrates the export of the Spreadsheet data to Excel.

![Kendo UI for jQuery Spreadsheet Exporting to Excel](export-to-excel.png)

## API Export Reference

The Spreadsheet client-side API includes the [`saveAsExcel`](/api/javascript/ui/spreadsheet/methods/saveasexcel) method for initiating the export via JavaScript. This method does not ask you to specify a file name. Instead, it sets the value in [`excel.fileName`](/api/javascript/ui/pivotgrid/configuration/excel#excelfilename).

## Outputting the Result

Through its default configuration the Kendo UI for jQuery Spreadsheet exports the current sheet of data with sorting and filtering applied.

## See Also

* [Server-Side Import and Export in the Spreadsheet (Demo)](https://demos.telerik.com/kendo-ui/spreadsheet/server-side-import-export)
* [Spreadsheet JavaScript API Reference](/api/javascript/ui/spreadsheet)
