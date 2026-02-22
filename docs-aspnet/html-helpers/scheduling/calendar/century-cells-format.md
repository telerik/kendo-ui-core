---
title: Century Cells Format
page_title: Century Cells Format
description: "Get started with the Telerik UI Calendar component for {{ site.framework }} Century Cell Formats Functionality"
components: ["calendar"]
slug: htmlhelpers_century_cells_format_calendar_aspnetcore
position: 7
---

# Century Cells Format


The {{ site.product }} Calendar allows you to specify the formatting behavior of the `Century` Calendar View's cells. The component exposes the following options:

* `"Long"`&mdash;The cells will display a decade range **2000-2009**, **2010-2019**.
* `"Short"`&mdash;The cells will display just the starting year of the decade **2000**, **2010**.

```HtmlHelper
        @(Html.Kendo().Calendar()
            .Name("calendarLong")
            .Start(CalendarView.Century)
            .CenturyCellsFormat(CenturyCellsFormats.Long)
        )
```

{% if site.core %}
```TagHelper
        <kendo-calendar name="calendarLong"
                        start="CalendarView.Century"
                        century-cells-format="CenturyCellsFormats.Long">
        </kendo-calendar>
```
{% endif %}

## See Also

* [Century Cells Format Calendar HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/calendar/century-cells-format)
* [Server-Side API](/api/calendar)
