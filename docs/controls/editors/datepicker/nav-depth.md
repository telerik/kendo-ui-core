---
title: Start View and Selection Depth
page_title: jQuery DatePicker Documentation | Start View and Selection Depth
description: "Get started with the jQuery DatePicker by Kendo UI and learn how to define the start view and control the navigation depth of the widget."
slug: navdepth_datepicker
position: 4
---

# Start View and Selection Depth

The DatePicker enables you to set the initial view it renders and define the navigation depth of the views.  

To define the initially rendered view, use the [`start`](/api/javascript/ui/datepicker/configuration/start) option. To control the navigation depth, use the [`depth`](/api/javascript/ui/datepicker/configuration/depth) option.

The DatePicker supports the following predefined views:
* `month`&mdash;Shows the days of the month.
* `year`&mdash;Shows the months of the year.
* `decade`&mdash;Shows the years of the decade.
* `century`&mdash;Shows the decades of the century.

The following example demonstrates how to create a DatePicker that allows the user to select a month.

```dojo
    <input id="datePicker" />

    <script>
        $("#datePicker").kendoDatePicker({
            start: "year",
            depth: "year"
        });
    </script>
```

## See Also

* [JavaScript API Reference of the DatePicker](/api/javascript/ui/datepicker)
