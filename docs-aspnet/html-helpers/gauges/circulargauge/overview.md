---
title: Overview
page_title: Overview
description: "Discover the Telerik UI CircularGauge HtmlHelper for {{ site.framework }} and learn how to initialize and configure the component."
previous_url: /helpers/gauges/circulargauge/overview
slug: overview_circulargaugehelper_aspnetcore
position: 1
---

# CircularGauge HtmlHelper Overview

The Telerik UI CircularGauge HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI CircularGauge widget.

The CircularGauge represents a value on a circular scale. It allows you to visualize numeric values in an attractive manner that matches the other widgets on the page. 

* [Demo page for the CircularGauge](https://demos.telerik.com/{{ site.platform }}/circular-gauge/index)

It is essentially very similar to the ArcGauge with the difference that the CircularGauge is a complete circle. There are bigger differences with RadialGauge, however, since the Radial widget is focusing on displaying a value on a scale with the help of a pointer element. Also, setting range colors on the RadialGauge happens for the scale itself, while the color ranges for the CircularGauge happen for the value fill.

## Initializing the CircularGauge

1. Follow all the steps from the [introductory article on {{ site.product }}](https://docs.telerik.com/{{ site.platform }}/introduction#next-steps).
1. Create a new action method which renders the view.

        public ActionResult Index()
        {
            return View();
        }

1. Add the CircularGauge.

        @(Html.Kendo().CircularGauge()
            .Name("circularGauge") // The name of the CircularGauge is mandatory. It specifies the "id" attribute of the widget.
            .Value(65)
            .Scale(x => x.Min(0).Max(100))
            .CenterTemplate("#:value#%")
        )

## Referencing Existing Instances

To reference an existing Telerik UI CircularGauge instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [CircularGauge client-side API](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/circulargauge#methods) to control its behavior.

    // Place the following after the Telerik UI CircularGauge for {{ site.framework }} declaration.
    <script>
        $(function() {
            // The Name() of the CircularGauge is used to get its client-side instance.
            var gauge = $("#circularGauge").data("kendoCircularGauge");
        });
    </script>

## Colors

The CircularGauge supports different color ranges depending on the currently active value. The gauge will then colorize the value element and fill it with the respective range color:

     .Colors(colors =>
    {
        colors.Add().From(0).To(25).Color("#0058e9");
        colors.Add().From(25).To(50).Color("#37b400");
        colors.Add().From(50).To(75).Color("#ffc000");
        colors.Add().From(75).To(100).Color("#f31700");
    })
    
You can find a live sample demonstrating that here:

[Color Ranges](https://demos.telerik.com/{{ site.platform }}/circular-gauge/colors)

## Scale Options

There are various Scale Settings available so you can present the gauge exactly the way you want to:

    .Scale(x =>x.Labels(l=>l.Visible(true)))

You can change the start and end angle, the appearance of the label and ticks, min and max options of the scale, and others. For the full list of options, refer to the [API reference of the CircularGauge](/api/javascript/dataviz/ui/circulargauge).

## See Also

* [Basic Usage of the CircularGauge HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/circular-gauge/index)
* [Server-Side API](/api/circulargauge)
