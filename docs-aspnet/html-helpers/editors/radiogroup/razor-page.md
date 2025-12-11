---
title: Razor Pages
page_title: Razor Pages
description: "Learn how to configure the Telerik UI RadioGroup for {{ site.framework }} in RazorPages scenario."
slug: htmlhelpers_radiogroup_aspnetcore_razor_page
position: 5
---

# RadioGroup in Razor Pages

This article describes how to seamlessly integrate and configure the Telerik UI RadioGroup for {{ site.framework }} in Razor Pages applications.

> You can use any of the available [data binding approaches]({% slug htmlhelpers_radiogroup_binding_aspnetcore %}) to bind the component to data in a Razor Pages application.

@[template](/_contentTemplates/core/razor-pages-general-info.md#referencing-handler-methods)

## Binding to a PageModel Property

To bind the RadioGroup to a property from the `PageModel`, follow the next steps:

1. Add a property to the `PageModel` that must bind to the RadioGroup.

    ```C# Index.cshtml.cs
    public class IndexModel : PageModel
    {
        [BindProperty]
        public string PreferredContact { get; set; }

        public void OnGet()
        {
            PreferredContact = "email"; // Set default selection.
        }
    }
    ```

1. Declare the `PageModel` at the top of the page.

    ```Razor
        @page
        @model IndexModel
    ```

1. Bind the RadioGroup to the property using the `RadioGroupFor()` configuration.

    ```HtmlHelper
    @page
    @model IndexModel

    @inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
    @Html.AntiForgeryToken()
    
    @(Html.Kendo().RadioGroupFor(model => model.PreferredContact)
        .Items(items =>
        {
            items.Add().Label("Phone (SMS)").Value("phone");
            items.Add().Label("E-mail").Value("email");
            items.Add().Label("None").Value("na");
        })
    )
    ```
    ```TagHelper
    @page
    @model IndexModel

    @inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
    @Html.AntiForgeryToken()
    @addTagHelper *, Kendo.Mvc

    <kendo-radiogroup for="PreferredContact">
        <kendo-radiogroup-items>
            <kendo-radiogroup-item value="phone" label="Phone (SMS)"></kendo-radiogroup-item>
            <kendo-radiogroup-item value="email" label="E-mail"></kendo-radiogroup-item>
            <kendo-radiogroup-item value="na" label="None"></kendo-radiogroup-item>
        </kendo-radiogroup-items>
    </kendo-radiogroup>
    ```

## See Also

* [Using Telerik UI for ASP.NET Core in Razor Pages](https://docs.telerik.com/aspnet-core/getting-started/razor-pages#using-telerik-ui-for-aspnet-core-in-razor-pages)
* [Client-Side API of the RadioGroup](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/radiogroup)
* [Server-Side HtmlHelper API of the RadioGroup](/api/radiogroup)
* [Server-Side TagHelper API of the RadioGroup](/api/taghelpers/radiogroup)
* [Knowledge Base Section](/knowledge-base)