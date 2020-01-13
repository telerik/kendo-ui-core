---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI ArcGauge TagHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: taghelpers_arcgauge_aspnetcore
position: 1
---

# ArcGauge TagHelper Overview

The Telerik UI ArcGauge TagHelper for ASP.NET Core is a server-side wrapper for the Kendo UI ArcGauge widget.

The ArcGauge represents a value on a circular arc.

* [Demo page for the ArcGauge](https://demos.telerik.com/aspnet-core/arc-gauge/tag-helper)

## Initializing the ArcGauge

The following example demonstrates how to define the ArcGauge by using the ArcGauge TagHelper.

    <kendo-arclgauge name="gauge"></kendo-arcgauge>

## Basic Configuration

The ArcGauge TagHelper configuration options are passed as attributes of the tag.

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

* [Basic Usage of the ArcGauge TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/arc-gauge/tag-helper)
* [Server-Side API](/api/arcgauge)
