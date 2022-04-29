---
title: Endless Scrolling
page_title: Endless Scrolling
description: "Get started with the Telerik UI Grid component for {{ site.framework }} supporting endless scrolling mode suitable for displaying large number of items."
slug: endless_scrolling_aspnetcore_grid
position: 3
---

# Endless Scrolling

Endless scrolling is suitable when you display large number of items and use editing, grouping, filtering, sorting, or hierarchy.

For a runnable example, refer to the [demo on endless scrolling of remote data in the Grid](https://demos.telerik.com/{{ site.platform }}/grid/endless-scrolling-remote).

## Getting Started

To enable endless scrolling, set the [`Scrollable.Endless(true)`](/api/Kendo.Mvc.UI.Fluent/GridScrollSettingsBuilder#endlesssystemboolean) property to `true`.

> For the functionality to work as expected, provide for the following requirements:
> - Implement a vertical scrollbar.
> - Set a constant height to the Grid.

The Grid supports endless scrolling both when it is bound to local and remote data:
* When bound to local data arrays, the Grid serializes all items to the client and while the user scrolls, the widget displays new items.
* When bound to remote data, the Grid serializes only the items for one page. When the user scrolls to the end of the list, the Grid sends an AJAX request to get the items for the next page. When the data is returned, the Grid renders only the new items and appends them to the old ones.

```HtmlHelper
    @(Html.Kendo().Grid<AspNetCoreGrid.Models.OrderViewModel>()
        .Name("grid")
        .Scrollable(sc => sc.Endless(true))
        /* Other configuration. */
    )
```
{% if site.core %}
```TagHelper
    <kendo-grid name="grid" >
        <scrollable enabled="true" endless="true"/>
        <!--Other configuration.--> 
    </kendo-grid>
```
{% endif %}

## Using with Editing

Endless scrolling works with editing in a similar way as it works with regular paging. However, when you use endless scrolling together with editing and an item is opened for editing, that item will remain opened even after a new page is requested.

## Using with Grouping

Out of the box, endless scrolling works together with grouping. However, when the two features are used together, the Grid behaves in the following specific way:
* If the Grid is scrolled to the bottom, the number of the items it will request will be equal to the number of items on the page size.
* If the last group of items is collapsed, the Grid will still make requests for the items from that group.
* If a group of items spans across multiple pages, the Grid will make multiple requests.
* When a particular subset of items is returned, the items will be rendered and hidden because the group is collapsed. The Grid will continue to request the items until a new group is reached or until none of the items are present for to be requested.

## Using with Hierarchy

If the Grid displays hierarchical data and an item gets expanded, it will not be collapsed when the items are scrolled, and a new page will be requested.

> The filtering, sorting, and grouping operations reset the scroll position.

## Using with DataSource Operations

When a filter, sort, or group is applied through the [`DataSource` methods](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource#methods) and not through the Grid UI, the scroll position will not be automatically reset.

In such cases, you have to manually update the scroll position and [`pageSize`](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource/configuration/pagesize).

```HtmlHelper
    @(Html.Kendo().Grid<AspNetCoreGrid.Models.OrderViewModel>()
        .Name("grid")
        .Scrollable(sc => sc.Endless(true))
        /* Other configuration. */
    )

    <script>
        let grid = $("#grid").data("kendoGrid");

        // Reset the scroll position and update the pageSize before invoking the operation.
        grid.dataSource.options.endless = null;
        grid._endlessPageSize = grid.dataSource.options.pageSize;
        grid.dataSource.pageSize(grid.dataSource.options.pageSize);
        
        // Apply a filter, sort, or group after that.
        let filter = {field: "exampleField", operator: "eq", value: "example value"}
        grid.dataSource.filter(filter);
    </script>
```
{% if site.core %}
```TagHelper
    <kendo-grid name="grid" >
        <scrollable enabled="true" endless="true"/>
        <!--Other configuration.--> 
    </kendo-grid>

    <script>
        let grid = $("#grid").data("kendoGrid");

        // Reset the scroll position and update the pageSize before invoking the operation.
        grid.dataSource.options.endless = null;
        grid._endlessPageSize = grid.dataSource.options.pageSize;
        grid.dataSource.pageSize(grid.dataSource.options.pageSize);
        
        // Apply a filter, sort, or group after that.
        let filter = {field: "exampleField", operator: "eq", value: "example value"}
        grid.dataSource.filter(filter);
    </script>
```
{% endif %}

## Known Limitations

Either enable endless scrolling or paging, and do not use both features simultaneously.

## See Also

* [Endless Scrolling of Remote Data by the Grid HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/endless-scrolling-remote)
* [Server-Side API](/api/grid)
