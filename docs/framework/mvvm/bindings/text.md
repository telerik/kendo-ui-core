---
title: Text
page_title: Text Binding | Kendo UI MVVM
description: "Learn how to update the text of the DOM element to a View-Model value by using the text binding in Kendo UI MVVM."
slug: textbinding_mvvm_kendoui
---

# Text Binding

The `text` binding sets the text content of the target DOM element to a View-Model value.

Changing the View-Model value via code updates the text of the DOM element. If the View-Model value is not of primitive type, such as `Text`, `Number` or `Date`, the result returned by the `toString` JavaScript method is used as the value.

## Getting Started

To set the value that is displayed by an `input`, `textarea`, or `select`, use the [`value`](value) binding instead.

The following example demonstrates how to use the `text` binding.

    <span data-bind="text: name"></span>
    <script>
    var viewModel = kendo.observable({
        name: "John Doe"
    });

    kendo.bind($("span"), viewModel);
    </script>

The following example demonstrates the expected output. The data-bind attribute is removed for clarity.

    <span>John Doe</span>

If the View-Model value contains HTML tags, those are output verbatim. The following example outputs visible HTML tags.

    <span data-bind="text: name"></span>
    <script>
    var viewModel = kendo.observable({
        name: "<strong>John Doe</strong>"
    });

    kendo.bind($("span"), viewModel);
    </script>

## Text Formatting

As of the 2015 Q2 release, you can apply custom formats by using the `data-format` attribute.

```dojo
<div id="view">
    <span data-format="c2" data-bind="text: price"></span><br/>
    <span data-format="dd-MM-yyyy" data-bind="text: purchaseDate"></span>
</div>

<script type="text/javascript">
    var viewModel = kendo.observable({
        price: 98.99,
        purchaseDate: new Date(),
    });
    kendo.bind($("#view"), viewModel);
</script>
```

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
* [Overview of the Invisible Binding]({% slug invisiblebinding_mvvm_kendoui %})
* [Overview of the Source Binding]({% slug sourceblebinding_mvvm_kendoui %})
* [Overview of the Style Binding]({% slug stylebinding_mvvm_kendoui %})
* [Overview of the Value Binding]({% slug valuebinding_mvvm_kendoui %})
* [Overview of the Visible Binding]({% slug visiblebinding_mvvm_kendoui %})
