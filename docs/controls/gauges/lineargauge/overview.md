---
title: Overview
page_title: Overview | Kendo UI Linear Gauge
description: "Learn how to initialize and set the Kendo UI Linear gauge."
slug: overview_kendoui_lineargauge_widget
position: 1
---

# Linear Gauge Overview

The [Kendo UI Linear Gauge widget](http://demos.telerik.com/kendo-ui/linear-gauge/index) enables users to quickly understand in what certain range a value lies.

All graphics render on the client by using the [Scalable Vector Graphics (SVG)](https://en.wikipedia.org/wiki/Scalable_Vector_Graphics) format.

## Getting Started

### Create the Linear Gauge

To create the Linear Gauge, use a `div` element and optionally set a height and width by using CSS.

###### Example

    <div id="linear-gauge"></div>

### Initialize the Linear Gauge

To initialize the Linear Gauge with its default configuration, use the following example.

###### Example

       $(document).ready(function() {
           $("#linear-gauge").kendoLinearGauge();
       });
    </p>

## Configuration

### Create Horizontal Linear Gauge with Value and Min Value

The following example demonstrates how to create a horizontal Linear Gauge with a value of 20 and a minimum value of 10.

###### Example

        $("#linear-gauge").kendoLinearGauge({
            pointer: {
                value: 20
            },
            scale: {
                min: 10,
                vertical: false
            }
        });

For a detailed list with all configuration options of the Kendo UI Linear Gauge, refer to its [JavaScript API](/api/javascript/dataviz/ui/lineargauge).

## See Also

* [Overview of the ASP.NET MVC HtmlHelper Extension for the Linear Gauge Widget](/aspnet-mvc/helpers/lineargauge/overview)
* [Overview of the Linear Gauge JSP Tag]({% slug overview_lineargauge_uiforjsp %})
* [Overview of the Linear Gauge PHP Class](/php/widgets/lineargauge/overview)
* [Linear Gauge JavaScript API Reference](/api/javascript/dataviz/ui/lineargauge)
