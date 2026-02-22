---
title: Razor Pages
page_title: Razor Pages
description: "An example on how to configure the Telerik UI Switch component for {{ site.framework }} in a Razor Page."
components: ["switch"]
slug: htmlhelpers_switch_aspnetcore_razor_page
position: 4
---

# Switch in Razor Pages

This article describes how to seamlessly integrate and configure the Telerik UI Switch for {{ site.framework }} in Razor Pages applications.

@[template](/_contentTemplates/core/razor-pages-general-info.md#referencing-handler-methods)

## Binding to a PageModel Property

To bind the Switch to a property from the `PageModel`, follow the next steps:

1. Add a property to the `PageModel` that must bind to the Switch.

    ```C# Index.cshtml.cs
    public class IndexModel : PageModel
    {
        [BindProperty]
        public bool IsChecked { get; set; }

        public void OnGet()
        {
            IsChecked = true;
        }
    }
    ```
1. Declare the `PageModel` at the top of the page.

    ```Razor
        @page
        @model IndexModel
    ```

1. Bind the Switch to the property using the `SwitchFor()` configuration.

    ```HtmlHelper
    @page
    @model IndexModel

    @inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
    @Html.AntiForgeryToken()

    @(Html.Kendo().SwitchFor(m => m.IsChecked))
    ```
    ```TagHelper
    @page
    @model IndexModel

    @inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
    @Html.AntiForgeryToken()

    <kendo-switch for="IsChecked"></kendo-switch>
    ```

For the complete project, refer to the [Switch in Razor Pages example](https://github.com/telerik/ui-for-aspnet-core-examples/blob/master/Telerik.Examples.RazorPages/Telerik.Examples.RazorPages/Pages/Switch/SwitchIndex.cshtml).

## See Also

* [Using Telerik UI for ASP.NET Core in Razor Pages](https://docs.telerik.com/aspnet-core/getting-started/razor-pages#using-telerik-ui-for-aspnet-core-in-razor-pages)
* [Client-Side API of the Switch](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/switch)
* [Server-Side HtmlHelper API of the Switch](/api/switch)
* [Server-Side TagHelper API of the Switch](/api/taghelpers/switch)
* [Knowledge Base Section](/knowledge-base)