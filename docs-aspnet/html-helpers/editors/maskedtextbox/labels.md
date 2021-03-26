---
title: Labels
page_title: Labels
description: "Learn the basics when working with Labels for the Telerik UI MaskedTextBox for {{ site.framework }}."
slug: htmlhelpers_labels_maskedtextbox
position: 3
---

# Label Overview

The Label enables you to associate the label HTML element with the MaskedTextBox.

* [Demo page for the MaskedTextBox Floating Label](https://demos.telerik.com/{{ site.platform }}/maskedtextbox/floating-label)

## Basic Usage

To associate a MaskedTextBox with a Label, set the `content` property of the `label`.

## Initializing the Label for MaskedTextBox

The Label exposes a `content` property that sets the inner HTML of the label.

The below example shows how to create a Label from a string.

    @(Html.Kendo().MaskedTextBox()
        .Name("MaskedTextBox")
        .Label(l => l.Content("Phone number"))
    )

The below example shows how to create a Label from a function. The function context (available via the `this` keyword) will be set to the widget instance.

    @(Html.Kendo().MaskedTextBox()
            .Name("MaskedTextBox")
            .Label(l => l.ContentHandler("labelContentHandler"))
    )
    <script>
        function labelContentHandler() {
            return "Phone number"
        }
    </script>

## Floating Label

The Floating Label enables you to provide a floating label functionality to the MaskedTextBox.

The following example demonstrates how to set a Floating Label for a MaskedTextBox.

    @(Html.Kendo().MaskedTextBox()
           .Name("MaskedTextBox")
           .Label(label =>
           {
               label.Content("Phone number");
               label.Floating(true);
           })
    )

If set to `true`, the component will be wrapped in a container that will allow the floating label functionality.

> **Important:** The [value](https://docs.telerik.com/kendo-ui/api/javascript/ui/maskedtextbox/methods/value) client-side method **does not trigger** the `focusout` event of the input.
This could affect the floating label functionality.
You can overcome this behavior by manually invoking the `refresh` method of the Floating Label: `$("#maskedtextbox").data("kendoMaskedTextBox").floatingLabel.refresh();`

## See Also

* [Server-Side MaskedTextBox API](/api/maskedtextbox)
* [Using the API of the MaskedTextBox HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/maskedtextbox/api)
