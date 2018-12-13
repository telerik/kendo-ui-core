---
title: Remove Operators from the Grid Filter Row
description: An example on how to remove the drop-down filter operator from the filter row in the Kendo UI Grid.
type: how-to
page_title: Remove Drop-Down Filter Operators When Using Filter Row | Kendo UI Grid
slug: grid-remove-filter-row-operators
tags: grid, remove, filter, filter row, row, operator
ticketid: 1171789
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Grid for Progress® Kendo UI®</td>
 </tr>
 <tr>
  <td>Product Version</td>
  <td>2018.2.516</td>
 </tr>
</table>

## Description

How can I remove or hide the drop-down with the filter operators when the row filtering of the Grid is applied?

## Solution

The Grid provides no built-in functionality for disabling the button with the filter operators for all cells in row filtering mode. However, you can use a workaround to hide the button by applying the following CSS rules:

```css
th [role="listbox"]{
   visibility: hidden;
}
```

The following example demonstrates the complete implementation of the suggested approach.

```dojo
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
              OrderID: { type: "number" },
              Freight: { type: "number" },
              ShipName: { type: "string" },
              OrderDate: { type: "date" },
              ShipCity: { type: "string" }
            }
          }
        },
        pageSize: 20,
        serverPaging: true,
        serverFiltering: true,
      },
      height: 550,
      filterable: {
        mode: "row"
      },
      pageable: true,
      columns:
      [{
        field: "OrderID",
        width: 225,
        filterable: {
          cell: {
            showOperators: false
          }
        }
      },
       {
         field: "ShipName",
         width: 500,
         title: "Ship Name",
         filterable: {
           cell: {
             operator: "contains",
             suggestionOperator: "contains"
           }
         }
       },{
         field: "Freight",
         width: 255,
         filterable: {
           cell: {
             operator: "gte"
           }
         }
       },{
         field: "OrderDate",
         title: "Order Date",
         format: "{0:MM/dd/yyyy}"
       }]
    });
  });
</script>

<style>
  th [role="listbox"]{
    visibility: hidden;
  }
</style>
```
