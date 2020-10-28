---
title: Endless Scrolling
page_title: jQuery Grid Documentation | Endless Scrolling
description: "Get started with the jQuery Grid by Kendo UI supporting endless scrolling mode suitable for displaying large number of items."
slug: endless_scrolling_kendoui_grid_widget
position: 3
---

# Endless Scrolling

Endless scrolling is suitable when you display large number of items and use editing, grouping, filtering, sorting, or hierarchy.

For runnable examples, refer to:
* [Demo on endless scrolling of local data by the Grid](https://demos.telerik.com/kendo-ui/grid/endless-scrolling-local)
* [Demo on endless scrolling of remote data by the Grid](https://demos.telerik.com/kendo-ui/grid/endless-scrolling-remote)

## Getting Started

To enable endless scrolling, set the [`scrollable.endless`](/api/javascript/ui/grid/configuration/scrollable.endless) property to `true`.

> For the functionality to work as expected there are two requirements:
> - There needs to be a vertical scrollbar
> - The height of the grid should be constant

The Grid supports endless scrolling both when it is bound to local and remote data:
* When bound to local data arrays, the Grid serializes all items to the client and while the user scrolls, the widget displays new items.
* When bound to remote data, the Grid serializes only the items for one page. When the user scrolls to the end of the list, the Grid sends an AJAX request to get the items for the next page. When the data is returned, the Grid renders only the new items and appends them to the old ones.

        $("#grid").kendoGrid({
            scrollable: {
                endless: true
            },
            // Other configuration.
        });


## Using with Editing

Endless scrolling works with editing in a similar way as it works with regular paging. However, when you use endless scrolling together with editing and an item is opened for editing, that item will remain opened even after a new page is requested.

## Using with Grouping

Out of the box, endless scrolling works together with grouping. However, when the two features are used together, the Grid behaves in the following specific way:
* If the Grid is scrolled to the bottom, the number of the items it will request will be equal to the number of items and the page size.
* If the last group of items is collapsed, the Grid will still make requests for the items from that group.
* If a group of items spans across multiple pages, the Grid will make multiple requests.
* When a particular subset of items is returned, the items will be rendered and hidden because the group is collapsed. The Grid will continue to request the items until a new group is reached or until none of the items are present for to be requested.

If the Grid is bound to remote data, enable `serverGrouping` to apply grouping to all items.

## Using with Hierarchy

If the Grid displays hierarchical data and an item gets expanded, it will not be collapsed when the items are scrolled and a new page will be requested.

> The filtering, sorting, and grouping operations reset the scroll position.

## KB Articles on Scrolling

* [Hiding the Vertical Scrollbar]({% slug howto_hide_vertical_scrollbar_grid %})
* [Find Out More in the Knowledge Base](/knowledge-base)

## See Also

* [Endless Scrolling of Local Data by the Grid (Demo)](https://demos.telerik.com/kendo-ui/grid/endless-scrolling-local)
* [Endless Scrolling of Remote Data by the Grid (Demo)](https://demos.telerik.com/kendo-ui/grid/endless-scrolling-remote)
* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
