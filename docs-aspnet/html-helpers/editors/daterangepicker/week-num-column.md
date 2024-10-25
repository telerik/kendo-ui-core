---
title: Week Number Column
page_title:  DateRangePicker Week Column Number
description: "Get started with the Telerik UI DateRangePicker for {{ site.framework }} and learn how to render a column for the number of weeks within the current month."
slug: weeknumcolumn_daterangepicker_aspnetcore
position: 8
---

# Week Number Column

The DateRangePicker provides options for rendering a column which displays the number of the weeks within the current **Month** view.

To render the week number column, set the [`WeekNumber`](/api/kendo.mvc.ui.fluent/daterangepickerbuilder#weeknumbersystemboolean) property to `true`.

```HtmlHelper
    @(Html.Kendo().DateRangePicker()
        .Name("daterangepicker")
        .WeekNumber(true)
        .HtmlAttributes(new { style = "width: 100%" })
    )
```
{% if site.core %}
```TagHelper
    <kendo-daterangepicker name="daterangepicker"
                           style = "width: 100%"
                           week-number="true">
    </kendo-daterangepicker>
```    
{% endif %}

## See Also

* [Server-Side API](/api/daterangepicker)
