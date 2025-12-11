---
title:  Razor Pages
page_title: Razor Pages
description: "An example on how to configure the Telerik UI Stepper component for {{ site.framework }} in a Razor Page."
slug: htmlhelpers_stepper_razorpage_aspnetcore
components: ["stepper"]
position: 6
---

# Stepper in Razor Pages

This article describes how to seamlessly integrate and configure the Telerik UI Stepper for {{ site.framework }} in Razor Pages applications.

@[template](/_contentTemplates/core/razor-pages-general-info.md#referencing-handler-methods)

## Configuring Appearance from PageModel

The following example demonstrates how to configure the Stepper appearance based on properties from the `PageModel`.

```HtmlHelper
@page
@model StepperIndexModel

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
```TagHelper
@page
@model StepperIndexModel

@inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
@Html.AntiForgeryToken()

<kendo-stepper name="stepper" 
    orientation="StepperOrientationType.Horizontal"
    label="@Model.Label"
    indicator="@Model.Indicator">
    <steps>
        <step label="First"></step>
        <step label="Second" selected="true"></step>
        <step label="Third"></step>
        <step label="Fourth"></step>
        <step label="Fifth"></step>
    </steps>
</kendo-stepper>
```
```C# PageModel
public class StepperIndexModel : PageModel
{ 	
	public bool Label { get; set; }
    public bool Indicator { get; set; }

    public void OnGet()
    {            
        Label = true;
        Indicator = false;
    }
}
```

For the complete project, refer to the [Stepper in Razor Pages example](https://github.com/telerik/ui-for-aspnet-core-examples/blob/master/Telerik.Examples.RazorPages/Telerik.Examples.RazorPages/Pages/Stepper/StepperIndex.cshtml).

## See Also

* [Using Telerik UI for ASP.NET Core in Razor Pages](https://docs.telerik.com/aspnet-core/getting-started/razor-pages#using-telerik-ui-for-aspnet-core-in-razor-pages)
* [Client-Side API of the Stepper](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/stepper)
* [Server-Side HtmlHelper API of the Stepper](/api/stepper)
* [Server-Side TagHelper API of the Stepper](/api/taghelpers/stepper)
* [Knowledge Base Section](/knowledge-base)

