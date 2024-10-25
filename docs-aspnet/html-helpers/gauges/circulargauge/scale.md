---
title: Scale
page_title: Scale
description: "Learn how to configure the Scale options of the Telerik UI CircularGauge component for {{ site.framework }}."
slug: scale_circulargaugehelper_aspnetcore
position: 2
---

# Circular Gauge Scale

The scale of the Telerik UI Circular Gauge for {{ site.framework }} renders the values, pointers, and labels. To customize it, use the `Scale` option, which exposes the following child options:

* [`Min` and `Max`](#min-and-max)

* [`MinorUnit` and `MajorUnit`](#minorunit-and-majorunit)

* [`Reverse`](#reverse)

## Min and Max

* The `Min` (`double`) sets the lowest value of the control.

* The `Max` (`double`) sets the maximum value of the control.

```HtmlHelper
    @(Html.Kendo().CircularGauge()
        .Name("gauge")
        .Value(65)
        .Scale(x => x.Min(0).Max(100))
    )
```
{% if site.core %}
```TagHelper
    <kendo-circulargauge name="gauge" value="65">
        <scale min="0" max="100">
        </scale>
    </kendo-circulargauge>
```
{% endif %}

## MinorUnit and MajorUnit

* The `MajorUnit` (`double`) parameter controls the interval between the major unit divisions of the control. The values provided to the circular gauge's `Pointer` will render as a `MajorUnit` tick. The labels will be rendered next to the `MajorUnit` ticks.

* The `MinorUnit` (`double`) parameter controls the interval between the minor unit divisions of the control.

```HtmlHelper
    @(Html.Kendo().CircularGauge()
        .Name("gauge")
        .Value(65)
        .Scale(x => x.MajorUnit(20).MinorUnit(5))
    )
```
{% if site.core %}
```TagHelper
    <kendo-circulargauge name="gauge" value="65">
        <scale major-unit="20" minor-unit="5">
        </scale>
    </kendo-circulargauge>
```
{% endif %}

## Reverse

The `Reverse` property reverses the scale direction to show values that are increased counterclockwise.

```HtmlHelper
    @(Html.Kendo().CircularGauge()
        .Name("gauge")
        .Value(65)
        .Scale(x => x.Reverse(true))
    )
```
{% if site.core %}
```TagHelper
    <kendo-circulargauge name="gauge" value="65">
        <scale reverse="true">
        </scale>
    </kendo-circulargauge>
```
{% endif %}

## See Also

* [Overview of the CircularGauge]({%slug overview_circulargaugehelper_aspnetcore%})