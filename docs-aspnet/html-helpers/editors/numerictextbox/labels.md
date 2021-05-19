---
title: Labels
page_title: Labels
description: "Learn the basics when working with Labels for the Telerik UI NumericTextBox for {{ site.framework }}."
slug: htmlhelpers_labels_numerictextbox
position: 3
---

# Label Overview

The Label enables you to associate the label HTML element with the NumericTextBox.

* [Demo page for the NumericTextBox Floating Label](https://demos.telerik.com/{{ site.platform }}/numerictextbox/floating-label)

## Basic Usage

To associate a NumericTextBox with a Label, set the `content` property of the `label`.

## Initializing the Label for NumericTextBox

The Label exposes a `content` property that sets the inner HTML of the label.

The below example demonstrates how to create a Label from a string.

    @(Html.Kendo().NumericTextBox()
        .Name("NumericTextBox")
        .Label(l => l.Content("Price"))
    )

The below example demonstrates how to create a Label from a function. The function context (available via the `this` keyword) will be set to the widget instance.

    @(Html.Kendo().NumericTextBox()
            .Name("NumericTextBox")
            .Label(l => l.ContentHandler("labelContentHandler"))
    )
    <script>
        function labelContentHandler() {
            return "Price"
        }
    </script>

## Floating Label

The Floating Label enables you to provide a floating label functionality to the NumericTextBox.

The following example demonstrates how to set a Floating Label for a NumericTextBox.

    @(Html.Kendo().NumericTextBox()
           .Name("NumericTextBox")
           .Label(label =>
           {
               label.Content("Price");
               label.Floating(true);
           })
    )

If set to `true`, the component will be wrapped in a container that will allow the floating label functionality.

> **Important:** The [value](https://docs.telerik.com/kendo-ui/api/javascript/ui/numerictextbox/methods/value) client-side method **does not trigger** the `focusout` event of the input.
This could affect the floating label functionality.
You can overcome this behavior by manually invoking the `refresh` method of the Floating Label: `$("#numerictextbox").data("kendoNumericTextBox").floatingLabel.refresh();`

## See Also

* [Server-Side API](/api/numerictextbox)
* [Using the API of the NumericTextBox HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/numerictextbox/api)
