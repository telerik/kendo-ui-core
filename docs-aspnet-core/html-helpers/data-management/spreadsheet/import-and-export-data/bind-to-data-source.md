---
title: Bind to Data Source
page_title: Spreadsheet | Telerik UI for ASP.NET Core HtmlHelpers
description: "Learn how to bind a sheet to a Data Source in the Kendo UI Spreadsheet HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: htmlhelpers_spreadsheet_bind_to_datasource_aspnetcore
position: 1
---

# Bind to Data Source

The Spreadsheet widget supports binding individual sheets to a [Data Source](https://docs.telerik.com/kendo-ui/framework/datasource/overview) instance. This allows you to quickly bring data from external data sources into the Spreadsheet and, optionally, edit it. 

For a functional example, refer to the Spreadsheet [DataSource binding demo](https://demos.telerik.com/aspnet-core/spreadsheet/datasource).

Note that the Spreadsheet DataSource in the above example uses [`read`](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource/configuration/transport.read) and [`submit`](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource/configuration/transport.submit) transport options. The `submit` option is required to properly handle a scenario in which the user creates, updates and deletes items simultaneously. When using separate [`create`](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource/configuration/transport.create), [`update`](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource/configuration/transport.update) and [`destroy`](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource/configuration/transport.destroy) handlers, it is possible that one of them fails, while the others do not. That will result in a mismatch of the data state between the client (the Spreadsheet) and the remote source. The `submit` option handles all operations within a single request. It will not save any changes if any of the items is invalid.

## Specific Behavior

Data Source binding switches the sheet to a special data-bound mode. It differs from the standard behavior in the following ways:

* Column headers are inferred from the data item fields. Configure the column headers and ordering by using the [sheet `setDataSource` method](https://docs.telerik.com/kendo-ui/api/javascript/spreadsheet/sheet/methods/setdatasource).
* Cell styles, formulas, and formats are not persisted in the data source.
* Row height and column width are not persisted in the data source.
* Sorting and filtering are applied locally.

CRUD operations are also handled in a specific way:

* Inserted rows are always appended at the end, regardless of the actual row index.
* Updating cell content translates into update operations.
* Deleting rows translates into destroy operations.
* Inserting and removing columns is not supported.

## Currently Not Supported Scenarios

At the moment, Spreadsheet Sheet with DataSource binding does not offer support for the following scenarios:

* The Sheet could not be bound to a source which does not contain any items. That is because the header row in the sheet is generated based on the data items fields.
* Records cannot be edited after sorting the sheet. [Here you will find a feature request item, which suggests such scenario to be covered](https://feedback.telerik.com/kendo-jquery-ui/1402815-allow-sorting-for-spreadsheet-with-datasource).
* Records cannot be edited after filtering the sheet. [Here you will find a feature request item, which suggests such scenario to be covered](https://feedback.telerik.com/kendo-jquery-ui/1402817-allow-filtering-for-spreadsheet-with-datasource).

## See Also

* [Overview of the Spreadsheet HtmlHelper]({% slug htmlhelpers_spreadsheet_aspnetcore %})
* [Spreadsheet API Reference](https://docs.telerik.com/kendo-ui/api/javascript/ui/spreadsheet)
* [Custom Functions]({% slug htmlhelpers_spreadsheet_custom_functions_aspnetcore %})
* [Cell Formatting]({% slug htmlhelpers_spreadsheet_custom_functions_aspnetcore %})
* [Export to Excel]({% slug htmlhelpers_spreadsheet_export_to_excel_aspnetcore %})
