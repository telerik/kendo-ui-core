---
title: Add Row Numbers to a Grid Column
page_title: Add Row Numbers in a Grid Column
description: "An example on how to add row numbers in the {{ site.product }} Grid."
type: how-to
slug: grid-row-number
tags: progress, telerik, aspnet, mvc, core, grid, add, row, numbers
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.prodcut }} Grid</td>
 </tr>
 <tr>
  <td>Progress {{ site.product }} version</td>
  <td>Created with the 2022.2.621 version</td>
 </tr>
</table>

## Description

How can I implement row numbers in a {{ site.product }} Grid?

## Solution

To achieve the desired scenario, use the [`page()`](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource/methods/page) and [`pageSize()`](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource/methods/pagesize) methods of the Data Source.

```Grid.cshtml
        @(Html.Kendo().Grid<App.Models.OrderViewModel>()
            .Name("grid")
            .Columns(columns =>
            {
                columns.Template(@<text></text>).ClientTemplate("#= getRecord() #");
                columns.Bound(p => p.OrderID).Filterable(false);
            })
            .Pageable()
            .Events(ev=>ev.DataBinding("onDataBinding"))
            .DataSource(dataSource => dataSource
                .Ajax()
                .PageSize(20)
                .Read(read => read.Action("Orders_Read", "Grid"))
            )
        )
```
```script.js
    var record = 0;
    function getRecord() {
        record += 1;
        return record
    }
    function onDataBinding() {
        record = (this.dataSource.page() - 1) * this.dataSource.pageSize();
    }
```

## See Also

* [Grid Overview Demo](https://demos.telerik.com/aspnet-mvc/grid)
* [Grid Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
