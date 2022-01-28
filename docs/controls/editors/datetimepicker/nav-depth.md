---
title: Start View and Navigation Depth
page_title: jQuery DateTimePicker Documentation | Start View and Navigation Depth
description: "Get started with the jQuery DateTimePicker by Kendo UI and learn how to define its start view and control its navigation depth."
slug: navdepth_kendoui_datetimepicker
position: 4
---

# Start View and Navigation Depth

The DateTimePicker enables you to set the initial view it renders and define the navigation depth of the views.

To define the initially rendered view, use the `start` option. To control the navigation depth, use the `depth` option.

The **Calendar** view supports the following predefined views:
* `month`&mdash;Shows the days of the month.
* `year`&mdash;Shows the months of the year.
* `decade`&mdash;Shows the years of the decade.
* `century`&mdash;Shows the decades of the century.

The following example demonstrates how to create a DateTimePicker that allows the user to select a month.

    <input id="dateTimePicker">

    <script>
        $("#dateTimePicker").kendoDateTimePicker({
            start: "year",
            depth: "year"
        });
    </script>

The following example demonstrates how to define the interval (in minutes) between values in the time drop-down list.

    <input id="dateTimePicker">

    <script>
        $("#dateTimePicker").kendoDateTimePicker({
            interval: 15
        })
    </script>

## See Also

* [Basic Usage of the DateTimePicker (Demo)](https://demos.telerik.com/kendo-ui/datetimepicker/index)
* [JavaScript API Reference of the DateTimePicker](/api/javascript/ui/datetimepicker)
