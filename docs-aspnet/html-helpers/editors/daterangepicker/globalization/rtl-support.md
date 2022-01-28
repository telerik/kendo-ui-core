---
title: RTL Support
page_title: Right-to-Left Support
description: "Get started with the Telerik UI DateRangePicker for {{ site.framework }} and learn about the RTL supports it provides."
slug: rtl_daterangepicker_aspnetcore
position: 3
---

# Right-to-Left Support

Right-to-left (RTL) support reflects the ability of a widget to render its content in a right-to-left direction for right-to-left languages, such as Arabic, Hebrew, Chinese, or Japanese.

The following example demonstrates how to set the basic right-to-left configuration for the DateRangePicker.

```
@using Kendo.Mvc.UI

<div class="demo-section">
    <div class="k-rtl">
        @(Html.Kendo().DateRangePicker()
            .Name("daterangepicker")
        )
    </div>

    <style>
        .demo-section {
            width: 400px;
            text-align: center;
            margin: 50px auto;
            padding-top: 50px;
            padding-bottom: 50px;
        }
    </style>
</div>
```

## See Also

* [Server-Side API](/api/daterangepicker)
