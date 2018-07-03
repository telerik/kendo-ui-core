---
title: Remove Operators from Grid Filter Row 
description: An example demonstrating how to remove the filter operator dropdown from the filter row.
type: how-to
page_title: Remove Filter Operator DropDownList When Using Filter Row| Kendo UI Grid
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

I'm working on an application that uses the Kendo UI Grid with row filtering and would like to hide the filter operators DropDownList because I don't need to choose a different one.

## Solution

Since there is no built in functionality to disable the operators button for all cells in row filtering mode, the recommended approach is to hide the buttons using CSS:

```css
th [role="listbox"]{
   visibility: hidden;
}
```

The following sample implements the approach described above:

```html
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
