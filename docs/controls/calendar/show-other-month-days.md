---
title: Calendar Other Month Days
page_title: jQuery Calendar Documentation - Calendar Other Month Days
description: "Learn how you can show or hide the days from the previous and next months in the Kendo UI for jQuery Calendar."
slug: other_month_days_calendar
position: 11
---

# Other Month Days

Starting with Kendo UI R2 2024, the Calendar exposes the [`showOtherMonthDays`](/api/javascript/ui/calendar/configuration/showothermonthdays) option, which allows you to control whether the days from the previous or next month will be displayed.

```dojo
    <div id="calendar"></div>
    <script>
        $("#calendar").kendoCalendar({
            showOtherMonthDays:false
        });
    </script>
```

> When range selection is configured, the [`showOtherMonthDays`](/api/javascript/ui/calendar/configuration/showothermonthdays) needs to be set to `false`.

## See Also

* [Show Other Month Days Demo of the Calendar](https://demos.telerik.com/kendo-ui/calendar/show-other-month-days)
* [JavaScript API Reference of the Calendar](/api/javascript/ui/calendar)
