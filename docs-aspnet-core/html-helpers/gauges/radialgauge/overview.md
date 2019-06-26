---
title: Overview
page_title: RadialGauge Overview | Telerik UI for ASP.NET Core HtmlHelpers
description: "Learn the basics when working with the Kendo UI RadialGauge HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: overview_radialgaugehelper_aspnetcore
position: 1
---

# RadialGauge HtmlHelper Overview

The RadialGauge represents values on a circular arc.

The RadialGauge HtmlHelper extension is a server-side wrapper for the [Kendo UI RadialGauge](https://demos.telerik.com/kendo-ui/radial-gauge/index) widget. For more information on the RadialGauge HtmlHelper for ASP.NET MVC, refer to the [UI for ASP.NET MVC documentation](https://docs.telerik.com/aspnet-mvc/helpers/radialgauge/overview).

## Initializing the RadialGauge

The following example demonstrates how to Initializing the RadialGauge by using the RadialGauge HtmlHelper.

```
    @(Html.Kendo().RadialGauge()
          .Name("radialGauge") //The name of the RadialGauge is mandatory. It specifies the "id" attribute of the widget.
          .Scale(scale => scale
              .Min(0) // Set the min value of the RadialGauge.
              .Max(200) // Set the min value of the RadialGauge.
          )
          .Pointer(pointer => pointer
              .Value(10) //Set the value of the RadialGauge.
          )
    )
```

## Referencing Existing Instances

To reference an existing Kendo UI RadialGauge instance, use the [`jQuery.data()`](https://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [RadialGauge API](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/radialgauge#methods) to control its behavior.

        // Place this after your Kendo UI RadialGauge for ASP.NET Core declaration.
        <script>
            $(function() {
                // The Name() of the RadialGauge is used to get its client-side instance.
                var gauge = $("#radialGauge").data("kendoRadialGauge");
            });
        </script>

## See Also

* [Basic Usage of the RadialGauge HtmlHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/radial-gauge/index)
* [JavaScript API Reference of the RadialGauge](http://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/radialgauge)
