---
title: Placeholder
page_title: jQuery Sortable Documentation | Placeholder
description: "Get started with the jQuery Sortable by Kendo UI and manage the placeholder of the widget."
slug: placeholder_kendoui_sortable
position: 5
---

# Placeholder

The placeholder is the element which indicates where the dragged item will be placed when the user drops it.

By default, the placeholder is a clone of the dragged element with a removed `id` attribute and having its `visibility` set to `hidden` so that it forms a visual gap. You can change the default placeholder of the Sortable by setting the `placeholder` configuration option

> The placeholder element is appended to the Sortable DOM element container. As a result, jQuery `index` method returns unexpected results while dragging. To get the index of a given item in the Sortable collection, use the [`indexOf`](/api/javascript/ui/sortable/methods/indexof) method of the widget.

## Getting Started

The following example demonstrates how to build the placeholder from the dragged element.

```dojo
    <ul id="sortable">
        <li>ItemA1</li>
        <li>ItemA2</li>
        <li>ItemA3</li>
    </ul>

    <script>
        $("#sortable").kendoSortable({
            placeholder: function(element) {
                return element.clone().css({
                    "opacity": 0.3,
                    "border": "1px dashed #000000"
                });
            }
        });
    </script>
```

The following example demonstrates how to build a static placeholder.

```dojo
    <ul id="sortable">
        <li>ItemA1</li>
        <li>ItemA2</li>
        <li>ItemA3</li>
    </ul>

    <script>
        $("#sortable").kendoSortable({
            placeholder: "<li>Drop Here!</li>"
        });
    </script>
```

## Positioning by Axis

By default, the Sortable uses the mouse cursor to determine the place of the drop placeholder. This means that if the mouse cursor is not over a sortable item, the placeholder will not be repositioned. If the `axis` is set to `"x"` or `"y"`, the Sortable will start operating in movement by axis mode. The widget will use only the `x` or `y` coordinate of the mouse cursor to determine the position of the placeholder. The axis mode is useful when dragging is restricted within a container. For a runnable example, refer to the [demo on constraints](https://demos.telerik.com/kendo-ui/web/sortable/constraints.html).

## See Also

* [Positioning the Placeholder of the Sortable by Axis (Demo)](https://demos.telerik.com/kendo-ui/sortable/constraints)
* [JavaScript API Reference of the Sortable](/api/javascript/ui/sortable)
