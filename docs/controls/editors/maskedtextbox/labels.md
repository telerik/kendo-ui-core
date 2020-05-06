---
title: Labels
page_title: jQuery Labels for MaskedTextBox Documentation
description: "Learn how to create and initialize Labels for the MaskedTextBox."
slug: labels_maskedtextbox
position: 3
---

# Label Overview

The Label enables you to associate the label HTML element with the MaskedTextBox.

* [Demo page for the MaskedTextBox Floating Label](https://demos.telerik.com/kendo-ui/maskedtextbox/floating-label)

## Basic Usage

To associate a MaskedTextBox with a Label, set the `label` property by providing a string or a function. The `string` and the `function` parameters are setting the inner HTML of the label.

The following example demonstrates how to set a Label for a MaskedTextBox from a string. 

```dojo
    <!-- Define the HTML div that will contain the MaskedTextBox. -->
    <input id="maskedtextbox" />
    <!-- Initialize the MaskedTextBox with a Label. -->
    <script>
        $(document).ready(function(){
            $("#maskedtextbox").kendoMaskedTextBox({
                label: "Phone number"
            });
        });
    </script>
```

The following example demonstrates how to set a Label for a MaskedTextBox from a function. The function context (available via the `this` keyword) will be set to the widget instance.

```dojo
    <!-- Define the HTML div that will contain the MaskedTextBox. -->
    <input id="maskedtextbox" />
    <!-- Initialize the MaskedTextBox with a Label. -->
    <script>
        $(document).ready(function(){
            $("#maskedtextbox").kendoMaskedTextBox({
                label: function() {
                    return "Phone number";
                }
            });
        });
    </script>
```

The Label also exposes a `content` property that sets the inner HTML of the label.

The below example demonstrates how to create a Label from a string.

```dojo
    <!-- Define the HTML div that will contain the MaskedTextBox. -->
    <input id="maskedtextbox" />
    <!-- Initialize the MaskedTextBox with a Label Content. -->
    <script>
        $(document).ready(function(){
            $("#maskedtextbox").kendoMaskedTextBox({
                label: {
                    content: "Phone number"
                }
            });
        });
    </script>
```

The below example demonstrates how to create a Label from a function.

```dojo
    <!-- Define the HTML div that will contain the MaskedTextBox. -->
    <input id="maskedtextbox" />
    <!-- Initialize the MaskedTextBox with a Label Content. -->
    <script>
        $(document).ready(function(){
            $("#maskedtextbox").kendoMaskedTextBox({
                label: {
                    content: function() {
                        return "Phone number";
                    }
                }
            });
        });
    </script>
```

## Floating Label

The Floating Label enables you to provide a floating label functionality to the MaskedTextBox.

The following example demonstrates how to set a Floating Label for a MaskedTextBox.

```dojo
    <!-- Define the HTML div that will contain the MaskedTextBox. -->
    <input id="maskedtextbox" />
    <!-- Initialize the MaskedTextBox with a Floating Label. -->
    <script>
        $(document).ready(function(){
            $("#maskedtextbox").kendoMaskedTextBox({
                label: {
                    content: "Phone number",
                    floating: true
                }
            });
        });
    </script>
```

If set to `true`, the widget will be wrapped in a container that will allow the floating label functionality.

> **Important:** The [value](/api/javascript/ui/maskedtextbox/methods/value) method **does not trigger** the `focusout` event of the input.
This could affect the floating label functionality.
You can overcome this behavior by manually invoking the `refresh` method of the Floating Label: `$("#maskedtextbox").data("kendoMaskedTextBox").floatingLabel.refresh();`

## See Also

* [JavaScript API Reference of the MaskedTextBox](/api/javascript/ui/maskedtextbox)
