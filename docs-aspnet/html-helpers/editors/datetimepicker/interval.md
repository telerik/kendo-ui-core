---
title: Interval
page_title: Telerik UI DateTimePicker for {{ site.framework }} Documentation - Interval
description: "Get familiar with the Telerik UI DateTimePicker component for {{ site.framework }} and how to set its interval feature."
slug: htmlhelpers_datetimepicker_interval_aspnetcore
position: 9
---

# Interval

The {{ site.product }} DateTimePicker allows you to specify the time interval between the values in the time view of the popup list.

Depending on the [Component Type](% slug htmlhelpers_componenttype_timepicker_aspnetcore %), you can set the interval in two distinct ways.

## Setting the Interval in Classic Render Mode

When the [`ComponentType()`](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.ui.fluent/datetimepickerbuilder#componenttypesystemstring) method is set to `classic`, the interval is specified in minutes (numeric values).

```HtmlHelper
    @(Html.Kendo().DateTimePicker
        .Name("datetimepicker")
        .ComponentType("classic")
        .Interval(7)
    )
```
{% if site.core %}
```TagHelper
    <kendo-datetimepicker name="datetimepicker" 
                      component-type="classic"
                      interval="7">
    </kendo-datetimepicker>
```
{% endif %}

When the `ComponentType()` is set to `classic`, the interval does not accept an object of hours, minutes, and seconds.

## Setting the Interval in Modern Render Mode

When the [`ComponentType()`](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.ui.fluent/datetimepickerbuilder#componenttypesystemstring) method is set to `modern`, the interval is specified as an object of hours, minutes, and seconds.

```HtmlHelper
    @(Html.Kendo().DateTimePicker()
        .Name("datetimepicker")
        .Interval(interval => interval
            .Second(15)
            .Minute(5)
            .Hour(7)
        )
    )
```
{% if site.core %}
```TagHelper
    <kendo-datetimepicker name="datetimepicker">
        <interval-settings second="15" minute="5" hour="7" />
    </kendo-datetimepicker>
```
{% endif %}

> When the `ComponentType()` is set to `modern`, the interval does not accept a single numerical value.

## See Also

* [Server-Side API](/api/datetimepicker)
{% if site.core %}
* [TagHelper API](https://docs.telerik.com/aspnet-core/api/taghelpers/datetimepicker)
{% endif %}