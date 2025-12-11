---
title: Getting Started
page_title: jQuery TextArea Documentation - Getting Started with the TextArea
description: "Get started with the jQuery TextArea by Kendo UI and learn how to create, initialize, and enable the component."
components: ["textarea"]
slug: getting_started_kendoui_textarea
position: 1
---

# Getting Started with the TextArea

This guide demonstrates how to get up and running with the Kendo UI for jQuery TextArea.

After the completion of this guide, you will be able to achieve the following end result:

```dojo
    <textarea id="textarea"></textarea>
    <script>
      $("#textarea").kendoTextArea({
        value: "Some comment",
        fillMode: "flat",
        label: {
          content: "Leave a comment:",
          floating: true
        }
      });
    </script>
```

## 1. Create a TextArea Element

First, create an `<textarea>` element on the page that will be used to initialize the component.

```html
<textarea id="textarea"></textarea>
```

## 2. Initialize the TextArea

In this step, you will initialize the Textarea from the `<textarea>` element. Upon its initialization, the TextArea wraps the `<textarea>` element with a `<span>` tag.

```html
<textarea id="textarea"></textarea>

<script>
    // Target the textarea element by using jQuery and then call the kendoTextArea() method.
    $("#textarea").kendoTextArea({
        // Add some basic configurations such as a default value.
        value: "Some comment"
    });
</script>
```

## 3. Apply Stylings to the TextArea

The TextArea provides several options that enable you to modify its appearance. The following example demonstrates how to apply a [`fillMode`](https://docs.telerik.com/kendo-ui/api/javascript/ui/textarea/configuration/fillmode) to the component.

```html
<textarea id="textarea"></textarea>

<script>
    $("#textarea").kendoTextArea({
        // Add some basic configurations such as a default value.
        value: "Some comment",
        fillMode:"flat"
    });
</script>
```

## 4. Configure the Label of the TextArea

The TextArea enables you to configure the label by using the [`label`](https://docs.telerik.com/kendo-ui/api/javascript/ui/textarea/configuration/label) property.

```html
<textarea id="textarea"></textarea>

<script>
    $("#textarea").kendoTextArea({
        value: "Some comment",
        fillMode: "flat",
        label: {
          content: "Leave a comment:", // Specify the label content.
          floating: true // Allow the label to float.
        }
    });
</script>
```

## Next Steps

* [Referencing Existing Component Instances]({% slug widget_methodsand_events_kendoui_installation %})
* [Demo Page for the TextArea](https://demos.telerik.com/kendo-ui/textarea/index)

## See Also 

* [JavaScript API Reference of the TextArea](/api/javascript/ui/textarea)
* [Knowledge Base Section](/knowledge-base)


