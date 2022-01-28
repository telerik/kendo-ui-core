---
title: Display Modes
page_title: Display Modes
description: "Use the display modes and handle the rendering of the Telerik UI Drawer HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: displaymodes_drawer_aspnetcoretaghelper
position: 2
---

# Display Modes

The Drawer provides a set of modes for handling the way it is displayed.  

## Overlay Mode

The overlay mode is not associated with any content. The Drawer appears on top of the page contents from the side which is configured in the [`Position()`](/api/drawer) method. To show the Drawer, either swipe or drag with mouse or call the [`show()`](https://docs.telerik.com/kendo-ui/api/javascript/ui/drawer/methods/show) method of the Kendo UI for jQuery widget. The Drawer closes on click or tap of any of the options or on the overlay.

## Push Mode

The push mode is associated with specific page content and the element from which the widget is initialized has to wrap that content. When the drawer opens it will push that content to the side. It is designed for wider screens (desktop or tablet). To show the Drawer, either swipe or drag with mouse, or call the [`show()`](https://docs.telerik.com/kendo-ui/api/javascript/ui/drawer/methods/show) method of the Kendo UI for jQuery widget. The Drawer closes on click or tap of any of the options or on the associated content.

The height of the widget is determined by the higher content of the template of the widget or of the wrapped content with which it is associated. You can use the [`MinHeight()`](/api/drawer) method  to prevent the content from changing its height as the user toggles the drawer options.

## Mini Mode

You can use the `Mini()` option both with the overlay and push modes by adding a the `Mini()` method. If set to `true`, a portion of the Drawer that is always visible occupies the default width of `50px` and the main template. If the `Mini()` configurator is used, the `Width()` and `Template()`/`TemplateId()` can also be changed.

     <mini width="100" template-id="mini-template"/>

## See Also

* [Server-Side API](/api/drawer)
