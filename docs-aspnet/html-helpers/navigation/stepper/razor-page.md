---
title:  Razor Page
page_title: Configure a Stepper in Razor Page.
description: "An example on how to configure the Telerik UI Stepper HtmlHelper for {{ site.framework }} in a Razor Page."
slug: htmlhelpers_stepper_razorpage_aspnetcore
position: 6
---

# Razor Page

This article describes how to configure the Telerik UI Stepper HtmlHelper for {{ site.framework }} in a RazorPage scenario.

For the full project with RazorPages examples, visit our [GitHub repository](https://github.com/telerik/ui-for-aspnet-core-examples/tree/master/Telerik.Examples.RazorPages).

```tab-RazorPage(csthml)        
    @inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
	@Html.AntiForgeryToken()
	
	
	@(Html.Kendo().Stepper()
        .Name("stepper")
        .Orientation(StepperOrientationType.Horizontal)
        .Label(Model.Label)
        .Indicator(Model.Indicator)
        .Steps(s =>
        {
            s.Add().Label("First");
            s.Add().Label("Second").Selected(true);
            s.Add().Label("Third");
            s.Add().Label("Fourth");
            s.Add().Label("Fifth");
        })
    )
	
```
```tab-PageModel(cshtml.cs)      
	
	public bool Label { get; set; }
    public bool Indicator { get; set; }

    public double Value { get; set; }
    public void OnGet()
    {            
        Label = true;
        Indicator = false;
    }
```

## See Also

* [Razor Pages Support]({% slug razor_pages_integration_aspnetmvc6_aspnetmvc %})
* [Stepper Overview]({% slug htmlhelpers_stepper_aspnetcore_overview %})

