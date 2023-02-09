---
title: Change text alignment in Grid cells
description: Learn how to change the text alignment in a Grid column.
type: how-to
page_title: Grid Cells Text Alignment - Kendo UI Grid for jQuery
slug: grid-change-cells-text-alignment
tags: grid, cells, text, align
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Grid for jQuery</td> 
 </tr>
 <tr>
  <td>Product Version</td>
  <td>2021.2.511</td>
 </tr>
</table>

## Description

How can I change the default text alignment of a Grid column to right or center?

## Solution

Apply the `k-text-left`, `k-text-right` or `k-text-center` classes through the Grid [column.attributes](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/columns.attributes), [column.headerAttributes](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/columns.headerattributes) and [column.footerAttributes](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/columns.footerattributes) options.

```dojo
<div id="grid"></div>
<script>
    $("#grid").kendoGrid({
      columns: [
        {
          field: "name",
        	title: "Name"
        },
        {
          field: "age",
          title: "Age",
          footerTemplate: "Min: #: min # Max: #: max #",
         	attributes: { "class": "k-text-right"},
         	headerAttributes: { "class": "k-text-right"},
          footerAttributes: { "class": "k-text-right"}
        }
      ],
      dataSource: {
        data: [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
        ],
        aggregate: [
            { field: "age", aggregate: "min" },
            { field: "age", aggregate: "max" }
        ]
      }
    });
</script>
```

## Notes

* [JavaScript API Reference of the Grid](/api/javascript/dataviz/ui/grid)
