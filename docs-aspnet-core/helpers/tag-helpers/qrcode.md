---
title: QR Code
page_title: QR Code | Telerik UI for ASP.NET Core Tag Helpers
description: "Learn the basics when working with the QR Code tag helper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: taghelpers_qrcode_aspnetcore
---

# QR Code Tag Helper Overview

The QR Code tag helper helps you configure the Kendo UI QR Code widget in ASP.NET Core applications.

## Basic Usage

The following example demonstrates how to define the QR Code by using the QR Code tag helper.

###### Example

        <kendo-qrcode name="qrcode"></kendo-qrcode>

## Configuration

The QR Code tag helper configuration options are passed as attributes of the tag.

###### Example

```tab-tagHelper
    <kendo-qrcode name="qrUrl" value="https://docs.telerik.com/aspnet-core/introduction" error-correction="QRErrorCorrectionLevel.M size=" 150">
        <border color="#AA11AA" width="2" />
    </kendo-qrcode>
```
```tab-cshtml
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

* [Overview of Telerik UI for ASP.NET Core]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects on Linux]({% slug gettingstartedlinux_aspnetmvc6_aspnetmvc %})
* [Known Issues with Telerik UI for ASP.NET Core]({% slug knownissues_aspnetmvc6_aspnetmvc %})
