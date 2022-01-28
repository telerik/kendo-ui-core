---
title: Items
page_title: jQuery ContextMenu Documentation | Items
description: "Get started with the jQuery ContextMenu by Kendo UI and configure the items of the widget."
slug: items_kendoui_contextmenu
position: 4
---

# Items

The [API of the ContextMenu](/api/javascript/ui/contextmenu) provides methods for dynamically adding or removing Menu items.

To add items, provide the new item as a JSON object along with a reference item. A reference item is a target ContextMenu item HTML element that already exists in the ContextMenu. The reference item will be used to determine the placement in the hierarchy of the new item. Any valid jQuery selector can be used to obtain a reference to the target item.

For more information on configuring Menu items, see the [Menu API demos](https://demos.telerik.com/kendo-ui/web/menu/api.html).

The following example demonstrates how to add a new root ContextMenu item.

    <ul id="context-menu">
        <li>Item 1</li>
        <li>Item 2</li>
    </ul>
    <script>
        var contextMenu = $("#context-menu").kendoContextMenu().data("kendoContextMenu");
        contextMenu.insertAfter(
            { text: "New ContextMenu Item" },
            contextMenu.element.children("li:last")
        );
    </script>

## See Also

* [Basic Usage of the ContextMenu (Demo)](https://demos.telerik.com/kendo-ui/menu/context-menu)
* [JavaScript API Reference of the Menu](/api/javascript/ui/menu)
