---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI ArcGauge component for {{ site.framework }}."
previous_url: /helpers/gauges/arcgauge/overview
slug: overview_arcgaugehelper_aspnetcore
position: 0
---

# ArcGauge Overview

{% if site.core %}
The Telerik UI ArcGauge TagHelper and HtmlHelper for {{ site.framework }} are server-side wrappers for the Kendo UI ArcGauge widget.
{% else %}
The Telerik UI ArcGauge HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI ArcGauge widget.
{% endif %}

The ArcGauge represents a single value within a specified range on a circular arc. The component can be used to visualize metrics such as speed, temperature, or any other scalar quantity.

* [Demo page for the ArcGauge HtmlHelper](https://demos.telerik.com/{{ site.platform }}/arc-gauge/index)
{% if site.core %}
* [Demo page for the ArcGauge TagHelper](https://demos.telerik.com/aspnet-core/arc-gauge/tag-helper)
{% endif %}

## Initializing the ArcGauge

The following example demonstrates how to define the ArcGauge.

```HtmlHelper
    @(Html.Kendo().ArcGauge()
        .Name("arcGauge") // The name of the AcrGauge is mandatory. It specifies the "id" attribute of the HTML element.
        .Value(65)
        .Scale(x => x.Min(0).Max(100))
        .CenterTemplate("#:value#%")
    )
```
{% if site.core %}
```TagHelper
    <kendo-arcgauge name="arcGauge" center-template="#:value#%" value="65">
        <scale min="0" max="100">
        </scale>
    </kendo-arcgauge>
```
{% endif %}

## Basic Configuration

The following example demonstrates a basic configuration of the ArcGauge component with  different colors depending on the current value.

```HtmlHelper
    @(Html.Kendo().ArcGauge()
        .Name("gauge")
        .Value(65)
        .Scale(x => x.Min(0).Max(100))
        .CenterTemplate("<span style='color: #: color #;'>#: value #%</span>")
        .Colors(colors =>
        {
            colors.Add().From(0).To(25).Color("#0058e9");
            colors.Add().From(25).To(50).Color("#37b400");
            colors.Add().From(50).To(75).Color("#ffc000");
            colors.Add().From(75).To(100).Color("#f31700");
        })
    )
```
{% if site.core %}
```TagHelper
    <kendo-arcgauge name="gauge" value="65" center-template="<span style='color: #: color #;'>#: value #%</span>">
        <scale min="0" max="100"></scale>
        <colors>
            <color from="0" to="25" color="#0058e9" />
            <color from="25" to="50" color="#37b400" />
            <color from="50" to="75" color="#ffc000" />
            <color from="75" to="100" color="#f31700" />
        </colors>
    </kendo-arcgauge>
```
{% endif %}

## Functionality and Features

* [Scale]({% slug scale_arcgaugehelper_aspnetcore %})&mdash;You can customize the scale that renders the values, pointers, and labels.
* [Colors]({% slug colors_arcgaugehelper_aspnetcore %})&mdash;Set different colors that will be applied based on the current ArcGauge value.
* [Export]({% slug export_arcgaugehelper_aspnetcore %})&mdash;Explore the export options of the ArcGauge.

## Next Steps

* [Getting Started with the ArcGauge]({% slug arc_gauge_getting_started %})
* [Basic Usage of the ArcGauge HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/arc-gauge)
{% if site.core %}
* [Basic Usage of the ArcGauge TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/arc-gauge/tag-helper)
{% endif %}

## See Also

* [Visualizing Circular Arc Gauge for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/arc-gauge/circular)
* [Knowledge Base Section](/knowledge-base)