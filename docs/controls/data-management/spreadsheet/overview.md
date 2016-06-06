---
title: Overview
page_title: Overview | Kendo UI Spreadsheet
description: "Learn about how to initialize and configure the Kendo UI Spreadsheet widget."
slug: overview_spreadsheet_widget
position: 1
---

# Spreadsheet Overview

The [Kendo UI Spreadsheet widget](http://demos.telerik.com/kendo-ui/spreadsheet/index) allows editing and visualization of tabular data with a variety of cell formatting options, styles and themes. Out of the box, the Spreadsheet supports:

* Multiple sheets
* Excel like selection and active cell
* Insert and delete cells, rows and columns
* Cell editing, validation
* Frozen panes
* Merged Cells
* Resizing of rows and columns
* Cell formatting, including different fonts and font sizes
* Selection of cell color and background color
* Bold, italics and underline
* Vertical and horizontal cell alignment
* Text wrapping
* Cell borders
* Several data formatting options: Number; Currency; Accounting; Date; Time; Percentage; Fraction; Scientific; Text; Special; Custom
* A broad range of formulas in different categories: Logical, Text, Date, and Time

Each of these features is exposed as a UI for the end user, as well as is exposed as API calls for you as a developer for further UI customization.

> **Important**  
>
> The Spreadsheet widget supports Internet Explorer 9 or later versions.

## Getting Started

### Initialize the Spreadsheet

Instantiate the Spreadsheet widget by using an empty `<div>` element, as demonstrated in the example below.

###### Example

```html

    <div id="spreadsheet">
    </div>

    <script>
        $("#spreadsheet").kendoSpreadsheet();
    </script>
```

For more details on the instantiation mechanism of Kendo UI widgets, refer to the [widget initialization help article]({% slug initialize_widgets_using_jquery_plugins_installation %}).

Find the detailed list of configuration options supported by the Spreadsheet, including sheet and data configuration, in the [Spreadsheet API reference topic](/api/javascript/ui/spreadsheet).

## Spreadsheet API

The Spreadsheet widget instance [exposes a few methods](/api/javascript/ui/spreadsheet#methods) for sheet instance retrieval, insertion, and deletion. The most commonly used one is the [`activeSheet`](/api/javascript/ui/spreadsheet#methods-activeSheet).

The [`sheet` object instance](/api/javascript/spreadsheet/sheet) interface gives you the ability to get/set various sheet level settings and data.

The sheet `range` method is used to retrieve a [`range`](/api/javascript/spreadsheet/range) instance which may be used to manipulate one or more cell regions of the sheet. The `range` is retrieved using a string with an [A1](https://msdn.microsoft.com/en-us/library/bb211395.aspx) or an [RC notation](http://excelribbon.tips.net/T008803_Understanding_R1C1_References.html).

The example below demonstrates how to set the value for a range of cells.

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

## Data Import/Export

The Spreadsheet offers methods for storing and loading data in a JSON format.

For more information on the data import and export functionality in the Spreadsheet, refer to the [article on storing as JSON](import-and-export-data/overview).

The Spreadsheet features a built-in [export-to-Excel]({% slug export_toexcel_spreadsheet_widget %}) functionality which is also fully actionable in the browser.

## Data Binding

Individual sheets can be bound to a Data Source in a special data-driven mode.

For more information on the data-binding Spreadsheet functionality, refer to the [article on biding the Spreadsheet to a data source]({% slug bind_todata_source_spreadsheet_widget %}).

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
