---
title: Overview
page_title: LinearGauge | Telerik UI for ASP.NET Core Tag Helpers
description: "Learn the basics when working with the Kendo UI LinearGauge tag helper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
previous_url: /aspnet-core/helpers/tag-helpers/lineargauge
slug: taghelpers_lineargauge_aspnetcore
position: 1
---

# LinearGauge Tag Helper Overview

The LinearGauge tag helper helps you configure the Kendo UI LinearGauge widget in ASP.NET Core applications.

## Basic Usage

The following example demonstrates how to define the LinearGauge by using the LinearGauge tag helper.

###### Example

    <kendo-lineargauge name="gauge"></kendo-lineargauge>

## Configuration

The LinearGauge tag helper configuration options are passed as attributes of the tag.

```tagHelper
    <kendo-lineargauge name="gauge">
        <lineargauge-pointers>
            <pointer value="10"></pointer>
        </lineargauge-pointers>
        <scale major-unit="20" minor-unit="2" min="-40" max="60">
            <lineargauge-scale-ranges>
                <range color="#2798df" from="-40" to="-20">
                </range>
                <range color="#ffc700" from="30" to="45">
                </range>
                <range color="#c20000" from="45" to="60">
                </range>
            </lineargauge-scale-ranges>
        </scale>
    </kendo-lineargauge>
```
```cshtml
    @(Html.Kendo().LinearGauge()
          .Name("gauge")
          .Pointer(pointer => pointer.Value(10))
          .Scale(scale => scale
              .MajorUnit(20)
              .MinorUnit(2)
              .Min(-40)
              .Max(60)
              .Ranges(ranges =>
              {
                  ranges.Add().From(-40).To(-20).Color("#2798df");
                  ranges.Add().From(30).To(45).Color("#ffc700");
                  ranges.Add().From(45).To(60).Color("#c20000");
              }
              )
          )
    )
```

## See Also

* [Overview of Telerik UI for ASP.NET Core]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects with the CLI]({% slug gettingstartedcli_aspnetmvc6_aspnetmvc %})
* [Known Issues with Telerik UI for ASP.NET Core]({% slug knownissues_aspnetmvc6_aspnetmvc %})
