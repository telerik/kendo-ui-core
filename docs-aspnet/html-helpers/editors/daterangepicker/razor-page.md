---
title:  Razor Pages
page_title: Razor Pages
description: "Telerik UI DateRangePicker for {{ site.framework }} in a Razor Pages application."
slug: htmlhelpers_daterangepicker_razorpage_aspnetcore
position: 12
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

## Binding the DatePicker to a PageModel Property

To bind the DatePicker to a property from the `PageModel`, follow the next steps:

1. Add a property to the `PageModel` that must bind to the DatePicker.

    ```Index.cshtml.cs
        public class IndexModel : PageModel
        {
            [BindProperty]
            public DateTime StartDate { get; set; }

            [BindProperty]
            public DateTime EndDate { get; set; }

            public void OnGet()
            {
                StartDate = DateTime.Now; // Assign values to the "StartDate" and "EndDate" properties, if needed.
                EndDate = DateTime.Now.AddDays(3);
            }
        }
    ```
1. Declare the `PageModel` at the top of the page.

    ```C#
        @page
        @model IndexModel
    ```

1. Bind the DatePicker to the property using the `DatePickerFor()` configuration.

    ```HtmlHelper_Index.cshtml
        @page
        @model IndexModel

        @inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
        @Html.AntiForgeryToken()
        
        @(Html.Kendo().DateRangePickerFor(m => m.StartDate, m => m.EndDate)
            .Name("Dates")
            .Range(r => r.Start(Model.StartDate).End(Model.EndDate))
        )
    ```
    ```TagHelper_Index.cshtml
        @page
        @model IndexModel

        @inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
        @Html.AntiForgeryToken()
        @addTagHelper *, Kendo.Mvc

        <kendo-daterangepicker name="Dates" start-field="Model.StartDate" end-field="Model.EndDate">
            <range start="Model.StartDate" end="Model.EndDate" />
        </kendo-daterangepicker>
    ```

## See Also

* [Using Telerik UI for ASP.NET Core in Razor Pages](https://docs.telerik.com/aspnet-core/getting-started/razor-pages#using-telerik-ui-for-aspnet-core-in-razor-pages)
* [Client-Side API of the DateRangePicker](https://docs.telerik.com/kendo-ui/api/javascript/ui/daterangepicker)
* [Server-Side HtmlHelper API of the DateRangePicker](/api/daterangepicker)
* [Server-Side TagHelper API of the DateRangePicker](/api/taghelpers/daterangepicker)
* [Knowledge Base Section](/knowledge-base)
