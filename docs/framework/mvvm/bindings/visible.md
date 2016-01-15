---
title: Visible
page_title: Visible | Kendo UI MVVM
description: "Learn how to hide or make visible the target DOM element or widget in correspondence with the View-model value by using the visible binding in Kendo UI MVVM."
slug: visiblebinding_mvvm_kendoui
---

# Visible Binding

The `visible` binding shows or hides the target DOM element or widget depending on the View-Model value. If the value is `true`, the target DOM element is shown. If the value is `false`, the target DOM element is hidden&mdash;its `display` CSS attribute is set to `none`.

## Getting Started

The example below demonstrates how to use the `visible` binding.

###### Example

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

    kendo.bind($("div"), viewModel);
    </script>
     </div>

In the example the `div` element is initially visible because the value of the `isVisible` field is `true`. When the user clicks the button, the `div` is going to be hidden because the value of the `isVisible` field is set to `false`.

## Non-Boolean Values

Non-boolean values, such as `0`, `null`, `undefined` and `""`, are treated as `false` by the `visible` binding. All other values are treated as `true`.

## See Also

Other articles on the Kendo UI MVVM component and bindings:

* [MVVM Overview]({% slug overview_mvvmpattern_kendoui %})
* [Overview of the Attribute Binding]({% slug attributebinding_mvvm_kendoui %})
* [Overview of the Checked Binding]({% slug checkedbinding_mvvm_kendoui %})
* [Overview of the Click Binding]({% slug clickbinding_mvvm_kendoui %})
* [Overview of the CSS Binding]({% slug cssbinding_mvvm_kendoui %})
* [Overview of the Custom Binding]({% slug custombinding_mvvm_kendoui %})
* [Overview of the Disabled Binding]({% slug disabledbinding_mvvm_kendoui %})
* [Overview of the Enabled Binding]({% slug enabledbinding_mvvm_kendoui %})
* [Overview of the Events Binding]({% slug eventsbinding_mvvm_kendoui %})
* [Overview of the HTML Binding]({% slug htmlbinding_mvvm_kendoui %})
* [Overview of the Invisible Binding]({% slug invisiblebinding_mvvm_kendoui %})
* [Overview of the Source Binding]({% slug sourceblebinding_mvvm_kendoui %})
* [Overview of the Style Binding]({% slug stylebinding_mvvm_kendoui %})
* [Overview of the Text Binding]({% slug textbinding_mvvm_kendoui %})
* [Overview of the Value Binding]({% slug valuebinding_mvvm_kendoui %})
