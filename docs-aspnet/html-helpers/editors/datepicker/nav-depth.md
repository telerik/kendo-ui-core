---
title: Start View and Selection Depth
page_title: Start View and Selection Depth
description: "Get started with the {{ site.product }} DatePicker and learn how to define the start view and control the navigation depth of the widget."
components: ["datepicker"]
slug: htmlhelpers_datepicker_aspnetcore_navdepth
position: 4
---

# Start View and Selection Depth

The DatePicker enables you to set the initial view it renders and define the navigation depth of the views.

To define the initially rendered view, use the [`Start`](/api/kendo.mvc.ui.fluent/datepickerbuilder#startkendomvcuicalendarview) option. to control the navigation depth, use the [`Depth`](/api/kendo.mvc.ui.fluent/datepickerbuilder#depthkendomvcuicalendarview) option.

The **Calendar** view supports the following predefined views:
* `Month`&mdash;Shows the days of the month.
* `Year`&mdash;Shows the months of the year.
* `Decade`&mdash;Shows the years of the decade.
* `Century`&mdash;Shows the decades of the century.

The following example demonstrates how to create a DatePicker that allows the user to select a month.

```HtmlHelper
    @(Html.Kendo().DatePicker()
        .Name("datepicker")
        .Start(CalendarView.Year)
        .Depth(CalendarView.Year)
    )
```
{% if site.core %}
```TagHelper
<kendo-datepicker name="datepicker"
                  start="CalendarView.Year"
                  depth="CalendarView.Year"/>
```
{% endif %}

`Start` and `Depth` control the initial view and the selection depth; they do not lock the calendar to one month. To restrict the user to a specific month, set `Min` and `Max` to the first and last dates of that month.

```HtmlHelper
    @(Html.Kendo().DatePicker()
        .Name("datepicker")
        .Min(new DateTime(2026, 9, 1))
        .Max(new DateTime(2026, 9, 30))
    )
```
{% if site.core %}
```TagHelper
    <kendo-datepicker name="datepicker"
                      min="new DateTime(2026, 9, 1)"
                      max="new DateTime(2026, 9, 30)" />
```
{% endif %}

## See Also

* [Specifying the Start View and Selection Depth in the DatePicker HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/datepicker/index)
* [Server-Side API](/api/datepicker)
