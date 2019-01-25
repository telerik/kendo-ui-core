---
title: Endless Scrolling
page_title: jQuery Grid Documentation | Endless Scrolling | Kendo UI
description: "Get started with the jQuery Grid by Kendo UI supporting endless scrolling mode suitable for displaying large number of items."
slug: endless_scrolling_kendoui_grid_widget
position: 3
---

# Endless Scrolling

The endless scroll mode is suitable for displaying large number of items while advanced features such as editing, grouping, filtering, sorting, and hierarchy can also be applied.

## Getting Started

To enable endless scrolling, set the [`scrollable.endless`](/api/javascript/ui/grid/configuration/scrollable.endless) property to `true`.

The Grid supports endless scrolling both when it is bound to local and remote data:
* When bound to local data arrays, the Grid serializes all items to the client and while the user scrolls, the widget displays new items.
* When bound to remote data, the Grid serializes only the items for one page. When the user scrolls to the end of the list, the Grid sends an AJAX request to get the items for the next page. When the data is returned, the Grid renders only the new items and appends them to the old ones.

###### Example

    $("#grid").kendoGrid({
        scrollable: {
            endless: true
        },
        // other configuration
    });


## Using with Editing

Endless scrolling works with editing in a similar way as it works with regular paging. However, when endless scrolling is used together with editing and an item is opened to be edited, that item will remain opened even after a new page is requested.

## Using with Grouping

Out of the box, endless scrolling works together with grouping. However, when the two features are used together, the Grid behaves in the following specific way:
* If the Grid is scrolled to the bottom, the number of the items it will request will be equal to the number of items and the page size.
* If the last group of items is collapsed, the Grid will still make requests for the items from that group.
* If a group of items spans across multiple pages, the Grid will make multiple requests.
* When a particular subset of items is returned, the items will be rendered and hidden because the group is collapsed. The Grid will continue to request the items until a new group is reached or until none of the items are present for to be requested.

If the Grid is bound to remote data, enable `serverGrouping` to apply grouping to all items.

## Using with Hierarchy

If the Grid displays hierarchical data and an item gets expanded, it will not be collapsed when the items are scrolled and a new page will be requested.

> **Important**
>
> Operations, such as filtering, sorting, and grouping, reset the scroll position.

## See Also

* [Grid JavaScript API Reference](/api/javascript/ui/grid)
* [Kendo UI Knowledge Base](/knowledge-base)
