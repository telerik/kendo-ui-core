---
title: Overview
page_title: Overview | Kendo UI Arc Gauge
description: "Learn how to initialize and set the Kendo UI Arc Gauge."
slug: overview_kendoui_arcgaugewidget
position: 1
---

# Arc Gauge Overview

The [Kendo UI Arc Gauge widget](http://demos.telerik.com/kendo-ui/arc-gauge/index) displays a value range which is represented by an arc.

All graphics render on the client by using the [Scalable Vector Graphics (SVG)](https://en.wikipedia.org/wiki/Scalable_Vector_Graphics) format.

## Getting Started

### Create the Arc Gauge

To create the Arc Gauge, use a `div` element and optionally set a height and width by using CSS.

###### Example

    <div id="arc-gauge"></div>

### Initialize the Arc Gauge

To initialize the Arc Gauge with its default configuration, use the following example.

###### Example

	$(document).ready(function() {
    	$("#arc-gauge").kendoArcGauge();
   	});

## Center Template

You can customize the content inside the center of the Arc Gauge by using the center template.

To render the center template of an Arc Gauge specify the [`centerTemplate`](/api/javascript/dataviz/ui/arcgauge/configuration/centertemplate).

The following example demonstrates how to create a custom center template.

###### Example

    $("#gauge").kendoArcGauge({
        value: 30,
        centerTemplate: '#: value #%'
    });

## Color Ranges

The Arc Gauge enables you to set different colors depending on the current value.

To configure the range colors, set the [`colors`](/api/javascript/dataviz/ui/arcgauge/configuration/colors)  option.

###### Example

    $("#gauge").kendoArcGauge({
        value: 30,
        colors: [{
            to: 25,
            color: '#0058e9'
        }, {
            from: 25,
            to: 50,
            color: '#37b400'
        }, {
            from: 50,
            to: 75,
            color: '#ffc000'
        }, {
            from: 75,
            color: '#f31700'
        }]
    });

## Scale Options

The Arc Gauge enables you to customize the options of the scale.

For example, you can change the start and end angle, the appearance of the label and ticks, customize the ranges, and others. For the full list of options, refer to the [API reference of the Arc Gauge](/api/javascript/dataviz/ui/arcgauge).

###### Example

    $("#gauge").kendoArcGauge({
        scale: {
            min: 0,
            max: 100,
            labels: {
                template: "#: value #%",
                position: "outside"
            },
            minorUnit: 10,
            majorUnit: 100
        }
    });

## See Also

* [Overview of the ASP.NET MVC HtmlHelper Extension for the Arc Gauge Widget](/aspnet-mvc/helpers/arcgauge/overview)
* [Arc Gauge JavaScript API Reference](/api/javascript/dataviz/ui/arcgauge)
