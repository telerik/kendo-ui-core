---
title: Overview
page_title: Overview | Barcode JSP Tag
description: "Get started with the Barcode JSP tag in Kendo UI."
slug: overview_barcode_uiforjsp
position: 1
---

# Barcode JSP Tag Overview

The Barcode JSP tag is a server-side wrapper for the [Kendo UI Barcode](/api/javascript/dataviz/ui/barcode) widget.

## Getting Started

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI Barcode.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for JSP]({% slug overview_uiforjsp %}).

**Step 2** Create a new action method to render the view.

###### Example

        @RequestMapping(value = {"/", "/index"}, method = RequestMethod.GET)
        public String index() {
            return "/dataviz/barcode/index";
        }

**Step 3** Add a barcode with the default [`type`](/api/javascript/dataviz/ui/barcode#configuration-type) (Code39).

###### Example

        <kendo:barcode name="barcode" value="foo">
        </kendo:barcode>

**Step 4** Change the symbology to match your scenario.

###### Example

        <kendo:barcode name="barcode" type="ean8" value="2346722">
        </kendo:barcode>


## Reference

### Existing Instances

You are able to reference an existing Barcode instance via [`jQuery.data()`](http://api.jquery.com/jQuery.data/). Once a reference is established, you are able to use the [Barcode API](/api/javascript/dataviz/ui/barcode#methods) to control its behavior.

###### Example

        //Put this after your Kendo UI Barcode tag
        <script>
        $(function() {
            // Notice that the name of the barcode is used to get its client-side instance
            var barcode = $("#barcode").data("kendoBarcode");
            barcode.value("foo")
        });
        </script>

## See Also

Other articles on Telerik UI for JSP and on the Barcode:

* [Overview of the Kendo UI Barcode Widget]({% slug overview_kendoui_barcode_widget %})
* [Telerik UI for JSP API Reference Folder](/api/jsp/autocomplete/animation)
* [Telerik UI for JSP Tags Folder]({% slug overview_autocomplete_uiforjsp %})
