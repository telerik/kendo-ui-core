---
title: Group Paging
page_title: Group Paging Overview 
description: "Learn how to enable the group paging in the Telerik UI for {{ site.framework }} Grid by Kendo UI and load groups on demand."
slug: htmlhelpers_grid_aspnet_grouping
---

# Group Paging Overview

The group paging functionality allows you to load groups on demand and page through the groups at the same time. 

By default, the groups are rendered collapsed and each row signifies one item from the page. When you expand a group row the grid inserts new rows to the current page or moves them to the next one if they do not fit the `PageSize()` specified, followed by the rest of the group rows. 

## Getting Started

To enable group paging, use the `GroupPaging()` method as part of the data source configuration, add a `Group()` and a `PageSize()` to see the result.

    .DataSource(dataSource => dataSource
        .Ajax()
        .GroupPaging(true)
        .PageSize(50)
        .Read(read => read.Action("AllCustomers", "Grid"))
        .Group(x =>
        {
           x.Add(y => y.City);
        })
    )   

## Using with Virtual Scrolling

Group paging can be used with virtual scrolling. This further improves the performance because the grid only renders as many rows as its page size. When a group row is expanded, the grid rows content is refreshed to show the new rows within the current page. 

All [limitations]({% slug virtual_scrolling_aspnetcore_grid%}#known-limitations) of the virtual scrolling functionality apply.

## Using with Paging

When you use group paging with paging, the grid pager updates its total based on the current number of rows. Two kinds of paging occur:

* You can page the grouped rows available on other pages.
* You can expand a group thus inserting new rows in the total. The new rows precede the rest of the group rows and other items in the view.

## Using with Remote Data

The built-in [`data source types`]({% slug htmlhelper_datasourcetypes_aspnetcore %}) use server operations by default. To facilitate the group paging functionality, the grid data source sends the following additional parameters: `take`, `skip`, `groupPaging`. When a row is expanded, one or two requests will be issued. 

- If the currently expanded row does not have subgroups, only one request is sent with the `filter` parameter containing the group and subgroup value for which the items are requested. 
- If the currently expanded row has subgroups, an additional request is sent with the `includeSubGroupCount` parameter prompting that the response must include the total of items in the sub group

## Expanded state

The expanded state of groups is preserved during paging only, but not if sort or filter are applied.

## Known Limitations

- The group paging functionality is not supported for endless scrolling enabled grids.
- If using in combination with virtual scrolling, all [limitations]({% slug virtual_scrolling_aspnetcore_grid%}#known-limitations) of the virtual scrolling functionality apply.
- Group paging is not compatible with SignalR binding

## See Also

* [Virtual Scrolling of the Grid]({% slug virtual_scrolling_aspnetcore_grid %})
