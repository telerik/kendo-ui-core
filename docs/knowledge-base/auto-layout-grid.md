---
title: Create and Use Auto Layout in the Grid
page_title:  Create and Use Auto Layout | Kendo UI Grid for jQuery
description: "An example on how to create and use auto layout in the Kendo UI Grid for jQuery."
previous_url: /controls/data-management/grid/how-to/Layout/auto-layout-grid
slug: howto_create_and_use_autolayout_grid
tags: grid, use, auto, layout
component: grid
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid for jQuery</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How can I create an auto layout for the Kendo UI Grid?

## Solution

The auto layout requires you to disable the scrolling functionality of the Grid.

```dojo
    <style>
      html
      {
        font: 12px sans-serif;
      }

      .k-grid
      {
        width: 500px;
      }

      #grid3
      {
        display: inline-block;
        width: auto;    
      }

      #grid3 table
      {
        width: auto;
      }
    </style>
    <p><strong>N.B: Auto layout requires disabled Grid scrolling.</strong></p>

    <h3>No column widths, auto layout</h3>

    <div id="grid1"></div>

    <h3>One narrow column with other wide columns, auto layout</h3>

    <div id="grid2"></div>

    <h3>Minimal Grid with auto layout.</h3>

    <div id="grid3"></div>
    <script>
      var gridConfig = {
        dataSource: {
          type: "odata",
          transport: {
            read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
          },
          schema: {
            model: {
              fields: {
                OrderID: { type: "number" },
                Freight: { type: "number" },
                OrderDate: { type: "date" }
              }
            }
          },
          pageSize: 5,
          serverPaging: true,
          serverFiltering: true,
          serverSorting: true
        },
        scrollable: false,
        sortable: true,
        pageable: {numeric:false, info:false}
      };

      $("#grid1").kendoGrid($.extend(gridConfig, {
        columns: [{
          field: "OrderID"
        }, {
          field: "Freight"
        }, {
          field: "OrderDate",
          format: "{0:MM/dd/yyyy}"
        }]
      }));

      $("#grid2").kendoGrid($.extend(gridConfig, {
        columns: [{
          field: "OrderID"
        }, {
          field: "Freight",
          width: 75
        }, {
          field: "OrderDate",
          format: "{0:MM/dd/yyyy}"
        }]
      }));

      $("#grid3").kendoGrid($.extend(gridConfig, {
        columns: [{
          field: "OrderID"
        }, {
          field: "Freight"
        }, {
          field: "OrderDate",
          format: "{0:MM/dd/yyyy}"
        }]
      }));
    </script>
```

## See Also

* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
