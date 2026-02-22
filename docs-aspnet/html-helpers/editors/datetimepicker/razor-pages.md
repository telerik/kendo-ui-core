---
title: Razor Pages
page_title: Razor Pages
description: "Telerik UI DateTimePicker for {{ site.framework }} in a RazorPages application."
components: ["datetimepicker"]
slug: razorpages_datetimepicker_aspnetcore
position: 17
---

# DateTimePicker in Razor Pages

This article describes how to seamlessly integrate and configure the Telerik UI DateTimePicker for {{ site.framework }} in Razor Pages applications.

@[template](/_contentTemplates/core/razor-pages-general-info.md#referencing-handler-methods)

## Binding to a PageModel Property

To bind the DateTimePicker to a property from the `PageModel`, follow the next steps:

1. Add a property to the `PageModel` that must bind to the DateTimePicker.

    ```C# Index.cshtml.cs
        public class IndexModel : PageModel
        {
            [BindProperty]
            public DateTime DateCreated { get; set; }

            public void OnGet()
            {
                DateCreated = DateTime.Now; // Assign value to the "DateCreated" property, if needed.
            }
        }
    ```
1. Declare the `PageModel` at the top of the page.

    ```Razor
        @page
        @model IndexModel
    ```

1. Bind the DateTimePicker to the property using the `DateTimePickerFor()` configuration.

    ```HtmlHelper
        @page
        @model IndexModel

        @inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
        @Html.AntiForgeryToken()
        
        @(Html.Kendo().DateTimePickerFor(m => m.DateCreated))
    ```
    ```TagHelper
        @page
        @model IndexModel

        @inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
        @Html.AntiForgeryToken()
        @addTagHelper *, Kendo.Mvc

        <kendo-datetimepicker for="DateCreated">
        </kendo-datetimepicker>
    ```

## See Also

* [Using Telerik UI for ASP.NET Core in Razor Pages](https://docs.telerik.com/aspnet-core/getting-started/razor-pages#using-telerik-ui-for-aspnet-core-in-razor-pages)
* [Client-Side API of the DateTimePicker](https://docs.telerik.com/kendo-ui/api/javascript/ui/datetimepicker)
* [Server-Side HtmlHelper API of the DateTimePicker](/api/datetimepicker)
* [Server-Side TagHelper API of the DateTimePicker](/api/taghelpers/datetimepicker)
* [Knowledge Base Section](/knowledge-base)

