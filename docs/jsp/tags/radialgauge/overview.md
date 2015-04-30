---
title: Overview
page_title: How to use RadialGauge JSP tag | Kendo UI documentation
description: User Guide for server-side wrapper for Kendo UI RadialGauge for JSP.
---

# Radial Gauge

The RadialGauge tag is a server-side wrapper for the [Kendo UI DataViz RadialGauge](/api/dataviz/radialgauge) widget.

## Getting Started

Here is how to configure a simple Kendo UI RadialGauge:

1.  Make sure you have followed all the steps from the [Introduction](/jsp/introduction) help topic.

2.  Create a new action method to render the view:

        @RequestMapping(value = {"/", "/index"}, method = RequestMethod.GET)
        public String index() {
            return "/radialgauge/index";
        }

3.  Add a RadialGauge:

         <kendo:radialGauge name="gauge">
            <kendo:radialGauge-pointer value="10" />
            <kendo:radialGauge-scale min="0" max="100" />
         </kendo:radialGauge>

## Accessing an Existing Radial Gauge

You can reference an existing RadialGauge instance via [jQuery.data()](http://api.jquery.com/jQuery.data/).
Once a reference has been established, you can use the [API](/api/dataviz/radialgauge#methods) to control its behavior.

### Accessing an existing RadialGauge instance

        //Put this after your Kendo UI RadialGauge tag
        <script>
        $(function() {
            // Notice that the name of the radialGauge is used to get its client-side instance
            var gauge = $("#radialGauge").data("kendoRadialGauge");
            gauge.value(20);
        });
        </script>

