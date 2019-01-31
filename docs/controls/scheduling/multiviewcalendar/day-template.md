---
title: Day Template
page_title: Week Number Column | Kendo UI MultiViewCalendar
description: "Customize the content of each cell by using cell templates when working with the Kendo UI MultiViewCalendar."
slug: day_template_multiviewcalendar
position: 4
---

# Day Template

The MultiViewCalendar enables you to customize the rendered day for the `month` view.

The following example demonstrates how to create a MultiViewCalendar by using a custom template.

###### Example

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

The template wraps the `value` in a `<div>` HTML element. The structure of the data object that is passed to the template function:

    data = {
        date: date, // Date object corresponding to the current cell
        title: kendo.toString(date, "D"),
        value: date.getDate(),
        dateString: "2011/0/1" // formatted date using yyyy/MM/dd format and month is zero-based
    };

## See Also

* [Overview of the ASP.NET MVC HtmlHelper Extension for the MultiViewCalendar Widget](/aspnet-mvc/helpers/multiviewcalendar/overview)
* [MultiViewCalendar JavaScript API Reference](/api/javascript/ui/multiviewcalendar)
