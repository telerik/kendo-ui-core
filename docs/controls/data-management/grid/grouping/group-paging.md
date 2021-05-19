---
title: Group Paging
page_title: jQuery Grid Documentation | GroupPaging Overview
description: "Learn how to enable the group paging in the jQuery Grid by Kendo UI and load groups on demand."
slug: grouppaging_kendoui_grid_widget
---

# Group Paging Overview

The group paging functionality allows you to load groups on demand and page through the groups at the same time. 

By default, the groups are rendered collapsed and each row signifies one item from the page. When you expand a group row the grid inserts new rows to the current page or moves them to the next one if they do not fit the `pageSize` specified, followed by the rest of the group rows. 

## Getting Started

To enable group paging, set the dataSource [`groupPaging`](/api/javascript/data/datasource/configuration/group#groupPaging) option to `true`, add a [`group`](/api/javascript/data/datasource/configuration/group) and a [`pageSize`](/api/javascript/data/datasource/configuration/pagesize) to see the result.

    $("#grid").kendoGrid({
         dataSource: new kendo.data.DataSource({
             groupPaging:true,
             group:{ field: "Country", dir: "asc"},
             pageSize:50
         }) 
         // Other configuration.
    });   

## Using with Virtual Scrolling

Group paging can be used with virtual scrolling. This further improves the performance because the grid only renders as many rows as its `pageSize`. When a group row is expanded, the grid rows content is refreshed to show the new rows within the current page. 

All [limitations]({% slug virtual_scrolling_kendoui_grid_widget%}#known-limitations) of the virtual scrolling functionality apply.

## Using with Paging

When you use group paging with paging, the grid pager updates its total based on the current number of rows. Two kinds of paging occur:

* You can page the grouped rows available on other pages.
* You can expand a group thus inserting new rows in the total. The new rows precede the rest of the group rows and other items in the view.

## Using with Remote Data

To use group paging with remote operations, ensure that all of the operations are preformed on the server - paging, sorting, filtering and aggregates.

    $("#grid").kendoGrid({
        dataSource: new kendo.data.DataSource({
            groupPaging:true,
            group:{ field: "Country", dir: "asc"},
            pageSize:50,
            serverPaging:true,
            serverSorting:true,
            serverFiltering:true,
            serverGrouping:true,
            serverAggregates:true             
        }) 
        // Other configuration.
    });

The grid data source will send the following additional parameters: `take`, `skip`, `groupPaging`. When a row is expanded, one or two requests will be issued. 

- If the currently expanded row does not have subgroups, only one request is sent with the `filter` parameter containing the group and subgroup value for which the items are requested. 
- If the currently expanded row has subgroups, an additional request is sent with the `includeSubGroupCount` parameter prompting that the response must include the total of items in the sub group

For more information about the response when using server grouping, check the [`schema.groups`](/api/javascript/data/datasource/configuration/schema#schemagroups) and the article for the data source grouping [here](/framework/datasource/basic-usage#server-grouping).

Alternatively, you can use the ASP.NET MVC or Core server-side extensions which perform all the data operations and group paging out of the box when used with the `aspnetmvc-ajax` and `webapi` transport type.

## Expanded state

The expanded state of groups is preserved during paging only, but not if sort or filter are applied.

## Known Limitations

- The group paging functionality is not supported for endless scrolling enabled grids.
- If using in combination with virtual scrolling, all [limitations]({% slug virtual_scrolling_kendoui_grid_widget%}#known-limitations) of the virtual scrolling functionality apply.
- Group paging is not compatible with SignalR binding

## See Also

* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
* [Virtual Scrolling of the Grid]({% slug virtual_scrolling_kendoui_grid_widget %})
