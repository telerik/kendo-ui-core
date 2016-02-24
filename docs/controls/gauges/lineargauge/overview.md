---
title: Overview
page_title: Overview | Kendo UI Linear Gauge
description: "Learn how to initialize and set the Kendo UI Linear gauge."
slug: overview_kendoui_lineargauge_widget
position: 1
---

# Linear Gauge Overview

The [Kendo UI Linear Gauge widget](http://demos.telerik.com/kendo-ui/linear-gauge/index) is used to let users quickly understand where a value lies in a certain range. All graphics are rendered on the client using [Scalable Vector Graphics (SVG)](https://en.wikipedia.org/wiki/Scalable_Vector_Graphics) with a fallback to [Vector Markup Language (VML)](https://en.wikipedia.org/wiki/Vector_Markup_Language) for legacy browsers.

## Getting Started

### Create the Linear Gauge

Create the Kendo UI Linear Gauge widget by using a simple `div` and optionally set a height and width via CSS.

###### Example

    <div id="linear-gauge"></div>

### Initialize the Linear Gauge

Initialize the Linear Gauge with its default configuration as demonstrated in the example below.

###### Example

       $(document).ready(function() {
           $("#linear-gauge").kendoLinearGauge();
       });
    </p>

## Configuration

### Create Horizontal Linear Gauge with Value and Min Value

The example below demonstrates how to create a horizontal Linear Gauge with a value of 20 and a minimum value of 10.

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

For a detailed list with all configuration options of the Kendo UI Linear Gauge, refer to the [Linear Gauge JavaScript API](/api/javascript/dataviz/ui/lineargauge).

## See Also

Other articles on Kendo UI Linear Gauge:

* [Overview of the ASP.NET MVC HtmlHelper Extension for the Linear Gauge Widget](/aspnet-mvc/helpers/lineargauge/overview)
* [Overview of the Linear Gauge JSP Tag]({% slug overview_lineargauge_uiforjsp %})
* [Overview of the Linear Gauge PHP Class](/php/widgets/lineargauge/overview)
* [Linear Gauge JavaScript API Reference](/api/javascript/dataviz/ui/lineargauge)
