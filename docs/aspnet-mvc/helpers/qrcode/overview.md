---
title: Overview
page_title: Overview | Kendo UI QRCode HtmlHelper
description: "Get started with the server-side wrapper for the Kendo UI QRCode widget for ASP.NET MVC."
slug: overview_qrcodehelper_aspnetmvc
position: 1
---

# QRCode HtmlHelper Overview

The QRCode HtmlHelper extension is a server-side wrapper for the [Kendo UI QRCode](https://demos.telerik.com/kendo-ui/qrcode/index) widget.

## Getting Started

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI QRCode.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %}).

**Step 2** Create a new action method which renders the view.

###### Example

        public ActionResult Index()
        {
            return View();
        }

**Step 3** Add a QRCode.

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

**Step 4** Choose the appropriate correction level and/or encoding.

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

You can reference an existing Kendo UI QRCode instance via [`jQuery.data()`](http://api.jquery.com/jQuery.data/). Once a reference is established, use the [CQRCodealendar API](/api/javascript/dataviz/ui/qrcode#methods) to control its behavior.

###### Example

      //Put this after your Kendo QRCode for ASP.NET MVC declaration.
      <script>
      $(function() {
          //Notice that the Name() of the QRCode is used to get its client-side instance.
          var qrcode = $("#qrcode").data("kendoQRCode");
      });
      </script>

## See Also

Other articles on Telerik UI for ASP.NET MVC and on the QRCode:

* [ASP.NET MVC API Reference: QRCodeBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/QRCodeBuilder)
* [Overview of Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %})
* [Fundamentals of Telerik UI for ASP.NET MVC]({% slug fundamentals_aspnetmvc %})
* [Scaffolding in Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Overview of the Kendo UI QRCode Widget]({% slug overview_kendoui_qrcode_widget %})
* [Telerik UI for ASP.NET MVC API Reference Folder](/api/aspnet-mvc/Kendo.Mvc/AggregateFunction)
* [Telerik UI for ASP.NET MVC HtmlHelpers Folder]({% slug overview_autocompletehelper_aspnetmvc %})
* [Tutorials on Telerik UI for ASP.NET MVC]({% slug overview_timeefficiencyapp_aspnetmvc6 %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})
