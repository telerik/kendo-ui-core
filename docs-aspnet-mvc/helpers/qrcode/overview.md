---
title: Overview
page_title: Overview | Kendo UI QRCode HtmlHelper
description: "Get started with the server-side wrapper for the Kendo UI QRCode widget for ASP.NET MVC."
slug: overview_qrcodehelper_aspnetmvc
position: 1
---

# QRCode HtmlHelper Overview

The QRCode HtmlHelper extension is a server-side wrapper for the [Kendo UI QRCode](https://demos.telerik.com/kendo-ui/qrcode/index) widget.

## Configuration

Below are listed the steps for you to follow when configuring the Kendo UI QRCode.

1. Make sure you followed all the steps from the [introductory article on Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %}).

1. Create a new action method which renders the view.

    ###### Example

            public ActionResult Index()
            {
                return View();
            }

1. Add a QRCode.

    ###### Example

    ```tab-ASPX

            <%: Html.Kendo().QRCode()
            .Name("qrcode") //The name of the QRCode is mandatory. It specifies the "id" attribute of the widget.
            .Value("#ff0000") //Set the value of the QRCode.
            %>
    ```
    ```tab-Razor

            @(Html.Kendo().QRCode()
                  .Name("qrcode") //The name of the QRCode is mandatory. It specifies the "id" attribute of the widget.
                  .Value("#ff0000") //Set the value of the QRCode.
            )
    ```

1. Choose the appropriate correction level and/or encoding.

    ###### Example

    ```tab-ASPX

            <%: Html.Kendo().QRCode()
                    .Name("qrcode")
                    .ErrorCorrection(QRErrorCorrectionLevel.H)
                    .Encoding(QREncoding.ISO_8859_1)
                    .Value("foo")
            %>
    ```
    ```tab-Razor

            @(Html.Kendo().QRCode()
                  .Name("qrcode")
                  .ErrorCorrection(QRErrorCorrectionLevel.H)
                  .Encoding(QREncoding.ISO_8859_1)
                  .Value("foo")
            )
    ```

## Reference

### Existing Instances

To reference an existing Kendo UI QRCode instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [QRCode API](../../../kendo-ui/api/javascript/dataviz/ui/qrcode#methods) to control its behavior.

###### Example

      //Put this after your Kendo QRCode for ASP.NET MVC declaration.
      <script>
      $(function() {
          //Notice that the Name() of the QRCode is used to get its client-side instance.
          var qrcode = $("#qrcode").data("kendoQRCode");
      });
      </script>

## See Also

* [ASP.NET MVC API Reference: QRCodeBuilder](/api/Kendo.Mvc.UI.Fluent/QRCodeBuilder)
* [Overview of Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %})
* [Fundamentals of Telerik UI for ASP.NET MVC]({% slug fundamentals_aspnetmvc %})
* [Scaffolding in Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Overview of the Kendo UI QRCode Widget](http://docs.telerik.com/kendo-ui/controls/barcodes/qrcode/overview)
* [Telerik UI for ASP.NET MVC API Reference Folder](/api/Kendo.Mvc/AggregateFunction)
* [Telerik UI for ASP.NET MVC HtmlHelpers Folder]({% slug overview_autocompletehelper_aspnetmvc %})
* [Tutorials on Telerik UI for ASP.NET MVC]({% slug overview_timeefficiencyapp_aspnetmvc6 %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})
