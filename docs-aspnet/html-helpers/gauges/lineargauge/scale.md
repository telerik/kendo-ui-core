---
title: Scale
page_title: Scale
description: "Learn the Options of the Scale of the Telerik UI LinearGauge component for {{ site.framework }}."
slug: scale_lineargaugehelper_aspnetcore
position: 2
---

# Linear Gauge Scale

The scale of the Telerik UI LinearGauge for {{ site.framework }} renders the values, pointers and labels. It can be customized by adding the  `Scale` option to the widget. The `Scale` exposes the following child options:

* [Min and Max](#min-and-max)

* [MinorUnit and MajorUnit](#minorunit-and-majorunit)

* [Mirror](#mirror)

* [Reverse](#reverse)

* [Vertical](#vertical)

## Min and Max

* The `Min` (`double`) sets the lowest value of the widget.

* The `Max` (`double`) sets the maximum value of the widget.

```HtmlHelper
    @(Html.Kendo().LinearGauge()
          .Name("gauge")
          .Scale(scale => scale
              .Min(10)
              .Max(180)
          )
    )
```
{% if site.core %}
```TagHelper
    <kendo-lineargauge name="gauge">
        <scale min="10" max="180">
        </scale>
    </kendo-lineargauge>
```
{% endif %}

## MinorUnit and MajorUnit

* The `MajorUnit` (`double`) parameter controls the interval between the major unit divisions of the widget. The values provided to the linear gauge's `Pointer` will render as a `MajorUnit` tick. The labels will be rendered next to the `MajorUnit` ticks.

* The `MinorUnit` (`double`) parameter controls the interval between the minor unit divisions of the widget.

```HtmlHelper
    @(Html.Kendo().LinearGauge()
          .Name("gauge")
          .Scale(scale => scale
              .MajorUnit(20)
              .MinorUnit(5)
          )
    )
```
{% if site.core %}
```TagHelper
    <kendo-lineargauge name="gauge">
        <scale major-unit="20" minor-unit="5">
        </scale>
    </kendo-lineargauge>
```
{% endif %}

## Mirror

By design, the labels and unit devisions of the `Scale` are rendered to the left, or, to the top if the gauge is [horizontal](#reverse). If you set the `Mirror` (`bool`) to `true`, the `Scale` will render the labels and unit devisions to the right or to the bottom, respectively.

```HtmlHelper
    @(Html.Kendo().LinearGauge()
          .Name("gauge")
          .Scale(scale => scale
            .Mirror(true)
          )
    )
```
{% if site.core %}
```TagHelper
    <kendo-lineargauge name="gauge">
        <scale mirror="true">
        </scale>
    </kendo-lineargauge>
```
{% endif %}

## Reverse

If you set the `Reverse` (`bool`) option to `true`, the values of the scale will increase from top to bottom. By default they will raise from the bottom to the top.

```HtmlHelper
    @(Html.Kendo().LinearGauge()
          .Name("gauge")
          .Scale(scale => scale
            .Reverse(true)
          )
    )
```
{% if site.core %}
```TagHelper
    <kendo-lineargauge name="gauge">
        <scale reverse="true">
        </scale>
    </kendo-lineargauge>
```
{% endif %}

## Vertical

By design, the default orientation of the widget is vertical. Setting the `Vertical` (`bool`) option to `false` would render the widget horizontally.

```HtmlHelper
    @(Html.Kendo().LinearGauge()
          .Name("gauge")
          .Scale(scale => scale
            .Vertical(false)
          )
    )
```
{% if site.core %}
```TagHelper
    <kendo-lineargauge name="gauge">
        <scale vertical="false">
        </scale>
    </kendo-lineargauge>
```
{% endif %}

## See Also

* [Overview of the LinearGauge]({%slug overview_lineargaugehelper_aspnetcore%})
* [Pointers of the LinearGauge]({%slug pointers_lineargaugehelper_aspnetcore%})