---
title: Overview
page_title: How to use Barcode JSP tag | Kendo UI documentation
description: User Guide for server-side wrapper for Kendo UI Barcode for JSP.
---

# Barcode

The Barcode tag is a server-side wrapper for the [Kendo UI Barcode](/api/web/barcode) widget.

## Getting Started

Here is how to configure a simple Kendo UI Barcode:

1.  Make sure you have followed all the steps from the [Introduction](/jsp/introduction) help topic.

2.  Create a new action method to render the view:

        @RequestMapping(value = {"/", "/index"}, method = RequestMethod.GET)
        public String index() {
            return "/dataviz/barcode/index";
        }

3.  Add a barcode with the default [type](/api/web/barcode#configuration-type) (Code39):

        <kendo:barcode name="barcode" value="foo">
        </kendo:barcode>

4. Change the symbology to match your scenario:

        <kendo:barcode name="barcode" type="ean8" value="2346722">
        </kendo:barcode>


## Accessing an Existing Barcode

You can reference an existing Barcode instance via [jQuery.data()](http://api.jquery.com/jQuery.data/).
Once a reference has been established, you can use the [API](/api/web/barcode#methods) to control its behavior.

### Accessing an existing Barcode instance

        //Put this after your Kendo UI Barcode tag
        <script>
        $(function() {
            // Notice that the name of the barcode is used to get its client-side instance
            var barcode = $("#barcode").data("kendoBarcode");
            barcode.value("foo")
        });
        </script>
