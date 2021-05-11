---
title: Positioning
page_title: Positioning
description: "Learn how to configure the position of the AppBar component."
slug: taghelpers_positioning_appbar_aspnetcore
position: 3
---

# Positioning

The AppBar widget enables you to set its [position](#position) and its [position mode](#position-mode).

## Position

The `position` option of the Kendo UI AppBar defines where the widget has to be positioned on the page. The `position` option of the Kendo UI AppBar defines where the widget is positioned on the page. The predefined position options are:

* `AppBarPosition.None` - no positioning CSS styles are applied
* `AppBarPosition.Top` - places the AppBar at the top of the page
* `AppBarPosition.Bottom` - places the AppBar at the bottom of the page

## Position Mode

The `position-mode` option defines the position of the widget relative to its parent container or viewport. The predefined **Position Mode** options are the following::

* `AppBarPositionMode.Static` - positions the AppBar according to the (normal flow)[https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Normal_Flow] of the page
* `AppBarPositionMode.Sticky` - sticks the AppBar to a given position (top or bottom)
* `AppBarPositionMode.Fixed`- positions the AppBar relative to the viewport

> In order to use the `Sticky` or `Fixed` position mode of the AppBar, the `position` has to be set either to `Top` or `Bottom`.

## See Also

* [Basic Usage of the AppBar TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/appbar/tag-helper)
* [JavaScript API Reference of the AppBar](/api/javascript/ui/appbar)
