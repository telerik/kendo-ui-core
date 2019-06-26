---
title: Overview
page_title: LinearGauge Overview | Telerik UI for ASP.NET Core HtmlHelpers
description: "Learn the basics when working with the Kendo UI LinearGauge HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: overview_lineargaugehelper_aspnetcore
position: 1
---

# LinearGauge HtmlHelper Overview

The LinearGauge represents values on a linear scale.

The LinearGauge HtmlHelper extension is a server-side wrapper for the [Kendo LinearGauge](https://demos.telerik.com/kendo-ui/linear-gauge/index) widget. For more information on the LinearGauge HtmlHelper for ASP.NET MVC, refer to the [UI for ASP.NET MVC documentation](https://docs.telerik.com/aspnet-mvc/helpers/lineargauge/overview).

## Initializing the LinearGauge

The following example demonstrates how to Initializing the LinearGauge by using the LinearGauge HtmlHelper.

```        
    @(Html.Kendo().LinearGauge()
        .Name("linearGauge") // The name of the LinearGauge is mandatory. It specifies the "id" attribute of the widget.
        .Scale(scale => scale
            .Min(0) // Set the min value of the LinearGauge.
            .Max(200) // Set the min value of the LinearGauge.
        )
        .Pointer(pointer => pointer
            .Value(10) // Set the value of the LinearGauge.
        )
    )
```

## Referencing Existing Instances

To reference an existing Kendo UI LinearGauge instance, use the [`jQuery.data()`](https://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [LinearGauge API](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/lineargauge#methods) to control its behavior.

        // Place this after your Kendo UI LinearGauge for ASP.NET Core declaration.
        <script>
        $(function() {
        // The Name() of the LinearGauge is used to get its client-side instance.
            var gauge = $("#linearGauge").data("kendoLinearGauge");
        });
        </script>

## See Also

* [Basic Usage of the LinearGauge HtmlHelper for ASP.NET Core  (Demo)](https://demos.telerik.com/aspnet-core/linear-gauge/index)
* [JavaScript API Reference of the LinearGauge](http://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/lineargauge)
