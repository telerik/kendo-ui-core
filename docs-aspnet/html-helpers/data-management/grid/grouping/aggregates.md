---
title: Aggregates
page_title: Aggregates
description: "Get started with the Telerik UI Grid component for {{ site.framework }} and group its data by using aggregate functions."
components: ["grid"]
slug: aggregates_aspnetcore_grid
position: 2
---

# Aggregates

The Telerik UI Grid for {{ site.framework}} component provides built-in aggregates for a grand total row and also column values based on [grouping]({%slug htmlhelpers_grid_aspnetcore_grouping%}).

#### In this article:

* [Available Aggregate Functions](#available-aggregate-functions)
* [Where You Can Use Aggregates](#where-you-can-use-aggregates)
* [How to Enable Aggregates](#how-to-enable-aggregates)
* [Notes](#notes)
{% if site.mvc %}
* [Server Aggregates](#server-aggregates)
{% endif %}

## Available Aggregate Functions

The Telerik UI DataSource used by the Grid exposes several built-in aggregate functions:

* `Average`
* `Count`
* `Max`
* `Min`
* `Sum`

The `Count` aggregate can be applied to any type of field. The other aggregates can only be applied to numerical fields (e.g., `int`, `decimal`, `double`, etc.).

## Where You Can Use Aggregates

Aggregates can be used for the entire grid via:

* `ClientFooterTemplate` of a `GridColumn` - a grand total row of footers for the entire grid.

Or, to each individual group via: 

* `ClientGroupFooterTemplate` of a `GridColumn` - a footer in the respective column that renders when the grid is grouped.
* `ClientGroupHeaderColumnTemplate` of a `GridColumn` - a header in the respective column that renders when the grid is grouped by that column. The `value` field in the context carries the current group value.

## How to Enable Aggregates

To enable aggregates:

1. Inside the `Aggregates` option of the data source, define the field and aggregate function.
1. Use the aggregate result in the templates that support it - their `context` is strongly typed and carries the aggregate values in the respective fields.
1. Set the grid's `Groupable` property to `true`.
    * If you will be using only `FooterTemplate`s - grouping is not required.
1. Group the grid to see the effect on group-specific templates.


    ```HtmlHelper
        @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.ProductViewModel>()
            .Name("grid")
            .Columns(columns =>
            {
                columns.Bound(p => p.ProductName)
                    .ClientGroupFooterTemplate("Product: #=count#");        
                columns.Bound(p => p.UnitPrice).Format("{0:C}")
                    .ClientFooterTemplate("Total price: #=sum#");
                columns.Bound(p => p.UnitsInStock)
                    .ClientGroupHeaderColumnTemplate("Units In Stock: #= value # (Count: #= count#)")
                    .ClientGroupFooterTemplate("<div>Min: #= min #</div><div>Max: #= max #</div>");
            })
            .Groupable()
            .Pageable()      
            .DataSource(dataSource => dataSource
                .Ajax()
                .Aggregates(aggregates =>
                {
                    aggregates.Add(p => p.ProductName).Count();
                    aggregates.Add(p => p.UnitPrice).Sum();
                    aggregates.Add(p => p.UnitsInStock).Min().Max().Count();
                })
                .Read(read => read.Action("AllProducts", "Grid"))
            )
        )
    ```

* [Example Demo Grid with grouping and aggregates](https://demos.telerik.com/{{ site.platform }}/grid/aggregates)

{% if site.mvc %}
## Server Aggregates

When the Telerik UI Grid for {{site.framework}} is configured for server-binding, the aggregates are also calculated on the server-side. The whole grid content with the aggregates calculated are pushed as HTML to the client. 

To configure the grid to use server aggregates:

1. Set the `Server` DataSource type.

1. Add the `Aggregates` option.  

    ```HtmlHelper
        .DataSource(dataSource => dataSource
            .Server()
            .Aggregates(aggregates =>
            {
                aggregates.Add(p => p.UnitsInStock).Min().Max().Count();
                aggregates.Add(p => p.UnitsOnOrder).Average();
                aggregates.Add(p => p.ProductName).Count();
                aggregates.Add(p => p.UnitPrice).Sum();
            })
            //other options omitted for brevity.
        )
    ```

1. Use the aggregates inside the columns of the grid via the `FooterTemplate`, `GroupHeaderTemplate`, `GroupFooterTemplate`

    ```HtmlHelper
        @(Html.Kendo().Grid(Model)
            .Name("Grid")
            .Columns(columns =>
            {
                columns.Bound(p => p.ProductName)
                    .FooterTemplate(@<text>Total Count: @item.Count</text>)
                    .GroupFooterTemplate(@<text>Count: @item.Count</text>);            
                columns.Bound(p => p.UnitPrice).Format("{0:C}");
                columns.Bound(p => p.UnitsOnOrder)
                    .FooterTemplate(@<text>Average: @item.Average</text>)
                    .GroupFooterTemplate(@<text>Average: @item.Average</text>);
                columns.Bound(p => p.UnitsInStock)
                    .FooterTemplate(@<text><div>Min: @item.Min </div><div>Max: @item.Max </div></text>)
                    .GroupHeaderTemplate(@<text>@item.Title: @item.Key (Count: @item.Count)</text>)
                    .GroupHeaderColumnTemplate(@<text>Count: @item.Count </text>);
            })
            //other options omitted for brevity.
        )
    ```

* [(Demo) Grid with server aggregates](https://demos.telerik.com/{{ site.platform }}/grid/serveraggregates)

{% endif %}

## Notes

* You should define only aggregates that you will use to avoid unnecessary calculations that may be noticeable on large data sets.
* If you try to use an aggregate that is not defined, or an aggregate over an unsupported field type, a JavaScript exception will be thrown.
* When using local data (serveroperation="false"), grouping and aggregation are handled entirely on the client. If the DataSource is pre-grouped, Kendo expects the data to already include aggregates for fields used in groupFooterTemplate, groupHeaderTemplate, or footerTemplate. Without listed aggregates, the grid doesn't compute them during grouping—sums are undefined, leading to errors.

## See Also

{% if site.core %}
* [ASP.NET Core DataGrid Homepage](https://www.telerik.com/aspnet-core-ui/grid)
{% endif %}
* [Grouping with Aggregates by the Grid (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/aggregates)
* [Group Templates]({% slug group_templates_grid_aspnetcore %})
