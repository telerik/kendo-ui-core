---
title: Resize and Expand Grid to 100% Height
page_title: Resize and Expand to 100% Height | Kendo UI Grid for jQuery
description: "An example on how to resize and expand it to 100% height when the parent container or browser window are resized too."
previous_url: /controls/data-management/grid/how-to/Layout/resize-grid-when-the-window-is-resized
slug: howto_resize_whenthe_windowis_resized_grid
tags: resize, expand, grids, 100%, height, when, parent, container, browser, window, resized
component: grid
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>All</td>
 </tr>
 <tr>
  <td>Browser</td>
  <td>All</td>
 </tr>
 <tr>
  <td>Browser Version</td>
  <td>All</td>
 </tr>
</table>

## Description

How can I resize and expand the Kendo UI Grid to a 100% height when the parent container or the browser window are resized too?

## Solution

Web standards require elements with a percentage height to have a parent with an explicit height.

The rule applies recursively until an element with a pixel height is reached, or the root `<html>` element is reached. In the latter case the `body` and `html` elements need a 100% height style as well. 100% high elements cannot have margins, paddings, borders, and siblings.

The examples that follow demonstrate how to resize the Kendo UI Grid in three different scenarios:
* Resize a Kendo UI Grid together with the browser viewport.
* Resize a Grid in a Kendo UI Window.
* Resize a Grid resizes in a Kendo UI Splitter.

The following example demonstrates how to resize the Kendo UI Grid together with the browser viewport.

```dojo
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
            read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
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

The following example demonstrates how to resize the Kendo UI Grid in a Kendo UI Window.

```dojo
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
            read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
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

The following example demonstrates how to resize the Kendo UI Grid in a Kendo UI Splitter.

```dojo
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
            read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
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

* [Kendo UI Grid JavaScript API Reference](/api/javascript/ui/grid)
