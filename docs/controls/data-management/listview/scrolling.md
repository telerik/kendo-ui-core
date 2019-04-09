---
title: Scrolling
page_title: jQuery ListView Documentation | Scrolling | Kendo UI
description: "Get started with the jQuery ListView by Kendo UI supporting scrolling functionality."
slug: scrolling_kendoui_listview_widget
position: 3
---

# Scrolling

By default, the scrolling functionality of the Kendo UI ListView is disabled. To control scrolling in the Grid, use the `scrollable` property.

If set to `true` the listview will display a scrollbar when the content exceeds the listview [height](/api/javascript/ui/listview/configuration/height) value. By default scrolling is disabled.

###### Example

    $("#listview").kendoListView({
        scrollable: true,
        height: 350,
        // other configuration
    });

## Endless Scrolling

The endless scrolling functionality enables the Kendo UI ListView to display large amounts of data by appending additional pages of data on demand. The loading of new items happens when the scrollbar of the ListView reaches its end. When the data is returned, only the new items are rendered and appended to the old ones. The endless scrolling of the ListView works with both local and remote data.

To enable endless scrolling, set the [`scrollable`](/api/javascript/ui/listview/configuration/scrollable) property to `endless`.

The ListView supports endless scrolling both when it is bound to local and remote data:
* When bound to local data arrays, the ListView serializes all items to the client and while the user scrolls, the widget displays new items.
* When bound to remote data, the ListView serializes only the items for one page. When the user scrolls to the end of the list, the ListView sends an AJAX request to get the items for the next page. When the data is returned, the ListView renders only the new items and appends them to the old ones.

###### Example

    $("#listview").kendoListView({
        scrollable: "endless",
        height: 350,
        // other configuration
    });


## Using with Editing

Endless scrolling works with editing. When endless scrolling is used together with editing and an item is opened to be edited, that item will remain opened even after a new page is requested.

## See Also

* [ListView JavaScript API Reference](/api/javascript/ui/listview)
* [Kendo UI Knowledge Base](/knowledge-base)