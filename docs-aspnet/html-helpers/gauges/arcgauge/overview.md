---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI ArcGauge component for {{ site.framework }}."
previous_url: /helpers/gauges/arcgauge/overview
slug: overview_arcgaugehelper_aspnetcore
position: 1
---

# {{ site.framework }} ArcGauge Overview

{% if site.core %}
The Telerik UI ArcGauge TagHelper and HtmlHelper for {{ site.framework }} are server-side wrappers for the Kendo UI ArcGauge widget.
{% else %}
The Telerik UI ArcGauge HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI ArcGauge widget.
{% endif %}

The ArcGauge represents a value on a circular arc.

* [Demo page for the ArcGauge HtmlHelper](https://demos.telerik.com/{{ site.platform }}/arc-gauge/index)
{% if site.core %}
* [Demo page for the ArcGauge TagHelper](https://demos.telerik.com/aspnet-core/arc-gauge/tag-helper)
{% endif %}

## Initializing the ArcGauge

1. Follow all the steps from the [introductory article on {{ site.product }}](https://docs.telerik.com/{{ site.platform }}/introduction).

1. Create a new action method which renders the view.

        public ActionResult Index()
        {
            return View();
        }

1. Add the ArcGauge.

    ```HtmlHelper
        @(Html.Kendo().ArcGauge()
            .Name("arcGauge") // The name of the AcrGauge is mandatory. It specifies the "id" attribute of the widget.
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
{% if site.core %}
* [Basic Usage of the ArcGauge TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/arc-gauge/tag-helper)
{% endif %}
* [Server-Side API](/api/arcgauge)
