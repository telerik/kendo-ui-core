---
title: Date Formatting
page_title: Date Formatting
description: "Get started with the Telerik UI DateRangePicker for {{ site.framework }} and learn how to define its date format."
slug: dateformatting_daterangepicker_aspnetcore
position: 6
---

# Date Formatting

The DateRangePicker allows you to define its date formatting.

The following example demonstrates how to define the date format.

```HtmlHelper
    @(Html.Kendo().DateRangePicker()
        .Name("daterangepicker")
        .Format("{0:dd/MM/yyyy}")
    )
```
{% if site.core %}
```TagHelper
    <kendo-daterangepicker name="daterangepicker" format="{0:dd/MM/yyyy}">
    </kendo-daterangepicker>
```
{% endif %}

## See Also

* [Server-Side API](/api/daterangepicker)
