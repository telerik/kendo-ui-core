---
title: Overview
page_title: QRCode Overview | Telerik UI for ASP.NET Core Tag Helpers
description: "Learn the basics when working with the Kendo UI QRCode tag helper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: taghelpers_qrcode_aspnetcore
previous_url: /aspnet-core/helpers/tag-helpers/qrcode
position: 1
---

# QRCode Tag Helper Overview

The Kendo UI QRCode generates Canvas and Scalable Vector Graphics (SVG) images that represent QR (Quick Response) codes.

The QRCode tag helper extension is a server-side wrapper for the [Kendo UI QRCode](https://demos.telerik.com/kendo-ui/qrcode/index) widget and enables you to configure the widget in ASP.NET Core applications.

## Initializing the QRCode

The following example demonstrates how to define the QRCode by using the QRCode tag helper.

    <kendo-qrcode name="qrcode"></kendo-qrcode>

## Basic Configuration

The QRCode tag helper configuration options are passed as attributes of the tag.

```tagHelper
    <kendo-qrcode name="qrUrl" value="https://docs.telerik.com/aspnet-core/introduction" error-correction="QRErrorCorrectionLevel.M size=" 150">
        <border color="#AA11AA" width="2" />
    </kendo-qrcode>
```
```cshtml
    Html.Kendo().QRCode()
        .Name("qrUrl")
        .Value("https://docs.telerik.com/aspnet-core/introduction")
        .ErrorCorrection(QRErrorCorrectionLevel.M)
        .Size(150)
        .Border(border => border.Color("#AA11AA").Width(2))
    )
)
```

## See Also

* [Basic Usage of the QRCode Tag Helper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/qrcode/tag-helper)
* [JavaScript API Reference of the Kendo UI QRCode](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/qrcode)
