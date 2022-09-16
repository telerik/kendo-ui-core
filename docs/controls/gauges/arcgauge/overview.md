---
title: Overview
page_title: jQuery ArcGauge Documentation | ArcGauge Overview
description: "Get started with the jQuery ArcGauge by Kendo UI and learn how to create, initialize, and enable the widget."
slug: overview_kendoui_arcgaugewidget
position: 1
---

# ArcGauge Overview

The ArcGauge represents a value on a circular arc.

All graphics render on the client by using the [Scalable Vector Graphics (SVG)](https://en.wikipedia.org/wiki/Scalable_Vector_Graphics) format.

* [Demo page for the ArcGauge](https://demos.telerik.com/kendo-ui/arc-gauge/index)

## Initializing the ArcGauge

To create the ArcGauge, use a `div` element and, optionally, set a height and width by using CSS.

    <div id="arc-gauge"></div>

The following example demonstrates how to initialize the ArcGauge with its default configuration.

	$(document).ready(function() {
    	$("#arc-gauge").kendoArcGauge();
   	});

## Functionality and Features

* [Color ranges]({% slug colorranges_kendoui_arcgauge %})
* [Scale options]({% slug scale_kendoui_arcgauge %})
* [Templates]({% slug centertemplate_kendoui_arcgauge %})

## See Also

* [Basic Usage of the ArcGauge (Demo)](https://demos.telerik.com/kendo-ui/arc-gauge/index)
* [JavaScript API Reference of the ArcGauge](/api/javascript/dataviz/ui/arcgauge)
