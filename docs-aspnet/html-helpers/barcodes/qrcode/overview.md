---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI QRCode HtmlHelper for {{ site.framework }}."
previous_url: /helpers/barcodes/qrcode/overview
slug: overview_qrcodehelper_aspnetcore
position: 1
---

# QRCode HtmlHelper Overview

The Telerik UI QRCode HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI QRCode widget.

The QRCode generates [Canvas](https://en.wikipedia.org/wiki/Canvas_X) and [Scalable Vector Graphics (SVG)](https://en.wikipedia.org/wiki/Scalable_Vector_Graphics) images that represent [Quick Response (QR) codes](https://en.wikipedia.org/wiki/QR_code).

QR codes take a piece of information from a transitory media, place it into the cell phone, and enable the cell phone to quickly read these generated images. All graphics are rendered on the client by using Canvas or SVG.

* [Demo page for the QRCode](https://demos.telerik.com/{{ site.platform }}/qrcode/index)

## Initializing the QRCode

1. Add the QRCode.

    ```
        @(Html.Kendo().QRCode()
            .Name("qrMail") // The name of the QRcode is mandatory. It specifies the "id" attribute of the widget.
            .Value("mailto:clientservice@telerik.com") // Set the value of the QRCode.
            .Color("#e15613")
            .Background("transparent")
            .Size(120)
         )
    ```

1. Select the appropriate correction level and encoding (symbology).

    ```
        @(Html.Kendo().QRCode()
                  .Name("qrcode")
                  .ErrorCorrection(QRErrorCorrectionLevel.H)
                  .Encoding(QREncoding.ISO_8859_1)
                  .Value("foo")
        )
    ```

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

* [Basic Usage of the QRCode HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/qrcode/index)
* [Using the API of the QRCode HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/qrcode/api)
* [Server-Side API](/api/qrcode)
