---
title: Scale Options
page_title: jQuery RadialGauge Documentation | Scale Options
description: "Get started with the jQuery RadialGauge by Kendo UI and customize the options of its scale."
slug: saleoptions_kendoui_radialgauge
position: 2
---

# Scale Options

The RadialGauge enables you to customize the options of the scale.

To set the start and end values of the scale, use the [`startAngle`](/api/javascript/dataviz/ui/radialgauge/configuration/scale.startangle) and [`endAngle`](/api/javascript/dataviz/ui/radialgauge/configuration/scale.endangle) configuration options. For a runnable example, refer to the [**Car Dashboard** demo](https://demos.telerik.com/kendo-ui/radial-gauge/car-dashboard).

The following example demonstrates how to create a quarter-gauge that is oriented to the top-right.

    $("#radial-gauge").kendoRadialGauge({
	    scale: {
  	        startAngle: 90,
            endAngle: 180
        }
    });

## See Also

* [Scale Options in the RadialGauge (Demo)](https://demos.telerik.com/kendo-ui/radial-gauge/scale-options)
* [JavaScript API Reference of the RadialGauge](/api/javascript/dataviz/ui/radialgauge)
