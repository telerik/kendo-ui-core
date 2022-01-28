---
title: Week Number Column
page_title:  DateTimePicker Week Column Number
description: "Get started with the Telerik UI DateTimePicker for {{ site.framework }} and learn how to render a column for the number of weeks within the current month."
slug: weeknumcolumn_datetimepicker_aspnetcore
position: 8
---

# Week Number Column

The DatePicker provides options for rendering a column which displays the number of the weeks within the current **Month** view.

To render the week number column, set the [`WeekNumber`](/api/Kendo.Mvc.UI.Fluent/DateTimePickerBuilder#weeknumbersystemboolean) property to `true`.

```
    @(Html.Kendo().DateTimePicker()
              .Name("datetimepicker")
              .WeekNumber(true)
              .Value(DateTime.Now)
              .HtmlAttributes(new { style = "width: 100%" })
    )
```

## See Also

* [Rendering Week Number Columns in the DateTimePicker (Demo)](https://demos.telerik.com/{{ site.platform }}/datetimepicker/week-column)
* [Server-Side API](/api/datetimepicker)
