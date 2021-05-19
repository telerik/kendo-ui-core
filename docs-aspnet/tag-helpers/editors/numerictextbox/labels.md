---
title: Labels
page_title: Labels
description: "Learn the basics when working with Labels for Telerik UI NumericTextBox TagHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: taghelpers_labels_numerictextbox
position: 2
---

# Label Overview

The Label enables you to associate the label HTML element with the NumericTextBox.

* [Demo page for the NumericTextBox TagHelper](https://demos.telerik.com/aspnet-core/numerictextbox/tag-helper)

## Basic Usage

To associate a NumericTextBox TagHelper with a Label, set the `label` property by providing a string or a function. The `string` and the `function` parameters are setting the inner HTML of the label.

## Initializing the Label for the TextBox

The Label exposes a `content` property that sets the inner HTML of the label.

The following example demonstrates how to create a Label content from a string.

    <kendo-numerictextbox name="Price">
        <numerictextbox-label content="Price" />
    </kendo-numerictextbox>


The following example demonstrates how to create a Label content from a function.

    <kendo-numerictextbox name="Price">
        <numerictextbox-label content-handler="labelContentHandler" />
    </kendo-numerictextbox>
    <script>
        function labelContentHandler() {
            return "Price"
        }
    </script>

## Floating Label

The Floating Label enables you to provide a floating label functionality to the NumericTextBox.

The following example demonstrates how to set a Floating Label for a NumericTextBox TagHelper.

    <kendo-numerictextbox name="Price">
        <numerictextbox-label content="Price" floating="true" />
    </kendo-numerictextbox

If set to `true`, the component will be wrapped in a container that will allow the floating label functionality.

> **Important:** The [value](https://docs.telerik.com/kendo-ui/api/javascript/ui/numerictextbox/methods/value) client-side method **does not trigger** the `focusout` event of the input.
This could affect the floating label functionality.
You can overcome this behavior by manually invoking the `refresh` method of the Floating Label: `$("#numericTextBox").data("kendoNumericTextBox").floatingLabel.refresh();`

## See Also

* [Basic Usage of the NumericTextBox TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/numerictextbox/tag-helper)
* [Server-Side API](/api/numerictextbox)
