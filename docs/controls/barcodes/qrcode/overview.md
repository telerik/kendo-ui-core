---
title: Overview
page_title: Overview | Kendo UI QRCode
description: "Learn how to create and set the  Kendo UI QRCode widget."
slug: overview_kendoui_qrcode_widget
position: 1
---

# QRCode Overview

The [Kendo UI QRCode widget](http://demos.telerik.com/kendo-ui/qrcode/index) helps you easily generate [Canvas](https://en.wikipedia.org/wiki/Canvas_X) and [Scalable Vector Graphics (SVG)](https://en.wikipedia.org/wiki/Scalable_Vector_Graphics) images representing QR codes. QR is short for Quick Response, intended to signify that they can be read quickly by a cell phone. [QR codes](https://en.wikipedia.org/wiki/QR_code) are used to take a piece of information from a transitory media and put it in to your cell phone. All graphics are rendered on the client by using Canvas or SVG with a fallback to [Vector Markup Language (VML)](https://en.wikipedia.org/wiki/Vector_Markup_Language) for legacy browsers.

## Getting Started

### Create the QRCode

Create the Kendo UI QRCode widget from an existing `div` element, as demonstrated in the example below.

###### Example

    <div id="qrcode"></div>

### Initialize the QRCode

Initialize the QRCode with its default configuration and simple value, as demonstrated in the example below.

###### Example

    $("#qrcode").kendoQRCode({
        value: "FOO"
    });

## Configuration

### Specify Error Correction Level and Size

Specify the [error correction level](http://en.wikipedia.org/wiki/QR_code#Error_correction) and size of the QRCode widget as demonstrated in the example below.

###### Example

    $("#qrcode").kendoQRCode({
        value: "Hello world!",
		errorCorrection: "M",
		size: 120 // the overall size of the side of the Barcode in pixels
    });

### Set Border, Color, Background, and Encoding

To set up the border, color, background, and encoding of the Kendo UI QRCode, refer to its methods and configuration options in the [QRCode API](/api/javascript/dataviz/ui/qrcode).

## General Conventions

There are several conventions for the different types of values in a QR code. In many cases the value of the widget is processed by the device in a special way. For example, geolocations are displayed in the Global Positioning System (GPS) or Map application on the device, URLs are opened by the browser, etc.

### URL

The most common application of barcodes is to encode the text of URL such as http://www.telerik.com/. To do so, encode the `http://www.telerik.com/` URL text in the barcode. Include the protocol&mdash;`http://` in the example&mdash;to ensure it is recognized as a URL.

### Email Address

To encode an email address, such as `kendo@telerik.com`, encode `kendo@telerik.com`. To ensure it is recognized as an email address, it is advisable that you create a proper `mailto` Uniform Resource Identifier (URI) from the address&mdash;`mailto:kendo@telerik.com`.

As a result, readers are able to open a blank email message to the given address.

### Telephone Numbers

A telephone URI should be used to encode a telephone number, to ensure that the digits are understood as a telephone number. Further, it is advisable to include prefixes that make the number internationally accessible. For example, to encode the `212-555-1212` US phone number, encode `tel:+1-212-555-1212`. This telephone URI includes a `+1` prefix that makes it usable outside the United States.

As a result, readers are able to invoke the device's dialer, if applicable, and pre-fill it with the given number, but not automatically initiate a call.

### Contact Information

You can use the [vCard](http://en.wikipedia.org/wiki/VCard) format for encoding contact information as text. This format proves a bit verbose for use in 2D barcodes, whose information capacity is limited. It is not clear whether vCard is or should be used to encode contact information.

As a result, readers are able to open a new address book entry, populated with the given data, and prompt the user to add a new contact.

### SMS

Much like an email address, encode an SMS shortcode or number by creating an sms URI. For example, to create a link to the `12345` number, encode `sms:12345`. Some developers use other URI forms, such as `sms:number:subject`, and other prefixes, such as `smsto:`.

As a result, readers are able to open a new SMS message that is ready for users to compose and send it.

### Geolocation

A geo URI may be used to encode a point on the earth, including altitude. For example, to encode the Telerik's Bulgarian office, encode `geo:42.65049,23.37925,100`.

As a result, readers are able to either open a local mapping application, such as [Google Maps](https://www.google.bg/maps/), to this location and zoom accordingly, or a link to this location on a mapping website like Google Maps in the web browser of the device.

## See Also

Other articles on Kendo UI QRCode:

* [Overview of the ASP.NET MVC HtmlHelper Extension for the QRCode Widget](/aspnet-mvc/helpers/qrcode/overview)
* [Overview of the QRCode JSP Tag]({% slug overview_qrcode_uiforjsp %})
* [Overview of the QRCode PHP Class](/php/widgets/qrcode/overview)
* [QRCode JavaScript API Reference](/api/javascript/dataviz/ui/qrcode)
