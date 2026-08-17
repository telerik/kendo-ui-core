---
title: Validation
page_title: Validation
description: "Get started with the Telerik UI DateTimePicker for {{ site.framework }} and learn how to implement validation rules for its input value."
components: ["datetimepicker"]
slug: validation_datetimepicker_aspnetcore
position: 5
---
{% if site.core %}
    {% assign ParseFormats = "/api/kendo.mvc.ui.fluent/datetimepickerbuilder#parseformatssystemstring" %}
{% else %}
    {% assign ParseFormats = "/api/kendo.mvc.ui.fluent/datetimepickerbuilder#parseformatssystemcollectionsgenericienumerable" %}
{% endif %}

# Validation

The DateTimePicker is designed to keep its input value unchanged even when the typed date is invalid.

This behavior is set because of the following reasons:
- The DateTimePicker allows you to use different formats for date parsing which require unrestricted user input. For more information, refer to the [`ParseFormats`]({{ ParseFormats }}) option.
- The DateTimePicker does not automatically update the typed text when the typed text is invalid. Such a change in the input value may lead to unexpected behavior.

To validate the input value of the DateTimePicker, use a client-validation framework such as the [Kendo UI Validator for jQuery](https://docs.telerik.com/kendo-ui/controls/validator/overview). In this way, you can provide an error message to end users which prompts them to do the right actions for them to resolve the issue.

## Server-Side Validation

Use the `DateTimePickerFor` method with DataAnnotations to validate the DateTimePicker value on the server. The following example marks the field as required and limits the value to a specific date range.

```C#
public class AppointmentViewModel
{
    [Required]
    [Range(typeof(DateTime), "01/01/2026", "12/31/2026")]
    public DateTime? AppointmentDate { get; set; }
}
```

```HtmlHelper
@model AppointmentViewModel

<form asp-action="Save" method="post">
    @(Html.Kendo().DateTimePickerFor(model => model.AppointmentDate))

    @Html.ValidationMessageFor(model => model.AppointmentDate)
    <button type="submit">Save</button>
</form>
```

{% if site.core %}
```TagHelper
@model AppointmentViewModel
@addTagHelper *, Kendo.Mvc

<form asp-action="Save" method="post">
    <kendo-datetimepicker for="AppointmentDate"></kendo-datetimepicker>

    <span asp-validation-for="AppointmentDate"></span>
    <button type="submit">Save</button>
</form>
```
{% endif %}

## Client-Side Validation

Initialize the Kendo UI Validator on the form to validate the DateTimePicker input before the form is submitted. Add a custom rule when the value must satisfy a condition that is not covered by the built-in rules.

```HtmlHelper
<form id="appointment-form">
    @(Html.Kendo().DateTimePicker()
        .Name("AppointmentDate"))

    <button type="submit">Save</button>
</form>

<script>
    $("#appointment-form").kendoValidator({
        rules: {
            businessHours: function(input) {
                if (input.is("[name='AppointmentDate']") && input.val()) {
                    var value = input.data("kendoDateTimePicker").value();
                    return value && value.getHours() >= 9 && value.getHours() < 17;
                }

                return true;
            }
        },
        messages: {
            businessHours: "Choose an appointment between 9:00 AM and 5:00 PM."
        }
    });
</script>
```

{% if site.core %}
```TagHelper
<form id="appointment-form">
    <kendo-datetimepicker name="AppointmentDate"></kendo-datetimepicker>

    <button type="submit">Save</button>
</form>

<script>
    $("#appointment-form").kendoValidator({
        rules: {
            businessHours: function(input) {
                if (input.is("[name='AppointmentDate']") && input.val()) {
                    var value = input.data("kendoDateTimePicker").value();
                    return value && value.getHours() >= 9 && value.getHours() < 17;
                }

                return true;
            }
        },
        messages: {
            businessHours: "Choose an appointment between 9:00 AM and 5:00 PM."
        }
    });
</script>
```
{% endif %}

## See Also

* [Server-Side API](/api/datetimepicker)
