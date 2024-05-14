---
title: Reverse Selection
page_title: Reverse Selection
description: "Get started with the Telerik UI DateRangePicker for {{ site.framework }} and learn how to control the selection behavior of the component."
slug: reverse_selection_daterangepicker_aspnetcore
position: 8
---

# Reverse Selection

The {{ site.product }} DateRangePicker enables you to select an end date that is before the start date. 

```HtmlHelper
       @(Html.Kendo().DateRangePicker()
            .Name("multiViewCalendar")
            .AllowReverse(true)
       )
```

{% if site.core %}
```TagHelper
        <kendo-daterangepicker name="daterangepicker"
                               allow-reverse="true">
        </kendo-daterangepicker>
```
{% endif %}


## See Also

* [Reverse Selection HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/daterangepicker/reverse-selection)
* [Server-Side API](/api/daterangepicker)