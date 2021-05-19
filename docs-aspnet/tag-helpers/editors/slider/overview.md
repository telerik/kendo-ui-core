---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI Slider TagHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
previous_url: /helpers/slider, /helpers/tag-helpers/slider
slug: taghelpers_slider_aspnetcore
position: 1
---

# Slider TagHelper Overview

The Telerik UI Slider TagHelper for ASP.NET Core is a server-side wrapper for the Kendo UI Slider widget.

The Slider provides a rich input for selecting numeric values nd can be either a Slider which presents one handle and two opposing buttons for selecting a single numeric value or a Slider which presents two handlers for defining a range of numeric values.

* [Demo page for the Slider](https://demos.telerik.com/aspnet-core/slider/tag-helper)

## Initializing the Slider

The following example demonstrates how to define the Slider by using the Slider TagHelper.

        <kendo-slider name="slider"
                      increase-button-title="Right"
                      decrease-button-title="Left"
                      min="0" max="30"
                      small-step="1"
                      large-step="10"
                      value="18" class="temperature" title="slider"></kendo-slider>

## Basic Configuration

The Slider TagHelper configuration options are passed as attributes of the tag.

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

The following example demonstrates how to define the RangeSlider by using the RangeSlider TagHelper.

        <kendo-rangeslider name="rangeslider" class="humidity"
                           min="0" max="10"
                           small-step="1"
                           large-step="10"></kendo-rangeslider>

## See Also

* [Basic Usage of the Slider TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/slider/tag-helper)
* [Server-Side API](/api/slider)
