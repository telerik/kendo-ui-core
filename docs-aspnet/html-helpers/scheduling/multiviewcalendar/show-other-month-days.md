---
title: Show Other Month Days
page_title: Show Other Month Days
description: "Get started with the Telerik UI MultiViewCalendar component for {{ site.framework }} Show Other Month Days Functionality."
slug: htmlhelpers_show_other_month_days_multiviewcalendar_aspnetcore
position: 8
---

# Show Other Month Days

The {{ site.product }} MultiViewCalendar allows you to explicitly render days from the previous and next months in the current view.

> The `ShowOtherDays()` configuration is not compatible with the [`range`](/api/kendo.mvc.ui.fluent/multiviewcalendarbuilder#selectablesystemstring) selection. It is advised that this property is set to `false` when the `Selectable()` configuration is set to `range`.

```HtmlHelper
        @(Html.Kendo().MultiViewCalendar()
            .Name("multiViewCalendar")
            .WeekNumber(false)
            .ShowOtherMonthDays(false)
        )
```

{% if site.core %}
```TagHelper
         <kendo-multiviewcalendar name="multiViewCalendar"
                                 week-number="false"
                                 show-other-month-days="true">
        </kendo-multiviewcalendar>
```
{% endif %}

## See Also

* [Show Other Month Days MultiViewCalendar HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/multiviewcalendar/show-other-month-days)
* [Server-Side API](/api/multiviewcalendar)
