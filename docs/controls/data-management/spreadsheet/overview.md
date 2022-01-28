---
title: Overview
page_title: jQuery Spreadsheet Documentation | Spreadsheet Overview
description: "Get started with the jQuery Spreadsheet by Kendo UI and learn how to initialize and configure the widget."
slug: overview_spreadsheet_widget
position: 1
---

# Spreadsheet Overview

The Spreadsheet allows you to edit and visualize tabular data by using cell formatting options, styles, and themes.

The Spreadsheet supports Internet Explorer 9 and later versions. The widget is primarily targeted at desktop users and, therefore, its performance and functionalities on mobile devices are limited.

* [Demo page for the Spreadsheet](https://demos.telerik.com/kendo-ui/spreadsheet/index)

## Initializing the Spreadsheet

To initialize the Spreadsheet, use an empty `<div>` element. For more information, refer to the article on [widget initialization in Kendo UI]({% slug initialize_widgets_using_jquery_plugins_installation %}).

```dojo

    <div id="spreadsheet">
    </div>

    <script>
        $("#spreadsheet").kendoSpreadsheet();
    </script>
```

## Basic Configuration

The Spreadsheet instance exposes [methods](/api/javascript/ui/spreadsheet#methods) for sheet instance retrieval, insertion, and deletion.

* A common method is the [`activeSheet`](/api/javascript/ui/spreadsheet/methods/activesheet) method.
* The [`sheet`](/api/javascript/spreadsheet/sheet) object instance interface enables you to configure the settings and data on the sheet level.
* You can use the `range` method for retrieval of a [`range`](/api/javascript/spreadsheet/range) instance that you can use to manipulate one or more cell regions of the sheet. To retrieve the `range` method, use a string with an [A1](https://msdn.microsoft.com/en-us/library/bb211395.aspx) or an [RC notation](https://excelribbon.tips.net/T008803_Understanding_R1C1_References.html).

The following example demonstrates how to set the value for a range of cells.

``` html
    <div id="spreadsheet"></div>

    <script type="text/javascript" charset="utf-8">

        $("#spreadsheet").kendoSpreadsheet();

        var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet"); // The widget instance.

        var sheet = spreadsheet.activeSheet(); // The current active sheet.

        var range = sheet.range("A1:B2"); // A 2x2 cell range.

        range.value("foo").color("green");
    </script>
```

## Functionality and Features

* [Images]({% slug images_spreadsheet_widget %})
* [Comments]({% slug comments_spreadsheet_widget %})
* [Cell formatting]({% slug cell_formatting_spreadsheet_widget %})
* [Custom editors]({% slug custom_editors_spreadsheet_widget %})
* [Custom functions]({% slug custom_functions_spreadsheet_widget %})
* [Import and export of data]({% slug loadand_saveas_json_spreadsheet_widget %})
* [Localization]({% slug localization_ofmessages_spreadsheet_widget %})
* [End-user guide]({% slug user_guide_spreadsheet_widget %})

## See Also

* [Basic Usage of the Spreadsheet (Demo)](https://demos.telerik.com/kendo-ui/spreadsheet/index)
* [Spreadsheet JavaScript API Reference](/api/javascript/ui/spreadsheet)
