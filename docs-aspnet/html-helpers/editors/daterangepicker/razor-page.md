---
title:  Razor Pages
page_title: Razor Pages
description: "An example on how to configure a DateRangePicker with a default value in Razor Pages."
slug: htmlhelpers_daterangepicker_razorpage_aspnetcore
position: 9
---

# DateRangePicker in Razor Pages

Razor Pages is an alternative to the MVC pattern that makes page-focused coding easier and more productive. This approach consists of a `cshtml` file and a `cshtml.cs` file (by design, the two files have the same name). 

You can seamlessly integrate the Telerik UI DateRangePicker for {{ site.framework }} in Razor Pages applications.

This article describes how to configure the DateRangePicker component in a Razor Pages scenario.

For the complete project, refer to the [DateRangePicker in Razor Pages example](https://github.com/telerik/ui-for-aspnet-core-examples/blob/master/Telerik.Examples.RazorPages/Telerik.Examples.RazorPages/Pages/DateRangePicker/DateRangePickerIndex.cshtml).

```tab-HtmlHelper(cshtml)
@page
@model Telerik.Examples.RazorPages.Pages.DateRangePicker.DateRangePickerDefaultValueModel
@{
    ViewData["Title"] = "DateRangePickerDefaultValue";
}

<div>
    <h4>Select a date range</h4>
    @(Html.Kendo().DateRangePicker()
        .Name("daterangepicker")
        .Range(r => r.Start(DateTime.Now).End(DateTime.Now.AddDays(10))) // Add a default value using the Range method.
        .HtmlAttributes(new { style = "width: 100%", title = "daterangepicker" })
    )
</div>

<style>
    div {
        text-align: center;
    }
</style>
```
{% if site.core %}
```tab-TagHelper(cshtml)
@page
@model Telerik.Examples.RazorPages.Pages.DateRangePicker.DateRangePickerDefaultValueModel
@{
    ViewData["Title"] = "DateRangePickerDefaultValue";
}

<div>
    <h4>Select a date range</h4>
    <kendo-daterangepicker name="daterangepicker" title="daterangepicker" style="width: 100%;">
             <range start="DateTime.Now" end="DateTime.Now.AddDays(10)"/>
    </kendo-daterangepicker>
</div>

<style>
    div {
        text-align: center;
    }
</style>
```
{% endif %}

```tab-PageModel(cshtml.cs)
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace Telerik.Examples.RazorPages.Pages.DateRangePicker
{
    public class DateRangePickerDefaultValueModel : PageModel
    {
        public void OnGet()
        {
        }
    }
}
```

* [Server-Side API](/api/daterangepicker)