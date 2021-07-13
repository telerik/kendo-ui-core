---
title: Color Ranges
page_title: jQuery ArcGauge Documentation | Color Ranges
description: "Get started with the jQuery ArcGauge by Kendo UI and set different colors to the value ranges."
slug: colorranges_kendoui_arcgauge
position: 2
---

# Color Ranges

The ArcGauge enables you to set different colors depending on the current value.

To configure the range colors, set the [`colors`](/api/javascript/dataviz/ui/arcgauge/configuration/colors)  option.

    $("#gauge").kendoArcGauge({
        value: 30,
        colors: [{
            to: 25,
            color: '#0058e9'
        }, {
            from: 25,
            to: 50,
            color: '#37b400'
        }, {
            from: 50,
            to: 75,
            color: '#ffc000'
        }, {
            from: 75,
            color: '#f31700'
        }]
    });

## See Also

* [Using Colors in the ArcGauge (Demo)](https://demos.telerik.com/kendo-ui/arc-gauge/colors)
* [JavaScript API Reference of the ArcGauge](/api/javascript/dataviz/ui/arcgauge)
