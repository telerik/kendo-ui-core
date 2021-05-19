---
title: Scale Options
page_title: jQuery ArcGauge Documentation | Scale Options
description: "Get started with the jQuery ArcGauge by Kendo UI and customize the options of its scale."
slug: scale_kendoui_arcgauge
position: 3
---

# Scale Options

The ArcGauge enables you to customize the options of the scale.

For example, you can change the start and end angle, the appearance of the label and ticks, customize the ranges, and others. For the full list of options, refer to the [API reference of the ArcGauge](/api/javascript/dataviz/ui/arcgauge).

    $("#gauge").kendoArcGauge({
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

* [Basic Usage of the ArcGauge (Demo)](https://demos.telerik.com/kendo-ui/arc-gauge/index)
* [JavaScript API Reference of the ArcGauge](/api/javascript/dataviz/ui/arcgauge)
