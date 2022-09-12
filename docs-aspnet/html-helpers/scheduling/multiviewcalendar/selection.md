---
title: Selection
page_title: Selection
description: "Learn how to select dates in the Telerik UI MultiViewCalendar component for {{ site.framework }}."
previous_url: /helpers/scheduling/multiviewcalendar/selection
slug: selection_multiviewcalendar_htmlhelper_aspnetcore
position: 4
---

# Selection

The Telerik UI MultiViewCalendar allows the user to select multiple dates by using the multiple-view MultiViewCalendar selection mode.

> As of the 2022 R3 release, the [`Change`](https://docs.telerik.com/{{ site.platform }}/api/Kendo.Mvc.UI.Fluent/MultiViewCalendarEventBuilder#changesystemstring) event will now be fired only when Selection/Deselection is performed.

```HtmlHelper
    @(Html.Kendo().MultiViewCalendar()
        .Name("MultiViewCalendar")
        .Selectable("range")
    )
```
{% if site.core %}
```TagHelper
    <kendo-multiviewcalendar name="MultiViewCalendar" selectable="range">        
    </kendo-multiviewcalendar>
```
{% endif %}

## See Also

* [Selection in the MultiViewCalendar HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/multiviewcalendar/selection)
* [Server-Side API](/api/multiviewcalendar)
