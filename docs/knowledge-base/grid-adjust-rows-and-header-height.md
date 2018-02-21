---
title: Adjust Kendo Grid Row and Header Height of to Make them Smaller
description: An example on how to make the height of Kendo Grid Rows and Header smaller
type: how-to
page_title: Adjust Kendo Grid Row and Header Height to Make them Smaller
slug: grid-adjust-rows-and-header-height
tags: grid, row, rows, header, smaller, size, adjust, css
ticketid: 1151240
res_type: kb

---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>Grid for Progress® Kendo UI®</td>
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

I'm trying to squeeze as much real-estate from my grid as possible, so I want to set the row heights (header and grid rows) to a minimum or specific height. How would I do that?

## Solution

In order to adjust the size of rows in both the body and the header, we take advantage of CSS and specify the `height` and `padding` properties for `th` elements inside the grid's `thead` and `tr` and `td` elements inside the grid's `tbody`:

```html
<div id="example">
    <div id="grid"></div>
    <script>
      $(document).ready(function() {
        $("#grid").kendoGrid({
          dataSource: {
            type: "odata",
            transport: {
              read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
            },
            schema: {
              model: {
                fields: {
                  OrderID: {
                    type: "number"
                  },
                  Freight: {
                    type: "number"
                  },
                  ShipName: {
                    type: "string"
                  },
                  OrderDate: {
                    type: "date"
                  },
                  ShipCity: {
                    type: "string"
                  }
                }
              }
            },
            pageSize: 20,
            serverPaging: true,
            serverFiltering: true,
            serverSorting: true
          },
          filterable: true,
          sortable: true,
          pageable: true,
          columns: [{
            field: "OrderID",
            filterable: false
          },
          "Freight",
          {
            field: "OrderDate",
            title: "Order Date",
            format: "{0:MM/dd/yyyy}"
          }, {
            field: "ShipName",
            title: "Ship Name"
          }, {
            field: "ShipCity",
            title: "Ship City"
          }
         ]
        });
      });
    </script>
    <style>
      .k-grid-header .k-header {
        height: 20px;
        padding: 0;
      }

      .k-grid tbody tr {
        line-height: 14px;
      }

      .k-grid tbody td {
        padding: 0;
      }
    </style>
  </div>
```

## See Also

* [Kendo UI Grid Appearance Guide on Height.](https://docs.telerik.com/kendo-ui/controls/data-management/grid/appearance#height)
