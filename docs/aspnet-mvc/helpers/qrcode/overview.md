---
title: Overview
page_title: How to use QRCode HtmlHelper extension | Kendo UI documentation
description: User Guide for server-side wrapper for Kendo UI QRCode for ASP.NET MVC widget.
---

# QRCode

The QRCode HtmlHelper extension is a server-side wrapper for the [Kendo UI QRCode](/api/web/qrcode) widget.

## Getting Started

Here is how to configure a simple Kendo QRCode:

1.  Make sure you have followed all the steps from the [Introduction](/aspnet-mvc/introduction) help topic.

2.  Create a new action method which renders the view:

        public ActionResult Index()
        {
            return View();
        }
3.  Add a qrcode:
    - WebForms

            <%: Html.Kendo().QRCode()
                    .Name("qrcode") // The name of the qrcode is mandatory. It specifies the "id" attribute of the widget.
                    .Value("#ff0000") // Set the value of the qrcode
            %>
    - Razor

            @(Html.Kendo().QRCode()
                  .Name("qrcode") // The name of the qrcode is mandatory. It specifies the "id" attribute of the widget.
                  .Value("#ff0000") // Set the value of the qrcode
            )
4. Choose the appropriate correction level, and/or encoding.
    - WebForms

            <%: Html.Kendo().QRCode()
                    .Name("qrcode")
                    .ErrorCorrection(QRErrorCorrectionLevel.H)
                    .Encoding(QREncoding.ISO_8859_1)
                    .Value("foo")
            %>
    - Razor

            @(Html.Kendo().QRCode()
                  .Name("qrcode")
                  .ErrorCorrection(QRErrorCorrectionLevel.H)
                  .Encoding(QREncoding.ISO_8859_1)
                  .Value("foo")
            )

## Accessing an Existing QRCode

You can reference an existing QRCode instance via [jQuery.data()](http://api.jquery.com/jQuery.data/).
Once a reference has been established, you can use the [API](/api/web/qrcode#methods) to control its behavior.


### Accessing an existing QRCode instance

    //Put this after your Kendo QRCode for ASP.NET MVC declaration
    <script>
    $(function() {
        // Notice that the Name() of the qrcode is used to get its client-side instance
        var qrcode = $("#qrcode").data("kendoQRCode");
    });
    </script>
