---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI QRCode component for {{ site.framework }}."
components: ["qrcode"]
previous_url: /helpers/barcodes/qrcode/overview
slug: overview_qrcodehelper_aspnetcore
position: 0
---

# {{ site.framework }} QRCode Overview

{% if site.core %}
The QRCode TagHelper and HtmlHelper for {{ site.framework }} are server-side wrappers for the Kendo UI QRCode widget. To add the component to your ASP.NET Core app, you can use either.
{% else %}
The Telerik UI QRCode HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI QRCode widget.
{% endif %}

QR codes take a piece of information from a transitory media, place it into the cell phone, and enable the cell phone to quickly read these generated images. All graphics are rendered on the client by using Canvas or SVG.

The QRCode generates [Canvas](https://en.wikipedia.org/wiki/Canvas_X) and [Scalable Vector Graphics (SVG)](https://en.wikipedia.org/wiki/Scalable_Vector_Graphics) images that represent [Quick Response (QR) codes](https://en.wikipedia.org/wiki/QR_code).

{% if site.has_cta_panels == true %}
{% include cta-panel-introduction.html %}
{% endif %}

To see the component in action, check the examples:

* [Demo page for the QRCode HtmlHelper](https://demos.telerik.com/{{ site.platform }}/qrcode/index)
{% if site.core %}
* [Demo page for the QRCode TagHelper](https://demos.telerik.com/{{ site.platform }}/qrcode/tag-helper)
{% endif %}

## Initializing the QRCode

The following example demonstrates how to define the QRCode.

```HtmlHelper
    @(Html.Kendo().QRCode()
      .Name("qrUrl")
    )
```
{% if site.core %}
```TagHelper
    <kendo-qrcode name="qrUrl"></kendo-qrcode>
```
{% endif %}


## Basic Configuration

To configure the QRCode, pass the configuration options as attributes, for example:

* The name of the QRCode is mandatory&mdash;it specifies the `id` and the `name` attributes of the QRCode element.
* The `Value()` option allows you to set the initial QRCode value.
* The error correction level allows you to control the density of the QRCode image. You can specify it by using the `ErrorCorrection()` method.

```HtmlHelper
    @(Html.Kendo().QRCode()
        .Name("qrUrl")
        .Value("https://docs.telerik.com/aspnet-core/introduction")
        .ErrorCorrection(QRErrorCorrectionLevel.M)
        .Size(150)
        .Border(border => border.Color("#AA11AA").Width(2))
    )
```
{% if site.core %}
```TagHelper
    <kendo-qrcode name="qrUrl" 
        value="https://docs.telerik.com/aspnet-core/introduction" 
        error-correction="QRErrorCorrectionLevel.M 
        size=" 150">
        <border color="#AA11AA" width="2" />
    </kendo-qrcode>
```
{% endif %}

## Functionality and Features

* [Encoding]({% slug encoding_qrcode_aspnetcore_helper %})&mdash;The QRCode supports a set of encoding conventions.
* [Types]({% slug types_qrcodehelper_aspnetcore %})&mdash;Explore the available types of overlay.

## Next Steps

* [Getting Started with the QRCode]({% slug qrcode_getting_started %})
* [Basic Usage of the QRCode HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/qrcode)
{% if site.core %}
* [Basic Usage of the QRCode TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/qrcode/tag-helper)
{% endif %}

## See Also

* [Using the API of the QRCode for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/qrcode/api)
* [Knowledge Base Section](/knowledge-base)