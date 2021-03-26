---
title:  Razor Pages
page_title: Configure a Telerik UI DateRangePicker in Razor Pages.
description: "An example on how to configure a DateRangePicker with a default value in Razor Pages."
slug: htmlhelpers_daterangepicker_razorpage_aspnetcore
position: 9
---

# Razor Page

This article demonstrates how to set up the DateRangePicker component in a Razor Pages scenario and how to add a default value.

See the implementation details in the example below. For the full project with Razor Pages examples, visit our [GitHub repository](https://github.com/telerik/ui-for-aspnet-core-examples/tree/master/Telerik.Examples.RazorPages).

```tab-RazorPage(csthml)
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