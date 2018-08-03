---
title: Column Templates
page_title: Column Templates | Kendo UI Grid
description: "Learn how to customize the cell content in the Kendo UI Grid."
slug: column_templates_kendoui_grid_widget
position: 3
---

# Column Templates

The Kendo UI Grid renders table rows (<tr>) which represent the data source items. Each table row consists of table cells (<td>) which represent the grid columns. By default the HTML-encoded value of the field is displayed in the column.

In the examples below is demonstrated how to customize the way the column displays its value.

#### Example - set the template as a string (wrap the column value in HTML)

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

#### Example - set the template as a function returned by kendo.template

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

#### Example - set the template as a function which returns a string

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
