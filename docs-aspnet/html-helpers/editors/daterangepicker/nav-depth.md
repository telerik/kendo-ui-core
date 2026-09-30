---
title: Start View and Selection Depth
page_title: Start View and Selection Depth
description: "Get started with the Telerik UI DateRangePicker for {{ site.framework }} and learn how to define the start view and control the navigation depth."
components: ["daterangepicker"]
slug: navdepth_daterangepicker_aspnetcore
position: 4
---
{% if site.core %}
    {% assign Start = "/api/kendo.mvc.ui.fluent/daterangepickerbuilder#startkendomvcuicalendarview" %}
    {% assign Depth = "/api/kendo.mvc.ui.fluent/daterangepickerbuilder#depthkendomvcuicalendarview" %}
{% else %}
    {% assign Start = "/api/kendo.mvc.ui.fluent/daterangepickerbuilder#startsystemstring" %}
    {% assign Depth = "/api/kendo.mvc.ui.fluent/daterangepickerbuilder#depthsystemstring" %}
{% endif %}

# Start View and Navigation Depth

The DateRangePicker enables you to set the initial view it renders and define the navigation depth of the views.

To define the initially rendered view, use the [`Start`]({{ Start }}) option. To control the navigation depth, use the [`Depth`]({{ Depth }}) option.

The **Calendar** view supports the following predefined views:
* `Month`&mdash;Shows the days of the month.
* `Year`&mdash;Shows the months of the year.
* `Decade`&mdash;Shows the years of the decade.
* `Century`&mdash;Shows the decades of the century.

The following example demonstrates how to create a DateRangePicker that sets the start of a year and the navigation depth of a month.

```HtmlHelper
    @(Html.Kendo().DateRangePicker()
        .Name("daterangepicker")
        .Start(CalendarView.Year)
        .Depth(CalendarView.Month)
    )
```
{% if site.core %}
```TagHelper
    <kendo-daterangepicker name="daterangepicker"
                           start="CalendarView.Year"
                           depth="CalendarView.Month">
    </kendo-daterangepicker>
```
{% endif %}

`Start` and `Depth` control the initial view and the selection depth; they do not lock the calendar to one month. To restrict both dates in the range to a specific month, set `Min` and `Max` to the first and last dates of that month.

```HtmlHelper
    @(Html.Kendo().DateRangePicker()
        .Name("daterangepicker")
        .Min(new DateTime(2026, 9, 1))
        .Max(new DateTime(2026, 9, 30))
    )
```
{% if site.core %}
```TagHelper
    <kendo-daterangepicker name="daterangepicker"
                           min="new DateTime(2026, 9, 1)"
                           max="new DateTime(2026, 9, 30)">
    </kendo-daterangepicker>
```
{% endif %}

## See Also

* [Server-Side API](/api/daterangepicker)
