---
title: Overview
page_title: Overview - QRCode JSP Tag
description: "Get started with the QRCode JSP tag in Kendo UI."
slug: overview_qrcode_uiforjsp
position: 1
---

# QRCode JSP Tag Overview

The QRCode JSP tag is a server-side wrapper for the [Kendo UI QRCode](/api/javascript/dataviz/ui/qrcode) widget.

## Getting Started

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI QRCode.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for JSP]({% slug overview_uiforjsp %}).

**Step 2** Create a new action method to render the view.



        @RequestMapping(value = {"/", "/index"}, method = RequestMethod.GET)
        public String index() {
            return "/dataviz/qrcode/index";
        }

**Step 3** Add a `qrcode` tag.



        <kendo:qRCode name="qrcode" value="foo" >
        </kendo:qRCode>

**Step 4** Choose the appropriate [error correction level](/api/javascript/dataviz/ui/qrcode/configuration/errorcorrection) and [encoding](/api/javascript/dataviz/ui/qrcode/configuration/encoding).



        <kendo:qRCode name="qrcode" value="foo" errorCorrection="H" encoding="UTF_8"  >
        </kendo:qRCode>

## Reference

### Existing Instances

You are able to reference an existing QRCode instance via [`jQuery.data()`](https://api.jquery.com/jQuery.data/). Once a reference is established, you are able to use the [QRCode API](/api/javascript/dataviz/ui/qrcode#methods) to control its behavior.



        //Put this after your Kendo QRCode tag
        <script>
        $(function() {
            // Notice that the name of the qrcode is used to get its client-side instance
            var qrcode = $("#qrcode").data("kendoQRCode");
            qrcode.value("bar");
        });
        </script>

## See Also

* [Overview of the Kendo UI QRCode Widget]({% slug overview_kendoui_qrcode_widget %})
* [Telerik UI for JSP API Reference Folder](/api/jsp/autocomplete/animation)
* [Telerik UI for JSP Tags Folder]({% slug overview_autocomplete_uiforjsp %})
