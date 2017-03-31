---
title: Overview
page_title: Overview | Kendo UI Barcode
description: "Learn how to create and set a Kendo UI Barcode widget."
slug: overview_kendoui_barcode_widget
position: 1
---

# Barcode Overview

The [Kendo UI Barcode widget](http://demos.telerik.com/kendo-ui/barcode/index) is used to represent data in a machine-readable format.

All graphics are rendered on the client by using [Scalable Vector Graphics (SVG)](http://www.w3.org/Graphics/SVG/).

## Getting Started

### Create the Barcode

To create the Barcode, use an HTML `div` element and, optionally, set a height and width via CSS.

###### Example

    <div id="barcode"></div>

### Initialize the Barcode

To initialize the Barcode with its default configuration, use the following example. The default encoding is `code39`.

###### Example

    $(document).ready(function() {
        $("#barcode").kendoBarcode({
            value:"FOO"
        });
    });

## Configuration

### Specifying the Type

After you provide the Barcode value, select the encoding type (symbology) as demonstrated in the following example. For more information on what type of encoding to select, refer to the [article about encoding]({% slug encodings_kendoui_barcode_widget %}).

###### Example

    $(document).ready(function() {
        $("#barcode").kendoBarcode({
            value:"1234567",
            type:"ean8"
        });
    });

### Styling the Appearance

To fine-tune the color, background, and padding margin of the text, refer to the [Barcode API](/api/javascript/dataviz/ui/barcode).

## See Also

* [Encodings]({% slug encodings_kendoui_barcode_widget %})
* [Overview of the ASP.NET MVC HtmlHelper Extension for the Barcode Widget](/aspnet-mvc/helpers/barcode/overview)
* [Overview of the Barcode JSP Tag]({% slug overview_barcode_uiforjsp %})
* [Overview of the Barcode PHP Class](/php/widgets/barcode/overview)
* [Barcode JavaScript API Reference](/api/javascript/dataviz/ui/barcode)
