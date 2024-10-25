---
title:  Razor Pages
page_title: Razor Pages
description: "An example on how to configure the Telerik UI Stepper component for {{ site.framework }} in a Razor Page."
slug: htmlhelpers_stepper_razorpage_aspnetcore
position: 6
---

# Stepper in Razor Pages

Razor Pages is an alternative to the MVC pattern that makes page-focused coding easier and more productive. This approach consists of a `cshtml` file and a `cshtml.cs` file (by design, the two files have the same name). 

You can seamlessly integrate the Telerik UI Stepper for {{ site.framework }} in Razor Pages applications.

This article describes how to configure the Stepper component in a Razor Pages scenario.

For the complete project, refer to the [Stepper in Razor Pages example](https://github.com/telerik/ui-for-aspnet-core-examples/blob/master/Telerik.Examples.RazorPages/Telerik.Examples.RazorPages/Pages/Stepper/StepperIndex.cshtml).

```tab-HtmlHelper(csthml)        
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

