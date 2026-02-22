---
title:  Razor Pages
page_title: Razor Pages
description: "Telerik UI DateRangePicker for {{ site.framework }} in a Razor Pages application."
slug: htmlhelpers_daterangepicker_razorpage_aspnetcore
components: ["daterangepicker"]
position: 12
---

# DateRangePicker in Razor Pages

This article describes how to seamlessly integrate and configure the Telerik UI DateRangePicker for {{ site.framework }} in Razor Pages applications.

@[template](/_contentTemplates/core/razor-pages-general-info.md#referencing-handler-methods)

## Binding to a PageModel Property

To bind the DateRangePicker to a property from the `PageModel`, follow the next steps:

1. Add a property to the `PageModel` that must bind to the DateRangePicker.

    ```C# Index.cshtml.cs
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

    ```Razor
        @page
        @model IndexModel
    ```

1. Bind the component to the property using the `DateRangePickerFor()` configuration.

    ```HtmlHelper
        @page
        @model IndexModel

        @inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
        @Html.AntiForgeryToken()
        
        @(Html.Kendo().DateRangePickerFor(m => m.StartDate, m => m.EndDate)
            .Name("Dates")
            .Range(r => r.Start(Model.StartDate).End(Model.EndDate))
        )
    ```
    ```TagHelper
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
