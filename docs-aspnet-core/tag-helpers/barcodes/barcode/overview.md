---
title: Overview
page_title: Barcode | Telerik UI for ASP.NET Core Tag Helpers
description: "Learn the basics when working with the Kendo UI Barcode tag helper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: taghelpers_barcode_aspnetcore
previous_url: /aspnet-core/helpers/tag-helpers/barcode
position: 1
---

# Barcode Tag Helper Overview

The Barcode tag helper helps you configure the Kendo UI Barcode widget in ASP.NET Core applications.

## Basic Usage

The following example demonstrates how to define the Barcode by using the Barcode tag helper.

###### Example

    <kendo-barcode name="BarCode"></kendo-barcode>

## Configuration

The Barcode tag helper configuration options are passed as attributes of the tag.

```tagHelper
    <kendo-barcode name="barcode" value="10110110" type="BarcodeSymbology.Code128" width="200" height="100">
        <border color="red" width="2"/>
    </kendo-barcode>
```
```cshtml
    @(Html.Kendo().Barcode()
    .Name("gudbrands")
    .Value("10110110")
    .Encoding(BarcodeSymbology.Code128)
    .Width(200)
    .Height(100)
    .Border(border => border.Color("red").Width(2)))
)
```

## See Also

* [Overview of Telerik UI for ASP.NET Core]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects with the CLI]({% slug gettingstartedcli_aspnetmvc6_aspnetmvc %})
* [Known Issues with Telerik UI for ASP.NET Core]({% slug knownissues_aspnetmvc6_aspnetmvc %})
