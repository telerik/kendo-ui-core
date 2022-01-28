---
title: Items
page_title: jQuery Menu Documentation | Items
description: "Get started with the jQuery Menu by Kendo UI and configure the items of the widget."
slug: items_kendoui_menu
position: 4
---

# Items

The Menu provides options for dynamically adding and removing its items.

To add items, provide the new item as a JSON object along with a reference item. A reference item is a target Menu item HTML element that already exists in the Menu. The reference item will be used to determine the placement in the hierarchy of the new item. Any valid jQuery selector can be used to obtain a reference to the target item. For more information, refer to the [demo on using the API of the Menu](https://demos.telerik.com/kendo-ui/menu/api).

The following example demonstrates how to add a new root Menu item.

    <ul id="menu"></ul>

    <script>
        var menu = $("#menu").kendoMenu().data("kendoMenu");
        menu.insertAfter(
            { text: "New Menu Item" },
            menu.element.children("li:last")
        );
    </script>

## See Also

* [Basic Usage of the Menu (Demo)](https://demos.telerik.com/kendo-ui/menu/index)
* [Using the API of the Menu (Demo)](https://demos.telerik.com/kendo-ui/menu/api)
* [JavaScript API Reference of the Menu](/api/javascript/ui/menu)
