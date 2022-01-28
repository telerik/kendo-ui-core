---
title: Selected Dates
page_title: jQuery Calendar Documentation | Selected Dates
description: "Get started with the jQuery Calendar by Kendo UI and set the initially selected, the minimum, and maximum dates in the widget."
slug: selecteddates_kendoui_calendar
position: 2
---

# Selected Dates

The Calendar enables you to set its initially selected date and define the minimum and maximum dates it displays.

As a result, the Calendar will not navigate to a date that is earlier than the specified minimum date and will also restrict the navigation up to the maximum date you specified.

    <div id="calendar"></div>

    <script>
        $("#calendar").kendoCalendar({
            value: new Date(),
            min: new Date(1950, 0, 1),
            max: new Date(2049, 11, 31)
        });
    </script>

## See Also

* [Basic Usage of the Calendar (Demo)](https://demos.telerik.com/kendo-ui/calendar/index)
* [Using the API of the Calendar (Demo)](https://demos.telerik.com/kendo-ui/calendar/api)
* [JavaScript API Reference of the Calendar](/api/javascript/ui/calendar)
