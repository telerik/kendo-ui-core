---
title: Getting Started
page_title: jQuery NumericTextBox Documentation - Getting Started with the NumericTextBox
description: "Get started with the jQuery NumericTextBox by Kendo UI and learn how to create, initialize, and enable the widget."
components: ["numerictextbox"]
slug: getting_started_kendoui_numerictextbox_widget
position: 1
---

# Getting Started with the NumericTextBox

This guide demonstrates how to get up and running with the Kendo UI for jQuery NumericTextBox.

After the completion of this guide, you will be able to achieve the following end result:

```dojo
    <input id="numeric-textbox" />

    <script>
      $("#numeric-textbox").kendoNumericTextBox({
        value: 50,
        format: "c2"
      });
    </script>
```

## 1. Create an input Element

First, create an `<input>` element on the page that will be used to initialize the widget.

```html
<input id="numeric-textbox" />
```

## 2. Initialize the NumericTextBox 

In this step, you will initialize the NumericTextBox from the `<input>` element. Upon its initialization, the NumericTextBox wraps the `<input>` element with a `<span>` tag and renders its **Spin** buttons.

```html
<input id="numeric-textbox" />

<script>
    // Target the input element by using jQuery and then call the kendoNumericTextBox() method.
    $("#numeric-textbox").kendoNumericTextBox({
        // Add some basic configurations such as a default value.
        value: 50
    });
</script>
```

## 3. Format the Displayed Value

The NumericTextBox supports a variety of configurations. For a full list of all available options, visit the [NumericTextBox API Documentation](/api/javascript/ui/numerictextbox).

To apply a format to the rendered value, use the [`format`](/api/javascript/ui/numerictextbox/configuration/format) configuration.

```html
<input id="numeric-textbox" />

<script>
    $("#numeric-textbox").kendoNumericTextBox({
        format: "c2" // The value will be formatted as a currency value with two decimal symbols.
    });
</script>
```

## Next Steps 

* [Referencing Existing Component Instances]({% slug widget_methodsand_events_kendoui_installation %}) 
* [Demo Page for the NumericTextBox](https://demos.telerik.com/kendo-ui/numerictextbox/index)

## See Also 

* [JavaScript API Reference of the NumericTextBox](/api/javascript/ui/numerictextbox)
* [Knowledge Base Section](/knowledge-base)

