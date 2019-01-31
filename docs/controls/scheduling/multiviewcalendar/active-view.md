---
title: Active View
page_title: Active View | Kendo UI MultiViewCalendar
description: "Define the first view that the Kendo UI MultiViewCalendar initially renders."
slug: active_view_multiviewcalendar
position: 2
---

# Active View

To define the first view which the MultiViewCalendar initially renders, use the `start` option.

To control the navigation depth, set the `depth` option.

The following views are predefined:

* `month`&mdash;Shows the days of the month.
* `year`&mdash;Shows the months of the year.
* `decade`&mdash;Shows the years of the decade.
* `century`&mdash;Shows the decades of the century.

## Selectable Month Calendars

The following example demonstrates how to create a MultiViewCalendar that allows users to select a month.

###### Example

```dojo
    <div id="multiViewCalendar"></div>

    <script>
        $("#multiViewCalendar").kendoMultiViewCalendar({
            start: "year",
            depth: "year"
        });
    </script>
```

## See Also

* [Overview of the ASP.NET MVC HtmlHelper Extension for the MultiViewCalendar Widget](/aspnet-mvc/helpers/multiviewcalendar/overview)
* [MultiViewCalendar JavaScript API Reference](/api/javascript/ui/multiviewcalendar)
