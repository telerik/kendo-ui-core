---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI QRCode TagHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: taghelpers_qrcode_aspnetcore
previous_url: /helpers/tag-helpers/qrcode
position: 1
---

# QRCode TagHelper Overview

The Telerik UI QRCode TagHelper for ASP.NET Core is a server-side wrapper for the Kendo UI QRCode widget.

The QRCode generates [Canvas](https://en.wikipedia.org/wiki/Canvas_X) and [Scalable Vector Graphics (SVG)](https://en.wikipedia.org/wiki/Scalable_Vector_Graphics) images that represent [Quick Response (QR) codes](https://en.wikipedia.org/wiki/QR_code).

QR codes take a piece of information from a transitory media, place it into the cell phone, and enable the cell phone to quickly read these generated images. All graphics are rendered on the client by using Canvas or SVG.

* [Demo page for the QRCode](https://demos.telerik.com/aspnet-core/qrcode/tag-helper)

## Initializing the QRCode

The following example demonstrates how to define the QRCode by using the QRCode TagHelper.

    <kendo-qrcode name="qrcode"></kendo-qrcode>

## Basic Configuration

The QRCode TagHelper configuration options are passed as attributes of the tag.

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

* [Basic Usage of the QRCode TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/qrcode/tag-helper)
* [Server-Side API](/api/qrcode)
