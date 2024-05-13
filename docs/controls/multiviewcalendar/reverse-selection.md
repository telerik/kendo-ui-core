---
title: MultiViewCalendar Reverse Selection
page_title: jQuery MultiViewCalendar Documentation - MultiViewCalendar Reverse Selection
description: "Check the reverse selection feature in the Kendo for jQuery MultiViewCalendar."
slug: reverse_selection_multiviewcalendar
position: 9
---

# Reverse Selection

As of R2 2024 version of the Kendo UI suite, the MultiViewCalendar provides an [`allowReverse`](/api/javascript/ui/multiviewcalendar/configuration/allowreverse) selection. It allows you to pick an end date which is before the selected start date when the [`selectable`](/api/javascript/ui/multiviewcalendar/configuration/selectable) option is set to `range`.

```dojo
    <div id="multiviewcalendar"></div>
    <script>
        $("#multiviewcalendar").kendoMultiViewCalendar({
            selectable: "range",
            allowReverse: true,
            showOtherMonthDays:false
        });
    </script>
```
> When range selection is configured, the [`showOtherMonthDays`](/api/javascript/ui/multiviewcalendar/configuration/showothermonthdays) needs to be set to `false`.

## See Also

* [Reverse Selection Demo of the MultiViewCalendar](https://demos.telerik.com/kendo-ui/multiviewcalendar/reverse-selection)
* [JavaScript API Reference of the MultiViewCalendar](/api/javascript/ui/multiviewcalendar)
