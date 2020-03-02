---
title: Encoding
page_title: Encoding
description: "Get started with the Telerik UI QRCode HtmlHelper for {{ site.framework }} and use its supported encoding conventions."
slug: encoding_qrcode_aspnetcore_helper
position: 2
---

# Encoding

The different types of QRCde values support different conventions accordingly.

In many cases, the value of the QRCode is processed by the device in a special way. For example, geolocations are displayed in the Global Positioning System (GPS) or Map application on the device, URLs are opened by the browser, and so on.

## URL

To encode the text of a URL, for example, https://www.telerik.com/, encode the `https://www.telerik.com/` URL text in the QRCode. Include the `http://` protocol to ensure it is recognized as a URL.

## Email Addresses

To encode an email address, for example, `kendo@telerik.com`, encode `kendo@telerik.com`. To ensure the value is recognized as an email address, create a proper `mailto` Uniform Resource Identifier (URI) from the address (`mailto:kendo@telerik.com`). As a result, readers can open a blank email message to the specified email destination.

## Telephone Numbers

To encode a telephone number, use a telephone URI to ensure that the digits are recognized as a telephone number and include prefixes which make the number internationally accessible. For example, to encode the `212-555-1212` US telephone number, encode `tel:+1-212-555-1212`. This telephone URI contains a `+1` prefix that makes it usable outside the United States. As a result, even though readers cannot automatically initiate a call, they can invoke the device dialer (if applicable) and pre-fill it with the specified number.

## Contact Information

To encode contact information as text, use the [vCard](https://en.wikipedia.org/wiki/VCard) format. This format is too verbose to use in 2D QRCodes whose information capacity is limited. It is not clear whether vCard is or has to be used to encode contact information. As a result, readers can open a new address book entry that is populated with the provided data and prompt the user to add a new contact.

## SMS

Similar to email addresses, to encode an SMS short code or number, create an SMS URI. For example, to create a link to the `12345` number, encode `sms:12345`. You may use other URI forms, such as `sms:number:subject`, and other prefixes, such as `smsto:`. As a result, readers can open a new SMS message that is ready for users to compose and send it.

## Geolocations

To encode a point on the earth, including altitude, use a geo URI. For example, to encode the Progress office in Bulgaria, encode `geo:42.65049,23.37925,100`. As a result, readers can either open a local mapping application to this location, such as [Google Maps](https://www.google.bg/maps/), and zoom accordingly, or a link to this location on a mapping website such as Google Maps in the web browser of the device.

## See Also

* [Basic Usage of the QRCode HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/qrcode/index)
* [Server-Side API](/api/qrcode)
