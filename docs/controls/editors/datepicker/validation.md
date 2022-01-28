---
title: Input Value Validation
page_title: jQuery DatePicker Documentation | Input Value Validation
description: "Get started with the jQuery DatePicker by Kendo UI and learn how to implement validation rules for its input value."
slug: validation_datepicker
position: 5
---

# Input Value Validation

The DatePicker is designed to keep its input value unchanged even when the typed date is invalid.

This behavior is set because of the following reasons:
- The DatePicker allows you to use different formats for date parsing which require unrestricted user input. For more information, refer to the [`parseFormats`](/api/javascript/ui/datepicker/configuration/parseformats) option.
- The DatePicker does not automatically update the typed text when the types text is invalid. Such a change in the input value may lead to unexpected behavior.

To validate the input value of the DatePicker, use a client-validation framework such as the [Kendo UI Validator]({% slug overview_kendoui_validator_widget %}). In this way, you can provide an error message to end users which prompts them to do the right actions for them to resolve the issue. For more details, refer to the [demo on custom validation](https://demos.telerik.com/kendo-ui/validator/custom-validation).

## See Also

* [Using Custom Validation in Kendo UI for jQuery (Demo)](https://demos.telerik.com/kendo-ui/validator/custom-validation)
* [JavaScript API Reference of the DatePicker](/api/javascript/ui/datepicker)
