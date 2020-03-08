---
title: Disabled
page_title: Disabled Binding | Kendo UI MVVM
description: "Learn how to disable the target DOM widget or element in Kendo UI MVVM."
slug: disabledbinding_mvvm_kendoui
---

# Disabled Binding

The Kendo UI Disabled (`disabled`) binding disables the target DOM element or widget if the View-Model value is `true`.

If the View-Model value is `false`, the target DOM element or widget is enabled.

The `disabled` binding supports only input HTML elements&mdash;`input`, `select`, and `textarea`. When an `input` element is disabled, the end user cannot change its value, that is, type in text or choose a different option.

Non-Boolean values, such as `0`, `null`, `undefined` and `""`, are treated as `false` by the `disabled` binding. All other values are treated as `true`.

The following example demonstrates how to use the `disabled` binding. The `input` element is initially enabled because the value of the `isNameDisabled` field is `false`. When the user presses the button, the `input` is disabled because the value of the `isNameDisabled` field is set to `true`.

    <div id="view">
    <input type="text" data-bind="value: name, disabled: isNameDisabled" />
    <button data-bind="click: disableInput">Disable</button>

    <script>
    var viewModel = kendo.observable({
        isNameDisabled: false,
        name: "John Doe",
        disableInput: function() {
            this.set("isNameDisabled", true);
        }
    });

    kendo.bind($("#view"), viewModel);
    </script>
     </div>

## See Also

* [MVVM Overview]({% slug overview_mvvmpattern_kendoui %})
* [Overview of the Attribute Binding]({% slug attributebinding_mvvm_kendoui %})
* [Overview of the Checked Binding]({% slug checkedbinding_mvvm_kendoui %})
* [Overview of the Click Binding]({% slug clickbinding_mvvm_kendoui %})
* [Overview of the CSS Binding]({% slug cssbinding_mvvm_kendoui %})
* [Overview of the Custom Binding]({% slug custombinding_mvvm_kendoui %})
* [Overview of the Enabled Binding]({% slug enabledbinding_mvvm_kendoui %})
* [Overview of the Events Binding]({% slug eventsbinding_mvvm_kendoui %})
* [Overview of the HTML Binding]({% slug htmlbinding_mvvm_kendoui %})
* [Overview of the Invisible Binding]({% slug invisiblebinding_mvvm_kendoui %})
* [Overview of the Source Binding]({% slug sourceblebinding_mvvm_kendoui %})
* [Overview of the Style Binding]({% slug stylebinding_mvvm_kendoui %})
* [Overview of the Text Binding]({% slug textbinding_mvvm_kendoui %})
* [Overview of the Value Binding]({% slug valuebinding_mvvm_kendoui %})
* [Overview of the Visible Binding]({% slug visiblebinding_mvvm_kendoui %})
