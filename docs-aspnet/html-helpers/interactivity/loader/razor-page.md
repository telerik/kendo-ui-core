---
title: Razor Pages
page_title: Razor Pages
description: "Learn how to configure the Telerik UI Loader for {{ site.framework }} in RazorPages scenario."
slug: htmlhelpers_loader_aspnetcore_razor_page
position: 4
---

# Loader in Razor Pages

Razor Pages is an alternative to the MVC pattern that makes page-focused coding easier and more productive. This approach consists of a `cshtml` file and a `cshtml.cs` file (by design, the two files have the same name). 

You can seamlessly integrate the Telerik UI Loader for {{ site.framework }} in Razor Pages applications.

This article describes how to configure the Loader component in a Razor Pages scenario.

For the complete project, refer to the [Loader in Razor Pages example](https://github.com/telerik/ui-for-aspnet-core-examples/blob/master/Telerik.Examples.RazorPages/Telerik.Examples.RazorPages/Pages/Loader/LoaderIndex.cshtml).

```HtmlHelper
    @page
	@model Telerik.Examples.RazorPages.Pages.Loader.LoaderIndexModel	

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
	@model Telerik.Examples.RazorPages.Pages.Loader.LoaderIndexModel	

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

## See Also

* [Razor Pages Support]({% slug razor_pages_integration_aspnetmvc6_aspnetmvc %})
* [Loader Overview]({% slug htmlhelpers_loader_aspnetcore_overview %})