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

### Binding to a Nested Property

The `for` attribute accepts a model expression, including a nested Boolean property. For example, if the `PageModel` has a `Patient` property with a `NoEmail` property, bind the Switch as follows:

```C# Index.cshtml.cs
public class IndexModel : PageModel
{
    [BindProperty]
    public PatientViewModel Patient { get; set; } = new PatientViewModel();
}

public class PatientViewModel
{
    public bool NoEmail { get; set; }
}
```

```TagHelper
<kendo-switch for="Patient.NoEmail"></kendo-switch>
```

The generated field name is `Patient.NoEmail`, which allows the value to bind to the nested property when the form is submitted. The `SwitchFor` HtmlHelper supports the equivalent expression:

```HtmlHelper
@(Html.Kendo().SwitchFor(m => m.Patient.NoEmail))
```

If a checkbox remains visible instead of being transformed into a Switch, inspect the rendered markup and browser console. The Switch is initialized on a checkbox input, so a visible checkbox can indicate that the Kendo UI scripts or styles are not loaded, the Switch initialization script did not run, or the generated ID is not unique. These checks are separate from the model-binding path.

For the complete project, refer to the [Switch in Razor Pages example](https://github.com/telerik/ui-for-aspnet-core-examples/blob/master/Telerik.Examples.RazorPages/Telerik.Examples.RazorPages/Pages/Switch/SwitchIndex.cshtml).

## See Also

* [Using Telerik UI for ASP.NET Core in Razor Pages](https://docs.telerik.com/aspnet-core/getting-started/razor-pages#using-telerik-ui-for-aspnet-core-in-razor-pages)
* [Client-Side API of the Switch](https://www.telerik.com/kendo-jquery-ui/documentation/api/ui/switch)
* [Server-Side HtmlHelper API of the Switch](/api/switch)
* [Server-Side TagHelper API of the Switch](/api/taghelpers/switch)
* [Knowledge Base Section](/knowledge-base)