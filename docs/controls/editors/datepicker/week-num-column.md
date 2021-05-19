---
title: Week Number Column
page_title: jQuery DatePicker Documentation | Week Number Column
description: "Get started with the jQuery DatePicker by Kendo UI and learn how to render a column for the number of weeks within the current month."
slug: weeknumcolumn_datepicker
position: 7
---

# Week Number Column

The DatePicker provides options for rendering a column which displays the number of the weeks within the current **Month** view.

To render the week number column set the [`weekNumber`](/api/javascript/ui/datepicker/configuration/weeknumber) property to `true`.

```dojo
        <input id="datepicker" value="10/10/2011" />
        <script>
               $("#datepicker").kendoDatePicker({
                    weekNumber: true,
                });
        </script>
```

## See Also

* [Rendering Week Number Columns in the DatePicker (Demo)](https://demos.telerik.com/kendo-ui/datepicker/week-column)
* [JavaScript API Reference of the DatePicker](/api/javascript/ui/datepicker)
