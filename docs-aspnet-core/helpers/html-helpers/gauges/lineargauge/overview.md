---
title: Overview
page_title: Overview | UI for ASP.NET Core LinearGauge HtmlHelper
description: "Get started with the server-side wrapper for the Kendo UI LinearGauge widget for ASP.NET Core."
slug: overview_lineargaugehelper_aspnetcore
---

# LinearGauge HtmlHelper Overview

The LinearGauge HtmlHelper extension is a server-side wrapper for the [Kendo LinearGauge](https://demos.telerik.com/kendo-ui/linear-gauge/index) widget.

## Getting Started

### Configuration

1. Add a LinearGauge.

    ###### Example

    ```        
        @(Html.Kendo().LinearGauge()
            .Name("linearGauge") //The name of the LinearGauge is mandatory. It specifies the "id" attribute of the widget.
            .Scale(scale => scale
                .Min(0) //Set the min value of the LinearGauge.
                .Max(200) //Set the min value of the LinearGauge.
            )
            .Pointer(pointer => pointer
                .Value(10) //Set the value of the LinearGauge.
            )
        )
    ```

## Reference

### Existing Instances

To reference an existing Kendo UI LinearGauge instance, use the [`jQuery.data()`](https://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [LinearGauge API](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/lineargauge#methods) to control its behavior.

###### Example

        // Put this after your Kendo UI LinearGauge for ASP.NET Core declaration.
        <script>
        $(function() {
        // Notice that the Name() of the LinearGauge is used to get its client-side instance.
            var gauge = $("#linearGauge").data("kendoLinearGauge");
        });
        </script>

## See Also

* [Overview of the Kendo UI jQuery LinearGauge Widget](https://docs.telerik.com/kendo-ui/controls/gauges/lineargauge/overview)
* [Overview of the UI for ASP.NET Core ArcGauge]({% slug overview_arcgaugehelper_aspnetcore %})
* [Overview of the UI for ASP.NET Core RadialGauge]({% slug overview_radialgaugehelper_aspnetcore %})
* [UI for ASP.NET Core LinearGauge official live demos](https://demos.telerik.com/aspnet-core/linear-gauge/index)