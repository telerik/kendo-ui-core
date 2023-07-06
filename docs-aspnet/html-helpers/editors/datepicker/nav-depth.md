---
title: Start View and Selection Depth
page_title: Start View and Selection Depth
description: "Get started with the {{ site.product }} DatePicker and learn how to define the start view and control the navigation depth of the widget."
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

## See Also

* [Specifying the Start View and Selection Depth in the DatePicker HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/datepicker/index)
* [Server-Side API](/api/datepicker)
