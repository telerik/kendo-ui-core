---
title: Selection
page_title: jQuery MultiViewCalendar Documentation | Selection
description: "Get started with the jQuery MultiViewCalendar by Kendo UI and implement multiple and range-date selections."
slug: selection_multiviewcalendar
position: 5
---

# Selection

The MultiViewCalendar allows the user to select multiple dates or a range of dates by using the MultiViewCalendar selection modes.

## Multiple Date Selection

The following example demonstrates how to implement the multiple-view selection mode in the MultiViewCalendar.

```dojo
    <div id="multiViewCalendar"></div>
    <script>
        $("#multiViewCalendar").kendoMultiViewCalendar({
            selectable: "multiple"
        });
    </script>
```

## Range Date Selection

The following example demonstrates how to implement the range selection mode in the MultiViewCalendar.

```dojo
    <div id="multiViewCalendar"></div>
    <script>
        $("#multiViewCalendar").kendoMultiViewCalendar({
            selectable: "range"
        });
    </script>
```

## See Also

* [Date Selection in the MultiViewCalendar (Demo)](https://demos.telerik.com/kendo-ui/multiviewcalendar/selection)
* [JavaScript API Reference of the MultiViewCalendar](/api/javascript/ui/multiviewcalendar)
