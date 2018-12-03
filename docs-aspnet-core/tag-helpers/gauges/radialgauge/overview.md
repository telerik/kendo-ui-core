---
title: Overview
page_title: RadialGauge | Telerik UI for ASP.NET Core Tag Helpers
description: "Learn the basics when working with the Kendo UI RadialGauge tag helper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: taghelpers_radialgauge_aspnetcore
previous_url: /aspnet-core/helpers/tag-helpers/radialgauge
position: 1
---

# RadialGauge Tag Helper Overview

The RadialGauge tag helper helps you configure the Kendo UI RadialGauge widget in ASP.NET Core applications.

## Basic Usage

The following example demonstrates how to define the RadialGauge by using the RadialGauge tag helper.

###### Example

    <kendo-radialgauge name="gauge"></kendo-radialgauge>

## Configuration

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

* [Overview of Telerik UI for ASP.NET Core]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects with the CLI]({% slug gettingstartedcli_aspnetmvc6_aspnetmvc %})
* [Known Issues with Telerik UI for ASP.NET Core]({% slug knownissues_aspnetmvc6_aspnetmvc %})
