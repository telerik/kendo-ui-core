---
title:  Razor Pages
page_title: Razor Pages
description: "An example on how to configure the Telerik UI ColorPicker component for {{ site.framework }} in a Razor Page."
slug: htmlhelpers_colorpicker_razorpage_aspnetcore
position: 6
---

# ColorPicker in Razor Pages

Razor Pages is an alternative to the MVC pattern that makes page-focused coding easier and more productive. This approach consists of a `cshtml` file and a `cshtml.cs` file (by design, the two files have the same name). 

You can seamlessly integrate the Telerik UI ColorPicker for {{ site.framework }} in Razor Pages applications.

This article describes how to configure the ColorPicker component in a Razor Pages scenario.

For the complete project, refer to the [ColorPicker in Razor Pages example](https://github.com/telerik/ui-for-aspnet-core-examples/blob/master/Telerik.Examples.RazorPages/Telerik.Examples.RazorPages/Pages/ColorPicker/ColorPickerIndex.cshtml).

```tab-HtmlHelper(csthml)        
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

