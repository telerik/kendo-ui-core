---
title: Visible
page_title: Visible binding in Kendo UI MVVM | Kendo UI Documentation
description: Visible binding hides or makes visible the target DOM element or widget in correspondence with the View-model value.
---

# Visible binding

The `visible` binding shows or hides the target DOM element or widget depending on the View-Model value. If the value is `true` the
target DOM element will be shown. If the value is `false` the target DOM element will be hidden
(its `display` CSS attribute will be set to `none`).

## Using the visible binding

    <div id="view">
    <div data-bind="visible: isVisible">some content
    <button data-bind="click: hide">Hide</button>
    </div>
    <script>
    var viewModel = kendo.observable({
        isVisible: true,
        hide: function() {
            this.set("isVisible", false);
        }
    });

    kendo.bind($("#div"), viewModel);
    </script>
     </div>

In this example the `div` element will be initially visible because the value of the `isVisible` field is `true`.
When the user clicks the button the `div` will be hidden because the value of the `isVisible` field is set to `false`.

## Non-boolean values

Non-boolean values such as `0`, `null`, `undefined` and `""` are treated as `false` by the `visible` binding.
All other values are treated as `true`.
