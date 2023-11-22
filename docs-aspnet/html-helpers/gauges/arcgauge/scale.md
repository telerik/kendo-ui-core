---
title: Scale
page_title: Scale
description: "Learn the Options of the Scale of the Telerik UI ArcGauge component for {{ site.framework }}."
slug: scale_arcgaugehelper_aspnetcore
position: 2
---

# Scale

The ArcGauge has a scale that renders the values, pointers and labels. You can customize it through the `Scale` option. The `Scale` exposes the following options:

* [`Min` and `Max`](#min-and-max)

* [`MinorUnit` and `MajorUnit`](#minorunit-and-majorunit)

* [`Reverse`](#reverse)

## Min and Max

* The `Min` (`double`) sets the lowest value of the component scale.

* The `Max` (`double`) sets the highest value of the component scale.

```HtmlHelper
    @(Html.Kendo().ArcGauge()
        .Name("gauge")
        .Value(65)
        .Scale(x => x.Min(0).Max(100))
    )
```
{% if site.core %}
```TagHelper
    <kendo-arcgauge name="gauge" value="65">
        <scale min="0" max="100">
        </scale>
    </kendo-arcgauge>
```
{% endif %}

## MinorUnit and MajorUnit

* The `MajorUnit` (`double`) option controls the interval between the major unit divisions of the component scale. The values provided to the ArcGauge's pointer will render as a `MajorUnit` tick. The labels will be rendered next to the `MajorUnit` ticks.

* The `MinorUnit` (`double`) parameter controls the interval between the minor unit divisions of the component scale.

```HtmlHelper
    @(Html.Kendo().ArcGauge()
        .Name("gauge")
        .Value(65)
        .Scale(x => x.MajorUnit(20).MinorUnit(5))
    )
```
{% if site.core %}
```TagHelper
    <kendo-arcgauge name="gauge" value="65">
        <scale major-unit="20" minor-unit="5">
        </scale>
    </kendo-arcgauge>
```
{% endif %}

## Reverse

The `Reverse()` option reverses the scale direction - the values increase counterclockwise.

````HtmlHelper
    @(Html.Kendo().ArcGauge()
        .Name("gauge")
        .Value(65)
        .Scale(x => x.Reverse(true))
    )
````
{% if site.core %}
```TagHelper
    <kendo-arcgauge name="gauge" value="65">
        <scale reverse="true">
        </scale>
    </kendo-arcgauge>
```
{% endif %}

## See Also

* [Overview of the ArcGauge]({%slug overview_arcgaugehelper_aspnetcore%})