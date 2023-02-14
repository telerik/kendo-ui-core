---
title: Labels
page_title: jQuery Labels for TextArea Documentation
description: "Learn how to create and initialize Labels for the TextArea."
slug: labels_textarea
position: 2
---

# Label Overview

The Label enables you to associate a `label` HTML element with the TextArea.

* [Demo page for the TextArea Floating Label](https://demos.telerik.com/kendo-ui/textarea/floating-label) 

## Basic Usage

To associate a TextArea with a Label, set the `label` property by providing a string or a function. The `string` and the `function` parameters are setting the inner HTML of the label.

The following example demonstrates how to set a Label for a TextArea from a string. 

```dojo
    <!-- Define the HTML element that will contain the textarea. -->
    <textarea id="description" style="width: 100%;"></textarea>
    <!-- Initialize the TextArea with a Label. -->
    <script>
        $(document).ready(function(){
            $("#description").kendoTextArea({
                label: "Description"
            });
        });
    </script>
```

The following example demonstrates how to set a Label for a TextArea from a function. The function context (available via the `this` keyword) will be set to the widget instance.

```dojo
    <!-- Define the HTML element that will contain the textarea. -->
    <textarea id="description" style="width: 100%;"></textarea>
    <!-- Initialize the TextArea with a Label. -->
    <script>
        $(document).ready(function(){
            $("#description").kendoTextArea({
                label: function() {
                    return "Description";
                }
            });
        });
    </script>
```

The Label also exposes a `content` property that sets the inner HTML of the label.

The below example demonstrates how to create a Label from a string.

```dojo
    <!-- Define the HTML element that will contain the textbox. -->
    <textarea id="description" style="width: 100%;"></textarea>
    <!-- Initialize the TextArea with a Label Content. -->
    <script>
        $(document).ready(function(){
            $("#description").kendoTextArea({
                label: {
                    content: "Description"
                }
            });
        });
    </script>
```

The below example demonstrates how to create a Label from a function.

```dojo
    <!-- Define the HTML element that will contain the textarea. -->
   <textarea id="description" style="width: 100%;"></textarea>
    <!-- Initialize the TextArea with a Label Content. -->
    <script>
        $(document).ready(function(){
            $("#description").kendoTextArea({
                label: {
                    content: function() {
                        return "Description";
                    }
                }
            });
        });
    </script>
```

## Floating Label

The Floating Label enables you to provide a floating label functionality to the TextArea.

The following example demonstrates how to set a Floating Label for a TextArea.

```dojo
    <!-- Define the HTML element that will contain the textarea. -->
    <textarea id="description" style="width: 100%;"></textarea>
    <!-- Initialize the TextArea with a Floating Label. -->
    <script>
        $(document).ready(function(){
            $("#description").kendoTextArea({
                label: {
                    content: "Description",
                    floating: true
                }
            });
        });
    </script>
```

If set to `true`, the widget will be wrapped in a container that will allow the floating label functionality.

> **Important:** The [value](/api/javascript/ui/textarea/methods/value) method **does not trigger** the `focusout` event of the textarea.
This could affect the floating label functionality.
You can overcome this behavior by manually invoking the `refresh` method of the Floating Label: `$("#description").data("kendoTextArea").floatingLabel.refresh();`

## See Also

* [Applying the TextArea API (Demo)](https://demos.telerik.com/kendo-ui/textarea/api)
* [JavaScript API Reference of the TextArea](/api/javascript/ui/textarea)
