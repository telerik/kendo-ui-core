---
title: Start View and Navigation Depth
page_title: jQuery Calendar Documentation | Start View and Navigation Depth
description: "Get started with the jQuery Calendar by Kendo UI and learn how to define its start view and control its navigation depth."
slug: navdepth_kendoui_calendar
position: 4
---

# Start View and Navigation Depth

The Calendar enables you to set the initial view it renders and define the navigation depth of the views.

To define the initially rendered view, use the `start` option. To control the navigation depth, use the `depth` option.

The Calendar supports the following predefined views:
* `month`&mdash;Shows the days of the month.
* `year`&mdash;Shows the months of the year.
* `decade`&mdash;Shows the years of the decade.
* `century`&mdash;Shows the decades of the century.

The following example demonstrates how to create a Calendar that allows the user to select a month.

    <div id="calendar"></div>

    <script>
        $("#calendar").kendoCalendar({
            start: "year",
            depth: "year"
        });
    </script>

## See Also

* [Basic Usage of the Calendar (Demo)](https://demos.telerik.com/kendo-ui/calendar/index)
* [Using the API of the Calendar (Demo)](https://demos.telerik.com/kendo-ui/calendar/api)
* [JavaScript API Reference of the Calendar](/api/javascript/ui/calendar)
