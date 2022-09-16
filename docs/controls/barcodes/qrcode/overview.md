---
title: Overview
page_title: jQuery QRCode Documentation | QRCode Overview
description: "Get started with the jQuery QRCode by Kendo UI and learn how to create, initialize, and enable the widget."
slug: overview_kendoui_qrcode_widget
position: 1
---

# QRCode Overview

The QRCode generates [Canvas](https://en.wikipedia.org/wiki/Canvas_X) and [Scalable Vector Graphics (SVG)](https://en.wikipedia.org/wiki/Scalable_Vector_Graphics) images that represent [Quick Response (QR) codes](https://en.wikipedia.org/wiki/QR_code).

QR codes take a piece of information from a transitory media, place it into the cell phone, and enable the cell phone to quickly read these generated images. All graphics are rendered on the client by using Canvas or SVG.

* [Demo page for the QRCode](https://demos.telerik.com/kendo-ui/qrcode/index)

## Basic Configuration

To create a QRCode, use an HTML `div` element.

    <div id="qrcode"></div>

The following example demonstrates how to initialize the QRCode with its default configuration and a simple value.

    $("#qrcode").kendoQRCode({
        value: "FOO"
    });

The following example demonstrates how to specify the [error correction level](https://en.wikipedia.org/wiki/QR_code#Error_correction) and the size of the QRCode. To set the border, color, background, and encoding of the QRCode, use the [QRCode API](/api/javascript/dataviz/ui/qrcode).

    $("#qrcode").kendoQRCode({
        value: "Hello world!",
		errorCorrection: "M",
		size: 120 // The overall size (in pixels) of the QRCode side.
    });

## Functionality and Features

The QRCode supports a set of [encoding conventions]({% slug overview_kendoui_qrcode_widget %}).

## See Also

* [Basic Usage of the QRCode (Demo)](https://demos.telerik.com/kendo-ui/qrcode/index)
* [Using the API of the QRCode (Demo)](https://demos.telerik.com/kendo-ui/qrcode/api)
* [Knowledge Base Section](/knowledge-base)
* [JavaScript API Reference of the QRCode](/api/javascript/dataviz/ui/qrcode)
