---
title: Overview
page_title: Documentation Guide for Kendo UI QRCode widget
description: How to create and set a QRCode widget in Kendo UI DataViz.
---

# QRCode Overview
QRCode widget helps you easily generate canvas/svg image representing a QRCode. QR is short for Quick Response (they can be read quickly by a cell phone). 
They are used to take a piece of information from a transitory media and put it in to your cell phone.
All graphics are rendered on the client using Canvas/SVG with a fallback to VML for legacy browsers.


## Getting started

### Creating a **QRCode** from existing HTML DIV element

    <div id="qrcode"></div>

### Initialize the Kendo UI QRCode with default configuration and simple value.

    $("#qrcode").kendoQRCode({
        value: "FOO"
    });

### Specifying [error correction level](http://en.wikipedia.org/wiki/QR_code#Error_correction) and the size.

    $("#qrcode").kendoQRCode({
        value: "Hello world!",
		errorCorrection: "M", 
		size: 120 // the overall size of the side of the Barcode in pixels
    });

## General conventions for the different types of values

In many cases the value of the widget is processed by the device in a special way, for example Geo Locations are displayed on the GPS/Map application on the device, URLs are opened with the browser and so on.

#### URL

The most common application of barcodes is to encode the text of URL such as http://www.telerik.com/. To do so, simply encode exactly the text of the URL in the barcode: "http://www.telerik.com/". Include the protocol ("http://", here) to ensure it is recognized as a URL.

#### E-mail address

To encode an e-mail address like kendo@telerik.com, one could simply encode "kendo@telerik.com". However to ensure it is recognized as an e-mail address, it is advisable to create a proper mailto URI from the address: "mailto:kendo@telerik.com".

Readers should open a blank e-mail message to the given address.

#### Telephone numbers

A tel URI should be used to encode a telephone number, to ensure that the digits are understood as a telephone number. Further, it is advisable to include prefixes that make the number accessible internationally. For example, to encode the US phone number 212-555-1212, one should encode "tel:+1-212-555-1212". This tel URI includes a "+1" prefix that will make it usable outside the United States.

Readers should invoke the device's dialer, if applicable, and pre-fill it with the given number, but not automatically initiate a call.

#### Contact information
You can use the [vCard](http://en.wikipedia.org/wiki/VCard) format for encoding contact information as text. This format proves a bit verbose for use in 2D barcodes, whose information capacity is limited. It is not clear whether vCard is or should be used to encode contact information.

Readers should open a new address book entry, populated with the given data, and prompt the user to add a new contact.

#### SMS

Much like an e-mail address, one can encode an SMS shortcode or number by creating an sms URI. For example to create a link to the number "12345" one would encode "sms:12345". 

We have heard of URIs of the form "sms:number:subject", and likewise for other prefixes like "smsto:".

Readers should open a new SMS message, ready for the user to compose and send it.

### Geolocation / Geographic information

A geo URI may be used to encode a point on the earth, including altitude. For example, to encode the Telerik's Bulgarian office, one would encode "geo:42.65049,23.37925,100".

A reader might open a local mapping application like Google Maps to this location and zoom accordingly, or could open a link to this location on a mapping web site like Google Maps in the device's web browser.

### Configure the border, color, background, encoding.

Refer to the complete [API reference](/api/dataviz/qrcode) for examples and complete list of settings/methods that the QRCode provides.
