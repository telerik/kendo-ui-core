---
title: Getting Started
page_title: jQuery TextBox Documentation - Getting Started with the TextBox
description: "Get started with the jQuery TextBox by Kendo UI and learn how to create, initialize, and enable the widget."
slug: getting_started_kendoui_textbox_widget
position: 1
---

# Getting Started with the TextBox

This guide demonstrates how to get up and running with the Kendo UI for jQuery TextBox.

After the completion of this guide, you will be able to achieve the following end result:

```dojo
    <input id="textbox" />
    <script>
      $("#textbox").kendoTextBox({
        value: "Some text",
        fillMode: "flat",
        label: {
          content: "First name",
          floating: true
        }
      });
    </script>
```

## 1. Create an input Element

First, create an `<input>` element on the page that will be used to initialize the widget.

```html
<input id="textbox" />
```

## 2. Initialize the TextBox 

In this step, you will initialize the TextBox from the `<input>` element. Upon its initialization, the TextBox wraps the `<input>` element with a `<span>` tag.

```html
<input id="textbox" />

<script>
    // Target the input element by using jQuery and then call the kendoTextBox() method.
    $("#textbox").kendoTextBox({
        // Add some basic configurations such as a default value.
        value: "Some text"
    });
</script>
```

## 3. Apply Stylings to the TextBox

The TextBox provides several options that enable you to modify its appearance. The following example demonstrates how to apply a [`flat` `fillMode`](https://docs.telerik.com/kendo-ui/api/javascript/ui/textbox/configuration/fillmode) to the component.

```html
<input id="textbox" />

<script>
    $("#textbox").kendoTextBox({
        value: "Some text",
        fillMode: "flat" // Apply a flat fillMode.
    });
</script>
```

## 4. Configure the Label of the TextBox

The TextBox enables you to configure the label by using the [`label`](https://docs.telerik.com/kendo-ui/api/javascript/ui/textbox/configuration/label) property.

```html
<input id="textbox" />

<script>
    $("#textbox").kendoTextBox({
        value: "Some text",
        fillMode: "flat",
        label: {
          content: "First name", // Specify the label content.
          floating: true // Allow the label to float.
        }
    });
</script>
```

## Next Steps 

* [Referencing Existing Widget Instances]({% slug widget_methodsand_events_kendoui_installation %}) 
* [Demo Page for the TextBox](https://demos.telerik.com/kendo-ui/textbox/index)

## See Also 

* [JavaScript API Reference of the TextBox](/api/javascript/ui/textbox)
* [Knowledge Base Section](/knowledge-base)

<script>
  window.onload = function() {
    document.getElementsByClassName("btn-run")[0].click();
  }
</script>