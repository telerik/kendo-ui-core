---
title: Labels
page_title: Labels
description: "How to add a Label to the TextArea component for {{ site.framework }}."
slug: htmlhelpers_textarea_labels
position: 2
---
# Label Overview

The Label enables you to associate a `label` HTML element with the TextArea.

* [Demo page for the TextArea Floating Label](https://demos.telerik.com/{{ site.platform }}/textarea/floating-label)

## Basic Usage

To associate a TextArea with a Label, use the `Content()` method of the `TextAreaLabelSettingsBuilder`.

## Initializing the Label for the TextArea

The Label exposes a `Content()` method that sets the inner HTML of the `label` element.

The below example shows how to create a Label from a string.

    @(Html.Kendo().TextArea()
        .Name("TextArea")
        .Label(l => l.Content("First name"))
    )

The below example shows how to create a Label from a function by using the `ContentHandler()` method. The function context (available via the `this` keyword) will be set to the widget instance.

    @(Html.Kendo().TextArea()
            .Name("TextArea")
            .Label(l => l.ContentHandler("labelContentHandler"))
    )
    <script>
        function labelContentHandler() {
            return "First name"
        }
    </script>

## Floating Label

The Floating Label enables you to provide a floating label functionality to the TextArea.

The following example demonstrates how to set a Floating Label for a TextArea.

    @(Html.Kendo().TextArea()
           .Name("TextArea")
           .Label(label =>
           {
               label.Content("First name");
               label.Floating(true);
           })
    )

If set to `true`, the component will be wrapped in a container that will allow the floating label functionality.

> **Important:** The [value](https://docs.telerik.com/kendo-ui/api/javascript/ui/textarea/methods/value) client-side method **does not trigger** the `focusout` event of the input.
This could affect the floating label functionality.
You can overcome this behavior by manually invoking the `refresh` method of the Floating Label: `$("#textarea").data("kendoTextArea").floatingLabel.refresh();`

## See Also

* [Server-Side API](/api/textarea)
* [Using the API of the TextArea HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/textarea/api)
