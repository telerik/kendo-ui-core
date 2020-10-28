---
title: Templates
page_title: jQuery ArcGauge Documentation | Templates
description: "Get started with the jQuery ArcGauge by Kendo UI and customize the content of its center by using the center template."
slug: centertemplate_kendoui_arcgauge
position: 4
---

# Templates

You can customize the content inside the center of the ArcGauge by using the center template.

To render the center template of an ArcGauge, specify the [`centerTemplate`](/api/javascript/dataviz/ui/arcgauge/configuration/centertemplate).

The following example demonstrates how to create a custom center template.

    $("#gauge").kendoArcGauge({
        value: 30,
        centerTemplate: '#: value #%'
    });

## See Also

* [Basic Usage of the ArcGauge (Demo)](https://demos.telerik.com/kendo-ui/arc-gauge/index)
* [JavaScript API Reference of the ArcGauge](/api/javascript/dataviz/ui/arcgauge)
