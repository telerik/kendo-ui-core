---
title: Scrolling to a Specific Item
page_title: jQuery Grid Documentation - Scrolling to an Item
description: "Get started with the jQuery Grid by Kendo UI supporting programmatic scrolling to items."
slug: scroll-to-item_kendoui_grid_component
position: 4
---

# Scrolling to a Specific Item

You can programmatically scroll the Grid component to a specific item by using the built-in [`scrollToItem()`](/api/javascript/ui/grid/configuration/scrolltoitem) method.

Using the [`scrollToItem()`](/api/javascript/ui/grid/configuration/scrolltoitem) method requires you to configure the [`dataSource.Schema.model.id`](/api/javascript/data/datasource/configuration/schema#schemamodel).

## Scrolling to an Item by Passing the Id of the Item

To scroll to a specific data item, pass the `id` of the item to the [`scrollToItem()`](/api/javascript/ui/grid/configuration/scrolltoitem) method. 

    const grid = $("#grid").data("kendoGrid"); // Get an instance of the Grid.
    grid.scrollToItem(27); // Pass the id of the item to the method.


## Scroll to an Item in Virtual Scrolling Grid

You can scroll to an item that is not loaded yet in a [`Virtual Scrolling`]({% slug virtual_scrolling_kendoui_grid_widget %}) Grid by passing the `id` of the data item and a `callback` to the [`scrollToItem()`](/api/javascript/ui/grid/configuration/scrolltoitem) method.

The `callback` is an optional parameter, a function to be executed when virtual scrolling is enabled and the item to scroll is not loaded yet. The `callback` function must return the `index` of the item in the dataset.

    const grid = $("#grid").data("kendoGrid"); // Get an instance of the Grid.
    grid.scrollToItem(10403, function (options) { // Pass the id and a callback returning the index of the item.
        options.success(155);
    });

## Known Limitations

* Scrolling to an item does not combine with the Grid's [`Group Paging`]({% slug grouppaging_kendoui_grid_widget %}) functionality.
* Scrolling to an item does not work together with the Grid's [`Endless Scrolling`]({% slug endless_scrolling_kendoui_grid_widget %}) functionality.
* When the sum of the specified item's height and the height of all items afterward is less than the Grid's height the item to be scrolled to the top will not appear at the top. In non-virtualized Grids, the Grid will be scrolled to its bottom but the specified item will not appear at the top. In Grids with virtual scrolling, the Grid will be scrolled to the bottom of the current data set but the scroller will not be positioned at the bottom and the item will not be positioned at the top.

## KB Articles on Scrolling

* [Hiding the Vertical Scrollbar]({% slug howto_hide_vertical_scrollbar_grid %})
* [Find Out More in the Knowledge Base](/knowledge-base)

## See Also

* [Scroll to Item in the Grid (Demo)](https://demos.telerik.com/kendo-ui/grid/scroll-to-item)
* [Grid Virtual Scrolling Documentation]({% slug virtual_scrolling_kendoui_grid_widget %})
* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
