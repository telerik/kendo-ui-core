---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI LinearGauge TagHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
previous_url: /helpers/tag-helpers/lineargauge
slug: taghelpers_lineargauge_aspnetcore
position: 1
---

# LinearGauge TagHelper Overview

The Telerik UI LinearGauge tage helper for ASP.NET Core is a server-side wrapper for the Kendo UI LinearGauge widget.

The LinearGauge represents values on a linear scale.

* [Demo page for the LinearGauge](https://demos.telerik.com/aspnet-core/linear-gauge/tag-helper)

## Initializing the LinearGauge

The following example demonstrates how to define the LinearGauge by using the LinearGauge TagHelper.

    <kendo-lineargauge name="gauge"></kendo-lineargauge>

## Basic Configuration

The LinearGauge TagHelper configuration options are passed as attributes of the tag.

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

* [Basic Usage of the LinearGauge TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/linear-gauge/tag-helper)
* [Server-Side API](/api/lineargauge)
