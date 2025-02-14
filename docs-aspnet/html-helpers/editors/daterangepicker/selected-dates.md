---
title: Selected Dates
page_title: Selected Dates
description: "Get started with the Telerik UI DateRangePicker for {{ site.framework }} and learn how to set the selected and the min and max values."
slug: selecteddates_daterangepicker_aspnetcore
position: 3
---

# Selected Dates

The DateRangePicker allows you to define the minimum and maximum dates it displays and also render a pre-selected date range.

For a complete example on how to select ranges by using the DateRangePicker, refer to the [demo on range selection](https://demos.telerik.com/{{ site.platform }}/daterangepicker/date-range).

The following example demonstrates how to render a DateRangePicker with an initially selected range and defined min and max dates.

```HtmlHelper
    @(Html.Kendo().DateRangePicker()
        .Name("daterangepicker") // The name of the DateRangePicker is mandatory. It specifies the "id" attribute of the widget.
        .Min(new DateTime(2019, 9, 4)) // Sets the min date of the DateRangePicker.
        .Max(new DateTime(2099, 12, 31)) // Sets the min date of the DateRangePicker.
        .Range(r => r.Start(DateTime.Now).End(DateTime.Now.AddDays(10))) // Sets the range of the DateRangePicker.
    )
```
{% if site.core %}
```TagHelper
    <kendo-daterangepicker name="daterangepicker" min="new DateTime(2019, 9, 4)" max="new DateTime(2099, 12, 31)">
        <range start="DateTime.Now" end="DateTime.Now.AddDays(10)" />
    </kendo-daterangepicker>
```    
{% endif %}

You can access the selected start and end range using the .range() method as demonstrated here:

[DateRangePicker range() method](https://docs.telerik.com/kendo-ui/api/javascript/ui/daterangepicker/methods/range)

## See Also

* [Selecting Date Ranges by Using the DateRangePicker (Demo)](https://demos.telerik.com/{{ site.platform }}/daterangepicker/date-range)
* [Server-Side API](/api/daterangepicker)
