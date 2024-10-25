---
title: Start View and Navigation Depth
page_title: Start View and Selection Depth
description: "Get started with the Telerik UI DateTimePicker for {{ site.framework }} and learn how to define the start view and control the navigation depth."
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


## See Also

* [Server-Side API](/api/datetimepicker)
