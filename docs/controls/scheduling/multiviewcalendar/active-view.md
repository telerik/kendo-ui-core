---
title: Start View and Navigation Depth
page_title: jQuery MultiViewCalendar Documentation | Start View and Navigation Depth
description: "Get started with the jQuery MultiViewCalendar by Kendo UI and learn how to define its start view and control its navigation depth."
slug: active_view_multiviewcalendar
position: 2
---

# Start View and Navigation Depth

The MultiViewCalendar enables you to set the initial view it renders and define the navigation depth of the views.

To define the initially rendered view, use the `start` option. To control the navigation depth, use the `depth` option.

The MultiViewCalendar supports the following predefined views:
* `month`&mdash;Shows the days of the month.
* `year`&mdash;Shows the months of the year.
* `decade`&mdash;Shows the years of the decade.
* `century`&mdash;Shows the decades of the century.

The following example demonstrates how to create a Calendar that allows the user to select a month.

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

* [View Selection in the MultiViewCalendar (Demo)](https://demos.telerik.com/kendo-ui/multiviewcalendar/view-selection)
* [JavaScript API Reference of the MultiViewCalendar](/api/javascript/ui/multiviewcalendar)
