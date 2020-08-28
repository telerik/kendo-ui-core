---
title: Input Restrictions
page_title: Input Restrictions
description: "Get started with the Telerik UI NumericTextBox for {{ site.framework }} and learn how to control the precision of the entered numebr and restrict the value to a specific range."
slug: input_restrictions_numerictextbox_aspnetcore
position: 4
---

# Input Restrictions

The NumericTextBox enables you to [control the precision of the entered number](#numbers) and also [restrict its value to a specific range](#value-ranges).

## Numbers

The NumericTextBox controls the precision of the entered number by using the value of the [`Decimals`](https://docs.telerik.com/{{ site.platform }}/api/Kendo.Mvc.UI.Fluent/NumericTextBoxBuilder#decimalssystemint32) option which limits the length of the input number to the `Decimals` length.

By default, the helper does not restrict the length of the typed value. To enforce a specific fraction length during editing, set the [`RestrictDecimals`](https://docs.telerik.com/{{ site.platform }}/api/Kendo.Mvc.UI.Fluent/NumericTextBoxBuilder#restrictdecimalssystemboolean) option to `true`.

The helper controls the precision of the entered number by using the half-up rounding technique. To disable this functionality, use the [`Round`](https://docs.telerik.com/{{ site.platform }}/api/Kendo.Mvc.UI.Fluent/NumericTextBoxBuilder#roundsystemboolean) configuration option. Once you turn off the rounding, the value is truncated up to the desired precision length without rounding it.

## Value Ranges

You can restrict the value of the NumericTextBox to a specific range by using either of the following approaches:

- Restrict the input value between a specific [`Min`](https://docs.telerik.com/{{ site.platform }}/api/Kendo.Mvc.UI.Fluent/NumericTextBoxBuilder#minsystemnullablet) and [`Max`](https://docs.telerik.com/{{ site.platform }}/api/Kendo.Mvc.UI.Fluent/NumericTextBoxBuilder#maxsystemnullablet) range. The typed value gets modified to fit the range on `blur`.
- Use a custom Kendo UI Validator rule to restrict the input value. The invalid value remains unchanged and the user is notified for the incorrect input by an error message. For more information, refer to the article on the [custom validation rules](https://docs.telerik.com/kendo-ui/controls/editors/validator/overview#custom-rules-for-validation).

## See Also

* [Using the API of the NumericTextBox HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/numerictextbox/api)
* [Server-Side API](/api/numerictextbox)
