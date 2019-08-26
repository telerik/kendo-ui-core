---
title: Overview
page_title: ArcGauge Overview | Telerik UI for ASP.NET Core HTML Helpers
description: "Learn the basics when working with the Telerik UI ArcGauge HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: overview_arcgaugehelper_aspnetcore
position: 1
---

# ArcGauge HtmlHelper Overview

The Telerik UI ArcGauge HtmlHelper for ASP.NET Core is a server-side wrapper for the Kendo UI ArcGauge widget.

The ArcGauge represents a value on a circular arc.

* [Demo page for the ArcGauge](https://demos.telerik.com/aspnet-core/arc-gauge/index)

## Initializing the ArcGauge

1. Follow all the steps from the [introductory article on Telerik UI for ASP.NET Core](https://docs.telerik.com/aspnet-core/introduction).
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

To reference an existing Telerik UI ArcGauge instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [ArcGauge API](/api/arcgauge) to control its behavior.

    // Place the following after your Telerik UI ArcGauge for ASP.NET Core declaration.
    <script>
        $(function() {
            // The Name() of the ArcGauge is used to get its client-side instance.
            var gauge = $("#arcGauge").data("kendoArcGauge");
        });
    </script>

## See Also

* [Basic Usage of the ArcGauge HtmlHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/arc-gauge/index)
* [Server-Side API](/api/arcgauge)
