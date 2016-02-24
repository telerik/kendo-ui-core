---
title: Overview
page_title: Overview | Kendo UI Barcode
description: "Learn how to create and set a Kendo UI Barcode widget."
slug: overview_kendoui_barcode_widget
position: 1
---

# Barcode Overview

The [Kendo UI Barcode widget](http://demos.telerik.com/kendo-ui/barcode/index) is used to represent data in a machine-readable format. All graphics are rendered on the client using [Scalable Vector Graphics (SVG)](http://www.w3.org/Graphics/SVG/) with a fallback to [Vector Markup Language (VML)](https://en.wikipedia.org/wiki/Vector_Markup_Language) for legacy browsers.

## Getting Started

### Create the Barcode

Create the Kendo UI Barcode widget by using a simple HTML `div` and, optionally, set a height and width via CSS.

###### Example

    <div id="barcode"></div>

### Initialize the Barcode

Initialize the Barcode with its default configuration as demonstrated in the example below. Note that the default Encoding is `code39`.

###### Example

    $(document).ready(function() {
        $("#barcode").kendoBarcode({
            value:"FOO"
        });
    });

## Configuration

### Specify Barcode Type

The most important setting after providing its value is for you to choose the encoding type (symbology) as demonstrated in the example below.

For more information on what type of encoding to select, refer to the [article about encoding]({% slug encodings_kendoui_barcode_widget %}).

###### Example

    $(document).ready(function() {
        $("#barcode").kendoBarcode({
            value:"1234567",
            type:"ean8"
        });
    });

### Fine-Tune Color, Background, Padding Margin

To fine-tune the color, background, padding margin of the text and to find more Barcode configuration options, refer to the [Barcode API](/api/javascript/dataviz/ui/barcode).

## See Also

Other articles on Kendo UI Barcode:

* [Encodings]({% slug encodings_kendoui_barcode_widget %})
* [Overview of the ASP.NET MVC HtmlHelper Extension for the Barcode Widget](/aspnet-mvc/helpers/barcode/overview)
* [Overview of the Barcode JSP Tag]({% slug overview_barcode_uiforjsp %})
* [Overview of the Barcode PHP Class](/php/widgets/barcode/overview)
* [Barcode JavaScript API Reference](/api/javascript/dataviz/ui/barcode)
