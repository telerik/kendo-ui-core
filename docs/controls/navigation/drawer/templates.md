---
title: Templates
page_title: jQuery Drawer Documentation | Templates
description: "Get started with the jQuery Drawer by Kendo UI and use the available templates."
slug: templates_kendoui_drawer
position: 4
---

# Templates

To distinguish the items within the template when the user interacts with the Drawer, add the `data-role="drawer-item"` attribute to each item template.

To add a separator between the Drawer items, use the `data-role="drawer-separator"` attribute.

The Drawer provides the following configurable templates:
* The main [`template`](/api/javascript/ui/drawer/configuration/template).
* The [`mini.template`](/api/javascript/ui/drawer/configuration/mini.template).

You can add icons with a span with the `k-icon` class combined with the desired [Kendo UI for jQuery web font icon]({% slug webfonticons_kendoui_desktopwidgets %}#list-of-font-icons) class. To ensure that the icons and text have a sufficient padding, wrap the item template text in a span with class `k-item-text`.

    template: "<ul><li data-role='drawer-item'><span class='k-icon k-i-eye'></span><span class='k-item-text'>See More</span></li></ul>"

## See Also

* [Basic Usage of the Drawer (Demo)](https://demos.telerik.com/kendo-ui/drawer/index)
* [JavaScript API Reference of the Drawer](/api/javascript/ui/drawer)
