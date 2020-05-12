---
title: Tile Containers
page_title: Kendo UI for jQuery TileLayout Documentation | TileLayout Containers | Kendo UI
description: "Learn how to define the content and headers of the Kendo UI for jQuery TileLayout containers."
slug: containers_kendoui_tilelayout_widget
---

# Layout Containers

The Kendo UI TileLayout widget tiles are configured by using an array of container objects. 

## Dimensions

Each tile can span across several rows and columns. The space that the tile takes up is determined by its container [`rowSpan`](/api/javascript/ui/tilelayout/configuration/containers.rowspan) and [`colSpan`](/api/javascript/ui/tilelayout/configuration/containers.colspan).

## Headers

The tiles can be configured with our without headers. 

> Headers are required if using the `reorderable` functionality of the widget.

The headers render their content via the [`header.text`](/api/javascript/ui/tilelayout/configuration/containers.header.text) which is plain text or by utilizing a [`header.template`](/api/javascript/ui/tilelayout/configuration/containers.header.template).

## Body content

The main tile content is rendered from the [`bodyTemplate`](/api/javascript/ui/tilelayout/configuration/containers.bodytemplate) that can also be plain text or a complex template with widgets in it.

## See Also

* [Basic Usage of the TileLayout (Demo)](https://demos.telerik.com/kendo-ui/tilelayout/index)
* [JavaScript API Reference of the TileLayout](/api/javascript/ui/tilelayout)
* [Resizing]({% slug resizing_kendoui_tilelayout_widget %})
* [Reordering]({% slug reordering_kendoui_tilelayout_widget %})
