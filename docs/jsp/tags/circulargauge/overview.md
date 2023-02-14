---
title: Overview
page_title: Overview - CircularGauge JSP Tag
description: "Get started with the CircularGauge JSP tag in Kendo UI."
slug: overview_circulargauge_uiforjsp
position: 1
---

# CircularGauge JSP Tag Overview

The CircularGauge tag is a server-side wrapper for the [Kendo UI CircularGauge](/api/javascript/dataviz/ui/circulargauge) widget.

## Getting Started

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI AutoComplete for binding to data, passed as a model attribute in Spring MVC.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for JSP](https://docs.telerik.com/kendo-ui/jsp/introduction).

**Step 2** Create a new action method to render the view.



        @RequestMapping(value = {"/", "/index"}, method = RequestMethod.GET)
        public String index() {
            return "/circulargauge/index";
        }

**Step 3** Add the CircularGauge.



         <kendo:circularGauge name="gauge">
            <kendo:circularGauge-scale min="0" max="100">
            </kendo:circularGauge-scale>
         </kendo:circularGauge>

## Reference

### Existing Instances

You are able to reference an existing CircularGauge instance via the [`jQuery.data()`](https://api.jquery.com/jQuery.data/). Once a reference is established, you are able to use the [CircularGauge API](/api/javascript/dataviz/ui/circulargauge#methods) to control its behavior.



        //Put this after your Kendo UI CircularGauge tag
        <script>
        $(function() {
        // Notice that the name of the circularGauge is used to get its client-side instance
            var gauge = $("#circularGauge").data("kendoCircularGauge");
            gauge.value(20);
        });
        </script>

## See Also

* [Overview of the Kendo UI CircularGauge Widget](https://docs.telerik.com/kendo-ui/jsp/tags/circulargauge/overview)
* [Telerik UI for JSP API Reference Folder](/api/jsp/circulargauge/animation)
