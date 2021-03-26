---
title: Day Template
page_title: jQuery Calendar Documentation | Day Template
description: "Get started with the jQuery Calendar by Kendo UI and customize the rendered day for its Month view."
slug: daytemplate_kendoui_calendar
position: 5
---

# Day Template

The Calendar enables you to customize the rendered day for its **Month** view.

The following example demonstrates how to create a Calendar by using a custom template.

    <div id="calendar"></div>

    <script>
        $("#calendar").kendoCalendar({
            month: {
                content: '<div class="custom"><#=data.value#></div>'
            }
        });
    </script>

The template wraps the `value` in a `<div>` HTML element. The following example demonstrates the structure of the `data` object that is passed to the template function.

    data = {
        date: date, // A date object that corresponds to the current cell.
        title: kendo.toString(date, "D"),
        value: date.getDate(),
        dateString: "2011/0/1" // The formatted date by using the yyyy/MM/dd format and the month is zero-based.
    };

## See Also

* [Customizing the Templates of the Calendar (Demo)](https://demos.telerik.com/kendo-ui/calendar/template)
* [JavaScript API Reference of the Calendar](/api/javascript/ui/calendar)
