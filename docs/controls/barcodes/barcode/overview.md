---
title: Overview
page_title: jQuery Barcode Documentation | Barcode Overview
description: "Get started with the jQuery Barcode by Kendo UI and learn how to create, initialize, and enable the widget."
slug: overview_kendoui_barcode_widget
position: 1
---

# Barcode Overview

The Barcode represents data in a machine-readable format.

All graphics are rendered on the client by using [Scalable Vector Graphics (SVG)](https://www.w3.org/Graphics/SVG/).

* [Demo page for the Barcode](https://demos.telerik.com/kendo-ui/barcode/index)

## Basic Configuration

To create a Barcode, use an HTML `div` element and, optionally, use CSS to set its height and width.

<div id="barcode"></div>

The following example demonstrates how to initialize the Barcode with its default configuration. Its default encoding is `code39`.

    $(document).ready(function() {
        $("#barcode").kendoBarcode({
            value:"FOO"
        });
    });

After you provide the Barcode value, select the encoding type (symbology). For more information, refer to the [article on encoding]({% slug encodings_kendoui_barcode_widget %}). To set the color, background, and padding margin of the text, use the [Barcode API](/api/javascript/dataviz/ui/barcode).

    $(document).ready(function() {
        $("#barcode").kendoBarcode({
            value:"1234567",
            type:"ean8"
        });
    });

## Functionality and Features  

The Barcode supports a set of [encoding types]({% slug encodings_kendoui_barcode_widget %}).

## See Also

* [Basic Usage of the Barcode (Demo)](https://demos.telerik.com/kendo-ui/barcode/index)
* [Using the API of the Barcode (Demo)](https://demos.telerik.com/kendo-ui/barcode/api)
* [Knowledge Base Section](/knowledge-base)
* [JavaScript API Reference of the Barcode](/api/javascript/dataviz/ui/barcode)
