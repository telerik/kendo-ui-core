---
title: Adjust Grid Row and Header Height to Make Them Smaller
description: An example on how to make the height of the Kendo UI Grid rows and header smaller.
type: how-to
page_title: Adjust Row and Header Height to Make Them Smaller | Kendo UI Grid
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

How can I set the heights of the Grid rows, including the header, to a minimum or a specific height value?

## Solution

To adjust the size of the rows in both the body and the header, use CSS and specify the `height` and `padding` properties for the `th` elements inside the `thead` and `tr`, and the `td` elements inside the `tbody` of the Grid.

```dojo
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

* [Setting the Height of the Kendo UI Grid](https://docs.telerik.com/kendo-ui/controls/data-management/grid/appearance#height)
