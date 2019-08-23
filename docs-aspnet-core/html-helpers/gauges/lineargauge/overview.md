---
title: Overview
page_title: LinearGauge Overview | Telerik UI for ASP.NET Core HTML Helpers
description: "Learn the basics when working with the Telerik UI LinearGauge HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: overview_lineargaugehelper_aspnetcore
position: 1
---

# LinearGauge HtmlHelper Overview

The Telerik UI LinearGauge HtmlHelper for ASP.NET Core is a server-side wrapper for the Kendo UI LinearGauge widget.

The LinearGauge represents values on a linear scale.

* [Demo page for the LinearGauge](https://demos.telerik.com/aspnet-core/linear-gauge/index)

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

To reference an existing Telerik UI LinearGauge instance, use the [`jQuery.data()`](https://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [LinearGauge API](/api/lineargauge) to control its behavior.

        // Place the following after the LinearGauge for ASP.NET Core declaration.
        <script>
        $(function() {
        // The Name() of the LinearGauge is used to get its client-side instance.
            var gauge = $("#linearGauge").data("kendoLinearGauge");
        });
        </script>

## See Also

* [Basic Usage of the LinearGauge HtmlHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/linear-gauge/index)
* [Server-Side API](/api/lineargauge)
