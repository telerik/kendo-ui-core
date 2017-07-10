---
title: Overview
page_title: Overview | Kendo UI QRCode
description: "Learn how to create and set the  Kendo UI QRCode widget."
slug: overview_kendoui_qrcode_widget
position: 1
---

# QRCode Overview

The [Kendo UI QRCode widget](http://demos.telerik.com/kendo-ui/qrcode/index) helps you easily generate [Canvas](https://en.wikipedia.org/wiki/Canvas_X) and [Scalable Vector Graphics (SVG)](https://en.wikipedia.org/wiki/Scalable_Vector_Graphics) images that represent QR (Quick Response) codes.

QR signifies that these images can be quickly read by a cell phone. [QR codes](https://en.wikipedia.org/wiki/QR_code) are used to take a piece of information from a transitory media and put it into your cell phone. All graphics are rendered on the client by using Canvas or SVG.

## Getting Started

### Create the QRCode

To create the Kendo UI QRCode from an existing `div` element, use the following example.

###### Example

    <div id="qrcode"></div>

### Initialize the QRCode

To initialize the QRCode with its default configuration and simple value, use the following example.

###### Example

    $("#qrcode").kendoQRCode({
        value: "FOO"
    });

## Configuration

### Specify Error Correction Level and Size

The following example demonstrates how to specify the [error correction level](http://en.wikipedia.org/wiki/QR_code#Error_correction) and size of the QRCode.

###### Example

    $("#qrcode").kendoQRCode({
        value: "Hello world!",
		errorCorrection: "M",
		size: 120 // the overall size of the side of the Barcode in pixels
    });

### Set Border, Color, Background, and Encoding

To set up the border, color, background, and encoding of the Kendo UI QRCode, refer to its methods and configuration options in the [QRCode API documentation](/api/javascript/dataviz/ui/qrcode).

## General Conventions

The different types of QR code values support different conventions accordingly. In many cases the value of the widget is processed by the device in a special way. For example, geolocations are displayed in the Global Positioning System (GPS) or Map application on the device, URLs are opened by the browser, and so on.

### URLs

The most common application of barcodes is to encode the text of URL such as http://www.telerik.com/. To achieve this behavior, encode the `http://www.telerik.com/` URL text in the barcode. Include the protocol&mdash;`http://` in the example&mdash;to ensure it is recognized as a URL.

### Email Addresses

To encode an email address, such as `kendo@telerik.com`, encode `kendo@telerik.com`. To ensure it is recognized as an email address, create a proper `mailto` Uniform Resource Identifier (URI) from the address&mdash;`mailto:kendo@telerik.com`. As a result, readers are able to open a blank email message to the given address.

### Telephone Numbers

To encode a telephone number, use a telephone URI to ensure that the digits are understood as a telephone number. It is recommended that you include prefixes which make the number internationally accessible. For example, to encode the `212-555-1212` US phone number, encode `tel:+1-212-555-1212`. This telephone URI includes a `+1` prefix that makes it usable outside the United States. As a result, though readers cannot automatically initiate a call, they are able to invoke the device's dialer (if applicable) and pre-fill it with the given number.

### Contact Information

You can use the [vCard](http://en.wikipedia.org/wiki/VCard) format for encoding contact information as text. This format is too verbose to use in 2D barcodes whose information capacity is limited. It is not clear whether vCard is or should be used to encode contact information. As a result, readers are able to open a new address book entry that is populated with the given data and prompt the user to add a new contact.

### SMSs

Much like an email address, to encode an SMS shortcode or number, create an SMS URI. For example, to create a link to the `12345` number, encode `sms:12345`. Some developers use other URI forms, such as `sms:number:subject`, and other prefixes, such as `smsto:`. As a result, readers are able to open a new SMS message that is ready for users to compose and send it.

### Geolocations

A geo URI may be used to encode a point on the earth, including altitude. For example, to encode the Telerik's Bulgarian office, encode `geo:42.65049,23.37925,100`. As a result, readers are able to either open a local mapping application to this location and zoom accordingly, such as [Google Maps](https://www.google.bg/maps/), or a link to this location on a mapping website like Google Maps in the web browser of the device.

## See Also

* [Overview of the ASP.NET MVC HtmlHelper Extension for the QRCode Widget](/aspnet-mvc/helpers/qrcode/overview)
* [Overview of the QRCode JSP Tag]({% slug overview_qrcode_uiforjsp %})
* [Overview of the QRCode PHP Class](/php/widgets/qrcode/overview)
* [QRCode JavaScript API Reference](/api/javascript/dataviz/ui/qrcode)
