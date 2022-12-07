---
title: Overview
page_title: jQuery CircularGauge Documentation - CircularGauge Overview
description: "Get started with the jQuery CircularGauge by Kendo UI and learn how to create, initialize, and enable the widget."
slug: overview_kendoui_circulargaugewidget
position: 1
---

# {{ site.product }} CircularGauge Overview

The CircularGauge represents a value on a circular scale. It allows you to visualize numeric values in an attractive manner that matches the other widgets on the page.

The widget supports full customization of the Center Text, as well as, rich Scale and Color capabilities.

All graphics render on the client by using the [Scalable Vector Graphics (SVG)](https://en.wikipedia.org/wiki/Scalable_Vector_Graphics) format.

* [Demo page for the CircularGauge](https://demos.telerik.com/kendo-ui/circular-gauge/index)

## Initializing the CircularGauge

To create the CircularGauge, use a `div` element and, optionally, set a height and width by using CSS.

    <div id="circular-gauge"></div>

The following example demonstrates how to initialize the CircularGauge with its default configuration.

	$(document).ready(function() {
    	$("#circular-gauge").kendoCircularGauge();
   	});

## Functionality and Features

* [Color ranges]({% slug colorranges_kendoui_circulargauge %})
* [Scale options]({% slug scale_kendoui_circulargauge %})
* [Templates]({% slug centertemplate_kendoui_circulargauge %})

## See Also

* [Basic Usage of the CircularGauge (Demo)](https://demos.telerik.com/kendo-ui/circular-gauge/index)
* [JavaScript API Reference of the CircularGauge](/api/javascript/dataviz/ui/circulargauge)
