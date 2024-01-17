---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI LinearGauge component for {{ site.framework }}."
previous_url: /helpers/gauges/lineargauge/overview
slug: overview_lineargaugehelper_aspnetcore
position: 0
---

# {{ site.framework }} LinearGauge Overview

{% if site.core %}
The Telerik UI LinearGauge TagHelper and HtmlHelper for {{ site.framework }} are server-side wrappers for the Kendo UI LinearGauge widget.
{% else %}
The Telerik UI LinearGauge HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI LinearGauge widget.
{% endif %}

The LinearGauge represents values on a linear scale.

* [Demo page for the LinearGauge HtmlHelper](https://demos.telerik.com/{{ site.platform }}/linear-gauge/index)
{% if site.core %}
* [Demo page for the LinearGauge TagHelper](https://demos.telerik.com/aspnet-core/linear-gauge/tag-helper)
{% endif %}

## Initializing the LinearGauge

The following example demonstrates how to initialize the LinearGauge.

```HtmlHelper
    @(Html.Kendo().LinearGauge()
        .Name("linearGauge") // The name of the LinearGauge is mandatory. It specifies the "id" attribute of the widget.
        .Scale(scale => scale
            .Min(0) // Set the min value of the LinearGauge.
            .Max(200) // Set the min value of the LinearGauge.
        )
        .Pointer(pointer => pointer
            .Value(10) // Set the value of the LinearGauge.
        )
    )
```
{% if site.core %}
```TagHelper
    <kendo-lineargauge name="gauge">
        <scale min="0" max="200">
        </scale>
        <lineargauge-pointers>
            <pointer value="10"></pointer>
        </lineargauge-pointers>
    </kendo-lineargauge>
```
{% endif %}

## Basic Configuration

The LinearGauge configuration options are passed as attributes.

```HtmlHelper
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
{% if site.core %}
```TagHelper
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
{% endif %}

## Functionality and Features

* [Scale](https://docs.telerik.com/aspnet-core/html-helpers/gauges/lineargauge/scale)—The component's scale configuration renders the values, pointers and label.
* [Pointers](https://docs.telerik.com/aspnet-core/html-helpers/gauges/lineargauge/pointers)—The `Pointers`` configuration controls the values that will be marked on the scale.
* [Export](https://docs.telerik.com/aspnet-core/html-helpers/gauges/lineargauge/export)—You can export the LinearGauge to a PDF, raster or vector image.

## Next Steps

* [Getting Started with the LinearGauge]({% slug lineargauge_getting_started %})
* [Basic Usage of the LinearGauge HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/linear-gauge/index)

## See Also

* [Knowledge Base Section](/knowledge-base)
