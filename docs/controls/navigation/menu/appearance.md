---
title: Appearance
page_title: jQuery Menu Documentation | Appearance
description: "Get started with the jQuery Menu by Kendo UI and manage its appearance."
slug: appearance_kendoui_menu
position: 5
---

# Appearance

The Menu renders as a `<ul>` element and expands horizontally by default.

If a horizontal Menu is wider than the total width of its root items, a blank space will remain visible on the right. To remove this space, use the CSS rules from the following example.

    #menu-id /* For a specific Menu instance. */
    ,
    .k-menu-horizontal /* For all horizontal Menus. */
    {
       display: inline-block;
    }

In left-to-right layouts, shrinking the horizontal Menu will cause the border of the last root item to touch the right border of the Menu. The following example demonstrates how to remove the last item border.

    #menu-id > .k-last /* For a specific Menu instance. */
    ,
    .k-menu-horizontal > .k-last /* For all horizontal Menus. */
    {
       border-width: 0;
    }

<!--*-->

## See Also

* [Basic Usage of the Menu (Demo)](https://demos.telerik.com/kendo-ui/menu/index)
* [Using the API of the Menu (Demo)](https://demos.telerik.com/kendo-ui/menu/api)
* [JavaScript API Reference of the Menu](/api/javascript/ui/menu)
