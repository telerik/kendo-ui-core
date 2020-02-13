---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI ArcGauge HtmlHelper for {{ site.framework }}."
previous_url: /helpers/gauges/arcgauge/overview
slug: overview_arcgaugehelper_aspnetcore
position: 1
---

# ArcGauge HtmlHelper Overview

The Telerik UI ArcGauge HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI ArcGauge widget.

The ArcGauge represents a value on a circular arc.

* [Demo page for the ArcGauge](https://demos.telerik.com/{{ site.platform }}/arc-gauge/index)

## Initializing the ArcGauge

1. Follow all the steps from the [introductory article on {{ site.product }}](https://docs.telerik.com/{{ site.platform }}/introduction).
1. Create a new action method which renders the view.

        public ActionResult Index()
        {
            return View();
        }

1. Add the ArcGauge.

        @(Html.Kendo().ArcGauge()
            .Name("arcGauge") // The name of the AcrGauge is mandatory. It specifies the "id" attribute of the widget.
            .Value(65)
            .Scale(x => x.Min(0).Max(100))
            .CenterTemplate("#:value#%")
        )

## Referencing Existing Instances

To reference an existing Telerik UI ArcGauge instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [ArcGauge client-side API](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/arcgaug#methodse) to control its behavior.

    // Place the following after your Telerik UI ArcGauge for {{ site.framework }} declaration.
    <script>
        $(function() {
            // The Name() of the ArcGauge is used to get its client-side instance.
            var gauge = $("#arcGauge").data("kendoArcGauge");
        });
    </script>

## See Also

* [Basic Usage of the ArcGauge HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/arc-gauge/index)
* [Server-Side API](/api/arcgauge)
