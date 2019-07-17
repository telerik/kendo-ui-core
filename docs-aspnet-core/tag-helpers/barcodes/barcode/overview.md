---
title: Overview
page_title: Barcode Overview | Telerik UI for ASP.NET Core Tag Helpers
description: "Learn the basics when working with the Telerik UI Barcode tag helper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: taghelpers_barcode_aspnetcore
previous_url: /aspnet-core/helpers/tag-helpers/barcode
position: 1
---

# Barcode Tag Helper Overview

The Telerik UI Barcode tag helper for ASP.NET Core is a server-side wrapper for the Kendo UI Barcode widget.

The Barcode is used to represent data in a machine-readable format.

* [Demo page for the Barcode](https://demos.telerik.com/aspnet-core/barcode/tag-helper)

## Initializing the Barcode

The following example demonstrates how to define the Barcode by using the Barcode tag helper.

    <kendo-barcode name="BarCode"></kendo-barcode>

## Basic Configuration

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

* [Basic Usage of the Barcode Tag Helper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/barcode/tag-helper)
* [API Reference of the Barcode Helper for ASP.NET Core](/api/barcode)
