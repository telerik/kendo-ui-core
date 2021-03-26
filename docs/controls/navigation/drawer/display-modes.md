---
title: Display Modes
page_title: jQuery Drawer Documentation | Display Modes
description: "Get started with the jQuery Drawer by Kendo UI and use its display modes and handle its rendering."
slug: displaymodes_kendoui_drawer
position: 2
---

# Display Modes

The Drawer provides a set of modes for handling the way it is displayed.

## Overlay Mode

The overlay mode is not associated with any content. The Drawer appears on top of the page contents from the side which is configured in the [`position`](/api/javascript/ui/drawer/configuration/position) setting. To show the Drawer, either swipe or drag with mouse or call the [`show()`](/api/javascript/ui/drawer/methods/show) method of the Drawer. The Drawer closes on click or tap of any of the options or on the overlay.

## Push Mode

The push mode is associated with specific page content and the element from which the widget is initialized has to wrap that content. When the drawer opens it will push that content to the side. It is designed for wider screens (desktop or tablet). To show the Drawer, either swipe or drag with mouse, or call the [`show()`](/api/javascript/ui/drawer/methods/show) method of the Drawer. The Drawer closes on click or tap of any of the options or on the associated content.

The height of the Drawer is determined by the higher content of the template of the widget or of the wrapped content with which it is associated. You can use the [`minHeight`](/api/javascript/ui/drawer/configuration/minheight) setting to prevent the content from changing its height as the user toggles the drawer options.

## Mini Mode

You can use the `mini` option both with the overlay and push modes by adding a the [`mini`](/api/javascript/ui/drawer/configuration/mini) configuration option. If set to `true`, it will use the default width of `50px` and the main template. You can set it to an object and change both the partially visible `mini.width` and `mini.template`.

## See Also

* [Mini Display Mode by the Drawer (Demo)](https://demos.telerik.com/kendo-ui/drawer/mini)
* [JavaScript API Reference of the Drawer](/api/javascript/ui/drawer)
