---
title: Overview
page_title: QRCode Overview | Telerik UI for ASP.NET Core HtmlHelpers
description: "Learn the basics when working with the Kendo UI QRCode HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: overview_qrcodehelper_aspnetcore
position: 1
---

# QRCode HtmlHelper Overview

The Kendo UI QRCode generates Canvas and Scalable Vector Graphics (SVG) images that represent QR (Quick Response) codes.

The QRCode HtmlHelper extension is a server-side wrapper for the [Kendo UI QRCode](https://demos.telerik.com/kendo-ui/qrcode/index) widget. For more information on the QRCode HtmlHelper for ASP.NET MVC, refer to the [UI for ASP.NET MVC documentation](https://docs.telerik.com/aspnet-mvc/helpers/qrcode/overview).

## Initializing the QRCode

1. Add a QRCode.

    ```
        @(Html.Kendo().QRCode()
            .Name("qrMail") //The name of the QRcode is mandatory. It specifies the "id" attribute of the widget.
            .Value("mailto:clientservice@telerik.com") // Set the value of the QRCode.
            .Color("#e15613")
            .Background("transparent")
            .Size(120)
         )
    ```

1. Choose the appropriate correction level and/or encoding.

    ```
        @(Html.Kendo().QRCode()
                  .Name("qrcode")
                  .ErrorCorrection(QRErrorCorrectionLevel.H)
                  .Encoding(QREncoding.ISO_8859_1)
                  .Value("foo")
        )
    ```

## Referencing Existing Instances

To reference an existing Kendo UI QRCode instance, use the [`jQuery.data()`](https://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [QRCode API](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/qrcode#methods) to control its behavior.

    // Place the following after the declaration of the QRCode for ASP.NET Core.
    <script>
        $(function() {
            // The Name() of the QRCode is used to get its client-side instance.
            var qrcode = $("#qrcode").data("kendoQRCode");
        });
    </script>

## See Also

* [Basic Usage of the QRCode HtmlHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/qrcode/index)
* [Basic Usage of the Kendo UI QRCode Widget (Demo)](https://demos.telerik.com/kendo-ui/qrcode/index)
* [Using the API of the QRCode HtmlHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/qrcode/api)
* [JavaScript API Reference of the Kendo UI QRCode](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/qrcode)
