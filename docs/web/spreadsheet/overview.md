---
title: Overview
page_title: Kendo UI Spreadsheet widget - Overview
position: 1
---

# Kendo UI Spreadsheet

The Kendo UI Spreadsheet widget allows editing and visualisation of tabular data with a variety of cell formatting options, styles and themes. Out of the box, the Spreadsheet supports:

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
 * A broad range of formulas in different categories: Logical; Text; Date and Time

Each of these features is exposed as a UI for the end user, as well as is exposed as API calls for the developer for further UI customization.

> The Spreadsheet Widget supports IE version 9 or later.

## Initialization

The Spreadsheet widget should be instantiated on an empty div element.

### Instantiate a Kendo UI Spreadsheet Widget
```html

    <div id="spreadsheet">
    </div>

    <script>
        $("#spreadsheet").kendoSpreadsheet();
    </script>
```

More specifics of the Kendo UI Widget instantiation mechanism are available in the [Widget initialization help article](/intro/jquery-initialization).

A detailed list of the configuration options supported by the widget including sheet configuration and data is available in the [Widget API reference](/api/javascript/ui/spreadsheet).

## API Overview

The spreadsheet widget instance [exposes a few methods](/api/javascript/ui/spreadsheet#methods) for sheet instance retrieval, insertion and deletion. The most commonly used one is [activeSheet](/api/javascript/ui/spreadsheet#methods-activeSheet)

The [sheet object instance](/api/javascript/spreadsheet/sheet) interface gives the developer the ability to get/set various sheet level settings and data.

The sheet `range` method is used to retrieve a [Range](/api/javascript/spreadsheet/range) instance which may be used to manipulate one (or more) cell regions of the sheet.

The range is retrieved using a string with an [A1](https://msdn.microsoft.com/en-us/library/bb211395.aspx) or an [RC notation](http://excelribbon.tips.net/T008803_Understanding_R1C1_References.html).

### Set Value for a Range of Cells

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

The Spreadsheet widget offers methods for storing and loading data in a JSON format.
See [Store as JSON](import-and-export-data/overview).

Built-in [Export to Excel](import-and-export/export-to-excel) is also available and works entirely in the browser.

## Data Binding

Individual sheets can be bound to a Data Source in a special data-driven mode.
See [Bind to Data Source](import-and-export/bind-to-data-source).
