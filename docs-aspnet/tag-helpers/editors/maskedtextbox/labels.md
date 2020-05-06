---
title: Labels
page_title: Labels
description: "Learn the basics when working with Labels for Telerik UI MaskedTextBox TagHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: taghelpers_labels_maskedtextbox
position: 2
---

# Label Overview

The Label enables you to associate the label HTML element with the MaskedTextBox.

* [Demo page for the MaskedTextBox TagHelper](https://demos.telerik.com/aspnet-core/maskedtextbox/tag-helper)

## Basic Usage

To associate a MaskedTextBox TagHelper with a Label, set the `label` property by providing a string or a function. The `string` and the `function` parameters are setting the inner HTML of the label.

## Initializing the Label for the TextBox

The Label exposes a `content` property that sets the inner HTML of the label.

The following example demonstrates how to create a Label content from a string.

    <kendo-maskedtextbox name="PhoneNumber">
        <maskedtextbox-label content="Phone Number" />
    </kendo-maskedtextbox>


The following example demonstrates how to create a Label content from a function.

    <kendo-maskedtextbox name="PhoneNumber">
        <maskedtextbox-label content-handler="labelContentHandler" />
    </kendo-maskedtextbox>
    <script>
        function labelContentHandler() {
            return "Phone Number"
        }
    </script>

## Floating Label

The Floating Label enables you to provide a floating label functionality to the MaskedTextBox.

The following example demonstrates how to set a Floating Label for a MaskedTextBox TagHelper.

    <kendo-maskedtextbox name="PhoneNumber">
        <maskedtextbox-label content="Phone Number" floating="true" />
    </kendo-maskedtextbox

If set to `true`, the component will be wrapped in a container that will allow the floating label functionality.

> **Important:** The [value](https://docs.telerik.com/kendo-ui/api/javascript/ui/maskedtextbox/methods/value) client-side method **does not trigger** the `focusout` event of the input.
This could affect the floating label functionality.
You can overcome this behavior by manually invoking the `refresh` method of the Floating Label: `$("#maskedTextBox").data("kendoMaskedTextBox").floatingLabel.refresh();`

## See Also

* [Basic Usage of the MaskedTextBox TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/maskedtextbox/tag-helper)
* [Server-Side API](/api/maskedtextbox)
