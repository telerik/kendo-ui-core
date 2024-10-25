---
title: Overview
page_title: Overview
description: "Discover the Telerik UI RadialGauge component for {{ site.framework }} and learn how to initialize and configure the component."
previous_url: /helpers/gauges/radialgauge/overview
slug: overview_radialgaugehelper_aspnetcore
position: 0
---

# {{ site.framework }} RadialGauge Overview

{% if site.core %}
The Telerik UI RadialGauge TagHelper and HtmlHelper for {{ site.framework }} are server-side wrappers for the Kendo UI RadialGauge widget.
{% else %}
The Telerik UI RadialGauge HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI RadialGauge widget.
{% endif %}

The RadialGauge represents values on a radial arc.

* [Demo page for the RadialGauge HtmlHelper](https://demos.telerik.com/{{ site.platform }}/radial-gauge/index)
{% if site.core %}
* [Demo page for the RadialGauge TagHelper](https://demos.telerik.com/aspnet-core/radial-gauge/tag-helper)
{% endif %}

## Initializing the RadialGauge

The following example demonstrates how to initialize the RadialGauge.

```HtmlHelper
    @(Html.Kendo().RadialGauge()
          .Name("radialGauge") // The name of the RadialGauge is mandatory. It specifies the "id" attribute of the widget.
          .Scale(scale => scale
              .Min(0) // Set the min value of the RadialGauge.
              .Max(200) // Set the min value of the RadialGauge.
          )
          .Pointer(pointer => pointer
              .Value(10) // Set the value of the RadialGauge.
          )
    )
```
{% if site.core %}
```TagHelper
    <kendo-radialgauge name="radialGauge">
        <radialgauge-pointers>
            <pointer value="10"></pointer>
        </radialgauge-pointers>
        <scale min="0" max="200">
        </scale>
    </kendo-radialgauge>
```
{% endif %}

## Referencing Existing Instances

To reference an existing Kendo UI RadialGauge instance, use the [`jQuery.data()`](https://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [RadialGauge client-side API](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/radialgauge#methods) to control its behavior.

        // Place the following after the RadialGauge for {{ site.framework }} declaration.
        <script>
            $(function() {
                // The Name() of the RadialGauge is used to get its client-side instance.
                var gauge = $("#radialGauge").data("kendoRadialGauge");
            });
        </script>

## Functionality and Features

* [Scale]({% slug scale_radialgaugehelper_aspnetcore %})—You can control how the scale of the Radial Gauge renders the values, pointers and labels.
* [Pointers]({% slug pointers_radialgaugehelper_aspnetcore %})—The `Pointers` of the Telerik UI RadialGauge for {{ site.framework }} are the values that will be marked on the scale.
* [Export]({% slug export_radialgaugehelper_aspnetcore %})—You can export the Radial Gauge as an image, SVG, or a PDF file.

## Next Steps

* [Getting Started with Radial Gauge]({% slug radialgauge_getting_started %})
* [Basic Usage of the RadialGauge HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/radial-gauge/index)
{% if site.core %}
* [Basic Usage of the RadialGauge TagHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/aspnet-core/radial-gauge/tag-helper)
{% endif %}

## See Also

* [Using the API of the Radial Gauge for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/radial-gauge/api)
* [Knowledge Base Section](/knowledge-base)
