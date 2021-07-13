---
title: Labels
page_title: Labels
description: "How to add Labels with the TextArea TagHelper component for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: taghelpers_labels_textarea
position: 2
---

# Label Overview

The Label enables you to associate a `label` HTML element with the TextArea.

* [Demo page for the TextArea TagHelper](https://demos.telerik.com/aspnet-core/textarea/tag-helper)

## Basic Usage

To associate a TextArea TagHelper with a Label, set the `label` property by providing a string or a function. The `string` and the `function` parameters are setting the inner HTML of the label.

## Initializing the Label for the TextArea

The Label tag exposes a `content` attribute that sets the inner HTML of the label.

The following example demonstrates how to create a Label content from a string.

    <kendo-textarea name="FirstName">
        <label floating="true" content="Description"/>
    </kendo-textarea>


The following example demonstrates how to create a Label content from a function.

    <kendo-textarea name="FirstName">
        <label content-handler="labelContentHandler" />
    </kendo-textarea>
    <script>
        function labelContentHandler() {
            return "First Name"
        }
    </script>

## Floating Label

The Floating Label enables you to provide a floating label functionality to the TextArea.

The following example demonstrates how to set a Floating Label for a TextArea TagHelper.

    <kendo-textarea name="FirstName">
        <label content="First Name" floating="true" />
    </kendo-textarea>

If set to `true`, the component will be wrapped in a container that will allow the floating label functionality.

> **Important:** The [value](https://docs.telerik.com/kendo-ui/api/javascript/ui/textarea/methods/value) client-side method **does not trigger** the `focusout` event of the input.
This could affect the floating label functionality.
You can overcome this behavior by manually invoking the `refresh` method of the Floating Label: `$("#textarea").data("kendoTextArea").floatingLabel.refresh();`

## See Also

* [Basic Usage of the TextArea TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/textarea/tag-helper)
* [Server-Side API](/api/textarea)
