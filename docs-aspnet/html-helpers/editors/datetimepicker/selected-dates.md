---
title: Selected Dates
page_title: Selected Dates
description: "Get started with the Telerik UI DateTimePicker for {{ site.framework }} and learn how to set the selected and the min and max values."
slug: selecteddates_datetimepicker_aspnetcore
position: 3
---

# Selected Dates

The DateTimePicker allows you to render a pre-selected date and also define the minimum and maximum dates it displays.

For a complete example on how to select ranges by using the DateTimePicker, refer to the [demo on range selection](https://demos.telerik.com/{{ site.platform }}/datetimepicker/rangeselection).

> {{ site.product }} includes the [DateRangePicker]({% slug htmlhelpers_daterangepicker_aspnetcore %}) component that can be used for selecting date ranges.

The following example demonstrates how to render a DateTimePicker with an initially selected date and defined min and max dates. The DateTimePicker sets the value only if the entered date is within the defined range and is valid.

```
    @(Html.Kendo().DateTimePicker()
        .Name("dateTimePicker")
        .Value(DateTime.Now)
        .Min(new DateTime(1950, 1, 1, 10, 0, 0))
        .Max(new DateTime(2050, 1, 1, 20, 0, 0))
    )
```

## See Also

* [Selecting Date Ranges by Using the DateTimePicker (Demo)](https://demos.telerik.com/{{ site.platform }}/datetimepicker/rangeselection)
* [Selecting Date Ranges by Using the DateRangePicker (Demo)](https://demos.telerik.com/{{ site.platform }}/daterangepicker/date-range)
* [Server-Side API](/api/datetimepicker)
