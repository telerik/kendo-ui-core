---
title: Collapse Groups in Grid by Default
description: An example on how to have groups in Grid collapsed by default.
type: how-to
page_title: Grid Groups Default Collapsed | Kendo UI Grid
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

I have grouping enabled in Grid and would like the Groups to be collapsed by default

## Solution

Handle the Grid [dataBound event](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid#events-dataBound) and iterate through each group calling [collapseGroup](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid#methods-collapseGroup) for it.



```html
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
