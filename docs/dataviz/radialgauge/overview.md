---
title: Overview
page_title: Documentation Guide for Kendo UI Radial Gauge widget
description: How to create and set a Radial Gauge widget in Kendo UI DataViz.
---

# Radial Gauge Overview

The Radial Gauge widget is used to let users quickly understand where a value lies in a certain range.
All graphics are rendered on the client using SVG with a fallback to VML for legacy browsers.


## Basic setup

### 1\. Create a simple HTML div (optionally set a height and width with CSS)

    <div id="radial-gauge"></div>

### 2\. Initialize the Kendo UI RadialGauge with default configuration

	$(document).ready(function() {
    	$("#radial-gauge").kendoRadialGauge();
   	});

## Creating half- and quarter-circle gauges

The [`startAngle`](/api/dataviz/radialgauge#scale.startAngle) and
[`endAngle`](/api/dataviz/radialgauge#scale.endAngle) configuration options
enable you to create gauges that align with your design goals.

### Create a quarter-gauge, oriented to the top-right

    $("#radial-gauge").kendoRadialGauge({
        startAngle: 90,
        endAngle: 180
    });

For a real-world example for this functionality, see the [car dashboard demo](http://demos.telerik.com/kendo-ui/dataviz/dashboards/car-dashboard.html).

To see all available configuration options, see the [radial gauge API section](/api/dataviz/radialgauge).
