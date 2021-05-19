---
title: Overview
page_title: jQuery LinearGauge Documentation | LinearGauge Overview
description: "Get started with the jQuery LinearGauge by Kendo UI and learn how to create, initialize, and enable the widget."
slug: overview_kendoui_lineargauge_widget
position: 1
---

# LinearGauge Overview

The LinearGauge represents values on a linear scale.

All graphics render on the client by using the [Scalable Vector Graphics (SVG)](https://en.wikipedia.org/wiki/Scalable_Vector_Graphics) format.

* [Demo page for the LinearGauge](https://demos.telerik.com/kendo-ui/linear-gauge/index)

## Initializing the LinearGauge

To create the LinearGauge, use a `div` element and, optionally, set a height and width by using CSS.

    <div id="linear-gauge"></div>

The following example demonstrates how to initialize the LinearGauge with its default configuration.

       $(document).ready(function() {
           $("#linear-gauge").kendoLinearGauge();
       });
    </p>

The following example demonstrates how to create a horizontal LinearGauge with a value of `20` and a minimum value of `10`.

        $("#linear-gauge").kendoLinearGauge({
            pointer: {
                value: 20
            },
            scale: {
                min: 10,
                vertical: false
            }
        });

## See Also

* [Basic Usage of the LinearGauge (Demo)](https://demos.telerik.com/kendo-ui/linear-gauge/index)
* [JavaScript API Reference of the LinearGauge](/api/javascript/dataviz/ui/lineargauge)
