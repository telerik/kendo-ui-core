---
title: Column Templates
page_title: jQuery Grid Documentation | Column Templates | Kendo UI
description: "Get started with the jQuery Grid by Kendo UI and learn how to customize the way the column displays its value."
slug: column_templates_kendoui_grid_widget
position: 3
---

# Column Templates

The Kendo UI Grid renders table rows (`tr`) which represent the data source items.

For runnable examples, refer to:
* [Demo on using the row template of the Grid](https://demos.telerik.com/kendo-ui/grid/rowtemplate)
* [Demo on using the detail-row template of the Grid](https://demos.telerik.com/kendo-ui/grid/detailtemplate)
* [Demo on using the toolbar template of the Grid](https://demos.telerik.com/kendo-ui/grid/toolbar-template)

Each table row consists of table cells (`td`) which represent the Grid columns. By default, the Grid displays the HTML-encoded value of the field in the column.

The following examples demonstrate how to customize the way the column displays its value.

## Setting Column Templates as Strings

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

## Setting Column Templates as Functions

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

* [Using Row Templates in the Grid (Demo)](https://demos.telerik.com/kendo-ui/grid/rowtemplate)
* [Using Detail-Row Templates in the Grid (Demo)](https://demos.telerik.com/kendo-ui/grid/detailtemplate)
* [Using Toolbar Templates in the Grid (Demo)](https://demos.telerik.com/kendo-ui/grid/toolbar-template)
* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
