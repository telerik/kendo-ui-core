---
title: Enabled
page_title: Enabled | Kendo UI MVVM
description: "Learn how to enable the target DOM element by having the View-Model value return true values in Kendo UI MVVM."
slug: enabledbinding_mvvm_kendoui
---

# Enabled Binding

The Kendo UI Enabled (`enabled`) binding enables the target DOM element or widget if the View-Model value is `true`. If the View-Model value is `false` the target DOM element or widget is disabled.

## Getting Started

The `enabled` binding supports only input HTML elements: `input`, `select`, `button` and `textarea`.
When an input element is disabled the end user cannot change its value (type in text or choose a different option).

### Setup

The example below demonstrates how to use the `enabeled` binding.

###### Example

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

In the example, the `input` element is initially disabled because the value of the `isNameEnabled` field is `false`. When the user presses the button, the `input` is enabled because the value of the `isNameEnabled` field is set to `true`.

### Non-Boolean Values

Non-boolean values, such as `0`, `null`, `undefined` and `""`, are treated as `false` by the `enabled` binding. All other values are treated as `true`.

## See Also

Other articles on the Kendo UI MVVM component and bindings:

* [MVVM Overview]({% slug overview_mvvmpattern_kendoui %})
* [Overview of the Attribute Binding]({% slug attributebinding_mvvm_kendoui %})
* [Overview of the Checked Binding]({% slug checkedbinding_mvvm_kendoui %})
* [Overview of the Click Binding]({% slug clickbinding_mvvm_kendoui %})
* [Overview of the CSS Binding]({% slug cssbinding_mvvm_kendoui %})
* [Overview of the Custom Binding]({% slug custombinding_mvvm_kendoui %})
* [Overview of the Disabled Binding]({% slug disabledbinding_mvvm_kendoui %})
* [Overview of the Events Binding]({% slug eventsbinding_mvvm_kendoui %})
* [Overview of the HTML Binding]({% slug htmlbinding_mvvm_kendoui %})
* [Overview of the Invisible Binding]({% slug invisiblebinding_mvvm_kendoui %})
* [Overview of the Source Binding]({% slug sourceblebinding_mvvm_kendoui %})
* [Overview of the Style Binding]({% slug stylebinding_mvvm_kendoui %})
* [Overview of the Text Binding]({% slug textbinding_mvvm_kendoui %})
* [Overview of the Value Binding]({% slug valuebinding_mvvm_kendoui %})
* [Overview of the Visible Binding]({% slug visiblebinding_mvvm_kendoui %})
