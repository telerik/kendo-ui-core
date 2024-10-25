---
title: Reverse Selection
page_title: Reverse Selection
description: "Learn how to enable the reverse selection feature in the Telerik UI for {{ site.framework }} MultiViewCalendar."
slug: reverse_selection_multiviewcalendar_htmlhelper_aspnetcore
position: 9
---

# Reverse Selection

Starting with Kendo UI R2 2024, the MultiViewCalendar provides an [`AllowReverse()`](/api/kendo.mvc.ui.fluent/multiviewcalendarbuilder#allowreversesystemboolean) selection. It allows you to pick an end date which is before the selected start date when the [`Selectable()`](/api/kendo.mvc.ui.fluent/multiviewcalendarbuilder#selectablesystemstring) option is set to `range`. This enables you to be in the driver's seat. When it comes to dictating whether the selection behavior will be performed in a bi-directional or one-directional manner.

```HtmlHelper
    @(Html.Kendo().MultiViewCalendar()
            .Name("multiViewCalendar")
            .Selectable("range")
            .AllowReverse(true)
    )
```

{% if site.core %}
```TagHelper
        <kendo-multiviewcalendar name="multiViewCalendar"
                                 selectable="range"
                                 allow-reverse="true">
        </kendo-multiviewcalendar>
```
{% endif %}

> When configuring range selection, set the [`ShowOtherMonthDays()`](/api/kendo.mvc.ui.fluent/multiviewcalendarbuilder#showothermonthdayssystemboolean) configuration to `false`.

## See Also

* [Reverse Selection Demo of the MultiViewCalendar](https://demos.telerik.com/{{ site.platform }}/multiviewcalendar/reverse-selection)
* [Server-Side API Reference of the MultiViewCalendar](/api/multiviewcalendar)