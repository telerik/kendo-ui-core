---
title: Collapse Groups in Grid by Default
description: An example on how to have groups in a Kendo UI Grid which are collapsed by default.
type: how-to
page_title: Set Groups as Collapsed by Default | Kendo UI Grid for jQuery
slug: grid-collapse-groups
tags: grid, groups, grouping, collapse, default, expand, prevent, fold
ticketid: 1144787
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid</td>
 </tr>
 <tr>
  <td>Progress Kendo UI version</td>
  <td>Created with the 2017.3.1026 version</td>
 </tr>
</table>

## Description

How can I render Kendo UI Grid groups as collapsed by default?

## Solution

1. Handle the [`dataBound`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/databound) event of the Grid.
1. Iterate through each group by calling [`collapseGroup`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/collapsegroup) for it.

```dojo
<div id="grid"></div>

<script>
    $("#grid").kendoGrid({
        columns: [
            { field: "productName" },
            { field: "category" }
        ],
        dataSource: {
            data: [
                { productName: "Tea", category: "Beverages" },
                { productName: "Coffee", category: "Beverages" },
                { productName: "Ham", category: "Food" },
                { productName: "Bread", category: "Food" },
                { productName: "Bread", category: "abc" }
            ],
            group: { field: "category" }
        },
        groupable: true,
        dataBound: function (e) {
            var grid = this;
            $(".k-grouping-row").each(function (e) {
                grid.collapseGroup(this);
            });
        }
    });
</script>
```
