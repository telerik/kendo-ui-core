---
title: Resizing
page_title: Kendo UI for jQuery TileLayout Documentation | TileLayout Resizing
description: "Learn how to enable and use the resizing functionality of the Kendo UI for jQuery TileLayout."
slug: resizing_kendoui_tilelayout_widget
position: 3
---

# TileLayout Resizing

The Kendo UI TileLayout widget allows you resize the containers by snapping to the available columns and row units. When enabled the user is able to alter the width or the height of а current item. 

The resizing takes advantage of the [CSS Grid](https://css-tricks.com/snippets/css/complete-guide-grid/) mechanism, meaning that the widget increases how the element spans and the browser takes care of how to re-arrange the items if necessary.

## Enabling the resizable feature of the TileLayout

To enable the resizable feature of the TileLayout, set the [`resizable`](/api/javascript/ui/tilelayout/configuration/resizable) property to `true`.

The example below will render a grid with two rows and two columns which can be resized both vertically and horizontally.


```dojo
    <div id="tilelayout"></div>

    <script>
        $("#tilelayout").kendoTileLayout({
            containers: [{
                colSpan: 1,
                rowSpan:1,
                bodyTemplate: "Item one body"
            }, {
                colSpan: 1,
                rowspan:1,
                bodyTemplate: "Item two body"
            }],
            columns: 3,
            height: 200,
            resizable: true
        });
    </script>
```

## Event Handling

The widget triggers a [`resize`](/api/javascript/ui/tilelayout/events/resize) event which provides access to the resized container.

```
    resize: function (e) {
        console.log(e.container);
    }
```

## See Also

* [Overview of the TileLayout (Demo)](https://demos.telerik.com/kendo-ui/tilelayout/index)
* [JavaScript API Reference of the TileLayout](/api/javascript/ui/tilelayout)
* [Reordering]({% slug reordering_kendoui_tilelayout_widget %})
* [Containers]({% slug containers_kendoui_tilelayout_widget %})
