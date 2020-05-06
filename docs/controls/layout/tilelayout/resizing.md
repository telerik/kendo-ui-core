---
title: Resizing
page_title: Kendo UI for jQuery Tile Layout Documentation | Tile Layout Resizing | Kendo UI
description: "Learn how to enable and use the resizing functionality of the Kendo UI for jQuery Tile Layout."
slug: resizing_kendoui_tilelayout_widget
---

# Tile Layout Resizing

The Kendo UI Tile Layout widget allows you resize the containers by snapping to the available columns and row units. When enabled the user is able to alter the width or the height of а current item. 

The resizing takes advantage of the [CSS Grid](https://css-tricks.com/snippets/css/complete-guide-grid/) mechanism, meaning that the widget increases how the element spans and the browser takes care of how to re-arrange the items if necessary.

## Enabling the resizable feature of the Tile Layout

To enable the resizable feature of the Tile Layout, set the [`resizable`](/api/javascript/ui/tilelayout/configuration/resizable) property to `true`.

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

* [Basic Usage of the Tile Layout (Demo)](https://demos.telerik.com/kendo-ui/tilelayout/index)
* [JavaScript API Reference of the Tile Layout](/api/javascript/ui/tilelayout)
* [Reordering]({% slug reordering_kendoui_tilelayout_widget %})
* [Containers]({% slug containers_kendoui_tilelayout_widget %})
