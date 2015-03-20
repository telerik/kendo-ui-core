---
title: Overview
page_title: User Guide for Linear Gauge widget
description: Step-by-step help guide how to initialize Kendo UI DataViz Linear Gauge.
---

# Linear Gauge Overview

The Linear Gauge widget is used to let users quickly understand where a value lies in a certain range.
All graphics are rendered on the client using SVG with a fallback to VML for legacy browsers.

## Basic setup

### 1\. Create a simple HTML div (optionally set a height and width with CSS)

    <div id="linear-gauge"></div>

### 2\. Initialize the Kendo UI Linear Gauge with default configuration

       $(document).ready(function() {
           $("#linear-gauge").kendoLinearGauge();
       });
    </p>

### Create a horizontal linear gauge with value 20 and mininum value 10

        $("#linear-gauge").kendoLinearGauge({
            pointer: {
                value: 20
            },
            scale: {
                min: 10,
                vertical: false
            }
        });

To see all available configuration options, see the [linear gauge API section](/api/dataviz/lineargauge).

