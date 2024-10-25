---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI ColorGradient component for {{ site.framework }}."
slug: htmlhelpers_overview_colorgradient
position: 0
---

# {{ site.framework }} ColorGradient Overview

{% if site.core %}
The Telerik UI ColorGradient TagHelper and HtmlHelper for {{ site.framework }} are server-side wrappers for the [Kendo UI ColorGradient](https://docs.telerik.com/kendo-ui/controls/colorgradient/overview) widget.
{% else %}
The Telerik UI ColorGradient HtmlHelper for {{ site.framework }} is a server-side wrapper for the [Kendo UI ColorGradient](https://docs.telerik.com/kendo-ui/controls/colorgradient/overview) widget.
{% endif %}

The ColorGradient is a component that renders a gradient color palette. It has a hue and an alpha slider and provides an input that allows you to enter a color or copy the selected one. 

{% if site.has_cta_panels == true %}
{% include cta-panel-introduction.html %}
{% endif %}

* [Demo page for the ColorGradient](https://demos.telerik.com/{{ site.platform }}/colorgradient/index)

## Initializing the ColorGradient

The ColorGradient is usually used as a color editor. The following example demonstrates how to define the ColorGradient.

```HtmlHelper
    @(Html.Kendo().ColorGradient()
        .Name("colorGradient") // The name of the ColorGradient is mandatory. It specifies the "id" attribute.
        .Value("#ff0000")
    )
```
{% if site.core %}
```TagHelper
    <kendo-colorgradient name="colorgradient"
        value="#ff0000">
    </kendo-colorgradient>
```
{% endif %}

## Basic Configuration

The ColorGradient provides default configuration options such as input, format, opacity, and so on.

The following example shows a basic implementation of the control.

```HtmlHelper
    @(Html.Kendo().ColorGradient()
        .Name("colorGradient")
        .Input(true)
        .Format(ColorGradientFormat.Hex)
        .Opacity(true)
        .Value("#f16e0aff")
    )
```
{% if site.core %}
```TagHelper
    <kendo-colorgradient name="colorgradient"
        input="true"
        format="ColorGradientFormat.Hex"
        opacity="true"
        value="#f16e0aff">
    </kendo-colorgradient>
```
{% endif %}

## Functionality and Features

* [Formats]({% slug htmlhelpers_rgb_hex_formats_colorgradient %})—The ColorGradient supports both RGB and HEX input formats. 
* [Contrast Tool]({% slug htmlhelpers_contrast_tool_colorgradient %})—You can use the Color Contrast Tool that is built into the ColorGradient to check the color contrast ratio between two colors.
* [Accessibility]({% slug htmlhelpers_accessibility_colorgradient %})—The ColorGradient is accessible by screen readers and provides WAI-ARIA, Section 508, WCAG 2.2, and keyboard support.

## Next Steps

* [Getting Started with the ColorGradient]({% slug aspnetcore_colorgradient_getting_started %})
* [Basic Usage of the ColorGradient for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/colorgradient/index)

## See Also

* [Using the API of the ColorGradient for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/colorgradient/api)
* [Knowledge Base Section](/knowledge-base)
