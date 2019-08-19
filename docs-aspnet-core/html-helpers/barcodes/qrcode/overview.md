---
title: Overview
page_title: QRCode Overview | Telerik UI for ASP.NET Core HTML Helpers
description: "Learn the basics when working with the Telerik UI QRCode HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: overview_qrcodehelper_aspnetcore
position: 1
---

# QRCode HtmlHelper Overview

The Telerik UI QRCode HtmlHelper for ASP.NET Core is a server-side wrapper for the Kendo UI QRCode widget.

The QRCode generates Canvas and Scalable Vector Graphics (SVG) images that represent Quick Response (QR) codes.

* [Demo page for the QRCode](https://demos.telerik.com/aspnet-core/qrcode/index)

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

## Referencing Existing Instances

To reference an existing QRCode instance, use the [`jQuery.data()`](https://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [QRCode API](/api/qrcode) to control its behavior.

    // Place the following after the declaration of the QRCode for ASP.NET Core.
    <script>
        $(function() {
            // The Name() of the QRCode is used to get its client-side instance.
            var qrcode = $("#qrcode").data("kendoQRCode");
        });
    </script>

## See Also

* [Basic Usage of the QRCode HtmlHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/qrcode/index)
* [Using the API of the QRCode HtmlHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/qrcode/api)
* [API Reference of the QRCode HtmlHelper for ASP.NET Core](/api/qrcode)
