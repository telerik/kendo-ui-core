---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI QRCode component for {{ site.framework }}."
previous_url: /helpers/barcodes/qrcode/overview
slug: overview_qrcodehelper_aspnetcore
position: 1
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
```
{% if site.core %}
```TagHelper
    <kendo-qrcode name="qrUrl"></kendo-qrcode>
```
{% endif %}


### Basic Configuration

To configure the QRCode, pass the configuration options as attributes, for example:

* The name of the QRcode is mandatory&mdash;it specifies the "id" attribute of the widget.

* The value attribute allows you to set the initial value of the widget.

* The error correction level allows you to control the density of the QRcode image.

```HtmlHelper
    Html.Kendo().QRCode()
        .Name("qrUrl")
        .Value("https://docs.telerik.com/aspnet-core/introduction")
        .ErrorCorrection(QRErrorCorrectionLevel.M)
        .Size(150)
        .Border(border => border.Color("#AA11AA").Width(2))
    )
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

The QRCode supports a set of [encoding conventions]({% slug encoding_qrcode_aspnetcore_helper %}).

## Referencing Existing Instances

To reference an existing QRCode instance, use the [`jQuery.data()`](https://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [QRCode client-side API](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/qrcode#methods) to control its behavior.

    // Place the following after the declaration of the QRCode for {{ site.framework }}.
    <script>
        $(function() {
            // The Name() of the QRCode is used to get its client-side instance.
            var qrcode = $("#qrcode").data("kendoQRCode");
        });
    </script>

## See Also

* [Basic Usage of the QRCode component for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/qrcode/index)
* [Using the API of the QRCode component for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/qrcode/api)
* [Server-Side API](/api/qrcode)
