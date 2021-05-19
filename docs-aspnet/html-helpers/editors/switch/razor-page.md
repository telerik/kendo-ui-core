---
title: Razor Page
page_title: Razor Page
description: "An example on how to configure the Telerik UI Switch HtmlHelper for {{ site.framework }} in a Razor Page."
slug: htmlhelpers_switch_aspnetcore_razor_page
---

# Razor Page

This article demonstrates how to configure the Telerik UI Switch HtmlHelper for {{ site.framework }} in a RazorPage.

For the full project with RazorPages examples, visit our [GitHub repository](https://github.com/telerik/ui-for-aspnet-core-examples/tree/master/Telerik.Examples.RazorPages).

```tab-RazorPage(csthml)        
    @inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
    @Html.AntiForgeryToken()

    @(Html.Kendo().Switch()
            .Name("switch")
            .Checked(Model.IsChecked)
        )
	
```
```tab-PageModel(cshtml.cs)      
	
    [BindProperty]
    public bool IsChecked { get; set; }
    public void OnGet()
    {
        IsChecked = true;
    }
    
```
