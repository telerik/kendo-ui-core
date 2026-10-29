---
title: Validation
page_title: Validation
description: "Get started with the {{ site.product }} DatePicker and learn how to implement validation rules for its input value."
components: ["datepicker"]
slug: htmlhelpers_datepicker_aspnetcore_validation
position: 5
---
{% if site.core %}
    {% assign ParseFormats = "/api/kendo.mvc.ui.fluent/datepickerbuilder#parseformatssystemstring" %}
{% else %}
    {% assign ParseFormats = "/api/kendo.mvc.ui.fluent/datepickerbuilder#parseformatssystemcollectionsgenericienumerable" %}
{% endif %}

# Validation

The DatePicker is designed to keep its input value unchanged even when the typed date is invalid.

This behavior is set because of the following reasons:
- The DatePicker allows you to use different formats for date parsing which require unrestricted user input. For more information, refer to the [`ParseFormats`]({{ ParseFormats }}) option.
- The DatePicker does not automatically update the typed text when the typed text is invalid. Such a change in the input value may lead to unexpected behavior.

The DatePicker does not throw a JavaScript exception when it cannot parse the typed text. It keeps the text available for validation so the form or application can display an appropriate error. This behavior is specific to the DatePicker parsing workflow and does not mean that other editors convert invalid input to a different data type.

To validate the input value of the DatePicker on the client, use a client-validation framework such as the [Kendo UI Validator for jQuery](https://docs.telerik.com/kendo-ui/controls/validator/overview). In this way, you can provide an error message to end users which prompts them to do the right actions for them to resolve the issue. For more details, refer to the [demo on custom validation](https://demos.telerik.com/kendo-ui/validator/custom-validation).

If a non-empty invalid value is replaced with another date, verify the component version, culture, `Format`, `ParseFormats`, and the event where the replacement occurs. This behavior is different from the documented invalid-input behavior and requires separate investigation.

## See Also

* [Server-Side API](/api/datepicker)
