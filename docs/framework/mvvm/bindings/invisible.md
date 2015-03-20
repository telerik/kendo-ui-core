---
title: Invisible
page_title: Invisible binding in Kendo UI MVVM | Kendo UI Documentation
description: How to hide or show the target DOM element, depending on the View-Model Value by using the invisible binding.
---

## Invisible binding

The `invisible` binding hides or shows the target DOM element or widget depending on the View-Model value. If the value is `true` the
target DOM element will be hidden (its `display` CSS attribute will be set to `none`).
If the value is `false` the target DOM element will be shown.

## Using the invisible binding

    <div id="view">
        <div data-bind="invisible: isInvisible">some content
        </div>
        <button data-bind="click: show">Show</button>
    </div>
    <script>
    var viewModel = kendo.observable({
        isInvisible: true,
        show: function() {
            this.set("isInvisible", false);
        }
    });

    kendo.bind($("#view"), viewModel);
    </script>

In this example the `div` element will be initially hidden because the value of the `isInvisible` field is `true`.
When the user clicks the button the `div` will be shown because the value of the `isInvisible` field is set to `false`.

## Non-boolean values

Non-boolean values such as `0`, `null`, `undefined` and `""` are treated as `false` by the `invisible` binding.
All other values are treated as `true`.
