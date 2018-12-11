---
title: Overview
page_title: QRCode | Telerik UI for ASP.NET Core Tag Helpers
description: "Learn the basics when working with the Kendo UI QRCode tag helper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: taghelpers_qrcode_aspnetcore
previous_url: /aspnet-core/helpers/tag-helpers/qrcode
position: 1
---

# QRCode Tag Helper Overview

The QRCode tag helper helps you configure the Kendo UI QRCode widget in ASP.NET Core applications.

## Basic Usage

The following example demonstrates how to define the QRCode by using the QRCode tag helper.

###### Example

    <kendo-qrcode name="qrcode"></kendo-qrcode>

## Configuration

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

* [Overview of Telerik UI for ASP.NET Core]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects with the CLI]({% slug gettingstartedcli_aspnetmvc6_aspnetmvc %})
* [Known Issues with Telerik UI for ASP.NET Core]({% slug knownissues_aspnetmvc6_aspnetmvc %})
