---
title: HTML
page_title: HTML | Kendo UI MVVM
description: "Learn how to update and set the HTML of the target DOM element by changing the View-Model value in Kendo UI MVVM."
slug: htmlbinding_mvvm_kendoui
---

# HTML Binding

The [Kendo UI HTML (`html`) binding](http://demos.telerik.com/kendo-ui/mvvm/elements) sets the HTML content (`innerHTML`) of the target DOM element to a View-Model value. Changing the View-Model value via code updates the HTML of the target element. If the View-Model value is not of primitive type (`Text`, `Number`, or `Date`), the result returned by the `toString` JavaScript method is used as the value.

## Getting Started

### Setup

To set the value displayed by an `input`, `textarea` or `select`, use the [`value`](value) binding instead.

###### Example

    <span data-bind="html: name"></span>
    <script>
    var viewModel = kendo.observable({
        name: "John Doe"
    });

    kendo.bind($("span"), viewModel);
    </script>

The output is shown below. Note that the data-bind attribute is removed for clarity.

    <span>John Doe</span>

If the View-Model value contains HTML tags, they are going to be embedded in the final output.

###### Example

    <span data-bind="html: name"></span>
    <script>
    var viewModel = kendo.observable({
        name: "<strong>John Doe</strong>"
    });

    kendo.bind($("span"), viewModel);
    </script>


The output of the code is:

    <span><strong>John Doe</strong></span>

To display any HTML tags contained in the View-Model value, use the [`text`](text) binding.

### Important Notes

#### HTML Binding May Not Work for All Elements in Older Internet Explorer Versions

The `html` binding relies on the `innerHTML` DOM element property. The latter is not fully supported in older Internet Explorer versions for all DOM elements. For example, setting the `innerHTML` of a `table` is not supported.

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
* [Overview of the Invisible Binding]({% slug invisiblebinding_mvvm_kendoui %})
* [Overview of the Source Binding]({% slug sourceblebinding_mvvm_kendoui %})
* [Overview of the Style Binding]({% slug stylebinding_mvvm_kendoui %})
* [Overview of the Text Binding]({% slug textbinding_mvvm_kendoui %})
* [Overview of the Value Binding]({% slug valuebinding_mvvm_kendoui %})
* [Overview of the Visible Binding]({% slug visiblebinding_mvvm_kendoui %})
