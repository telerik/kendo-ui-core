---
title: Overview
page_title: ArcGauge | Telerik UI for ASP.NET Core Tag Helpers
description: "Learn the basics when working with the Kendo UI ArcGauge tag helper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: taghelpers_arcgauge_aspnetcore
position: 1
---

# ArcGauge Tag Helper Overview

The ArcGauge tag helper helps you configure the Kendo UI ArcGauge widget in ASP.NET Core applications.

## Basic Usage

The following example demonstrates how to define the ArcGauge by using the ArcGauge tag helper.

###### Example

    <kendo-arclgauge name="gauge"></kendo-arcgauge>

## Configuration

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

* [JavaScript API Reference of the Arc Gauge](http://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/arcgauge)
* [Arc Gauge HtmlHelper for ASP.NET MVC](http://docs.telerik.com/aspnet-mvc/helpers/arcgauge/overview)
* [Arc Gauge Official Demos](http://demos.telerik.com/aspnet-core/arc-gauge/index)
* [Overview of Telerik UI for ASP.NET Core]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects with the CLI]({% slug gettingstartedcli_aspnetmvc6_aspnetmvc %})
* [Known Issues with Telerik UI for ASP.NET Core]({% slug knownissues_aspnetmvc6_aspnetmvc %})
