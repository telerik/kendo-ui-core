---
title: Overview
page_title: Overview | Kendo UI Spreadsheet
description: "Learn about how to initialize and configure the Kendo UI Spreadsheet widget."
slug: overview_spreadsheet_widget
position: 1
---

# Spreadsheet Overview

The [Kendo UI Spreadsheet widget](http://demos.telerik.com/kendo-ui/spreadsheet/index) allows editing and visualization of tabular data with a variety of cell formatting options, styles, and themes.

Out of the box, the Spreadsheet supports:

* Selection and activation of cells that are functionally similar to ones in Excel.
* Selection of cell and background colors.
* Validation, insertion, deletion, editing, and merging of cells.
* Vertical and horizontal alignment of cells.
* Formatting of cells, including the provision of fonts and font sizes, application of borders, rendering of content in bold, italics and underline styles.
* Formatting of data, including the provision of the number, currency, accounting, date, time, percentage, fraction, scientific, text, special, and custom options.
* Applying formulas in categories such as logical, text, date, and time.
* Resizing, insertion, and deletion of rows and columns.
* Multiple sheets.
* Frozen panes.
* Text wrapping.

Each of these features is exposed as a user interface (UI) to the end user and as API calls for further UI customization to the developer.

> **Important**  
>
> The Spreadsheet widget supports Internet Explorer 9 or later versions.

## Getting Started

### Initializing the Spreadsheet

To instantiate the Spreadsheet, use an empty `<div>` element, as demonstrated in the following example.

###### Example

```html

    <div id="spreadsheet">
    </div>

    <script>
        $("#spreadsheet").kendoSpreadsheet();
    </script>
```

For more details on the instantiation mechanism of Kendo UI widgets, refer to the article on [widget initialization]({% slug initialize_widgets_using_jquery_plugins_installation %}).

To find the detailed list of configuration options supported by the Spreadsheet, including sheet and data configuration, refer to the [API reference of the Spreadsheet](/api/javascript/ui/spreadsheet).

### Using the Spreadsheet API

The Spreadsheet instance exposes [methods](/api/javascript/ui/spreadsheet#methods) for sheet instance retrieval, insertion, and deletion. The most commonly used one is the [`activeSheet`](/api/javascript/ui/spreadsheet#methods-activeSheet) method.

The [`sheet`](/api/javascript/spreadsheet/sheet) object instance interface enables you to get and set settings and data on the sheet level.

The `range` method is used to retrieve a [`range`](/api/javascript/spreadsheet/range) instance that you can use to manipulate one or more cell regions of the sheet. To retrieve the `range` method, use a string with an [A1](https://msdn.microsoft.com/en-us/library/bb211395.aspx) or an [RC notation](http://excelribbon.tips.net/T008803_Understanding_R1C1_References.html).

The following example demonstrates how to set the value for a range of cells.

###### Example

``` html
    <div id="spreadsheet"></div>

    <script type="text/javascript" charset="utf-8">

        $("#spreadsheet").kendoSpreadsheet();

        var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet"); // the widget instance

        var sheet = spreadsheet.activeSheet(); // the current active sheet

        var range = sheet.range("A1:B2"); // 2x2 cell range

        range.value("foo").color("green");
    </script>
```

## Data Import and Export

The Spreadsheet offers methods for storing and loading data in a JSON format.

For more information on the data import and export functionality in the Spreadsheet, refer to the [article on storing content as JSON]({% slug loadand_saveas_json_spreadsheet_widget %}).

The Spreadsheet features a built-in [export-to-Excel]({% slug export_toexcel_spreadsheet_widget %}) functionality which is fully actionable in the browser.

## Data Binding

You can bind individual sheets to a Data Source in a special data-driven mode.

For more information on the data-binding Spreadsheet functionality, refer to the [article on binding the Spreadsheet to a data source]({% slug bind_todata_source_spreadsheet_widget %}).

## Mobile Integration

The Spreadsheet is primarily targeted at desktop users. Its performance and functionalities are limited on mobile devices.  

## See Also

Other articles on the Kendo UI Spreadsheet:

* [Custom Functions]({% slug custom_functions_spreadsheet_widget %})
* [Custom Cell Editors]({% slug custom_editors_spreadsheet_widget %})
* [Cell Formatting]({% slug cell_formatting_spreadsheet_widget %})
* [Load and Save Data as JSON]({% slug loadand_saveas_json_spreadsheet_widget %})
* [Data Source Binding]({% slug bind_todata_source_spreadsheet_widget %})
* [Export to Excel]({% slug export_toexcel_spreadsheet_widget %})
* [Server-Side Processing]({% slug serverside_processing_spreadsheet_widget %})
* [User Guide]({% slug user_guide_spreadsheet_widget %})
* [Spreadsheet JavaScript API Reference](/api/javascript/ui/spreadsheet)
* [How to Bind Charts to Sheet Data]({% slug howto_bindcharttosheet_spreadsheet_widget %})
* [How to Get Flagged Cells Containing Invalid Values]({% slug howto_get_flagged_cells_containing_invalid_values_spreadsheet_widget %})
* [How to Set Validation Rules to Column Ranges]({% slug howto_validationtocolumn_spreadsheet_widget %})
