---
title: Razor Pages
page_title: Razor Pages
description: "Learn how to configure the Telerik UI Loader for {{ site.framework }} in RazorPages scenario."
slug: htmlhelpers_loader_aspnetcore_razor_page
components: ["loader"]
position: 4
---

# Loader in Razor Pages

This article describes how to seamlessly integrate and configure the Telerik UI Loader for {{ site.framework }} in Razor Pages applications.

@[template](/_contentTemplates/core/razor-pages-general-info.md#referencing-handler-methods)

## Configuring Appearance from PageModel

The following example demonstrates how to configure the Loader appearance based on properties from the `PageModel`.

```HtmlHelper
@page
@model LoaderIndexModel	

@inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
@Html.AntiForgeryToken()

@(Html.Kendo().Loader()
    .Name("loader")
    .Size(Model.Size)
    .ThemeColor(Model.ThemeColor)
)
```
{% if site.core %}
```TagHelper
@page
@model LoaderIndexModel	

@inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
@Html.AntiForgeryToken()

<kendo-loader name="loader"
    size="Model.Size" 
    themeColor="Model.ThemeColor">
</kendo-loader>
```
{% endif %}
```C# PageModel
public class LoaderIndexModel : PageModel
{
    public LoaderSize Size { get; set; }
    public LoaderThemeColor ThemeColor { get; set; }

    public void OnGet()
    {
        ThemeColor = LoaderThemeColor.Success;
        Size = LoaderSize.Large;
    }
}
```

For the complete project, refer to the [Loader in Razor Pages example](https://github.com/telerik/ui-for-aspnet-core-examples/blob/master/Telerik.Examples.RazorPages/Telerik.Examples.RazorPages/Pages/Loader/LoaderIndex.cshtml).

## See Also

* [Using Telerik UI for ASP.NET Core in Razor Pages](https://docs.telerik.com/aspnet-core/getting-started/razor-pages#using-telerik-ui-for-aspnet-core-in-razor-pages)
* [Client-Side API of the Loader](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/loader)
* [Server-Side HtmlHelper API of the Loader](/api/loader)
* [Server-Side TagHelper API of the Loader](/api/taghelpers/loader)
* [Knowledge Base Section](/knowledge-base)
