---
title: Start and End Time
page_title: Start and End Time
description: "Learn how to configure the start and end time of the Telerik UI DateTimePicker component for {{ site.framework }}."
components: ["datetimepicker"]
slug: htmlhelpers_datetimepicker_start_end_time_aspnetcore
position: 15
---

# Start and End Time

The DateTimePicker enables you to customize the start and end time of the built-in TimePicker.

To define the earliest and latest available time in the built-in TimePicker, use the `StartTime` and `EndTime` options.

> Only the time part of the provided `DateTime` object is taken into account.

```HtmlHelper
    @(Html.Kendo().DateTimePicker()
            .Name("datetimepicker")
            .StartTime(new DateTime(2023,3,3,8,30,00))
            .EndTime(new DateTime(2023,3,3,17,00,00))
            .Label(label => {
                label.Content("Remind me on");
                label.Floating(true);
            })
            .HtmlAttributes(new { style = "width: 100%", title = "datetimepicker" })
    )
```
{% if site.core %}
```TagHelper
    <kendo-datetimepicker name="datetimepicker" title="datetimepicker" style="width:100%" start-time="new DateTime(2023,3,3,8,30,00)" end-time="new DateTime(2023,3,3,17,00,00)">
        <label content="Remind me on" floating="true" />
    </kendo-datetimepicker>
```
{% endif %}

## See Also

* [DateTimePicker Floating Label (Demo)](https://demos.telerik.com/{{ site.platform }}/datetimepicker/floating-label)
* [Server-Side API](https://docs.telerik.com/{{ site.platform }}/api/datetimepicker)
