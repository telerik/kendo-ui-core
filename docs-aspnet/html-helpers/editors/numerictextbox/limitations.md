---
title: Known Limitations
page_title: Known Limitations
description: "Get started with the Telerik UI NumericTextBox for {{ site.framework }} and learn what are the known limitations of the helper."
slug: limitations_numerictextbox_aspnetcore
position: 6
---

# Known Limitations

The NumericTextBox comes with a couple of limitations that affect its behavior.

## Persisted Number of Decimals

To keep its value, the NumericTextBox uses a JavaScript `Number` object which has a certain precision limitation (restriction). In general, the `Number` object persists its precision up to 16 digits. Numbers longer than 16 digits get converted to exponential numbers and lose their precision. Because the widget relies on a `Number` object, it gets the same precision limitation.

This limitation comes from JavaScript and cannot be worked around in a feasible way. You are recommended to use an `<input>` element with server validation because some server languages can parse long numbers.

On the other hand, if the user enters a number with a greater precision than is currently configured through the `decimals` property, the widget value will be rounded. For more details and examples, refer to the [API documentation on `Decimals`](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.ui.fluent/numerictextboxbuilder#decimalssystemint32).

## Input Type

The NumericTextBox uses `<input type="text" />` elements. If initialized from an `<input type="number" />` element, the widget switches the input type to `text`. This behavior enables the support for the comma (`,`) as a decimal separator in some non-en-US cultures. Currently, browsers ignore the culture of the client and the values that contain a comma as a decimal separator.

The side effect of using a `text` input type is that it prevents the numeric keyboard from appearing on mobile devices with context-specific software keyboards.

To render a numeric software keyboard, use either of the following workarounds:
* Use a plain numeric input for mobile devices and add a [`k-textbox`](https://docs.telerik.com/kendo-ui/styles-and-layout/appearance-styling#primitives) CSS class to apply Telerik UI styling.
* Change the input type back to `number` after the NumericTextBox initializes. This is possible only for cultures that use a dot (`.`) as a decimal separator.

        /* Helper configuration. */
        @(Html.Kendo().NumericTextBox()
            .Name("numerictextbox")
        )

        /* Set the input type to "number". */
        <script>
            $("#numerictextbox").attr("type", "number");
        </script>

        /* Alternatively, if the helper object is already available, use the following setting. */
        <script>
            var numericTextBoxObject = $("#numerictextbox").data("kendoNumericTextBox");
            numericTextBoxObject.element.attr("type", "number");
        </script>

## See Also

* [Using the API of the NumericTextBox HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/numerictextbox/api)
* [Server-Side API](/api/numerictextbox)
