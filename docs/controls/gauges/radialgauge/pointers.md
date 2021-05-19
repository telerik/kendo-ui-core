---
title: Multiple Pointers
page_title: jQuery RadialGauge Documentation | Multiple Pointers
description: "Get started with the jQuery RadialGauge by Kendo UI and highlight multiple values by rendering multiple pointers."
slug: pointers_kendoui_radialgauge
position: 3
---

# Multiple Pointers

The RadialGauge enables you to highlight multiple values by rendering multiple pointers.

You can independently customize each pointer including its current value, color, and length.

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoRadialGauge({
        pointer: [{
            value: 10,
            color: '#ffd246',
            length: 0.5
        }, {
            value: 20,
            color: '#28b4c8',
            length: 0.75
        }, {
            value: 30,
            color: '#78d237',

            // Default length
            // length: 1
        }]
    });
    </script>

## See Also

* [Using Multiple Pointers in the RadialGauge (Demo)](https://demos.telerik.com/kendo-ui/radial-gauge/multiple-pointers)
* [JavaScript API Reference of the RadialGauge](/api/javascript/dataviz/ui/radialgauge)
