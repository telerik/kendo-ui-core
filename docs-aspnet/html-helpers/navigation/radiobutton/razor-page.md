---
title: Razor Pages
page_title: Razor Pages
description: "Learn how to configure the Telerik UI RadioButton for {{ site.framework }} in a Razor Pages scenario."
components: ["radiobutton"]
slug: razor_page_radiobutton_aspnetcore
position: 7
---

# RadioButton in Razor Pages

This article describes how to seamlessly integrate and configure the Telerik UI RadioButton for {{ site.framework }} in Razor Pages applications.

@[template](/_contentTemplates/core/razor-pages-general-info.md#referencing-handler-methods)

## Binding to a PageModel Property

To bind the RadioButton to a property from the `PageModel`, follow the next steps:

1. Add a property to the `PageModel` that must bind to the RadioButton.

    ```C# Index.cshtml.cs
    public class IndexModel : PageModel
    {
        [BindProperty]
        public bool IAgreeProp { get; set; }

        public void OnGet()
        {
            IAgreeProp = true;
        }
    }
    ```
1. Declare the `PageModel` at the top of the page.

    ```Razor
        @page
        @model IndexModel
    ```

1. Bind the RadioButton to the property using the `RadioButtonFor()` configuration.

    ```HtmlHelper
    @page
    @model IndexModel

    @inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
    @Html.AntiForgeryToken()
    
    <h4>Agree to Terms and Conditions:</h4>
    <ul class="fieldlist">
        <li>
            @(Html.Kendo().RadioButtonFor(m => m.IAgreeProp).Label("I agree").Value(true))
        </li>
        <li>
            @(Html.Kendo().RadioButtonFor(m => m.IAgreeProp).Label("I Disagree").Value(false))
        </li>
    </ul>
    ```
    {% if site.core %}
    ```TagHelper
    @page
    @model IndexModel

    @inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
    @Html.AntiForgeryToken()

    <h4>Agree to Terms and Conditions:</h4>
    <ul class="fieldlist">
        <li>
            <kendo-radiobutton name="IAgreeProp" label="I Agree" value="true"></kendo-radiobutton>
        </li>
        <li>
            <kendo-radiobutton name="IAgreeProp" label="I Disagree" value="false"></kendo-radiobutton>
        </li>
    </ul>
    ```
    {% endif %}

For the complete project, refer to the [RadioButton in Razor Pages example](https://github.com/telerik/ui-for-aspnet-core-examples/blob/master/Telerik.Examples.RazorPages/Telerik.Examples.RazorPages/Pages/RadioButon/RadioButtonIndex.cshtml).

## See Also

* [Using Telerik UI for ASP.NET Core in Razor Pages](https://docs.telerik.com/aspnet-core/getting-started/razor-pages#using-telerik-ui-for-aspnet-core-in-razor-pages)
* [Client-Side API of the RadioButton](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/radiobutton)
* [Server-Side HtmlHelper API of the RadioButton](/api/radiobutton)
* [Server-Side TagHelper API of the RadioButton](/api/taghelpers/radiobutton)
* [Knowledge Base Section](/knowledge-base)