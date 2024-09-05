---
title: Select Date Range
page_title: Date Range
description: "Learn more about how set the date range of the Telerik UI Gantt component for {{ site.framework }}."
slug: htmlhelpers_gantt_select_date_range_aspnetcore
position: 9
---

# Date Range

The Telerik UI for ASP.NET Core Gantt allows you to display tasks only in a specified date range.

For a full example of the date range functionality, refer to the [Selected Date Range (Demo)](https://demos.telerik.com/{{ site.platform }}/gantt/selected-date-and-range).

## Configuration

The example below demonstrates how to configure the different views of the Gantt to display the tasks that are within a date range.

```HtmlHelper
@(Html.Kendo().Gantt<TaskViewModel, DependencyViewModel>()
    .Name("gantt")
    .Views(views =>
    {
        views.DayView(d => d
            .Date(new DateTime(2022, 6, 2))
            .Range(r =>
                r.Start(new DateTime(2022, 6, 2))
                .End(new DateTime(2022, 6, 8))
        ));
        views.WeekView(w => w
            .Date(new DateTime(2022, 6, 1))
            .Range(r =>
                r.Start(new DateTime(2022, 6, 1))
                .End(new DateTime(2022, 7, 13))
            )
            .Selected(true)
        );
        views.MonthView(m => m
            .Date(new DateTime(2022, 5, 18))
            .Range(r =>
                r.Start(new DateTime(2022, 5, 18))
                .End(new DateTime(2022, 8, 3))
        ));
    })
    <!--  ...additional Gantt configuration...  -->
)
```
{% if site.core %}
```TagHelper
    <kendo-gantt name="gantt">
        <views>
            <gantt-view date="new DateTime(2022, 6, 2)" type="GanttViewType.Day">
                <range start="new DateTime(2022, 6, 2)" end="new DateTime(2022, 6, 8)"/>
            </gantt-view>
            <gantt-view date="new DateTime(2022, 6, 1)" selected="true" type="GanttViewType.Week">
                <range start="new DateTime(2022, 6, 1)" end="new DateTime(2022, 7, 13)"/>
            </gantt-view>
            <gantt-view date="new DateTime(2022, 5, 18)" type="GanttViewType.Month">
                <range start="new DateTime(2022, 5, 18)" end="new DateTime(2022, 8, 3)"/>
            </gantt-view>
        </views>
    </kendo-gantt>
```
{% endif %}

## See Also

* [Selected Date Range (Demo)](https://demos.telerik.com/{{ site.platform }}/gantt/selected-date-and-range)
* [Using the API of the Gantt HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/gantt/api)
* [Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/gantt)
