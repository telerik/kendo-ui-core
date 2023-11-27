---
title: Templates
page_title: jQuery CircularGauge Documentation - Templates
description: "Get started with the jQuery CircularGauge by Kendo UI and customize the content of its center by using the center template."
slug: centertemplate_kendoui_circulargauge
position: 5
---

# Templates

You can customize the content inside the center of the CircularGauge by using the center template.

To render the center template of a CircularGauge, specify the [`centerTemplate`](/api/javascript/dataviz/ui/circulargauge/configuration/centertemplate).

The following example demonstrates how to create a custom center template.

    $("#gauge").kendoCircularGauge({
        value: 30,
        centerTemplate: '#: value #%'
    });

## See Also

* [Basic Usage of the CircularGauge (Demo)](https://demos.telerik.com/kendo-ui/circular-gauge/index)
* [JavaScript API Reference of the CircularGauge](/api/javascript/dataviz/ui/circulargauge)
