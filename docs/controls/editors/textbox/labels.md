---
title: Labels
page_title: jQuery Labels for TextBox Documentation
description: "Learn how to create and initialize Labels for the TextBox."
slug: labels_textbox
position: 2
---

# Label Overview

The Label enables you to associate the label HTML element with a TextBox.

* [Demo page for the TextBox Floating Label](https://demos.telerik.com/kendo-ui/textbox/floating-label) 

## Basic Usage

To associate a TextBox with a Label, set the `label` property by providing a string or a function. The `string` and the `function` parameters are setting the inner HTML of the label.

The following example demonstrates how to set a Label for a TextBox from a string. 

```dojo
    <!-- Define the HTML div that will contain the textbox. -->
    <input id="textbox" />
    <!-- Initialize the TextBox with a Label. -->
    <script>
        $(document).ready(function(){
            $("#textbox").kendoTextBox({
                label: "First Name"
            });
        });
    </script>
```

The following example demonstrates how to set a Label for a TextBox from a function. The function context (available via the `this` keyword) will be set to the widget instance.

```dojo
    <!-- Define the HTML div that will contain the textbox. -->
    <input id="textbox" />
    <!-- Initialize the TextBox with a Label. -->
    <script>
        $(document).ready(function(){
            $("#textbox").kendoTextBox({
                label: function() {
                    return "First Name";
                }
            });
        });
    </script>
```

The Label also exposes a `content` property that sets the inner HTML of the label.

The below example demonstrates how to create a Label from a string.

```dojo
    <!-- Define the HTML div that will contain the textbox. -->
    <input id="textbox" />
    <!-- Initialize the TextBox with a Label Content. -->
    <script>
        $(document).ready(function(){
            $("#textbox").kendoTextBox({
                label: {
                    content: "First Name"
                }
            });
        });
    </script>
```

The below example demonstrates how to create a Label from a function.

```dojo
    <!-- Define the HTML div that will contain the textbox. -->
    <input id="textbox" />
    <!-- Initialize the TextBox with a Label Content. -->
    <script>
        $(document).ready(function(){
            $("#textbox").kendoTextBox({
                label: {
                    content: function() {
                        return "First Name";
                    }
                }
            });
        });
    </script>
```

## Floating Label

The Floating Label enables you to provide a floating label functionality to the TextBox.

The following example demonstrates how to set a Floating Label for a TextBox.

```dojo
    <!-- Define the HTML div that will contain the textbox. -->
    <input id="textbox" />
    <!-- Initialize the TextBox with a Floating Label. -->
    <script>
        $(document).ready(function(){
            $("#textbox").kendoTextBox({
                label: {
                    content: "First Name",
                    floating: true
                }
            });
        });
    </script>
```

If set to `true`, the widget will be wrapped in a container that will allow the floating label functionality.

> **Important:** The [value](/api/javascript/ui/textbox/methods/value) method **does not trigger** the `focusout` event of the input.
This could affect the floating label functionality.
You can overcome this behavior by manually invoking the `refresh` method of the Floating Label: `$("#textbox").data("kendoTextBox").floatingLabel.refresh();`


## See Also

* [Applying the TextBox API (Demo)](https://demos.telerik.com/kendo-ui/textbox/api)
* [JavaScript API Reference of the TextBox](/api/javascript/ui/textbox)
