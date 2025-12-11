---
title:  Razor Pages
page_title: Razor Pages
description: "Telerik UI DateInput for {{ site.framework }} in a Razor Pages application."
slug: htmlhelpers_dateinput_razorpage_aspnetcore
components: ["dateinput"]
position: 10
---

# DateInput in Razor Pages

This article describes how to seamlessly integrate and configure the Telerik UI DateInput for {{ site.framework }} in Razor Pages applications.

@[template](/_contentTemplates/core/razor-pages-general-info.md#referencing-handler-methods)

## Binding to a PageModel Property

To bind the DateInput to a property from the `PageModel`, follow the next steps:

1. Add a property to the `PageModel` that must bind to the DateInput.

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

1. Bind the DateInput to the property using the `DateInputFor()` configuration.

    ```HtmlHelper
        @page
        @model IndexModel

        @inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
        @Html.AntiForgeryToken()
        
        @(Html.Kendo().DateInputFor(m => m.DateCreated))
    ```
    ```TagHelper
        @page
        @model IndexModel

        @inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
        @Html.AntiForgeryToken()
        @addTagHelper *, Kendo.Mvc

        <kendo-dateinput for="DateCreated">
        </kendo-dateinput>
    ```

## See Also

* [Using Telerik UI for ASP.NET Core in Razor Pages](https://docs.telerik.com/aspnet-core/getting-started/razor-pages#using-telerik-ui-for-aspnet-core-in-razor-pages)
* [Client-Side API of the DateInput](https://docs.telerik.com/kendo-ui/api/javascript/ui/dateinput)
* [Server-Side HtmlHelper API of the DateInput](/api/dateinput)
* [Server-Side TagHelper API of the DateInput](/api/taghelpers/dateinput)
* [Knowledge Base Section](/knowledge-base)
