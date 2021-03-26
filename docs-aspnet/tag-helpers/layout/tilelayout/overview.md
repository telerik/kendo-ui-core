---
title: Overview
page_title: Telerik UI TileLayout TagHelper for {{ site.framework }} Overview 
description: "Get started with the {{ site.framework }} TileLayout and learn about its features and how to initialize the component."
slug: taghelpers_aspnet_tilelayout_overview
---

# TileLayout Overview

The Telerik UI TileLayout TagHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI TileLayout widget.

The TileLayout widget allows you configure a two-dimensional grid-based sandbox surface to display content in tiles which can be dragged around and rearranged to create any modern page design.

It is based on the [CSS Grid](https://css-tricks.com/snippets/css/complete-guide-grid/)(with all its features) which covers the majority of cases and uses additional JavaScript logic to provide resizing, reordering and templates customizations.

* [Demo page for the TileLayout](https://demos.telerik.com/{{ site.platform }}/tilelayout/taghelper) 

## Initializing the Tile Layout

To initialize the Tile Layout, specify the number of `columns` at root level and use the `row-span` and `col-span` of the containers to position the content in the available grid space.

The example below will render a grid with two columns which can be resized both vertically and horizontally.


```html

        <kendo-tilelayout name="tilelayout" columns="2" resizable="true" reorderable="true" columns-width="300px" rows-height="300px">
            <containers>
                <container body-template="Template One" col-span="1" row-span="1">
                    <container-header text="One" />
                </container>
                <container body-template="Template Two" col-span="1" row-span="1">
                    <container-header text="Two" />
                </container>
                <container body-template="Template Three" col-span="2" row-span="1">
                    <container-header text="Three" />
                </container>
            </containers>
        </kendo-tilelayout>
```

## Grid Layout configuration 

The Telerik UI TileLayout TagHelper for {{ site.framework }} available grid space is defined by using the `columns` attribute. The number of rows in which the tiles will be displayed will automatically adjust. The columns and rows have a default width of `1fr` which can be modified by using the `columns-width` and `rows-height` attributes.

> The `rows-height` and `columns-width` attributes value sets the maximum height/width the rows or columns of the widget will stretch to. Dependent on resizing, content and user interactions with the layout, they may be less than the set value.

## Tile Layout configuration

Each tile can span across several rows and columns. The space that the tile takes up is determined by its container `row-span` and `col-span`. For more information about the containers and their configurable properties, see the containers article.

## Gaps

The grid lines between the rows and columns can be configured by specifying the `gaps columns` tag for the vertical space between the tiles and the `gaps rows` tag for the horizontal spacing.

```html
    <kendo-tilelayout name="tilelayout" columns="2" resizable="true" reorderable="true" columns-width="300px" rows-height="300px">
            <gap rows="10" columns="10" />
```

These properties are also known as the gutters between the rows/columns.

## Referencing Existing Instances

To get a reference to an existing TileLayout instance:

1. Use the [`jQuery.data()`](https://api.jquery.com/jQuery.data/) method.
1. Once a reference is established, use the [TileLayout API](https://docs.telerik.com/kendo-ui/api/javascript/ui/tilelayout) to control its behavior.

        var tilelayout = $("#tilelayout").data("kendoTileLayout");

## Resizing

To enable resizing both horizontally and vertically, use the `resizable` attribute:

```
     <kendo-tilelayout name="tilelayout" columns="3" resizable="true">     
```

## Reordering

To enable reordering of the tiles, use the `reorderable` attribute:

```
     <kendo-tilelayout name="tilelayout" columns="3" reorderable="true">     
```

## Containers

To define the containers, use the `<containers>` tag and nest the number of `<container>` tags necessary to achieve the desired design.

```
    <containers>
         <container body-template-id="crayons" col-span="1" row-span="1">
                <container-header text="Crayons" />
    </container>
```

## Container Styles

The TileLayout exposes an object that allows you to override the following styles:

```
    var tileLayoutStyles = {
        wrapper: "k-widget k-tilelayout",
        item: "k-tilelayout-item k-card",
        itemHeader: "k-tilelayout-item-header k-card-header",
        itemHeaderTitle: "k-card-title",
        itemBody: "k-tilelayout-item-body k-card-body",
        reorderHint: "k-layout-item-hint k-layout-item-hint-reorder",
        resizeHint: "k-layout-item-hint k-layout-item-hint-resize"
    };
```

To override any of the classes, add your own or remove some, insert the new definition before the widget is initialized:

```
    kendo.ui.TileLayout.styles.item = "k-tilelayout-item k-card my-own-class";
```

## Event handling

The TileLayout emits two events `resize` and `reorder`. To capture them, use the `on-[eventName]` attribute.

```
    <kendo-tilelayout name="tilelayout" columns="3" reorderable="true" on-reorder="onReorder">
    <script>
        function onReorder(e) {
            console.log(e.newIndex, e.oldIndex);
        }
    </script>
```

## Known Limitations

Currently, the component is not supported in Internet Explorer as the browser does not support gutters.

## See Also

* [Basic Usage of the Tile Layout (Demo)](https://demos.telerik.com/{{ site.platform }}/tilelayout/index)
* [API Reference of the TileLayout](/api/tilelayout)
