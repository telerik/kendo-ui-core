---
title: Getting Started
page_title: jQuery TileLayout Documentation - Getting Started with the TileLayout
description: "Get started with the jQuery TileLayout by Kendo UI and learn how to create and initialize the component."
slug: getting_started_kendoui_tilelayout_widget
position: 1
---

# Getting Started with the TileLayout

This guide demonstrates how to get up and running with the Kendo UI for jQuery TileLayout.

After the completion of this guide, you will be able to achieve the following end result:

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

## 1. Create an Empty Div Element

First, create an empty `<div>` element on the page that will serve as the main container of the TileLayout component.

```html
    <div id="tilelayout"></div>
```

## 2. Initialize the TileLayout

In this step, you will initialize the TileLayout from the empty `<div>` element. All settings of the TileLayout will be provided in the initialization script statement and you have to describe its layout and configuration in JavaScript.

```html
<div id="tilelayout"></div>

<script>
    // Target the div element by using jQuery and then call the kendoTileLayout() method.
    $("#tilelayout").kendoTileLayout({
        height:200
    });
</script>
```

## 3. Add Tiles

The tiles of the component are generated through the [`containers`](/api/javascript/ui/tilelayout/configuration/containers) configuration where you can also define their content.

```html
    <div id="tilelayout"></div>
    <script>
        $("#tilelayout").kendoTileLayout({
            height:200,
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
            }]
        });
    </script>
```

## 4. Configure the TileLayout Columns

The TileLayout allows you to configure how many columns will be displayed for the tiles.

```html
<div id="tilelayout"></div>

<script>
        $("#tilelayout").kendoTileLayout({
            height:200,
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
            columns: 3
        });
    </script>
```

## 5. Enable Tile Resizing

You can enable the [`resizable`](/api/javascript/ui/tilelayout/configuration/resizable) feature of the component.

```html
<div id="tilelayout"></div>

<script>
        $("#tilelayout").kendoTileLayout({
            height:200,
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
            resizable: true
        });
    </script>
```

## Next Steps

* [Referencing Existing Component Instances]({% slug widget_methodsand_events_kendoui_installation %})
* [Demo Page for the Kendo UI for jQuery TileLayout](https://demos.telerik.com/kendo-ui/tilelayout/index)

## See Also

* [JavaScript API Reference of the jQuery TileLayout](/api/javascript/ui/tilelayout)
* [Knowledge Base Section](/knowledge-base)

<script>
  window.onload = function() {
    document.getElementsByClassName("btn-run")[0].click();
  }
</script>
