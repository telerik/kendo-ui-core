---
title: Resize and Expand Grid to 100% Height
page_title: Resize and Expand to 100% Height | Kendo UI Grid
description: "Learn how to resize and expand a Kendo UI Grid widget to 100% height when the parent container or browser window is resized too."
slug: howto_resize_whenthe_windowis_resized_grid
---

# Resize and Expand the Kendo UI Grid to 100% Height

Web standards require elements with a percentage height to have a parent with an explicit height. The rule applies recursively until an element with a pixel height is reached, or the root `<html>` element is reached. In the latter case the `body` and `html` elements need a 100% height style as well. 100% high elements cannot have margins, paddings, borders, and siblings.

The examples below demonstrate how to resize the Kendo UI Grid in three different scenarios:

1. Resize a Kendo UI Grid together with the browser viewport.
1. Resize a Grid in a Kendo UI Window.
1. Resize a Grid resizes in a Kendo UI Splitter.

The example below demonstrates how to resize the Kendo UI Grid together with the browser viewport.

###### Example

```html
    <style>
      html,
      body,
      #parent,
      #grid
      {
        margin: 0;
        padding: 0;
        border-width: 0;
        height: 100%; /* DO NOT USE !important for setting the Grid height! */
      }

      html
      {
        overflow: hidden;
        font: 13px sans-serif;
      }
    </style>
    <div id="parent">
      <div id="grid"></div>
    </div>
    <script>
      var gridElement = $("#grid");

      function resizeGrid() {
        gridElement.data("kendoGrid").resize();
      }

      $(window).resize(function(){
        resizeGrid();
      });

      $("#grid").kendoGrid({
        dataSource: {
          type: "odata",
          transport: {
            read: "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
          },
          schema: {
            model: {
              fields: {
                OrderID: { type: "number" },
                ShipName: { type: "string" },
                ShipCity: { type: "string" }
              }
            }
          },
          pageSize: 25,
          serverPaging: true,
          serverFiltering: true,
          serverSorting: true
        },
        filterable: true,
        sortable: true,
        resizable: true,
        pageable: true,
        columns: [{
              field:"OrderID",
              filterable: false,
              width: 200
            },
            "ShipName",
            "ShipCity"
        ]
      });
    </script>
```

The example below demonstrates how to resize the Kendo UI Grid in a Kendo UI Window.

###### Example

```html
    <style>
      #grid
      {
        border-width: 0;
        height: 100%; /* DO NOT USE !important for setting the Grid height! */
      }

      #window
      {
        padding: 0;
      }

      html
      {
        font: 13px sans-serif;
      }
    </style>
    <div id="window">
      <div id="grid"></div>
    </div>
    <script>

      $("#window").kendoWindow({
        visible: false,
        width: 600,
        height: 300,
        actions: ["maximize"],
        title: "Kendo UI Window"
      }).data("kendoWindow").center().open();

      $("#grid").kendoGrid({
        dataSource: {
          type: "odata",
          transport: {
            read: "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
          },
          schema: {
            model: {
              fields: {
                OrderID: { type: "number" },
                ShipName: { type: "string" },
                ShipCity: { type: "string" }
              }
            }
          },
          pageSize: 25,
          serverPaging: true,
          serverFiltering: true,
          serverSorting: true
        },
        filterable: true,
        sortable: true,
        resizable: true,
        pageable: true,
        columns: [{
                field:"OrderID",
                filterable: false,
                width: 200
            },
            "ShipName",
            "ShipCity"
        ]
      });
    </script>
```

The example below demonstrates how to resize the Kendo UI Grid in a Kendo UI Splitter.

###### Example

```html
    <style>
      html,
      body,
      #splitter,
      #grid
      {
        margin: 0;
        padding: 0;
        border-width: 0;
        height: 100%; /* DO NOT USE !important for setting the Grid height! */
      }

      html
      {
        font: 13px sans-serif;
        overflow: hidden;
      }
    </style>
    <div id="splitter">
      <div id="left-pane">left pane</div>
      <div id="right-pane">
        <div id="grid"></div>
      </div>
    </div>
    <script>

      $("#splitter").kendoSplitter({
        panes: [
            { size: 100 },
            { }
        ]
      });

      $("#grid").kendoGrid({
        dataSource: {
          type: "odata",
          transport: {
            read: "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
          },
          schema: {
            model: {
              fields: {
                OrderID: { type: "number" },
                ShipName: { type: "string" },
                ShipCity: { type: "string" }
              }
            }
          },
          pageSize: 25,
          serverPaging: true,
          serverFiltering: true,
          serverSorting: true
        },
        filterable: true,
        sortable: true,
        resizable: true,
        pageable: true,
        columns: [{
                field:"OrderID",
                filterable: false,
                width: 200
            },
            "ShipName",
            "ShipCity"
        ]
      });
    </script>
```

## See Also

Other articles on the Kendo UI Grid and how-to examples related to its layout:

* [Kendo UI Grid JavaScript API Reference](/api/javascript/ui/grid)
* [How to Adjust Row Height with Virtual Scrolling]({% slug howto_adjust_row_height_withvirtual_scrolling_grid %})
* [How to Apply Minimum Width during Column Resize]({% slug howto_apply_min_width_during_column_resize_grid %})
* [How to Change Group Header Position with Locked Columns]({% slug howto_change_group_header_position_wthlocked_columns_grid %})
* [How to Create and Use Auto Layout]({% slug howto_create_and_use_autolayout_grid %})
* [How to Disable Resizing for Specific Columns]({% slug howto_disable_column_resizing_grid %})
* [How to Hide the Vertical Scrollbar When Not Needed]({% slug howto_hide_vertical_scrollbar_grid %})
* [How to Use FontAwesome Icons in Custom Command Buttons]({% slug howto_use_fontawesomeiconsin_custom_command_buttons_grid %})

For more runnable examples on the Kendo UI Grid, browse its [**How To** documentation folder]({% slug howto_create_custom_editors_grid %}).
