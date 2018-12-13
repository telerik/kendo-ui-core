---
title: Automatically Fit Width of Grid Columns to Show All Data
description: An example on how to automatically fit the width of all Kendo UI Grid columns to show all data.
type: how-to
page_title: Automatically Fit Column Width to Show All Data | Kendo UI Grid
slug: grid-autofit-all-columns-width
tags: grid, autofit, auto, fit, automatically, columns, width, show, all, data
ticketid: 1148885
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

How can I have the columns of a Kendo UI Grid automatically fit their width to accommodate their contents?

## Solution

1. Subscribe to the `dataBound` event.
1. Use the `autoFitColumn` method.

If you have to only set the `checked` property of the columns to `true`, use the `dataBound` event.

```dojo
  <div id="example">
    <div id="grid"></div>

    <script>
      $(document).ready(function() {
        var grid = $("#grid").kendoGrid({
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
                  ShipCountry: {
                    type: "string"
                  },
                  ShipCity: {
                    type: "string"
                  },
                  ShipName: {
                    type: "string"
                  },
                  OrderDate: {
                    type: "date"
                  },
                  ShippedDate: {
                    type: "date"
                  }
                }
              }
            },
            pageSize: 15
          },
          height: 550,
          sortable: true,
          resizable: true,
          pageable: true,
          dataBound: function() {
            for (var i = 0; i < this.columns.length; i++) {
              this.autoFitColumn(i);
            }
          },
          columns: [{
            field: "OrderDate",
            title: "Order Date",
            format: "{0:MM/dd/yyyy}"
          },
          {
            field: "ShipCountry",
            title: "Ship Country"
          },
          {
            field: "ShipCity",
            title: "Ship City"
          },
          {
            field: "ShipName",
            title: "Ship Name"
          },
          {
            field: "ShippedDate",
            title: "Shipped Date",
            format: "{0:MM/dd/yyyy}"
          },
          {
            field: "OrderID",
            title: "ID"
          }, {
            field: "OrderDate",
            title: "Order Date",
            format: "{0:MM/dd/yyyy}"
          },
          {
            field: "ShipCountry",
            title: "Ship Country"
          },
          {
            field: "ShipCity",
            title: "Ship City"
          },
          {
            field: "ShipName",
            title: "Ship Name"
          },
          {
            field: "ShippedDate",
            title: "Shipped Date",
            format: "{0:MM/dd/yyyy}"
          },
          {
            field: "OrderID",
            title: "ID"
          }
         ]
        });
      });
    </script>
  </div>
  <style>
    #grid>table
    {
      table-layout: fixed;
    }
  </style>
```

## See Also

* [API Reference of the autoFitColumn Method](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/autofitcolumn)
* [Appearance of the Grid](https://docs.telerik.com/kendo-ui/controls/data-management/grid/appearance#width)
* [API Reference of the dataBound Event](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/databound)
