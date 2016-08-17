---
title: Overview
page_title: Overview | Kendo UI Radial Gauge  
description: "Learn how to initialize and set the Kendo UI Radial Gauge."
slug: overview_kendoui_radialgaugewidget
position: 1
---

# Radial Gauge Overview

The [Kendo UI Radial Gauge widget](http://demos.telerik.com/kendo-ui/radial-gauge/index) is used to let users quickly understand where a value lies in a certain range. All graphics are rendered on the client using [Scalable Vector Graphics (SVG)](https://en.wikipedia.org/wiki/Scalable_Vector_Graphics) with a fallback to [Vector Markup Language (VML)](https://en.wikipedia.org/wiki/Vector_Markup_Language) for legacy browsers.

## Getting Started

### Create the Radial Gauge

Create the Kendo UI Radial Gauge widget by using a simple `div` and optionally set a height and width via CSS.

###### Example

    <div id="radial-gauge"></div>

### Initialize the Radial Gauge

Initialize the Radial Gauge with its default configuration as demonstrated in the example below.

###### Example

	$(document).ready(function() {
    	$("#radial-gauge").kendoRadialGauge();
   	});

## Configuration

### Create Half- and Quarter-Circle Gauges

The [`startAngle`](/api/dataviz/radialgauge#scale.startAngle) and [`endAngle`](/api/dataviz/radialgauge#scale.endAngle) configuration options enable you to create gauges that align with your design goals.

The example below demonstrates how to create a quarter-gauge, oriented to the top-right.

###### Example

    $("#radial-gauge").kendoRadialGauge({
        startAngle: 90,
        endAngle: 180
    });

For a real-world example on this functionality, see the [car dashboard demo](http://demos.telerik.com/kendo-ui/radial-gauge/car-dashboard).

For a detailed list with all configuration options of the Kendo UI Radial Gauge, refer to the [Radial Gauge JavaScript API](/api/dataviz/radialgauge).

## See Also

Other articles on Kendo UI Radial Gauge:

* [Overview of the ASP.NET MVC HtmlHelper Extension for the Radial Gauge Widget](/aspnet-mvc/helpers/radialgauge/overview)
* [Overview of the Radial Gauge JSP Tag]({% slug overview_radialgauge_uiforjsp %})
* [Overview of the Radial Gauge PHP Class](/php/widgets/radialgauge/overview)
* [Radial Gauge JavaScript API Reference](/api/javascript/dataviz/ui/radialgauge)
