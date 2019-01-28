---
title: Column Templates
page_title: jQuery Grid Documentation | Column Templates | Kendo UI
description: "Get started with the jQuery Grid by Kendo UI and learn how to customize the way the column displays its value."
slug: column_templates_kendoui_grid_widget
position: 3
---

# Column Templates

The Kendo UI Grid renders table rows (`tr`) which represent the data source items.

Each table row consists of table cells (`td`) which represent the Grid columns. By default, the HTML-encoded value of the field is displayed in the column.

The following examples demonstrate how to customize the way the column displays its value.

## Setting the Template as a String

The following example demonstrates how to set the template as a string and wrap the column value in HTML.

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [ {
        field: "name",
        template: "<strong>#: name # </strong>"
      }],
      dataSource: [ { name: "Jane Doe" }, { name: "John Doe" } ]
    });
    </script>

## Setting the Template as a Function

The following example demonstrates how to set the template as a function that is returned by `kendo.template`.

    <div id="grid"></div>
    <script id="name-template" type="text/x-kendo-template">
      <strong>#: name #</strong>
    </script>
    <script>
    $("#grid").kendoGrid({
      columns: [ {
        field: "name",
        template: kendo.template($("#name-template").html())
      }],
      dataSource: [ { name: "Jane Doe" }, { name: "John Doe" } ]
    });
    </script>

The following example demonstrates how to set the template as a function which returns a string.  

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [ {
        field: "name",
        template: function(dataItem) {
          return "<strong>" + kendo.htmlEncode(dataItem.name) + "</strong>";
        }
      }],
      dataSource: [ { name: "Jane Doe" }, { name: "John Doe" } ]
    });
    </script>

## See Also

* [Grid JavaScript API Reference](/api/javascript/ui/grid)
* [Walkthrough of the Grid]({% slug walkthrough_kendoui_grid_widget %})
