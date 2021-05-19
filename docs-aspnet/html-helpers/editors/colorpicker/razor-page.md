---
title:  Razor Page
page_title: Configure a ColorPicker in Razor Page.
description: "An example on how to configure the Telerik UI ColorPicker HtmlHelper for {{ site.framework }} in a Razor Page."
slug: htmlhelpers_colorpicker_razorpage_aspnetcore
position: 2
---

# Razor Page

This article describes how to configure the Telerik UI ColorPicker HtmlHelper for {{ site.framework }} in a RazorPage scenario.

For the full project with RazorPages examples, visit our [GitHub repository](https://github.com/telerik/ui-for-aspnet-core-examples/tree/master/Telerik.Examples.RazorPages).

```tab-RazorPage(csthml)        
    @inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
	@Html.AntiForgeryToken()
	
	
	@(Html.Kendo().ColorPicker()
		.Name("picker")	
		.ClearButton(Model.ClearButton)
		.Buttons(Model.Buttons)
		.Value(Model.Value)
	)
	
```
```tab-PageModel(cshtml.cs)      
	
	public bool ClearButton { get; set; }	
    public bool Buttons { get; set; }
    public string Value { get; set; }
	
    public void OnGet()
    {
        ClearButton = true;
        Buttons = false;
        Value = "#94ed67";
    }
```

## See Also

* [Razor Pages Support]({% slug razor_pages_integration_aspnetmvc6_aspnetmvc %})
* [ColorPicker Overview]({% slug overview_colorpickerhelper_aspnetcore %})

