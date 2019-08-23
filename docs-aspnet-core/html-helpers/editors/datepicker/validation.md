---
title: Validation
page_title: Validation | Telerik UI DatePicker HtmlHelper for ASP.NET Core
description: "Get started with the Telerik UI for ASP.NET Core DatePicker and learn how to implement validation rules for its input value."
slug: htmlhelpers_datepicker_aspnetcore_validation
position: 5
---

# Validation

The DatePicker is designed to keep its input value unchanged even when the typed date is invalid.

This behavior is set because of the following reasons:
- The DatePicker allows you to use different formats for date parsing which require unrestricted user input. For more information, refer to the [`ParseFormats`](/api//Kendo.Mvc.UI.Fluent/DatePickerBuilder#parseformatssystemstring) option.
- The DatePicker does not automatically update the typed text when the typed text is invalid. Such a change in the input value may lead to unexpected behavior.

To validate the input value of the DatePicker on the client, use a client-validation framework such as the [Kendo UI Validator for jQuery](https://docs.telerik.com/kendo-ui/controls/editors/validator/overview). In this way, you can provide an error message to end users which prompts them to do the right actions for them to resolve the issue. For more details, refer to the [demo on custom validation](http://demos.telerik.com/kendo-ui/validator/custom-validation).

## See Also

* [Server-Side API](/api/datepicker)
