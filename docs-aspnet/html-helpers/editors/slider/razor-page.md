---
title:  Razor Page
page_title: Configure the Slider in a Razor Page.
description: "An example on how to configure the Telerik UI Slider HtmlHelper for {{ site.framework }} in a Razor Page."
slug: htmlhelpers_slider_razorpage_aspnetcore
position: 2
---

# Razor Page

This article describes how to configure the Telerik UI Slider HtmlHelper for {{ site.framework }} in a RazorPages scenario.

See the Slider configuration in the example below, and for the full project with RazorPages examples, visit our [GitHub repository](https://github.com/telerik/ui-for-aspnet-core-examples/tree/master/Telerik.Examples.RazorPages).

```tab-RazorPage(csthml)
@page
@model Telerik.Examples.RazorPages.Pages.Slider.SliderIndexModel
@{
	ViewData["Title"] = "SliderIndex";
}

@inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
@Html.AntiForgeryToken()

<h1>SliderIndex</h1>

<h4>Horizontal orientation:</h4>
<div class="slider-container">
@(Html.Kendo().Slider()
    .Name("slider")
    .IncreaseButtonTitle("Right")
    .DecreaseButtonTitle("Left")
    .Min(-10)
    .Max(10)
    .SmallStep(2)
    .LargeStep(5)
    .Value(0)
    .HtmlAttributes(new { @class = "balSlider", title = "slider" })
)
</div>
<h4>Vertical orientation:</h4>
<div class="slider-container">
@(Html.Kendo().Slider()
    .Name("eqSlider1")
    .Orientation(SliderOrientation.Vertical)
    .Min(-20)
    .Max(20)
    .SmallStep(1)
    .LargeStep(20)
    .ShowButtons(false)
    .Value(10)
    .HtmlAttributes(new { @class = "eqSlider", title = "eqSlider1" })
)
</div>

<style>
	.slider-container {
		padding-top: 20px;
		padding-bottom: 20px;
	}
	div.balSlider {
		width: 100%;
	}
	div.balSlider .k-slider-selection {
		display: none;
	}
	div.eqSlider {
		display: inline-block;
		margin: 1em;
		height: 122px;
		vertical-align: top;
	}
</style>
```
```tab-PageModel(cshtml.cs)
    public void OnGet()
    {

    }
```

## See Also

* [Razor Pages Support]({% slug razor_pages_integration_aspnetmvc6_aspnetmvc %})
* [Slider Overview]({% slug overview_sliderhelper_aspnetcore %})
