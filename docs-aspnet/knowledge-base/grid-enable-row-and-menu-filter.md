---
title: Enable the Menu and Row Filter Mode in the Grid
page_title: Enable the Menu and Row Filter Mode in the Grid
description: "An example on how to enable the menu and row filter mode in the {{ site.product }} Grid."
slug: grid-enable-row-and-menu-filter
tags: telerik, grid, filter, row, menu, mode
component: grid
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }} Grid</td>
 </tr>
 <tr>
  <td>Progress {{ site.product }} version</td>
  <td>Created with the 2022.2.802 version</td>
 </tr>
</table>

## Description

How can I enable both the row and menu filter modes in the {{ site.product }} Grid? 

## Solution

To achieve the desired behavior, change the options of the Grid and enable both the menu and row filter modes by using the [`setOptions()`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/setoptions) method.


```Index.cshtml

@(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.OrderViewModel>()
    .Name("grid")
    .Columns(columns =>
    {
        columns.Bound(p => p.OrderID);
        columns.Bound(p => p.ShipName);
        columns.Bound(p => p.OrderDate);
    })
    .Pageable()
    .DataSource(dataSource => dataSource
        .Ajax()
        .PageSize(20)
        .Read(read => read.Action("Orders_Read", "Grid"))
     )
)

```
```Script.js
    <script>
        $(document).ready(function () {
            let grid = $("#grid").data("kendoGrid")
            let opt = grid.getOptions();
            opt.filterable = { mode: "row,menu" };
            grid.setOptions(opt)
        })
    </script>
```


For the complete implementation of the suggested approach, refer to the [Telerik REPL example on enabling the menu and row filter modes in the Grid](https://netcorerepl.telerik.com/GcPbQvbH48if6J6G15).

## See Also 

* [API Reference of the Grid](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)