---
title: Bind to Data Source
page_title: Bind the Kendo UI Spreadsheet to a Data Source | Kendo UI Documentation
description: How to bind a sheet in the Kendo UI Spreadsheet widget to a Data Source
---

# Bind a Sheet to a Data Source

The Spreadsheet widget supports binding individual sheets to a [Data Source](/framework/datasource/overview) instance.
This allows you to quickly bring data from external data sources into the Spreadsheet and, optionally, edit it.

This switches the sheet to a special data-bound mode.
It differs from the standard behavior in a number of important ways:
* Column headers are inferred from the data item fields
* Cell styles, formulas and formats are not persisted in the data source
* Row height and column width is not persisted in the data source
* Sorting and filtering are applied locally

CRUD operations are also handled specially:
* Inserted rows are always appended at the end, regardless of the actual row index
* Updating cell content translates into update operations
* Deleting rows translates into destroy operations
* Inserting and removing columns is not supported

See [Spreadsheet / DataSource binding](http://demos.telerik.com/kendo-ui/spreadsheet/datasource) for a functional example.

# Known Issues

The following issues are not addressed in the Beta release:
* Records cannot be edited after sorting the sheet
