---
title: Scale
page_title: Scale
description: "Learn the Options of the Scale of the Telerik UI RadialGauge HtmlHelper for {{ site.framework }}."
slug: scale_radialgaugehelper_aspnetcore
position: 2
---

## Radial Gauge Scale

The scale of the Telerik UI RadialGauge for {{ site.framework }} renders the values, pointers and labels. It can be customized by adding the  `Scale` option to the widget. The `Scale` exposes the following child options:

* [Min and Max](#min-and-max)

* [MinorUnit and MajorUnit](#minorunit-and-majorunit)

* [Reverse](#reverse)

## Min and Max

* The `Min` (`double`) sets the lowest value of the widget.

* The `Max` (`double`) sets the maximum value of the widget.

````CSHTML
    @(Html.Kendo().RadialGauge()
          .Name("gauge")
          .Scale(scale => scale
              .Min(10)
              .Max(180)
          )
    )
````

## MinorUnit and MajorUnit

* The `MajorUnit` (`double`) parameter controls the interval between the major unit divisions of the widget. The values provided to the radial gauge's `Pointer` will render as a `MajorUnit` tick. The labels will be rendered next to the `MajorUnit` ticks.

* The `MinorUnit` (`double`) parameter controls the interval between the minor unit divisions of the widget.

````CSHTML
    @(Html.Kendo().RadialGauge()
          .Name("gauge")
          .Scale(scale => scale
              .MajorUnit(20)
              .MinorUnit(5)
          )
    )
````

## Reverse

If you set the `Reverse` (`bool`) option to `true`, the values of the scale will increase right to left. By default they will raise from left to  right.

````CSHTML
    @(Html.Kendo().RadialGauge()
          .Name("gauge")
          .Scale(scale => scale
            .Reverse(true)
          )
    )
````

## See Also

* [Overview of the RadialGauge]({%slug overview_radialgaugehelper_aspnetcore%})