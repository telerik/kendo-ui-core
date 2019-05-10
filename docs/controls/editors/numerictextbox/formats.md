---
title: Formats
page_title: jQuery NumericTextBox Documentation | Formats | Kendo UI
description: "Get started with the jQuery NumericTextBox by Kendo UI and learn how to create currency and percentage NumericTextBoxes."
slug: formats_numerictextbox
position: 2
---

# Formats

The NumericTextBox accepts only numeric entries and its specific format defines the conversion data type&mdash;for example, currency or percentage.

The following example demonstrates how to render a currency NumericTextBox.

     <input id="textbox">

     <script>
        $("#textbox").kendoNumericTextBox({
            format: "c2" // Define the currency format signified with the letter "c" and a two-digit precision.
        });
    </script>

The following example demonstrates how to render a percentage NumericTextBox.

    <input id="textbox">

     <script>
        $("#textbox").kendoNumericTextBox({
            format: "p", // Define the percentage format signified with the letter "p".
            value: 0.15 // 15 %
        });
    </script>

## See Also

* [JavaScript API Reference of the NumericTextBox](/api/javascript/ui/numerictextbox)
* [Known Limitations in the NumericTextBox]({% slug limitations_numerictextbox %})
