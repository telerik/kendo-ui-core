---
title: Resize grid when the window is resized
page_title: Resize grid when the window is resized
description: Resize grid when the window is resized
---

# Resize grid when the window is resized

The following runnable sample demonstrates how to resize the Kendo UI Grid when the parent window is resized.

Web standards require elements with a percentage height to have a parent with an explicit height.
The rule applies recursively until an element with a pixel height is reached, or the root HTML element is reached.
In the latter case the BODY and HTML elements need a 100% height style as well. 100% high elements cannot have margins, paddings, borders and siblings.

#### Example

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
        height: 100%;
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