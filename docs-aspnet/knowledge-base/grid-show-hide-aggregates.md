---
title: Show/Hide Grid aggregates
description: "An example of how to show and hide the aggregates in the {{ site.product }} Grid."
type: how-to
page_title: Show/Hide Grid aggregates
slug: grid-show-hide-aggregates
tags: mvc, core, grid, show, hide, aggregates
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

How to show and hide the aggregates in the {{ site.product }} Grid? 

## Solution

1. Hook up for the event that, when triggered, should toggle the aggregates. (In the example is used the [Change](https://docs.telerik.com/kendo-ui/api/javascript/ui/switch/events/change) event of the [Switch](https://demos.telerik.com/aspnet-core/switch) component)
1. Based on a condition show/hide the aggregates. To set up the aggregates, you can use the [aggregate](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource/methods/aggregate) method of the [DataSource](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource). To show/hide the aggregates you can change the value of the template (In the example [footerTemplate](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/columns.footertemplate) of the Grid) in which the aggregate values are displayed.

```Index.cshtml
    @(Html.Kendo().Switch()
        .Name("switch")
        .Events(e => e.Change("onChange"))
        .Messages(c => c.Checked("Show Aggregates").Unchecked("Hide Aggregates"))
        .HtmlAttributes(new {style = "width:150px"})
    )

    @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.ProductViewModel>()
        .Name("grid")
        .Columns(columns =>
        {
            columns.Bound(p => p.ProductName);
            columns.Bound(p => p.UnitsInStock).Width(100);
            columns.Bound(p => p.Discontinued).Width(100);
            columns.Bound(p => p.UnitPrice).Width(100);
        })
        .Pageable()
        .Scrollable()
        .HtmlAttributes(new { style = "height:430px;" })
        .DataSource(dataSource => dataSource
            .Ajax()
            .PageSize(20)
            .Read(read => read.Action("EditingInline_Read", "Grid"))
        )
    )
```
```Script.js
    function onChange(e){
        var grid = $("#grid").data("kendoGrid");

        if(e.checked){
            var aggregates = [{ field: "UnitPrice", aggregate: "sum"}];
            grid.dataSource.aggregate(aggregates);
            grid.columns[3].footerTemplate = "Sum: #=data.UnitPrice.sum == 0?'Calculating':data.UnitPrice.sum#";
            grid.setOptions({
                columns: grid.columns
            });
        }
        else{
            grid.columns[3].footerTemplate = "";
            grid.setOptions({
                columns: grid.columns
            });
            grid.dataSource.aggregate([]);
        }
    }
```

For the complete implementation of the suggested approach, refer to the following [Telerik REPL](https://netcorerepl.telerik.com/cGECaibw09Q1ou3W10) example.