---
title: Bind to Data Source
page_title: Bind to Data Source | Kendo UI Spreadsheet
description: "Learn how to bind a sheet in the Kendo UI Spreadsheet widget to a Data Source."
slug: bind_todata_source_spreadsheet_widget
position: 3
---

# Bind to Data Source

The Spreadsheet widget supports binding individual sheets to a [Data Source](/framework/datasource/overview) instance. This allows you to quickly bring data from external data sources into the Spreadsheet and, optionally, edit it.

Data Source binding switches the sheet to a special data-bound mode. It differs from the standard behavior in a number of important ways:

* Column headers are inferred from the data item fields. Configure the column headers and ordering by using the [sheet `setDataSource` method](/api/javascript/spreadsheet/sheet#methods-setDataSource).
* Cell styles, formulas, and formats are not persisted in the data source.
* Row height and column width are not persisted in the data source.
* Sorting and filtering are applied locally.

CRUD operations are also handled in a specific way:

* Inserted rows are always appended at the end, regardless of the actual row index.
* Updating cell content translates into update operations.
* Deleting rows translates into destroy operations.
* Inserting and removing columns is not supported.

For a functional example, see the [Spreadsheet/DataSource Binding](http://demos.telerik.com/kendo-ui/spreadsheet/datasource) demo.

## Known Issues

The following issues are not addressed in the Beta release:

* Records cannot be edited after sorting the sheet.

## See Also

Other articles on Kendo UI Spreadsheet:

* [API Reference](/api/javascript/ui/spreadsheet)
* [Load and Save Data as JSON]({% slug loadand_saveas_json_spreadsheet_widget %})
* [Export to Excel]({% slug export_toexcel_spreadsheet_widget %})
* [Server-Side Processing]({% slug serverside_processing_spreadsheet_widget %})
* [Custom Functions]({% slug custom_functions_spreadsheet_widget %})
* [Cell Formatting]({% slug cell_formatting_spreadsheet_widget %})
