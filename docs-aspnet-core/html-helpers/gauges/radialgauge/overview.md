---
title: Overview
page_title: RadialGauge | Telerik UI for ASP.NET Core HtmlHelpers
description: "Learn the basics when working with the Kendo UI RadialGauge HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: overview_radialgaugehelper_aspnetcore
position: 1
---

# RadialGauge HtmlHelper Overview

The RadialGauge HtmlHelper extension is a server-side wrapper for the [Kendo UI RadialGauge](https://demos.telerik.com/kendo-ui/radial-gauge/index) widget.

## Configuration

Add the RadialGauge.

###### Example

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

## Reference

### Existing Instances

To reference an existing Kendo UI RadialGauge instance, use the [`jQuery.data()`](https://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [RadialGauge API](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/radialgauge#methods) to control its behavior.

###### Example

        // Put this after your Kendo UI RadialGauge for ASP.NET Core declaration.
        <script>
            $(function() {
                // Notice that the Name() of the RadialGauge is used to get its client-side instance.
                var gauge = $("#radialGauge").data("kendoRadialGauge");
            });
        </script>

## See Also

* [OverView of the Kendo UI jQuery RadialGauge](https://docs.telerik.com/kendo-ui/controls/gauges/radialgauge/overview)
* [Overview of the UI for ASP.NET Core ArcGauge]({% slug overview_arcgaugehelper_aspnetcore %})
* [Overview of the UI for ASP.NET Core LinearGauge]({% slug overview_lineargaugehelper_aspnetcore %})
