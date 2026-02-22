---
title: Razor Pages
page_title: Razor Pages
description: "An example on how to configure the Telerik UI Slider component for {{ site.framework }} in a Razor Page."
components: ["slider"]
slug: htmlhelpers_slider_razorpage_aspnetcore
position: 4
---

# Slider in Razor Pages

This article describes how to seamlessly integrate and configure the Telerik UI Slider for {{ site.framework }} in Razor Pages applications.

@[template](/_contentTemplates/core/razor-pages-general-info.md#referencing-handler-methods)

## Binding to a PageModel Property

To bind the Slider to a property from the `PageModel`, follow the next steps:

1. Add a property to the `PageModel` that must bind to the Slider.

    ```C# Index.cshtml.cs
        public class IndexModel : PageModel
        {
            [BindProperty]
            public int Grade { get; set; }

            public void OnGet()
            {
                Grade = 5; // Assign value to the "Grade" property, if needed.
            }
        }
    ```
1. Declare the `PageModel` at the top of the page.

    ```Razor
        @page
        @model IndexModel
    ```

1. Bind the Slider to the property using the `SliderFor()` configuration.

    ```HtmlHelper
    @page
    @model IndexModel

    @inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
    @Html.AntiForgeryToken()
    
    @(Html.Kendo().SliderFor(m => m.Grade)
        .Min(1)
        .Max(10)
    )
    ```
    ```TagHelper
        @page
        @model IndexModel

        @inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
        @Html.AntiForgeryToken()
        @addTagHelper *, Kendo.Mvc

        <kendo-slider for="Grade"
            max="10"
            min="1">
        </kendo-slider>
    ```

## See Also

* [Using Telerik UI for ASP.NET Core in Razor Pages](https://docs.telerik.com/aspnet-core/getting-started/razor-pages#using-telerik-ui-for-aspnet-core-in-razor-pages)
* [Client-Side API of the Slider](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/slider)
* [Server-Side HtmlHelper API of the Slider](/api/slider)
* [Server-Side TagHelper API of the Slider](/api/taghelpers/slider)
* [Knowledge Base Section](/knowledge-base)
