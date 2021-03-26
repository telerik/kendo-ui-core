---
title: Overview
page_title: Kendo UI for jQuery TileLayout Documentation | TileLayout Overview
description: "Get started with the Kendo UI for jQuery TileLayout and learn about its features and how to initialize the widget."
slug: overview_kendoui_tilelayout_widget
position: 1
---

# TileLayout Overview

The Kendo UI TileLayout widget allows you configure a two-dimensional grid-based sandbox surface to display content in tiles which can be dragged around and rearranged to create any modern page design.

It is based on the [CSS Grid](https://css-tricks.com/snippets/css/complete-guide-grid/)(with all its features) which covers the majority of cases and uses additional JavaScript logic to provide resizing, reordering and templates customizations.

* [Demo page for the TileLayout](https://demos.telerik.com/kendo-ui/tilelayout/index) 

## Initializing the TileLayout

To initialize the TileLayout, use the `<div>` tag. Specify the number of columns at root level and use the `rowSpan` and `colSpan` of the containers to position the content in the available grid space.

The example below will render a grid with two columns which can be resized both vertically and horizontally.


```dojo
    <div id="tilelayout"></div>

    <script>
        $("#tilelayout").kendoTileLayout({
            containers: [{
                colSpan: 1,
                rowSpan:1,
                header: {
                    text: "Item one"
                },
                bodyTemplate: "Item one body"
            }, {
                colSpan: 1,
                rowspan:1,
                header: {
                    text: "Item two"
                },
                bodyTemplate: "Item two body"
            }],
            columns: 3,
            height: 200,
            resizable: true
        });
    </script>
```

## Grid Layout configuration 

The Kendo UI TileLayout available grid space is defined by using the [`columns`](/api/javascript/ui/tilelayout/configuration/columns) property. The number of rows in which the tiles will be displayed will automatically adjust. The columns and rows have a default width of `1fr` which can be modified by using the [`columnsWidth`](/api/javascript/ui/tilelayout/configuration/columnswidth) and [`rowsHeight`](/api/javascript/ui/tilelayout/configuration/rowsheight) properties.

> The `rowsHeight` and `columnsWidth` properties value sets the maximum height/width the rows or columns of the widget will stretch to. Dependent on resizing, content and user interactions with the layout, they may be less than the set value.

## TileLayout configuration

Each tile can span across several rows and columns. The space that the tile takes up is determined by its container [`rowSpan`](/api/javascript/ui/tilelayout/configuration/containers.rowspan) and [`colSpan`](/api/javascript/ui/tilelayout/configuration/containers.colspan). For more information about the containers and their configurable properties, see the [containers]({% slug containers_kendoui_tilelayout_widget %}) article.

## Gaps

The grid lines between the rows and columns can be configured by specifying the [`gaps.columns`](/api/javascript/ui/tilelayout/configuration/gap.columns) for the vertical space between the tiles and the [`gaps.rows`](/api/javascript/ui/tilelayout/configuration/gap.rows) for the horizontal spacing.

These properties are also known as the gutters between the rows/columns.

## Referencing Existing Instances

To get a reference to an existing TileLayout instance:

1. Use the [`jQuery.data()`](https://api.jquery.com/jQuery.data/) method.
1. Once a reference is established, use the [TileLayout API](/api/javascript/ui/tilelayout) to control its behavior.

        var tilelayout = $("#tilelayout").data("kendoTileLayout");

## Functionality and Features

* [Resizing]({% slug resizing_kendoui_tilelayout_widget %})
* [Reordering]({% slug reordering_kendoui_tilelayout_widget %})
* [Containers]({% slug containers_kendoui_tilelayout_widget %})

## Known Limitations

Currently, the component is not supported in Internet Explorer as the browser does not support gutters.

## See Also

* [Overview of the TileLayout (Demo)](https://demos.telerik.com/kendo-ui/tilelayout/index)
* [JavaScript API Reference of the TileLayout](/api/javascript/ui/tilelayout)
