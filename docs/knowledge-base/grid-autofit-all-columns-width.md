---
title: Automatically Fit Grid Columns Width to Show All Data
description: An example on how to automatically fit all Grid columns width to show all data
type: how-to
page_title: Automatically Fit Grid Columns Witdh to Show All Data
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

In order to automatically fit the columns of a Kendo UI Grid, we subscribe to the `dataBound` event and take advantage of the `autoFitColumn` method:

If you just want to set their `checked` property to `true`, you could do this on the `dataBound` event:

```html
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

* [autoFitColumn method API Reference.](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/autofitcolumn)
* [Kendo UI Grid Appearance Width Section.](https://docs.telerik.com/kendo-ui/controls/data-management/grid/appearance#width)
* [dataBound event API Reference.](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/databound)
