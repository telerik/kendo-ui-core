---
title: Positioning
page_title: jQuery AppBar Documentation | Positioning
description: "Learn how to configure the position of the jQuery AppBar widget."
slug: position_kendoui_appbar_widget
position: 3
---

# Positioning

The AppBar widget enables you to set its [position](#position) and its [position mode](#position-mode).

## Position

The `position` option of the Kendo UI AppBar defines where the widget has to be positioned on the page. The predefined position options are the following:

* `none` - no positioning CSS style are applied
* `top` - places the AppBar at the top of the page
* `bottom` - places the AppBar at the bottom of the page

## Position Mode

The `positionMode` option defines the position of the widget relative to its parent container or viewport. The predefined **Position Mode** options are the following::

* `static` - positions the AppBar according to the normal flow of the page.
* `sticky` - sticks the AppBar to a given position(top or bottom).
* `fixed`- positions the AppBar relative to the viewport.

> In order to use the `sticky` or `fixed` position mode of the AppBar, the `position` has to be set either to `top` or `bottom`.

## See Also

* [Positioning of the AppBar (Demo)](https://demos.telerik.com/kendo-ui/appbar/position)
* [JavaScript API Reference of the AppBar](/api/javascript/ui/appbar)
