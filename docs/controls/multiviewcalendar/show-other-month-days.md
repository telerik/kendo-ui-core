---
title: MultiViewCalendar Other Month Days
page_title: jQuery MultiViewCalendar Documentation - MultiViewCalendar Other Month Days
description: "Learn how you can show or hide the days from the previous and next months in the Kendo UI for jQuery MultiViewCalendar."
slug: other_month_days_multiviewcalendar
position: 10
---

# Other Month Days

Starting with Kendo UI R2 2024, the MultiViewCalendar exposes the [`showOtherMonthDays`](/api/javascript/ui/multiviewcalendar/configuration/showothermonthdays) option, which allows you to control whether the days from the previous or next month will be displayed.

```dojo
    <div id="multiviewcalendar"></div>
    <script>
        $("#multiviewcalendar").kendoMultiViewCalendar({
            showOtherMonthDays:false
        });
    </script>
```

> When range selection is configured, the [`showOtherMonthDays`](/api/javascript/ui/multiviewcalendar/configuration/showothermonthdays) needs to be set to `false`.

## See Also

* [Show Other Month Days Demo of the MultiViewCalendar](https://demos.telerik.com/kendo-ui/multiviewcalendar/show-other-month-days)
* [JavaScript API Reference of the MultiViewCalendar](/api/javascript/ui/multiviewcalendar)
