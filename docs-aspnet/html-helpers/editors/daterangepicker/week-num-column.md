---
title: Week Number Column
page_title:  DateRangePicker Week Column Number
description: "Get started with the Telerik UI DateRangePicker for {{ site.framework }} and learn how to render a column for the number of weeks within the current month."
slug: weeknumcolumn_daterangepicker_aspnetcore
position: 8
---

# Week Number Column

The DateRangePicker provides options for rendering a column which displays the number of the weeks within the current **Month** view.

To render the week number column, set the [`WeekNumber`](/api/Kendo.Mvc.UI.Fluent/DateRangePickerBuilder#weeknumbersystemboolean) property to `true`.

```
    @(Html.Kendo().DateRangePicker()
        .Name("daterangepicker")
        .WeekNumber(true)
        .HtmlAttributes(new { style = "width: 100%" })
    )
```

## See Also

* [Server-Side API](/api/daterangepicker)
