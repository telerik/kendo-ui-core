---
title: Overview
page_title: Slider | Telerik UI for ASP.NET Core Tag Helpers
description: "Learn the basics when working with the Kendo UI Slider tag helper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
previous_url: /aspnet-core/helpers/slider, /aspnet-core/helpers/tag-helpers/slider
slug: taghelpers_slider_aspnetcore
position: 1
---

# Slider Tag Helper Overview

The Slider tag helper helps you configure the Kendo UI Slider widget in ASP.NET Core applications.

## Basic Usage

The following example demonstrates how to define the Slider by using the Slider tag helper.

###### Example

        <kendo-slider name="slider"
                      increase-button-title="Right"
                      decrease-button-title="Left"
                      min="0" max="30"
                      small-step="1"
                      large-step="10"
                      value="18" class="temperature" title="slider"></kendo-slider>

## Configuration

The Slider tag helper configuration options are passed as attributes of the tag.

```cshtml

        @(Html.Kendo().Slider()
			.Name("slider")
			.IncreaseButtonTitle("Right")
            .DecreaseButtonTitle("Left")
			.Min(0)
			.Max(30)
			.SmallStep(1)
			.LargeStep(10)
			.Value(18)
			.HtmlAttributes(new { @class = "temperature" }))
```
```tagHelper

        <kendo-slider name="slider"
                      increase-button-title="Right"
                      decrease-button-title="Left"
                      min="0" max="30"
                      small-step="1"
                      large-step="10"
                      value="18" class="temperature" title="slider"></kendo-slider>
```

The following example demonstrates how to define the RangeSlider by using the RangeSlider tag helper.

###### Example

        <kendo-rangeslider name="rangeslider" class="humidity"
                           min="0" max="10"
                           small-step="1"
                           large-step="10"></kendo-rangeslider>

## See Also

* [Overview of Telerik UI for ASP.NET Core]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects with the CLI]({% slug gettingstartedcli_aspnetmvc6_aspnetmvc %})
* [Known Issues with Telerik UI for ASP.NET Core]({% slug knownissues_aspnetmvc6_aspnetmvc %})
