---
title: Calendar Reverse Selection
page_title: jQuery Calendar Documentation - Calendar Reverse Selection
description: "Check the reverse selection feature in the Kendo for jQuery Calendar."
slug: reverse_selection_calendar
position: 10
---

# Reverse Selection

As of R2 2024 version of the Kendo UI suite, the Calendar provides an [`allowReverse`](/api/javascript/ui/calendar/configuration/allowreverse) selection. It allows you to pick an end date which is before the selected start date when the [`selectable`](/api/javascript/ui/calendar/configuration/selectable) option is set to `range`.

```dojo
    <div id="calendar"></div>
    <script>
        $("#calendar").kendoCalendar({
            selectable: "range",
            allowReverse: true,
            showOtherMonthDays:false
        });
    </script>
```
> When range selection is configured, the [`showOtherMonthDays`](/api/javascript/ui/calendar/configuration/showothermonthdays) needs to be set to `false`.

## See Also

* [Reverse Selection Demo of the Calendar](https://demos.telerik.com/kendo-ui/calendar/reverse-selection)
* [JavaScript API Reference of the Calendar](/api/javascript/ui/calendar)
