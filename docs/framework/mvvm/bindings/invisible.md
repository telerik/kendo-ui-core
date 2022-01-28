---
title: Invisible
page_title: Invisible Binding | Kendo UI MVVM
description: "Learn how to hide or show the target DOM element depending on the View-Model value by using the invisible binding in Kendo UI MVVM."
slug: invisiblebinding_mvvm_kendoui
---

# Invisible Binding

The Kendo UI Invisible (`invisible`) binding hides or shows the target DOM element or widget depending on the View-Model value.

If the value is `true`, the target DOM element is hidden&mdash;its `display` CSS attribute is set to `none`. If the value is `false`, the target DOM element is shown.

Non-Boolean values, such as `0`, `null`, `undefined`, and `""`, are treated as `false` by the `invisible` binding. All other values are treated as `true`.

The following example demonstrates how to use the `invisible` binding. The `div` element is initially hidden because the value of the `isInvisible` field is `true`. When the user clicks the button, the `div` is shown because the value of the `isInvisible` field is set to `false`.

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

## See Also

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
* [Overview of the Source Binding]({% slug sourceblebinding_mvvm_kendoui %})
* [Overview of the Style Binding]({% slug stylebinding_mvvm_kendoui %})
* [Overview of the Text Binding]({% slug textbinding_mvvm_kendoui %})
* [Overview of the Value Binding]({% slug valuebinding_mvvm_kendoui %})
* [Overview of the Visible Binding]({% slug visiblebinding_mvvm_kendoui %})
