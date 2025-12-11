---
title: Razor Pages
page_title: Razor Pages
description: "Telerik UI DatePicker for {{ site.framework }} in a RazorPages application."
components: ["datepicker"]
slug: razorpages_datepicker_aspnetcore
position: 13
---

# DatePicker in Razor Pages

This article describes how to seamlessly integrate and configure the Telerik UI DatePicker for {{ site.framework }} in Razor Pages applications.

@[template](/_contentTemplates/core/razor-pages-general-info.md#referencing-handler-methods)

## Binding to a PageModel Property

To bind the DatePicker to a property from the `PageModel`, follow the next steps:

1. Add a property to the `PageModel` that must bind to the DatePicker.

    ```C# Index.cshtml.cs
        public class IndexModel : PageModel
        {
            [BindProperty]
            public DateTime DateCreated { get; set; }

            public void OnGet()
            {
                DateCreated = DateTime.Now; // Assign a value to the "DateCreated" property, if needed.
            }
        }
    ```
1. Declare the `PageModel` at the top of the page.

    ```Razor
        @page
        @model IndexModel
    ```

1. Bind the DatePicker to the property using the `DatePickerFor()` configuration.

    ```HtmlHelper
        @page
        @model IndexModel

        @inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
        @Html.AntiForgeryToken()
        
        @(Html.Kendo().DatePickerFor(m => m.DateCreated))
    ```
    ```TagHelper
        @page
        @model IndexModel

        @inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
        @Html.AntiForgeryToken()
        @addTagHelper *, Kendo.Mvc

        <kendo-datepicker for="DateCreated">
        </kendo-datepicker>
    ```

## See Also

* [Using Telerik UI for ASP.NET Core in Razor Pages](https://docs.telerik.com/aspnet-core/getting-started/razor-pages#using-telerik-ui-for-aspnet-core-in-razor-pages)
* [Client-Side API of the DatePicker](https://docs.telerik.com/kendo-ui/api/javascript/ui/datepicker)
* [Server-Side HtmlHelper API of the DatePicker](/api/datepicker)
* [Server-Side TagHelper API of the DatePicker](/api/taghelpers/datepicker)
* [Knowledge Base Section](/knowledge-base)
