---
title: Labels
page_title: Labels
description: "Learn the basics when working with the Telerik UI Labels for TextBox for {{ site.framework }}."
slug: htmlhelpers_labels_textbox
position: 3
---
# Label Overview

The Label enables you to associate the label HTML element with the TextBox.

* [Demo page for the TextBox Floating Label](https://demos.telerik.com/{{ site.platform }}/textbox/floating-label)

## Basic Usage

To associate a TextBox with a Label, set the `content` property of the `label`.

## Initializing the Label for the TextBox

The Label exposes a `content` property that sets the inner HTML of the label.

The below example shows how to create a Label from a string.

```HtmlHelper
    @(Html.Kendo().TextBox()
        .Name("TextBox")
        .Label(l => l.Content("First name"))
    )
```
{% if site.core %}
```TagHelper
    <kendo-textbox name="FirstName">
        <textbox-label content="First Name" />
    </kendo-textbox>
```
{% endif %}

The below example shows how to create a Label from a function. The function context (available via the `this` keyword) will be set to the widget instance.

```HtmlHelper
    @(Html.Kendo().TextBox()
            .Name("TextBox")
            .Label(l => l.ContentHandler("labelContentHandler"))
    )
    <script>
        function labelContentHandler() {
            return "First name"
        }
    </script>
```
{% if site.core %}
```TagHelper
    <kendo-textbox name="FirstName">
        <textbox-label content-handler="labelContentHandler" />
    </kendo-textbox>
    <script>
        function labelContentHandler() {
            return "First Name"
        }
    </script>
```
{% endif %}

## Floating Label

The Floating Label enables you to provide a floating label functionality to the TextBox.

The following example demonstrates how to set a Floating Label for a TextBox.

```HtmlHelper
    @(Html.Kendo().TextBox()
           .Name("TextBox")
           .Label(label =>
           {
               label.Content("First name");
               label.Floating(true);
           })
    )
```
{% if site.core %}
```TagHelper
    <kendo-textbox name="FirstName">
        <textbox-label content="First Name" floating="true" />
    </kendo-textbox>
```
{% endif %}

If set to `true`, the component will be wrapped in a container that will allow the floating label functionality.

> **Important:** The [value](https://docs.telerik.com/kendo-ui/api/javascript/ui/textbox/methods/value) client-side method **does not trigger** the `focusout` event of the input.
This could affect the floating label functionality.
You can overcome this behavior by manually invoking the `refresh` method of the Floating Label: `$("#textbox").data("kendoTextBox").floatingLabel.refresh();`

## See Also

* [Server-Side API](/api/textbox)
* [Using the API of the TextBox HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/textbox/api)
