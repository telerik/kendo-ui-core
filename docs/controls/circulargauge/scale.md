---
title: Scale Options
page_title: jQuery CircularGauge Documentation - Scale Options
description: "Get started with the jQuery CircularGauge by Kendo UI and customize the options of its scale."
slug: scale_kendoui_circulargauge
position: 4
---

# Scale Options

The CircularGauge enables you to customize the appearance of the scale by configuring the widget's options.

For example, you can change the start and end angle, the appearance of the label and ticks, customize the ranges, and others. For the full list of options, refer to the [API reference of the CircularGauge](/api/javascript/dataviz/ui/circulargauge).

    $("#gauge").kendoCircularGauge({
        scale: {
            min: 0,
            max: 100,
            labels: {
                template: "#: value #%",
                position: "outside"
            },
            minorUnit: 10,
            majorUnit: 100
        }
    });

## See Also

* [Scale Options of the CircularGauge (Demo)](https://demos.telerik.com/kendo-ui/circular-gauge/scale-options)
* [JavaScript API Reference of the CircularGauge](/api/javascript/dataviz/ui/circulargauge)
