---
title: Razor Page
page_title: Configure the Loader in Razor Page
description: "Learn how to configure the Telerik UI Loader for {{ site.framework }} in RazorPages scenario."
slug: htmlhelpers_loader_aspnetcore_razor_page
position: 4
---

# Razor Page

This article demonstrates how to configure the Telerik UI Loader component for {{ site.framework }} in a RazorPage scenario.

For the full project with RazorPages examples, visit our [GitHub repository](https://github.com/telerik/ui-for-aspnet-core-examples/tree/master/Telerik.Examples.RazorPages).

```tab-HtmlHelper(csthml)
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
```tab-TagHelper(csthml)
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
```tab-PageModel(cshtml.cs)      
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