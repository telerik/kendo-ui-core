---
title: Overview
page_title: QRCode Overview | Telerik UI for ASP.NET MVC HTML Helpers
description: "Learn the basics when working with the Telerik UI QRBarcode HtmlHelper for ASP.NET MVC."
slug: overview_qrcodehelper_aspnetmvc
position: 1
---

# QRCode HtmlHelper Overview

The Telerik UI QRCode HtmlHelper for ASP.NET MVC is a server-side wrapper for the Kendo UI QRCode widget.

The QRCode generates Canvas and Scalable Vector Graphics (SVG) images that represent Quick Response (QR) codes.

* [Demo page for the QRCode](https://demos.telerik.com/aspnet-mvc/qrcode/index)

## Basic Configuration

1. Make sure you followed all the steps from the [introductory article on Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %}).
1. Create a new action method which renders the view.

        public ActionResult Index()
        {
            return View();
        }

1. Add a QRCode.

    ```ASPX
        <%: Html.Kendo().QRCode()
            .Name("qrcode") // The name of the QRCode is mandatory. It specifies the "id" attribute of the widget.
            .Value("#ff0000") // Set the value of the QRCode.
        %>
    ```
    ```Razor
        @(Html.Kendo().QRCode()
            .Name("qrcode") // The name of the QRCode is mandatory. It specifies the "id" attribute of the widget.
            .Value("#ff0000") // Set the value of the QRCode.
        )
    ```

1. Choose the appropriate correction level and/or encoding.

    ```ASPX
        <%: Html.Kendo().QRCode()
            .Name("qrcode")
            .ErrorCorrection(QRErrorCorrectionLevel.H)
            .Encoding(QREncoding.ISO_8859_1)
            .Value("foo")
        %>
    ```
    ```Razor
        @(Html.Kendo().QRCode()
            .Name("qrcode")
            .ErrorCorrection(QRErrorCorrectionLevel.H)
            .Encoding(QREncoding.ISO_8859_1)
            .Value("foo")
        )
    ```

## Referencing Existing Instances

To reference an existing QRCode instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [QRCode client-side API](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/qrcode) to control its behavior.

    // Place the following after the declaration of the QRCode for ASP.NET MVC.
    <script>
        $(function() {
            // The Name() of the QRCode is used to get its client-side instance.
            var qrcode = $("#qrcode").data("kendoQRCode");
        });
    </script>

## See Also

* [Basic Usage of the QRCode HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/qrcode/index)
* [Using the API of the QRCode HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/qrcode/api)
* [Server-Side API](/api/qrcode)
