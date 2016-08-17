---
title: Overview
page_title: Overview | QRCode PHP Class
description: "Get started with the QRCode PHP class in Kendo UI."
slug: overview_qrcode_uiforphp
position: 1
---

# QRCode PHP Class Overview

The Kendo UI QRCode for PHP is a server-side wrapper for the [Kendo UI QRCode](/api/javascript/dataviz/ui/qrcode) widget.

## Getting Started

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI QRCode for PHP.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for PHP]({% slug overview_uiforphp %})&mdash;include the autoloader, JavaScript, and CSS files.

**Step 2** Add a [QRCode](/api/php/Kendo/Dataviz/UI/QRCode).

###### Example

        $qrcode = new \Kendo\Dataviz\UI\QRCode('qrcode');
        $qrcode->value("foo");

**Step 3** Choose the appropriate [error correction level](/api/javascript/dataviz/ui/qrcode#configuration-errorCorrection) and [encoding](/api/javascript/dataviz/ui/qrcode#configuration-encoding).

###### Example

        $qrcode = new \Kendo\Dataviz\UI\QRCode('qrcode');
        $qrcode->value("foo")
               ->errorCorrection("H")
               ->encoding("UTF_8");

**Step 4** Output the QRCode by echoing the result of the `render` method.

###### Example

        echo $qrcode->render();

## Reference

### Client-Side Instances

You are able to reference an existing QRCode instance via the [`jQuery.data()`](http://api.jquery.com/jQuery.data/). Once a reference is established, use the [QRCode API](/api/javascript/dataviz/ui/qrcode#methods) to control its behavior.

###### Example

        //Put this after your Kendo QRCode for PHP render() call
        <script>
        $(function() {
            // Notice that the Name() of the qrcode is used to get its client-side instance
            var qrcode = $("#qrcode").data("kendoQRCode");
        });
        </script>

## See Also

Other articles on Telerik UI for PHP and on the QRCode:

* [Overview of the Kendo UI QRCode Widget]({% slug overview_kendoui_qrcode_widget %})
* [Telerik UI for PHP API Reference Folder](/api/php/Kendo/UI/AutoComplete)
* [Telerik UI for PHP Classes Folder]({% slug overview_autocomplete_uiforphp %})
