---
title: Overview
page_title: How to use LinearGauge JSP tag | Kendo UI documentation
description: User Guide for server-side wrapper for Kendo UI LinearGauge for JSP.
---

# Linear Gauge

The LinearGauge tag is a server-side wrapper for the [Kendo UI DataViz LinearGauge](/api/dataviz/lineargauge) widget.

## Getting Started

Here is how to configure a simple Kendo UI LinearGauge:

1.  Make sure you have followed all the steps from the [Introduction](/jsp/introduction) help topic.

2.  Create a new action method to render the view:

        @RequestMapping(value = {"/", "/index"}, method = RequestMethod.GET)
        public String index() {
            return "/lineargauge/index";
        }

3.  Add a LinearGauge:

         <kendo:linearGauge name="gauge">
            <kendo:linearGauge-pointer value="10" />
            <kendo:linearGauge-scale min="0" max="100">
            </kendo:linearGauge-scale>
         </kendo:linearGauge>

## Accessing an Existing LinearGauge

You can reference an existing LinearGauge instance via [jQuery.data()](http://api.jquery.com/jQuery.data/).
Once a reference has been established, you can use the [API](/api/dataviz/lineargauge#methods) to control its behavior.

### Accessing an existing LinearGauge instance

        //Put this after your Kendo UI LinearGauge tag
        <script>
        $(function() {
        // Notice that the name of the linearGauge is used to get its client-side instance
            var gauge = $("#linearGauge").data("kendoLinearGauge");
            gauge.value(20);
        });
        </script>

