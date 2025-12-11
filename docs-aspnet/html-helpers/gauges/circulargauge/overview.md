---
title: Overview
page_title: Overview
description: "Discover the Telerik UI CircularGauge component for {{ site.framework }} and learn how to initialize and configure the component."
components: ["circulargauge"]
previous_url: /helpers/gauges/circulargauge/overview
slug: overview_circulargaugehelper_aspnetcore
position: 0
---

# {{ site.framework }} CircularGauge Overview

{% if site.core %}
The Telerik UI CircularGauge TagHelper and HtmlHelper for {{ site.framework }} are server-side wrappers for the Kendo UI CircularGauge widget.
{% else %}
The Telerik UI CircularGauge HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI CircularGauge widget.
{% endif %}

The CircularGauge represents a value on a circular scale. It allows you to visualize numeric values in an attractive manner that matches the other widgets on the page. 

* [Demo page for the CircularGauge HtmlHelper](https://demos.telerik.com/{{ site.platform }}/circular-gauge/index)
{% if site.core %}
* [Demo page for the CircularGauge TagHelper](https://demos.telerik.com/aspnet-core/circular-gauge/tag-helper)
{% endif %}

It is essentially very similar to the ArcGauge with the difference that the CircularGauge is a complete circle. There are bigger differences with RadialGauge, however, since the Radial widget is focusing on displaying a value on a scale with the help of a pointer element. Also, setting range colors on the RadialGauge happens for the scale itself, while the color ranges for the CircularGauge happen for the value fill.

## Initializing the CircularGauge

1. Create a new action method which renders the view.

    ```C#
    public ActionResult Index()
    {
        return View();
    }
    ```

1. Add the CircularGauge.

    ```HtmlHelper
        @(Html.Kendo().CircularGauge()
            .Name("circularGauge") // The name of the CircularGauge is mandatory. It specifies the "id" attribute of the widget.
            .Value(65)
            .Scale(x => x.Min(0).Max(100))
            .CenterTemplate("#:value#%")
        )
    ```
    {% if site.core %}
    ```TagHelper
        <kendo-circulargauge name="circulargauge" value="65" center-template="#:value#%">
            <scale min="0" max="100">
            </scale>
        </kendo-circulargauge>
    ```
    {% endif %}

## Functionality and Features

* [Scale]({% slug scale_circulargaugehelper_aspnetcore %})—You can control how the scale of the Circular Gauge renders the values, pointers and labels.
* [Colors]({% slug colors_circulargaugehelper_aspnetcore %})—The scale of the Circular Gauge can be configured to show different colors for different values.
* [Export]({% slug export_circulargaugehelper_aspnetcore %})—You can export the Circular Gauge as an image, SVG, or a PDF file.

## Next Steps

* [Getting Started with Circular Gauge]({% slug circulargauge_getting_started %})
* [Basic Usage of the CircularGauge HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/circular-gauge/index)
{% if site.core %}
* [Basic Usage of the CircularGauge TagHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/aspnet-core/circular-gauge/tag-helper)
{% endif %}

## See Also

* [Using the API of the Circular Gauge for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/circular-gauge/api)
* [Knowledge Base Section](/knowledge-base)
