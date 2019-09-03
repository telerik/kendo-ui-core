---
title: Overview
page_title: ArcGauge Overview | Telerik UI for ASP.NET MVC HTML Helpers
description: "Learn the basics when working with the Telerik UI ArcGauge HtmlHelper for ASP.NET MVC."
slug: overview_arcgaugehelper_aspnetmvc
position: 1
---

# ArcGauge HtmlHelper Overview

The Telerik UI ArcGauge HtmlHelper for ASP.NET MVC is a server-side wrapper for the Kendo UI ArcGauge widget.

The ArcGauge represents a value on a circular arc.

* [Demo page for the ArcGauge](https://demos.telerik.com/aspnet-mvc/arc-gauge)

## Basic Configuration

1. Make sure you followed all the steps from the [introductory article on Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %}).
1. Create a new action method which renders the view.

        public ActionResult Index()
        {
            return View();
        }

1. Add a ArcGauge.

    ```ASPX
        <%: Html.Kendo().ArcGauge()
            // The name of the AcrGauge is mandatory.
            // It specifies the "id" attribute of the ArcGauge.
            .Name("arcGauge")
            .Value(65)
            .Scale(x => x.Min(0).Max(100))
            .CenterTemplate("#:value#%")
        %>
    ```
    ```Razor
        @(Html.Kendo().ArcGauge()
            // The name of the AcrGauge is mandatory.
            // It specifies the "id" attribute of the ArcGauge.
            .Name("arcGauge")
            .Value(65)
            .Scale(x => x.Min(0).Max(100))
            .CenterTemplate("#:value#%")
        )
    ```

## Referencing Existing Instances

To reference an existing ArcGauge instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [ArcGauge cient-side API](http://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/arcgauge#methods) to control its behavior.

    // Place the following after the ArcGauge for ASP.NET MVC declaration.
    <script>
        $(function() {
            // The Name() of the ArcGauge is used to get its client-side instance.
            var gauge = $("#arcGauge").data("kendoArcGauge");
        });
    </script>

## See Also

* [Basic Usage of the ArcGauge HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/arc-gauge)
* [ArcGaugeBuilder Server-Side API](http://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/ArcGaugeBuilder)
* [ArcGauge Server-Side API](/api/arcgauge)
