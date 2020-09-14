---
title: Positioning
page_title: Positioning
description: "Learn how to configure the position of the AppBar HtmlHelper for {{ site.framework }}."
slug: htmlhelpers_appbar_aspnetcore_position
position: 3
---

# Positioning

The AppBar widget enables you to set its [Position](#position) and its [Position mode](#position-mode).

## Position

The `Position` option of the Telerik UI AppBar defines where the widget has to be positioned on the page. The predefined position options are the following:

* `None` - no positioning CSS style are applied
* `Top` - places the AppBar at the top of the page
* `Bottom` - places the AppBar at the bottom of the page

## Position Mode

The `PositionMode` option defines the position of the component relative to its parent container or viewport. The predefined **Position Mode** options are the following:

* `Static` - positions the AppBar according to the normal flow of the page.
* `Sticky` - sticks the AppBar to a given position(top or bottom).
* `Fixed`- positions the AppBar relative to the viewport.

> In order to use the `Sticky` or `Fixed` position mode of the AppBar, the `Position` has to be set either to `Top` or `Bottom`.

## See Also

* [Positioning of the AppBar (Demo)](https://demos.telerik.com/{{ site.platform }}/appbar/position)
* [Server-Side API](/api/appbar)
