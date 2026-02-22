---
title: DateInput Integration
page_title: DateInput Integration
description: "Get started with the Telerik UI DateTimePicker for ASP.NET and learn how to integrate it with the Telerik UI DateInput."
components: ["datetimepicker"]
slug: dateinputintegration_datetimepicker_aspnetcore
position: 9
---
{% if site.core %}
    {% assign DateInput = "/api/kendo.mvc.ui.fluent/datetimepickerbuilder#dateinputsystemboolean" %}
{% else %}
    {% assign DateInput = "/api/kendo.mvc.ui.fluent/datepickerbuilderbase#dateinputsystemboolean" %}
{% endif %}

# DateInput Integration

The DatePicker provides integration options with the [Telerik UI DateInput for {{ site.framework }}]({% slug htmlhelpers_dateinput_aspnetcore %}) for the input element it renders.

To use the DateInput as the input element in a DateTimePicker, enable the [`DateInput`]({{ DateInput }}) property of the DateTimePicker.

```HtmlHelper
    @(Html.Kendo().DateTimePicker()
        .Name("dateTimePicker")
        .DateInput(true)
    )
```
{% if site.core %}
```TagHelper
<kendo-datetimepicker name="datetimepicker"
                       date-input="true"/>
```
{% endif %}

To customize the placeholders of the DateInput use the [`Messages`](/api/kendo.mvc.ui.fluent/datepickerbasemessagessettingsbuilder) configuration and set the desired DateInput messages.

## AutoFill functionality

With the DateInput integration enabled, you the AutoFill functionality can also be enabled via the [`autoFill`](api/javascript/ui/datepicker/configuration/autofill) configuration option.

```HtmlHelper
    @(Html.Kendo().DateTimePicker()
        .Name("dateTimePicker")
        .DateInput(true)
        .AutoFill(true)
    )
```
{% if site.core %}
```TagHelper
<kendo-datetimepicker name="datetimepicker"
                       date-input="true"
                       auto-fill="true" />
```
{% endif %}

When the AutoFill functionality is enabled you can complete any of the date segments in the DatePicker's DateInput and when the component looses focus the rest of the date will automatically be filled with the corresponding segment of the current date. For example, if the current date is 06 Jul 2023 and the user fills only the day portion as 15 and clicks on another input element the date will be autofilled to 15 Jul 2023.

## See Also

* [Server-Side API](/api/datetimepicker)
