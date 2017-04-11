---
title: Overview
page_title: Overview | Kendo UI Radial Gauge  
description: "Learn how to initialize and set the Kendo UI Radial Gauge."
slug: overview_kendoui_radialgaugewidget
position: 1
---

# Radial Gauge Overview

The [Kendo UI Radial Gauge widget](http://demos.telerik.com/kendo-ui/radial-gauge/index) enables users to quickly understand in what certain range a value lies.

All graphics render on the client by using the [Scalable Vector Graphics (SVG)](https://en.wikipedia.org/wiki/Scalable_Vector_Graphics) format.

## Getting Started

### Create the Radial Gauge

To create the Radial Gauge, use a `div` element and optionally set a height and width by using CSS.

###### Example

    <div id="radial-gauge"></div>

### Initialize the Radial Gauge

To initialize the Radial Gauge with its default configuration, use the following example.

###### Example

	$(document).ready(function() {
    	$("#radial-gauge").kendoRadialGauge();
   	});

## Configuration

### Create Semi- and Quarter-Circle Gauges

The [`startAngle`](/api/dataviz/radialgauge#scale.startAngle) and [`endAngle`](/api/dataviz/radialgauge#scale.endAngle) configuration options enable you to create gauges that align with your design goals.

The following example demonstrates how to create a quarter-gauge, oriented to the top-right.

###### Example

    $("#radial-gauge").kendoRadialGauge({
        startAngle: 90,
        endAngle: 180
    });

For a real-world example, refer to the [**Car Dashboard** demo](http://demos.telerik.com/kendo-ui/radial-gauge/car-dashboard).

For a detailed list with all configuration options of the Radial Gauge, refer to its [JavaScript API](/api/dataviz/radialgauge).

## See Also

Other articles on the Kendo UI Radial Gauge:

* [Overview of the ASP.NET MVC HtmlHelper Extension for the Radial Gauge Widget](/aspnet-mvc/helpers/radialgauge/overview)
* [Overview of the Radial Gauge JSP Tag]({% slug overview_radialgauge_uiforjsp %})
* [Overview of the Radial Gauge PHP Class](/php/widgets/radialgauge/overview)
* [Radial Gauge JavaScript API Reference](/api/javascript/dataviz/ui/radialgauge)
