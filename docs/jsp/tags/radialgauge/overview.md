---
title: Overview
page_title: Overview | Radial Gauge JSP Tag
description: "Get started with the Radial Gauge JSP tag in Kendo UI."
slug: overview_radialgauge_uiforjsp
position: 1
---

# Radial Gauge JSP Tag Overview

The Radial Gauge JSP tag is a server-side wrapper for the [Kendo UI RadialGauge](/api/javascript/dataviz/ui/radialgauge) widget.

## Getting Started

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI Radial Gauge.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for JSP]({% slug overview_uiforjsp %}).

**Step 2** Create a new action method to render the view.

###### Example

        @RequestMapping(value = {"/", "/index"}, method = RequestMethod.GET)
        public String index() {
            return "/radialgauge/index";
        }

**Step 3** Add a `radialGauge` tag.

###### Example

         <kendo:radialGauge name="gauge">
            <kendo:radialGauge-pointer value="10" />
            <kendo:radialGauge-scale min="0" max="100" />
         </kendo:radialGauge>

## Reference

### Existing Instances

You are able to reference an existing Radial Gauge instance via [`jQuery.data()`](http://api.jquery.com/jQuery.data/). Once a reference is established, you are able to use the [Radial Gauge API](/api/javascript/dataviz/ui/radialgauge#methods) to control its behavior.

###### Example

        //Put this after your Kendo UI RadialGauge tag
        <script>
        $(function() {
            // Notice that the name of the radialGauge is used to get its client-side instance
            var gauge = $("#radialGauge").data("kendoRadialGauge");
            gauge.value(20);
        });
        </script>

## See Also

Other articles on Telerik UI for JSP and on the Radial Gauge:

* [Overview of the Kendo UI Radial Gauge Widget]({% slug overview_kendoui_radialgaugewidget %})
* [Telerik UI for JSP API Reference Folder](/api/jsp/autocomplete/animation)
* [Telerik UI for JSP Tags Folder]({% slug overview_autocomplete_uiforjsp %})
