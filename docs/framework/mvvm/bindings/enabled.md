---
title: Enabled
page_title: Enabled binding in Kendo UI MVVM | Kendo UI Documentation
description: If the View-Model value returns true value, the target DOM widget is enabled by using the enabled binding.
---

# Enabled binding

The `enabled` binding enables the target DOM element (or widget) if the View-Model value is `true`.
If the View-Model value is `false` the target DOM element (or widget) will be disabled.

The `enabled` binding supports only input HTML elements: `input`, `select` and `textarea`.
When an input element is disabled the end user cannot change its value (type in text or choose a different option).

## Using the enable binding

    <div id="view">
        <input type="text" data-bind="value: name, enabled: isNameEnabled" />
        <button data-bind="click: enableInput">Enable</button>
    </div>
    <script>
    var viewModel = kendo.observable({
        isNameEnabled: false,
        name: "John Doe",
        enableInput: function() {
            this.set("isNameEnabled", true);
        }
    });

    kendo.bind($("#view"), viewModel);
    </script>

In this example the input element will be initially disabled because the value of the `isNameEnabled` field
is `false`. When the user presses the button the input will be enabled because the value of the `isNameEnabled`
field is set to `true`.

## Non-boolean values

Non-boolean values such as `0`, `null`, `undefined` and `""` are treated as `false`
by the `enabled` binding. All other values are treated as `true`.
