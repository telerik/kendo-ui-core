---
title: Validation
page_title: Validation
description: "Get started with the {{ site.product }} TimePicker and learn how to implement validation rules for its input value."
slug: htmlhelpers_timepicker_aspnetcore_validation
position: 3
---
{% if site.core %}
    {% assign ParseFormats = "/api/Kendo.Mvc.UI.Fluent/TimePickerBuilder#parseformatssystemstring" %}
{% else %}
    {% assign ParseFormats = "/api/Kendo.Mvc.UI.Fluent/DatePickerBuilderBase#parseformatssystemcollectionsgenericienumerablesystemstring" %}
{% endif %}

# Validation

The TimePicker is designed to keep its input value unchanged even when the typed time is invalid.

This behavior is set because of the following reasons:
- The TimePicker allows you to use different formats for time parsing. For more information, refer to the [`ParseFormats`]({{ ParseFormats }}) option.
- The TimePicker does not automatically update the typed text when the typed text is invalid. Such changes in the input value may lead to unexpected behavior.

To validate the input value of the TimePicker on the client, use a client-validation framework such as the [Kendo UI Validator for jQuery](https://docs.telerik.com/kendo-ui/controls/editors/validator/overview). In this way, you can provide an error message to end users which prompts them to do the right actions for them to resolve the issue. For more details, refer to the [demo on custom validation](https://demos.telerik.com/kendo-ui/validator/index).

## See Also

* [Server-Side API](/api/timepicker)
