---
title: Reverse Selection
page_title: Reverse Selection
description: "Enable the Reverse Selection when working with the Telerik UI Calendar component for {{ site.framework }}."
slug: htmlhelpers_reverse_selection_calendar_aspnetcore
position: 10
---

# Reverse Selection

Starting with Telerik UI for {{ site.framework }} R2 2024, the Calendar provides an [`AllowReverse()`](/api/kendo.mvc.ui.fluent/calendarbuilder#allowreversesystemboolean) selection. It lets you pick an end date, which is before the selected start date when the [`Selectable()`](/api/kendo.mvc.ui.fluent/calendarbuilder#selectablesystemstring) option is set to `range`. This enables you to perform the selection in a bidirectional manner and dictate the selection behavior explicitly.

```HtmlHelper
    @(Html.Kendo().Calendar()
            .Name("calendar")
            .ShowOtherMonthDays(false)
            .Selectable("range")
            .AllowReverse(true)
    )
```
{% if site.core %}
```TagHelper
    <kendo-calendar name="calendar"
                    show-other-month-days="false"
                    selectable="range"
                    allow-reverse="true">
    </kendo-calendar>
```
{% endif %}

> When configuring range selection, set the [`ShowOtherMonthDays()`](/api/kendo.mvc.ui.fluent/calendarbuilder#showothermonthdayssystemboolean) configuration to `false`.

## See Also

* [Reverse Selection Demo of the Calendar](https://demos.telerik.com/{{ site.platform }}/calendar/reverse-selection)
* [Server-Side API of the Calendar](/api/calendar)