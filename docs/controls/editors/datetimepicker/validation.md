---
title: Validation
page_title: jQuery DateTimePicker Documentation | Validation
description: "Get started with the jQuery DateTimePicker by Kendo UI and learn how to implement validation rules for its input value."
slug: validation_kendoui_datetimepicker
position: 5
---

# Validation

The DateTimePicker is designed to keep its input value unchanged even when the typed date is invalid.

This behavior is set because of the following reasons:
- The DateTimePicker allows you to use different formats for date parsing which require unrestricted user input. For more information, refer to the [`parseFormats`](/api/javascript/ui/datetimepicker/configuration/parseformats) option.
- The DateTimePicker does not automatically update the typed text when the typed text is invalid. Such a change in the input value may lead to unexpected behavior.

To validate the input value of the DateTimePicker, use a client-validation framework such as the [Kendo UI Validator for jQuery]({% slug overview_kendoui_validator_widget %}). In this way, you can provide an error message to end users which prompts them to do the right actions for them to resolve the issue. For more information, refer to the [online demo on custom validation](https://demos.telerik.com/kendo-ui/validator/custom-validation).

## See Also

* [Basic Usage of the DateTimePicker (Demo)](https://demos.telerik.com/kendo-ui/datetimepicker/index)
* [JavaScript API Reference of the DateTimePicker](/api/javascript/ui/datetimepicker)
