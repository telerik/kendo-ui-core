---
title: DateInput Integration
page_title: DateInput Integration
description: "Get started with the {{ site.product }} DatePicker and learn how to integrate it with the {{ site.product }} DateInput."
slug: htmlhelpers_datepicker_aspnetcore_dateinputintegration
position: 8
---

# DateInput Integration

The DatePicker provides integration options with the [{{ site.product }} DateInput]({% slug htmlhelpers_dateinput_aspnetcore %}) for the input element it renders.

To use the DateInput in a DatePicker, enable the [`DateInput`](/api/kendo.mvc.ui.fluent/datepickerbuilder#dateinputsystemboolean) property of the DatePicker.

```HtmlHelper
    @(Html.Kendo().DatePicker()
        .Name("datepicker")
        .DateInput()
        .Value("10/10/2019")
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-datepicker name="datepicker"
        date-input="true"
        value="new DateTime(10/10/2019)">
    </kendo-datepicker>
```
{% endif %}

To customize the placeholders of the DateInput use the [`Messages`](/api/kendo.mvc.ui.fluent/datepickerbuilder#messagessystemaction) configuration and set the desired DateInput message. The component also provides the `Format()` option that you can leverage to set the date format, which will be used to parse and format the machine date. Defaults to `CultureInfo.DateTimeFormat.ShortDatePattern`.

## AutoFill Functionality

With the DateInput integration enabled, you can set the [`AutoFill()`](/api/kendo.mvc.ui.fluent/datepickerbuilder#autofill) option.

When the `AutoFill` functionality is enabled, you can complete any of the date segments in the DateInput, and when the DatePicker loses focus, the rest of the date will be filled automatically with the corresponding segment of the current date. For example, if the current date is **06 Jul 2023** and you enter only the day portion as **15** and click on another input element, the date will be autofilled to **15 Jul 2023**.

```HtmlHelper
    @(Html.Kendo().DatePicker()
        .Name("datepicker")
        .DateInput()
        .AutoFill()
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-datepicker name="datepicker"
        date-input="true"
        auto-fill="true">
    </kendo-datepicker>
```
{% endif %}

## See Also

* [Basic Usage of the DatePicker HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/datepicker/index)
{% if site.core %}
* [Basic Usage of the DatePicker TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/datepicker/tag-helper)
{% endif %}
* [Server-Side API](/api/datepicker)
