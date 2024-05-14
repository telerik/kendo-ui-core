---
title: Show Other Month Days
page_title: Show Other Month Days
description: "Get started with the Telerik UI Calendar component for {{ site.framework }} Show Other Month Days Functionality."
slug: htmlhelpers_show_other_month_days_calendar_aspnetcore
position: 8
---

# Show Other Month Days

The {{ site.product }} Calendar allows you to explicitly render days from the previous and next months in the current view.

> The `ShowOtherDays()` configuration is not compatible with the [`range`](/api/javascript/ui/calendar/configuration/selectable) selection. It is advised that this property is set to **false** when the `Selectable()` configuration is set to **range**.

```HtmlHelper
        @(Html.Kendo().Calendar()
            .Name("calendar")
            .ShowOtherMonthDays(false)
        )
```

{% if site.core %}
```TagHelper
        <kendo-calendar name="calendar"
                        show-other-month-days="false">
        </kendo-calendar>
```
{% endif %}

## See Also

* [Show Other Month Days Calendar HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/calendar/show-other-month-days)
* [Server-Side API](/api/calendar)
