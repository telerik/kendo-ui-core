---
title: Overview
page_title: ArcGauge Overview | Telerik UI for ASP.NET Core HtmlHelpers
description: "Learn the basics when working with the Kendo UI ArcGauge HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: overview_arcgaugehelper_aspnetcore
position: 1
---

# ArcGauge HtmlHelper Overview

The ArcGauge represents a value on a circular arc.

The ArcGauge HtmlHelper extension is a server-side wrapper for the [Kendo UI ArcGauge](http://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/arcgauge) widget. For more information on the ArcGauge HtmlHelper for ASP.NET MVC, refer to the [UI for ASP.NET MVC documentation](https://docs.telerik.com/aspnet-mvc/helpers/arcgauge/overview).

## Initializing the ArcGauge

1. Follow all the steps from the [introductory article on Telerik UI for ASP.NET MVC](https://docs.telerik.com/aspnet-core/introduction).
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

To reference an existing Kendo UI ArcGauge instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [ArcGauge API](http://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/arcgauge#methods) to control its behavior.

    // Place this after your Kendo UI ArcGauge for ASP.NET MVC declaration.
    <script>
        $(function() {
            // The Name() of the ArcGauge is used to get its client-side instance.
            var gauge = $("#arcGauge").data("kendoArcGauge");
        });
    </script>

## See Also

* [Basic Usage of the ArcGauge HtmlHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/arc-gauge/index)
* [JavaScript API Reference of the ArcGauge](http://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/arcgauge)
