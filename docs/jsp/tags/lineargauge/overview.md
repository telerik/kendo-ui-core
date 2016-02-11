---
title: Overview
page_title: Overview | LinearGauge JSP Tag
description: "Get started with the LinearGauge JSP tag in Kendo UI."
slug: overview_lineargauge_uiforjsp
position: 1
---

# LinearGauge JSP Tag Overview

The LinearGauge tag is a server-side wrapper for the [Kendo UI LinearGauge](/api/javascript/dataviz/ui/lineargauge) widget.

## Getting Started

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI AutoComplete for binding to data, passed as a model attribute in Spring MVC.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for JSP]({% slug overview_uiforjsp %}).

**Step 2** Create a new action method to render the view.

###### Example

        @RequestMapping(value = {"/", "/index"}, method = RequestMethod.GET)
        public String index() {
            return "/lineargauge/index";
        }

**Step 3** Add the LinearGauge.

###### Example

         <kendo:linearGauge name="gauge">
            <kendo:linearGauge-pointer value="10" />
            <kendo:linearGauge-scale min="0" max="100">
            </kendo:linearGauge-scale>
         </kendo:linearGauge>

## Reference

### Existing Instances

You are able to reference an existing LinearGauge instance via the [`jQuery.data()`](http://api.jquery.com/jQuery.data/). Once a reference is established, you are able to use the [LinearGauge API](/api/javascript/dataviz/ui/lineargauge#methods) to control its behavior.

###### Example

        //Put this after your Kendo UI LinearGauge tag
        <script>
        $(function() {
        // Notice that the name of the linearGauge is used to get its client-side instance
            var gauge = $("#linearGauge").data("kendoLinearGauge");
            gauge.value(20);
        });
        </script>

## See Also

Other articles on Telerik UI for JSP and on the LinearGauge:

* [Overview of the Kendo UI LinearGauge Widget]({% slug overview_kendoui_lineargauge_widget %})
* [Telerik UI for JSP API Reference Folder](/api/jsp/autocomplete/animation)
* [Telerik UI for JSP Tags Folder]({% slug overview_autocomplete_uiforjsp %})
