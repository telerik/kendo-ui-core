---
title: Overview
page_title: jQuery RadialGauge Documentation | RadialGauge Overview
description: "Get started with the jQuery RadialGauge by Kendo UI and learn how to create, initialize, and enable the widget."
slug: overview_kendoui_radialgaugewidget
position: 1
---

# RadialGauge Overview

The [Kendo UI RadialGauge widget](https://demos.telerik.com/kendo-ui/radial-gauge/index) enables users to quickly understand in what certain range a value lies.

All graphics render on the client by using the [Scalable Vector Graphics (SVG)](https://en.wikipedia.org/wiki/Scalable_Vector_Graphics) format.

## Initializingthe RadialGauge

To create the RadialGauge, use a `div` element and optionally set a height and width by using CSS.

    <div id="radial-gauge"></div>

The following example demonstrates how to initialize the RadialGauge with its default configuration.

	$(document).ready(function() {
    	$("#radial-gauge").kendoRadialGauge();
   	});

## Functionality and Features

* [Scale options]({% slug saleoptions_kendoui_radialgauge %})
* [Multiple pointers]({% slug pointers_kendoui_radialgauge %})

## See Also

* [Basic Usage of the RadialGauge (Demo)](https://demos.telerik.com/kendo-ui/radial-gauge/index)
* [JavaScript API Reference of the RadialGauge](/api/javascript/dataviz/ui/radialgauge)
