---
title: Positioning
page_title: Positioning
description: "Learn how to configure the position of the AppBar component for {{ site.framework }}."
slug: htmlhelpers_appbar_aspnetcore_position
position: 3
---

# Positioning

The AppBar allows you to set its [Position](#position) and its [Position mode](#position-mode).

## Position

The `Position` option of the AppBar defines where the component has to be positioned on the page. The available position options are:

* `None`&mdash;No positioning CSS styles are applied.
* `Top`&mdash;Places the AppBar at the top of the page.
* `Bottom`&mdash;Places the AppBar at the bottom of the page.

## Position Mode

The `PositionMode` option defines the position of the component relative to its parent container or viewport. The predefined position modes are:

* `Static`&mdash;Positions the AppBar according to the normal flow of the page.
* `Sticky`&mdash;Sticks the AppBar to a given position (top or bottom).
* `Fixed`&mdash;Positions the AppBar relative to the viewport.

> To use the `Sticky` or `Fixed` position mode of the AppBar, the `Position` has to be set either to `Top` or `Bottom`.

## See Also

* [Positioning of the AppBar HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/appbar/position)
* [Server-Side API](/api/appbar)
