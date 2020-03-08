---
title: Attribute
page_title: Attribute Binding | Kendo UI MVVM
description: "Learn how to populate and update DOM element attributes from the View-Model fields or methods through the attr binding in Kendo UI MVVM."
slug: attributebinding_mvvm_kendoui
---

# Attribute Binding

The [Kendo UI Attribute (`attr`) binding](https://demos.telerik.com/kendo-ui/mvvm/attributes) populates DOM element attributes from View-Model fields or methods.

This is useful in many cases, such as setting the `href` and `title` of a hyperlink, setting the `src` attribute of an image, etc. If the View-Model fields change, the attributes get updated.

> The [Kendo UI widgets](https://demos.telerik.com/kendo-ui/) do not support the `attr` binding.

## Getting Started

To set the `attr` binding, use the `attr: { attribute1: field1, attribute2: field2 }` configuration. `attribute1` and `attribute2` are the names of the attributes that will be set, and `field1` and `field2` are the names of the View-Model fields to which those attributes will be bound.

The following example demonstrates how to implement the Attribute binding. The `src` and `alt` attributes of the image are bound to the View-Model.

    <img id="logo" data-bind="attr: { src: imageSource, alt: imageAlt }" />
    <script>
    var viewModel = kendo.observable({
        imageSource: "https://www.telerik.com/image/kendo-logo.png",
        imageAlt: "Kendo Logo"
    });

    kendo.bind($("#logo"), viewModel);
    </script>

After calling `kendo.bind`, the image looks in the following way. The `data-bind` attribute is removed for clarity. Changing the `imageSource` or `imageAlt` fields will update the `src` and `alt` attributes respectively.

    <img id="logo" src="https://www.telerik.com/image/kendo-logo.png" alt="Kendo Logo"" />

## Important Notes

* Binding Attributes: value and checked&mdash;To set the `value` or `checked` attributes, use the [`value`](value) and [`checked`](checked) bindings instead.
* Setting the HTML5 `Data` attributes&mdash;You can also set HTML5 data attributes through the `attr` binding.

        <div data-bind="attr: { data-foo: fooValue, data-bar: barValue }"></div>

        <script>
        var viewModel = kendo.observable({
            fooValue: "foo",
            barValue: "bar"
        });

        kendo.bind($("div"), viewModel);
        </script>

## See Also

* [MVVM Overview]({% slug overview_mvvmpattern_kendoui %})
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
* [Overview of the Visible Binding]({% slug visiblebinding_mvvm_kendoui %})
