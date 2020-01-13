---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI Barcode TagHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: taghelpers_barcode_aspnetcore
previous_url: /helpers/tag-helpers/barcode
position: 1
---

# Barcode TagHelper Overview

The Telerik UI Barcode TagHelper for ASP.NET Core is a server-side wrapper for the Kendo UI Barcode widget.

The Barcode represents data in a machine-readable format.

* [Demo page for the Barcode](https://demos.telerik.com/aspnet-core/barcode/tag-helper)

## Initializing the Barcode

The following example demonstrates how to define the Barcode by using the Barcode TagHelper.

    <kendo-barcode name="BarCode"></kendo-barcode>

## Basic Configuration

The Barcode TagHelper configuration options are passed as attributes of the tag.

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

* [Basic Usage of the Barcode TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/barcode/tag-helper)
* [Server-Side API](/api/barcode)
