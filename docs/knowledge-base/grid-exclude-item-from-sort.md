---
title: Exclude Specific Items When Sorting Grid Data
description: An example on how to exclude one or more specific items when the user sorts data in the Kendo UI Grid.
type: how-to
page_title: Exclude Specific Items When Sorting | Kendo UI Grid
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

How can I exclude a particular row from sorting so that it always stays on top?

## Solution

Use the [`compare`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/columns.sortable#columns.sortable.compare) function of the [`sortable`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/columns.sortable#columns.sortable) property and use custom logic to override the default behavior. In the following example, Chai will always be the first row regardless of the sorting that the user applies.

```dojo
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

* [Displaying Frozen Rows in the Grid](https://docs.telerik.com/kendo-ui/knowledge-base/grid-frozen-rows)
