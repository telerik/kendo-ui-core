---
title: Labels
page_title: jQuery Labels for NumericTextBox Documentation
description: "Learn how to create and initialize Labels for the Numeric TextBox."
slug: labels_numerictextbox
position: 3
---

# Label Overview

The Label enables you to associate the label HTML element with the NumericTextBox.

* [Demo page for the NumericTextBox Floating Label](https://demos.telerik.com/kendo-ui/numerictextbox/floating-label) 

## Basic Usage

To associate a NumericTextBox with a Label, set the `label` property by providing a string or a function. The `string` and the `function` parameters are setting the inner HTML of the label.

The following example demonstrates how to set a Label for a NumericTextBox from a   string. 

```dojo
    <!-- Define the HTML div that will contain the NumericTextBox. -->
    <input id="numerictextbox" />
    <!-- Initialize the NumericTextBox with the Label. -->
    <script>
        $(document).ready(function(){
            $("#numerictextbox").kendoNumericTextBox({
                label: "Price"
            });
        });
    </script>
```

The following example demonstrates how to set a Label for a NumericTextBox from a function. The function context (available via the `this` keyword) will be set to the widget instance.

```dojo
    <!-- Define the HTML div that will contain the NumericTextBox. -->
    <input id="numerictextbox" />
    <!-- Initialize the NumericTextBox with a Label. -->
    <script>
        $(document).ready(function(){
            $("#numerictextbox").kendoNumericTextBox({
                label: function() {
                    return "Price";
                }
            });
        });
    </script>
```

The Label also exposes a `content` property that sets the inner HTML of the label.

The below example demonstrates how to create a Label from a string.

```dojo
    <!-- Define the HTML div that will contain the NumericTextBox. -->
    <input id="numerictextbox" />
    <!-- Initialize the NumericTextBox with a Label Content.      -->
    <script>
        $(document).ready(function(){
            $("#numerictextbox").kendoNumericTextBox({
                label: {
                    content: "Price"
                }
            });
        });
    </script>
```

The below example demonstrates how to create a Label from a function.

```dojo
    <!-- Define the HTML div that will contain the NumericTextBox. -->
    <input id="numerictextbox" />
    <!-- Initialize the NumericTextBox with a Label Content. -->
    <script>
        $(document).ready(function(){
            $("#numerictextbox").kendoNumericTextBox({
                label: {
                    content: function() {
                        return "Price";
                    }
                }
            });
        });
    </script>
```

## Floating Label

The Floating Label enables you to provide a floating label functionality to the NumericTextBox.

The following example demonstrates how to set a Floating Label for a NumericTextBox.

```dojo
    <!-- Define the HTML div that will contain the NumericTextBox. -->
    <input id="numerictextbox" />
    <!-- Initialize the NumericTextBox with a Floating Label. -->
    <script>
        $(document).ready(function(){
            $("#numerictextbox").kendoNumericTextBox({
                label: {
                    content: "Price",
                    floating: true
                }
            });
        });
    </script>
```

If set to `true`, the widget will be wrapped in a container that will allow the floating label functionality.

> **Important:** The [value](/api/javascript/ui/numerictextbox/methods/value) method **does not trigger** the `focusout` event of the input.
This could affect the floating label functionality.
You can overcome this behavior by manually invoking the `refresh` method of the Floating Label: `$("#numerictextbox").data("kendoNumericTextBox").floatingLabel.refresh();`

## See Also

* [Basic Usage of the NumericTextBox (Demo)](https://demos.telerik.com/kendo-ui/numerictextbox/index)
* [Applying the NumericTextBox API (Demo)](https://demos.telerik.com/kendo-ui/numerictextbox/api)
* [JavaScript API Reference of the NumericTextBox](/api/javascript/ui/numerictextbox)
