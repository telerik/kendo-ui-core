---
title: Start View and Navigation Depth
page_title: Start View and Selection Depth
description: "Get started with the Telerik UI DateTimePicker for {{ site.framework }} and learn how to define the start view and control the navigation depth."
components: ["datetimepicker"]
slug: navdepth_datetimepicker_aspnetcore
position: 4
---

# Start View and Navigation Depth

The DateTimePicker enables you to set the initial view it renders and define the navigation depth of the views.

To define the initially rendered view, use the [`Start`](/api/kendo.mvc.ui.fluent/datetimepickerbuilder#startkendomvcuicalendarview) option. to control the navigation depth, use the [`Depth`](/api/kendo.mvc.ui.fluent/datetimepickerbuilder#depthkendomvcuicalendarview) option.

The **Calendar** view supports the following predefined views:
* `Month`&mdash;Shows the days of the month.
* `Year`&mdash;Shows the months of the year.
* `Decade`&mdash;Shows the years of the decade.
* `Century`&mdash;Shows the decades of the century.

The following example demonstrates how to create a DateTimePicker that allows the user to select a month.

```HtmlHelper
    @(Html.Kendo().DateTimePicker()
        .Name("dateTimePicker")
        .Value(DateTime.Now)
        .Start(CalendarView.Year)
        .Depth(CalendarView.Year)
    )
```
{% if site.core %}
```TagHelper
<kendo-datetimepicker name="datetimepicker"
                      value="DateTime.Now"
                      start="CalendarView.Year"
                      depth="CalendarView.Year"/>
```
{% endif %}

`Start` and `Depth` control the initial view and the selection depth; they do not lock the calendar to one month. To restrict the selectable date and time to a specific month, set `Min` and `Max` to the first and last dates of that month.

```HtmlHelper
    @(Html.Kendo().DateTimePicker()
        .Name("dateTimePicker")
        .Min(new DateTime(2026, 9, 1))
        .Max(new DateTime(2026, 9, 30, 23, 59, 59))
    )
```
{% if site.core %}
```TagHelper
    <kendo-datetimepicker name="dateTimePicker"
                          min="new DateTime(2026, 9, 1)"
                          max="new DateTime(2026, 9, 30, 23, 59, 59)" />
```
{% endif %}

## See Also

* [Server-Side API](/api/datetimepicker)
