---
title: Start View and Selection Depth
page_title: Start View and Selection Depth
description: "Get started with the Telerik UI DateRangePicker for {{ site.framework }} and learn how to define the start view and control the navigation depth of the HTML Helper."
slug: navdepth_daterangepicker_aspnetcore
position: 4
---
{% if site.core %}
    {% assign Start = "/api/Kendo.Mvc.UI.Fluent/DateRangePickerBuilder#startkendomvcuicalendarview" %}
    {% assign Depth = "/api/Kendo.Mvc.UI.Fluent/DateRangePickerBuilder#depthkendomvcuicalendarview" %}
{% else %}
    {% assign Start = "/api/Kendo.Mvc.UI.Fluent/DateRangePickerBuilder#startsystemstring" %}
    {% assign Depth = "/api/Kendo.Mvc.UI.Fluent/DateRangePickerBuilder#depthsystemstring" %}
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

```
    @(Html.Kendo().DateRangePicker()
        .Name("daterangepicker")
        .Start(CalendarView.Year)
        .Depth(CalendarView.Month)
    )
```

## See Also

* [Server-Side API](/api/daterangepicker)
