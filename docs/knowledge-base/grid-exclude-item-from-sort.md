---
title: Exclude Specific Items When Sorting in Grid 
description: An example demonstrating how to exclude one or more specific items when sorting the Grid
type: how-to
page_title: Exclude Specific Items When Sorting in Grid | Kendo UI Grid
slug: grid-exclude-item-from-sort
tags: grid, exclude, item, sort, sorting, items, row, record
ticketid: 1158437
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

I'm working on an application that uses the Kendo UI Grid with sorting and would like to exclude a particular row from the sort so it always stays on top.

## Solution

The described functionality can be implemented by taking advantage of the [`compare` function](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/columns.sortable#columns.sortable.compare) of the [`sortable` property](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/columns.sortable#columns.sortable) and overriding the default logic with a custom one. In the sample below, Chai will always be the first row regardless of the sort applied.

```html
<script src="https://demos.telerik.com/kendo-ui/content/shared/js/products.js"></script>

<div id="example">
  <div id="grid"></div>

  <script>
    $(document).ready(function() {
      $("#grid").kendoGrid({
        dataSource: {
          data: products,
          schema: {
            model: {
              fields: {
                ProductName: { type: "string" },
                UnitPrice: { type: "number" },
                UnitsInStock: { type: "number" },
                Discontinued: { type: "boolean" }
              }
            }
          },
          pageSize: 80
        },
        height: 850,
        sortable: {
          compare: function(a, b, descending) {
            if (descending){
              return b.ProductName == "Chai" ? -1 : a.ProductName === b.ProductName ? 0 : (a.ProductName > b.ProductName) ? 1 : -1;
            }
            else{
              return a.ProductName == "Chai" ? -1 : a.ProductName === b.ProductName ? 0 : (a.ProductName > b.ProductName) ? 1 : -1;
            }
          }
        },
        pageable: {
          input: true,
          numeric: false
        },
        columns: [
          "ProductName",
          { field: "UnitPrice", title: "Unit Price", format: "{0:c}", width: "130px", sortable: false },
          { field: "UnitsInStock", title: "Units In Stock", width: "130px", sortable: false },
          { field: "Discontinued", width: "130px", sortable: false }
        ]
      });
    });
  </script>
</div>
```

## See Also

* [How To Display Frozen Rows in Grid](https://docs.telerik.com/kendo-ui/knowledge-base/grid-frozen-rows)
