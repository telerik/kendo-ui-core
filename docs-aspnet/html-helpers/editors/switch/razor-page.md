---
title: Razor Pages
page_title: Razor Pages
description: "An example on how to configure the Telerik UI Switch component for {{ site.framework }} in a Razor Page."
slug: htmlhelpers_switch_aspnetcore_razor_page
position: 4
---

# Switch in Razor Pages

Razor Pages is an alternative to the MVC pattern that makes page-focused coding easier and more productive. This approach consists of a `cshtml` file and a `cshtml.cs` file (by design, the two files have the same name). 

You can seamlessly integrate the Telerik UI Switch for {{ site.framework }} in Razor Pages applications.

This article describes how to configure the Switch component in a Razor Pages scenario.

For the complete project, refer to the [Switch in Razor Pages example](https://github.com/telerik/ui-for-aspnet-core-examples/blob/master/Telerik.Examples.RazorPages/Telerik.Examples.RazorPages/Pages/Switch/SwitchIndex.cshtml).

```HtmlHelper
    @inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
    @Html.AntiForgeryToken()

    @(Html.Kendo().Switch()
            .Name("switch")
            .Checked(Model.IsChecked)
        )
	
```
{% if site.core %}
```TagHelper
<kendo-switch name="switch" checked="Model.IsChecked"></kendo-switch>
```
{% endif %}
```C# PageModel
	
    [BindProperty]
    public bool IsChecked { get; set; }
    public void OnGet()
    {
        IsChecked = true;
    }
    
```
