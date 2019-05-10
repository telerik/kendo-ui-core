---
title: Input Restrictions
page_title: jQuery NumericTextBox Documentation | Input Restrictions | Kendo UI
description: "Get started with the jQuery NumericTextBox by Kendo UI and learn how to create, initialize, and enable the widget."
slug: input_restrictions_numerictextbox
position: 3
---

# Input Restrictions

The NumericTextBox enables you to [control the precision of the entered number](#numbers) and also [restrict its value to a specific range](#value-ranges).

## Numbers

The NumericTextBox controls the precision of the entered number by using the value of the [`decimals`](/api/javascript/ui/numerictextbox/configuration/decimals) option which limits the length of the input number to the `decimals` length.

By default, the widget does not restrict the length of the typed value. To enforce a specific fraction length during editing, set the [`restrictDecimals`](/api/javascript/ui/numerictextbox/configuration/restrictdecimals) option to `true`.

The widget controls the precision of the entered number by using the half-up rounding technique. To disable this functionality, use the [`round`](/api/javascript/ui/numerictextbox/configuration/round) configuration option. Once you turn off the rounding, the value is truncated up to the desired precision length without rounding it.

For a complete example, refer to the [demo on restricting decimals and rounding numbers in the NumericTextBox](https://demos.telerik.com/kendo-ui/numerictextbox/precision).

## Value Ranges

You can restrict the value of the NumericTextBox to a specific range by using either of the following approaches:

- Restrict the input value between a specific [`min`](/api/javascript/ui/numerictextbox/configuration/min) and [`max`](/api/javascript/ui/numerictextbox/configuration/max) range. The typed value gets modified to fit the range on `blur`.
- Use a custom Kendo UI Validator rule to restrict the input value. The invalid value remains unchanged and the user is notified for the incorrect input by an error message. For more information, refer to the article on the [custom validation rules]({% slug overview_kendoui_validator_widget %}#custom-rules-for-validation). For a complete example, refer to the [demo on range validation in the NumericTextBox](https://demos.telerik.com/kendo-ui/numerictextbox/validation).

## See Also

* [Restricting and Rounding Numbers in the NumericTextBox (Demo)](https://demos.telerik.com/kendo-ui/numerictextbox/precision)
* [Range Validation in the NumericTextBox (Demo)](https://demos.telerik.com/kendo-ui/numerictextbox/validation)
* [JavaScript API Reference of the NumericTextBox](/api/javascript/ui/numerictextbox)
