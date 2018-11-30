---
title: Overview
page_title: QRCode | Telerik UI for ASP.NET Core HtmlHelpers
description: "Learn the basics when working with the Kendo UI QRCode HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: overview_qrcodehelper_aspnetcore
position: 1
---

# QRCode HtmlHelper Overview

The QRCode HtmlHelper extension is a server-side wrapper for the [Kendo UI QRCode](https://demos.telerik.com/kendo-ui/qrcode/index) widget.

## Configuration

1. Add a QRCode.

    ###### Example

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

    ###### Example

    ```
        @(Html.Kendo().QRCode()
                  .Name("qrcode")
                  .ErrorCorrection(QRErrorCorrectionLevel.H)
                  .Encoding(QREncoding.ISO_8859_1)
                  .Value("foo")
        )
    ```

## Reference

### Existing Instances

To reference an existing Kendo UI QRCode instance, use the [`jQuery.data()`](https://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [QRCode API](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/qrcode#methods) to control its behavior.

###### Example

    //Put this after your Kendo UI QRCode for ASP.NET MVC declaration.
    <script>
        $(function() {
            //Notice that the Name() of the QRCode is used to get its client-side instance.
            var qrcode = $("#qrcode").data("kendoQRCode");
        });
    </script>

## See Also

* [Overview of the Kendo UI QRCode Widget](https://docs.telerik.com/kendo-ui/controls/barcodes/qrcode/overview)
* [UI for ASP.NET Core QRCode demos](https://demos.telerik.com/aspnet-core/qrcode)
