---
title: Known Limitations
page_title: jQuery NumericTextBox Documentation | Known Limitations
description: "Get started with the jQuery NumericTextBox by Kendo UI and learn how to create, initialize, and enable the widget."
slug: limitations_numerictextbox
position: 5
---

# Known Limitations

Тhe NumericTextBox has two known limitations that affect its behavior.

## Persisted Number of Decimals

To keep its value, the NumericTextBox uses a JavaScript `Number` object which has a certain precision limitation (restriction). In general, the `Number` object persists its precision up to 16 digits. Numbers longer than 16 digits get converted to exponential numbers and lose their precision. Because the widget relies on a `Number` object, it gets the same precision limitation.

This limitation comes from JavaScript and cannot be worked around in a feasible way. You are recommended to use an `<input>` element with server validation because some server languages can parse long numbers.

On the other hand, if the user enters a number with a greater precision than is currently configured through the `decimals` property, the widget value will be rounded. For more details and examples, refer to the [API documentation on `decimals`](/api/javascript/ui/numerictextbox/configuration/decimals).

## Input Type

The NumericTextBox uses `<input type="text" />` elements. If initialized from an `<input type="number" />` element, the widget switches the input type to `text`. This behavior enables the support for the comma (`,`) as a decimal separator in some non-en-US cultures. Currently, browsers ignore the culture of the client and the values that contain a comma as a decimal separator.

The side effect of using a `text` input type is that it prevents the numeric keyboard from appearing on mobile devices with context-specific software keyboards.

To render a numeric software keyboard, use either of the following workarounds:
* Use a plain numeric input for mobile devices and add a [`k-textbox`](/web/appearance-styling#primitives) CSS class to apply Kendo UI styling.
* Change the input type back to `number` after the NumericTextBox initializes. This is possible only for cultures that use a dot (`.`) as a decimal separator.

        /* The widget is initialized. */
        $("#my-numeric-textbox").kendoNumericTextBox({ /*...*/ });

        /* Set the input type to "number". */
        $("#my-numeric-textbox").attr("type", "number");

        /* Or, if the widget object is already available. */
        var numericTextBoxObject = $("#my-numeric-textbox").data("kendoNumericTextBox");
        numericTextBoxObject.element.attr("type", "number");

## See Also

* [JavaScript API Reference of the NumericTextBox](/api/javascript/ui/numerictextbox)
