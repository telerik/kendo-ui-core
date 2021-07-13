---
title: Scrolling
page_title: jQuery ListView Documentation | Scrolling
description: "Get started with the jQuery ListView by Kendo UI and learn how to enable its scrolling functionality."
slug: scrolling_kendoui_listview_widget
position: 6
---

# Scrolling

By default, the scrolling functionality of the ListView is disabled.

## Getting Started

To enable the scrolling functionality, set the `scrollable` property. If `scrollable` is set to `true` and the content exceeds the [height](/api/javascript/ui/listview/configuration/height) value of the ListView, the widget will display a scrollbar.

    $("#listview").kendoListView({
        scrollable: true,
        height: 350,
        // other configuration
    });

## Endless Scrolling

The endless scrolling functionality enables the ListView to display large amounts of data by appending additional pages of data on demand. The loading of new items happens when the scrollbar of the ListView reaches its end. When the data is returned, only the new items are rendered and appended to the old ones. The endless scrolling of the ListView works with both local and remote data.

Endless scrolling also works with editing&mdash;when the ListView is in its endless scroll mode and an item is opened for editing, that item will remain opened even after a new page is requested.

To enable endless scrolling, set the [`scrollable`](/api/javascript/ui/listview/configuration/scrollable) property to `endless`.

The ListView supports endless scrolling regardless of whether it is bound to local or remote data:
* When bound to local data arrays, the ListView serializes all items to the client and while the user is scrolling, the widget displays new items.
* When bound to remote data, the ListView serializes only the items for one page. When the user scrolls to the end of the list, the ListView sends an AJAX request to get the items for the next page. When the data is returned, the ListView renders only the new items and appends them to the old ones.

    $("#listview").kendoListView({
        scrollable: "endless",
        height: 350,
        // Other configuration.
    });

## See Also

* [Basic Usage of the ListView (Demo)](https://demos.telerik.com/kendo-ui/listview/index)
* [JavaScript API Reference of the ListView](/api/javascript/ui/listview)
