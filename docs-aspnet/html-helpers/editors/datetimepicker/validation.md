---
title: Validation
page_title: Validation
description: "Get started with the Telerik UI DateTimePicker for {{ site.framework }} and learn how to implement validation rules for its input value."
slug: validation_datetimepicker_aspnetcore
position: 5
---
{% if site.core %}
    {% assign ParseFormats = "/api/Kendo.Mvc.UI.Fluent/DateTimePickerBuilder#parseformatssystemstring" %}
{% else %}
    {% assign ParseFormats = "/api/Kendo.Mvc.UI.Fluent/DatePickerBuilderBase#parseformatssystemcollectionsgenericienumerablesystemstring" %}
{% endif %}

# Validation

The DateTimePicker is designed to keep its input value unchanged even when the typed date is invalid.

This behavior is set because of the following reasons:
- The DateTimePicker allows you to use different formats for date parsing which require unrestricted user input. For more information, refer to the [`ParseFormats`]({{ ParseFormats }}) option.
- The DateTimePicker does not automatically update the typed text when the typed text is invalid. Such a change in the input value may lead to unexpected behavior.

To validate the input value of the DateTimePicker, use a client-validation framework such as the [Kendo UI Validator for jQuery](https://docs.telerik.com/kendo-ui/controls/editors/validator/overview). In this way, you can provide an error message to end users which prompts them to do the right actions for them to resolve the issue.

## See Also

* [Server-Side API](/api/datetimepicker)
