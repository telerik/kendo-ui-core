---
title: Overview
page_title: RadialGauge Overview | Telerik UI for ASP.NET Core Tag Helpers
description: "Learn the basics when working with the Kendo UI RadialGauge tag helper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: taghelpers_radialgauge_aspnetcore
previous_url: /aspnet-core/helpers/tag-helpers/radialgauge
position: 1
---

# RadialGauge Tag Helper Overview

The RadialGauge represents values on a circular arc.

The RadialGauge tag helper extension is a server-side wrapper for the [Kendo UI RadialGauge](https://demos.telerik.com/kendo-ui/radial-gauge/index) widget and enables you to configure the Kendo UI RadialGauge widget in ASP.NET Core applications.

## Initializing the RadialGauge

The following example demonstrates how to define the RadialGauge by using the RadialGauge tag helper.

    <kendo-radialgauge name="gauge"></kendo-radialgauge>

## Basic Configuration

The RadialGauge tag helper configuration options are passed as attributes of the tag.

```tagHelper
    <kendo-radialgauge name="gauge">
        <radialgauge-pointers>
            <pointer value="65"></pointer>
        </radialgauge-pointers>
        <scale minor-unit="5" start-angle="-30" end-angle="210" max="180">
        </scale>
    </kendo-radialgauge>
```
```cshtml
     @(Html.Kendo().RadialGauge()
        .Name("gauge")
        .Pointer(pointer => pointer.Value(65))
        .Scale(scale => scale
            .MinorUnit(5)
            .StartAngle(-30)
            .EndAngle(210)
            .Max(180)
        )
    )
```

## See Also

* [Basic Usage of the RadialGauge Tag Helper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/radial-gauge/tag-helper)
* [JavaScript API Reference of the RadialGauge](http://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/radialgauge)
