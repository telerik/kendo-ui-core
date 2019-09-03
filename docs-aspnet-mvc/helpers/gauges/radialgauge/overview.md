---
title: Overview
page_title: RadialGauge Overview | Telerik UI for ASP.NET MVC HTML Helpers
description: "Learn the basics when working with the Telerik UI RadialGauge HtmlHelper for ASP.NET MVC."
slug: overview_radialgaugehelper_aspnetmvc
position: 1
---

# RadialGauge HtmlHelper Overview

The Telerik UI RadialGauge HtmlHelper for ASP.NET MVC is a server-side wrapper for the Kendo UI RadialGauge widget.

The RadialGauge represents values on a circular arc.

* [Demo page for the RadialGauge](https://demos.telerik.com/aspnet-mvc/radial-gauge)

## Basic Configuration

1. Make sure you followed all the steps from the [introductory article on Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %}).
1. Create a new action method which renders the view.

        public ActionResult Index()
        {
            return View();
        }

1. Add a RadialGauge.

    ```ASPX
        <%: Html.Kendo().RadialGauge()
            .Name("radialGauge") // The name of the radialGauge is mandatory. It specifies the "id" attribute of the RadialGauge.
            .Scale(scale => scale
                .Min(0) // Set the min value of the RadialGauge.
                .Max(200) // Set the min value of the RadialGauge.
            )
            .Pointer(pointer => pointer
                .Value(10) // Set the value of the RadialGauge.
            )
        %>
    ```
    ```Razor
        @(Html.Kendo().RadialGauge()
            .Name("radialGauge") // The name of the RadialGauge is mandatory. It specifies the "id" attribute of the RadialGauge.
            .Scale(scale => scale
                .Min(0) // Set the min value of the RadialGauge.
                .Max(200) // Set the min value of the RadialGauge.
            )
            .Pointer(pointer => pointer
                .Value(10) // Set the value of the RadialGauge.
            )
        )
    ```

## Referencing Existing Instances

To reference an existing RadialGauge instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [RadialGauge client-side API](http://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/radialgauge#methods) to control its behavior.

    // Place the following after the RadialGauge for ASP.NET MVC declaration.
    <script>
        $(function() {
            // The Name() of the RadialGauge is used to get its client-side instance.
            var gauge = $("#radialGauge").data("kendoRadialGauge");
        });
    </script>

## See Also

* [Basic Usage of the RadialGauge HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/radial-gauge)
* [RadialGaugeBuilder Server-Side API](http://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/RadialGaugeBuilder)
* [RadialGauge Server-Side API](/api/radialgauge)
