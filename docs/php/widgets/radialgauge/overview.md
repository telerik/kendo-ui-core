---
title: Overview
page_title: How to use RadialGauge PHP class | Kendo UI documentation
description: User Guide for server-side wrapper for Kendo UI RadialGauge for PHP.
---

# Radial Gauge

The RadialGauge PHP class is a server-side wrapper for the [Kendo UI DataViz RadialGauge](/api/dataviz/radialgauge) widget.

## Getting Started

Here is how to configure a simple Kendo UI RadialGauge:

1. Follow the steps from the [introduction](/php/introduction) - include the autoloader, JavaScript and CSS files.

3.  Add a radial gauge:

        $gauge = new \Kendo\Dataviz\UI\RadialGauge('gauge');
        $gauge->pointer(array('value' => 10))
              ->scale(array('min' => 0, 'max' => 100));

1. Output the chart by echo-ing the result of the [render](/api/wrappers/php/Kendo/UI/Widget#render) method.

        echo $gauge->render();

## Accessing an Existing Radial Gauge

You can reference an existing RadialGauge instance via [jQuery.data()](http://api.jquery.com/jQuery.data/).
Once a reference has been established, you can use the [API](/api/dataviz/radialgauge#methods) to control its behavior.

### Accessing an existing RadialGauge instance

        // Put this after your Kendo RadialGauge for PHP render() call
        <script>
        $(function() {
            // Notice that the Name() of the radialGauge is used to get its client-side instance
            var gauge = $("#radialGauge").data("kendoRadialGauge");
            gauge.value(20);
        });
        </script>

