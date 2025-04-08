---
title: Show or Hide Grid Aggregates
description: An example of how to show and hide the aggregates in the {{ site.product }} Grid.
type: how-to
page_title: Show or Hide Grid Aggregates
slug: grid-show-hide-aggregates
tags: mvc, core, grid, show, hide, aggregates
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }} Grid</td>
 </tr>
 <tr>
  <td>Progress {{ site.product }} version</td>
  <td>Created with the 2022.2.621 version</td>
 </tr>
</table>

## Description

How to show and hide the aggregates in the {{ site.product }} Grid? 

## Solution

1. Hook up for the event that, when triggered, will toggle the aggregates. The example below uses the [`Change`](https://docs.telerik.com/kendo-ui/api/javascript/ui/switch/events/change) event of the [Switch](https://demos.telerik.com/aspnet-core/switch) component.
1. Show or hide the aggregates based on a condition. To set up the aggregates, you can use the [`aggregate`](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource/methods/aggregate) method of the [DataSource](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource). To show or hide the aggregates, you can change the value of the template. The example below uses the [`footerTemplate`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/columns.footertemplate) of the Grid in which the aggregate values are displayed.

```Razor Index.cshtml
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
```JS script.js
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

## More {{ site.framework }} Grid Resources

* [{{ site.framework }} Grid Documentation]({%slug htmlhelpers_grid_aspnetcore_overview%})

* [{{ site.framework }} Grid Demos](https://demos.telerik.com/{{ site.platform }}/grid/index)

{% if site.core %}
* [{{ site.framework }} DataGrid Product Page](https://www.telerik.com/aspnet-core-ui/grid)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiforcore%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-core-ui)

{% else %}
* [{{ site.framework }} Grid Product Page](https://www.telerik.com/aspnet-mvc/grid)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)
{% endif %}

## See Also

* [Telerik REPL: Show or Hide Grid Aggregates](https://netcorerepl.telerik.com/cGECaibw09Q1ou3W10)
* [Client-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
* [Server-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/grid)
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
