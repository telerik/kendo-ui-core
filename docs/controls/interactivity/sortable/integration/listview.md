---
title: ListView
page_title: jQuery Sortable Documentation | ListView Integration
description: "Get started with the jQuery Sortable by Kendo UI and integrate the widget with the Kendo UI ListView."
slug: integrationwith_listview_sortable
---

# ListView Integration

You can use the [Kendo UI Sortable widget](https://demos.telerik.com/aspnet-core/sortable/index) to reorder the items in a ListView by dragging and dropping.

## Prerequisites

* [Overview of the Kendo UI Sortable widget]({% slug overview_kendoui_sortable_widget %})
* [Overview of Kendo UI ListView widget]({% slug overview_kendoui_listview_widget %})
* [API reference of the Kendo UI DataSource component](/api/javascript/data/datasource#methods)

## Reordering of Sortable Items

The Sortable reorders the HTML DOM elements. It does not automatically update the order of the items in the DataSource. This means that you have to explicitly implement the desired behavior.

## Reordering of ListView Items

To reorder the items of the ListView, initialize the Sortable on the ListView element. Specify the list items using the `filter` property -- select all elements that are direct children of the ListView content element, for example, `.filter(".k-listview-content > div")`.

## Reordering in Editable ListViews

If the editing functionality of the ListView is enabled, use a more specific filter selector that excludes the item which is currently in editing mode, for example, `.filter(".k-listview-content > div:not(.k-edit-item)"`. In this way, the Sortable functionality will not interfere with the editing feature of the ListView.

To reorder the data items of the ListView, use the [approach for reordering the Grid data items]({% slug integrationwith_grid_sortable %}#reordering-of-grid-table-rows). For more information on the Sortable events, refer to the [Sortable API](/api/javascript/ui/sortable#events) and the [demo on integrating the Sortable with the ListView](https://demos.telerik.com/kendo-ui/web/sortable/integration-listview.html).

## See Also

* [ListView Integration of the Sortable (Demo)](https://demos.telerik.com/kendo-ui/sortable/integration-listview)
* [JavaScript API Reference of the Sortable](/api/javascript/ui/sortable)
