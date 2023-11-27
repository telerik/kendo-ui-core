---
title: Color Ranges
page_title: jQuery CircularGauge Documentation - Color Ranges
description: "Get started with the jQuery CircularGauge by Kendo UI and learn how to set distinct colors for the different value ranges."
slug: colorranges_kendoui_circulargauge
position: 3
---

# Color Ranges

The CircularGauge enables you to set different colors for multiple ranges of the value fill depending on the currently active state. The gauge's value fill will take the defined color from the range which matches its completeness.

To configure the range colors, set the [`colors`](/api/javascript/dataviz/ui/circulargauge/configuration/colors)  option.

    $("#gauge").kendoCircularGauge({
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

* [Using Colors in the CircularGauge (Demo)](https://demos.telerik.com/kendo-ui/circular-gauge/colors)
* [JavaScript API Reference of the CircularGauge](/api/javascript/dataviz/ui/circulargauge)
