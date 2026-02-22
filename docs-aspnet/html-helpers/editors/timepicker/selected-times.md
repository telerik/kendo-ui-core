---
title: Selected Times
page_title: Selected Times
description: "Get started with the {{ site.product }} TimePicker and learn how to set selected times and time ranges in the TimePicker."
components: ["timepicker"]
slug: htmlhelpers_timepicker_aspnetcore_selectedtimes
position: 3
---

# Selected Times

The TimePicker allows you to render a pre-selected time and also define the minimum and maximum time it displays.

For a complete example on how to select ranges using TimePicker, refer to the [demo on range selection](https://demos.telerik.com/{{ site.platform }}/timepicker/rangeselection).

The following example demonstrates how to render a TimePicker with an initially selected time and defined min and max times. The TimePicker sets the value only if the entered time is within the defined range and is valid.

```HtmlHelper
    @(Html.Kendo().TimePicker()
        .Name("timepicker")
        .Value("8:00 AM")
        .Min("8:00 AM")
        .Max("5:00 PM")
    )
```
{% if site.core %}
```TagHelper
<kendo-timepicker name="timePicker"
                  value="new DateTime(1900, 1, 1, 8, 00, 0)"
                  min="new DateTime(1900, 1, 1, 8, 00, 0)"
                  max="new DateTime(1900, 1, 1, 17, 00, 0)" />
```
{% endif %}

## See Also

* [Selecting Time Ranges with the TimePicker HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/timepicker/rangeselection)
* [Server-Side API](/api/timepicker)
