---
title: Week Numbers
page_title: Week Numbers
description: "Define the first rendered view when working with the Telerik UI Calendar component for {{ site.framework }}."
slug: htmlhelpers_weeknumbers_calendar_aspnetcore
position: 4
---

# Week Numbers

You can configure the Calendar to display the week number and also use the week number template to customize the cells in the **Week** column.

## Rendering of Week Numbers

The `weekNumber` option enables the Calendar to display the week number on an annual base to the left side of month view and as a separate column.

```HtmlHelper
    @(Html.Kendo().Calendar()
                .Name("calendar")
                .WeekNumber(true)))
```
{% if site.core %}
```TagHelper
    <kendo-calendar name="calendar" week-number="true">
    </kendo-calendar>
```
{% endif %}

## Customizing Week Column Cells

The week-number template intends to customize the cells in the **Week** column. By default, the Calendar renders the calculated week of the year.

The Calendar provides the following properties in the `data` object:

* `currentDate`&mdash;Returns the first date of the current week.
* `weekNumber`&mdash;The calculated week number.

You can use these properties in the template to make additional calculations.

```HtmlHelper
    @(Html.Kendo().Calendar()
        .Name("calendar")
        .WeekNumber()
        .MonthTemplate(x=> x.WeekNumber("<i>#= data.weekNumber #</i>"))
        )
```
{% if site.core %}
```TagHelper
    <kendo-calendar name="calendar" week-number="true">
        <month week-number="<i>#= data.weekNumber #</i>" />
    </kendo-calendar>
```
{% endif %}

## See Also

* [Rendering the Week Column in the Calendar HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/calendar/week-column)
* [Server-Side API](/api/calendar)
