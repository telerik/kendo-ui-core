---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI ColorGradient component for {{ site.framework }}."
slug: htmlhelpers_overview_colorgradient
position: 1
---

# {{ site.framework }} ColorGradient Overview

{% if site.core %}
The Telerik UI ColorGradient TagHelper and HtmlHelper for {{ site.framework }} are server-side wrappers for the [Kendo UI ColorGradient](https://docs.telerik.com/kendo-ui/controls/editors/colorgradient/overview) widget.
{% else %}
The Telerik UI ColorGradient HtmlHelper for {{ site.framework }} is a server-side wrapper for the [Kendo UI ColorGradient](https://docs.telerik.com/kendo-ui/controls/editors/colorgradient/overview) widget.
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

* [Formats]({% slug htmlhelpers_rgb_hex_formats_colorgradient %})
* [Contrast Tool]({% slug htmlhelpers_contrast_tool_colorgradient %})
* [Accessibility]({% slug htmlhelpers_accessibility_colorgradient %})

## Events

You can subscribe to the `change` [ColorGradient event](https://docs.telerik.com/kendo-ui/api/javascript/ui/colorgradient#events), as is demonstrated in the following example.

```HtmlHelper
    @(Html.Kendo().ColorGradient()
        .Name("colorGradient")
        .Events(ev => ev.Change("colorgradient_change"))
    )
    <script>
        function colorgradient_change(e) {
          console.log("The newly selected color is ", e.value);
        }
    </script>
```
{% if site.core %}
```TagHelper
    <kendo-colorgradient name="colorgradient" on-change="colorgradient_change">
    </kendo-colorgradient>

    <script>
        function colorgradient_change(e) {
          console.log("The newly selected color is ", e.value);
        }
    </script>
```
{% endif %}

For a complete example, refer to the [demo on using the events of the ColorGradient](https://demos.telerik.com/{{ site.platform }}/colorgradient/events).

## Referencing Existing Instances

To reference an existing Telerik UI ColorGradient instance, use the [`jQuery.data()`](https://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [ColorGradient client-side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/colorgradient#methods) to control its behavior.

```HtmlHelper
    @(Html.Kendo().ColorGradient()
        .Name("colorGradient")
    )

    //Get an instance of the ColorGradient by using its Name().
    <script>
    $(function() {
        var colorGradientControl = $("#colorGradient").data("kendoColorGradient");
    });
    </script>
```
{% if site.core %}
```TagHelper
    <kendo-colorgradient name="colorgradient">
    </kendo-colorgradient>

    //Get an instance of the ColorGradient by using its Name().
    <script>
    $(function() {
        var colorGradientControl = $("#colorgradient").data("kendoColorGradient");
    });
```
{% endif %}

## See Also

* [Basic Usage of the ColorGradient HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/colorgradient/index)
* [Server-Side API](/api/colorgradient)
* [Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/colorgradient)
