---
title: Overview
page_title: ArcGauge Overview | Telerik UI for ASP.NET Core Tag Helpers
description: "Learn the basics when working with the Kendo UI ArcGauge tag helper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: taghelpers_arcgauge_aspnetcore
position: 1
---

# ArcGauge Tag Helper Overview

The ArcGauge represents a value on a circular arc.

The ArcGauge tag helper extension is a server-side wrapper for the [Kendo UI ArcGauge](http://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/arcgauge) widget and enables you to configure the Kendo UI ArcGauge widget in ASP.NET Core applications.

## Initializing the ArcGauge

The following example demonstrates how to define the ArcGauge by using the ArcGauge tag helper.

    <kendo-arclgauge name="gauge"></kendo-arcgauge>

## Basic Configuration

The ArcGauge tag helper configuration options are passed as attributes of the tag.

```tagHelper
    <kendo-arcgauge name="gauge" center-template="#:value#%" value="65">
        <scale min="0" max="100">
        </scale>
    </kendo-arcgauge>
```
```cshtml
    @(Html.Kendo().ArcGauge()
        .Name("arcGauge")
        .Value(65)
        .Scale(x => x.Min(0).Max(100))
        .CenterTemplate("#:value#%")
    )
```

## See Also

* [Basic Usage of the ArcGauge Tag Helper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/arc-gauge/tag-helper)
* [JavaScript API Reference of the ArcGauge](http://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/arcgauge)
