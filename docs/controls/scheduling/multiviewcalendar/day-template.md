---
title: Day Template
page_title: jQuery MultiViewCalendar Documentation | Day Template
description: "Get started with the jQuery MultiViewCalendar by Kendo UI and customize the rendered day for its Month view."
slug: day_template_multiviewcalendar
position: 4
---

# Day Template

The MultiViewCalendar enables you to customize the rendered day for the **Month** view.

The following example demonstrates how to create a MultiViewCalendar by using a custom template.

```dojo
    <div id="multiViewCalendar"></div>

    <script>
        $("#multiViewCalendar").kendoMultiViewCalendar({
            month: {
                content: '<div class="custom"><#=data.value#></div>'
            }
        });
    </script>
```

The template wraps the `value` in a `<div>` HTML element. The following example demonstrates the structure of the `data` object that is passed to the template function.

    data = {
        date: date, // A date object that corresponds to the current cell.
        title: kendo.toString(date, "D"),
        value: date.getDate(),
        dateString: "2011/0/1" // The formatted date by using the yyyy/MM/dd format and the month is zero-based.
    };

## See Also

* [Basic Usage of the MultiViewCalendar (Demo)](https://demos.telerik.com/kendo-ui/multiviewcalendar/index)
* [Using the API of the MultiViewCalendar (Demo)](https://demos.telerik.com/kendo-ui/multiviewcalendar/api)
* [JavaScript API Reference of the MultiViewCalendar](/api/javascript/ui/multiviewcalendar)
