---
title: Reordering
page_title: Kendo UI for jQuery TileLayout Documentation - TileLayout reordering
description: "Learn how to enable and use the reordering functionality of the Kendo UI for jQuery TileLayout."
slug: reordering_kendoui_tilelayout_widget
position: 2
---

# TileLayout Reordering

The Kendo UI TileLayout widget allows you to rearrange the position of the tile containers with drag and drop and click-move-click. 

The reordering takes advantage of the [CSS Grid](https://css-tricks.com/snippets/css/complete-guide-grid/) mechanism and changes the [css order](https://www.w3schools.com/cssref/css3_pr_order.asp) of the item and lets the browser handle the rest.

## Enabling Click-Move-Click

As of Kendo UI R2 SP1 2023, users can reorder the TileLayout's containers by using the click-move-click functionality provided by the [`reorderable.clickMoveClick``](/api/javascript/ui/tilelayout/configuration/reorderable.clickmoveclick) option. Users can click a container to start moving it, and then click again to place it in its new position.

```dojo
    <script id="first" type="text/x-kendo-template">
        <h3>A</h3>
    </script>
    <script id="second" type="text/x-kendo-template">
        <h3>B</h3>
    </script>
    <div id="tilelayout"></div>
    <script>
        $("#tilelayout").kendoTileLayout({
            containers: [
                {
                    colSpan: 1,
                    rowSpan: 1,
                    header: {
                        text: "Item one"
                    },
                    bodyTemplate: kendo.template($("#first").html())
                },
                {
                    colSpan: 1,
                    rowSpan: 1,
                    header: {
                        text: "Item two"
                    },
                    bodyTemplate: kendo.template($("#second").html())
                }
            ],
            columns: 4,
            reorderable: {
                clickMoveClick: true
            }
        });
    </script>
```

## Enabling Drag and Drop

To allow users to reorder tyles by dragging and dropping them, set the [`reorderable`](/api/javascript/ui/tilelayout/configuration/reorderable) property to `true`.

> To use the `reorderable` functionality, define headers.

The example below will render a grid with two columns which can be reordered both vertically and horizontally.


```dojo
    <div id="tilelayout"></div>

    <script>
        $("#tilelayout").kendoTileLayout({
            containers: [{
                colSpan: 1,
                rowSpan: 1,
                header: {
                    text: "Item one"
                },
                bodyTemplate: "Item one body"
            }, {
                colSpan: 1,
                rowspan: 1,
                header: {
                    text: "Item two"
                },
                bodyTemplate: "Item two body"
            }, {
                colSpan: 1,
                rowspan: 1,
                header: {
                    text: "Item three"
                },
                bodyTemplate: "Item three body"
            }],
            columns: 3,
            height: 200,
            reorderable: true
        });
    </script>
```

## Event Handling

The widget triggers a [`reorder`](/api/javascript/ui/tilelayout/events/reorder) event which provides access to the reordered container, the old and the new index.

```
    reorder: function (e) {
        console.log(e.newIndex, e.oldIndex);
    }
```

## See Also

* [Overview of the TileLayout (Demo)](https://demos.telerik.com/kendo-ui/tilelayout/index)
* [JavaScript API Reference of the TileLayout](/api/javascript/ui/tilelayout)
* [Resizing]({% slug resizing_kendoui_tilelayout_widget %})
* [Containers]({% slug containers_kendoui_tilelayout_widget %})
