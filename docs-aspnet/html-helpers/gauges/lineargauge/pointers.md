---
title: Pointers
page_title: Pointers
description: "Learn the Options of the Pointers of the Telerik UI LinearGauge HtmlHelper for {{ site.framework }}."
slug: pointers_lineargaugehelper_aspnetcore
position: 3
---

## Linear Gauge Pointers

The `Pointers` of the Telerik UI LinearGauge for {{ site.framework }} are the values that will be marked on the scale. Customize them via the following options:

* [Shape](#shape)

* [Color](#color)

* [Opacity](#opacity)

* [Size](#size)

* [Margin](#margin)

## Shape

The `Shape` parameter controls the shape of the pointer and takes a member of the `GaugeLinearPointerShape` enum:

* `BarIndicator` - by default a bar indication will be rendered as the pointer shape

* `Arrow`

```CSHTML
    @(Html.Kendo().LinearGauge()
          .Name("gauge")
          .Pointer(pointer => pointer
              .Value(65)
              .Shape(GaugeLinearPointerShape.Arrow)
          )
    )
```

## Color

The `Color` (`string`) parameter controls the color of the pointers. It accepts **CSS**, **HEX** and **RGB** colors.

```CSHTML
    @(Html.Kendo().LinearGauge()
          .Name("gauge")
          .Pointer(pointer =>
          {
              pointer
                  .Value(10)
                  .Color("red")
                  .Shape(GaugeLinearPointerShape.Arrow);
              pointer
                  .Value(20)
                  .Color("#008000")
                  .Shape(GaugeLinearPointerShape.Arrow);
              pointer
                  .Value(30)
                  .Color("rgb(255,255,0)")
                  .Shape(GaugeLinearPointerShape.Arrow);
          })
    )
```

## Opacity

The `Opacity` (`double`) parameter controls the opacity of the pointers. The value passed to it should be between **0** and **1**.

```CSHML
    @(Html.Kendo().LinearGauge()
          .Name("gauge")
          .Pointer(pointer =>
          {
              pointer
                  .Value(10)
                  .Color("red")
                  .Opacity(0.5)
                  .Shape(GaugeLinearPointerShape.Arrow);
          })
    )
```

## Size

The `Size` (`double`) parameter controls the size of the pointers. 

```CSHTML
    @(Html.Kendo().LinearGauge()
          .Name("gauge")
          .Pointer(pointer =>
          {
              pointer
                  .Value(10)
                  .Size(15)
                  .Shape(GaugeLinearPointerShape.Arrow);
          })
    )
```

## Margin

The `Margin` (`double`) parameter controls the margin between the [Scale]({%slug scale_lineargaugehelper_aspnetcore%}) and the pointers.

```CSHTML
    @(Html.Kendo().LinearGauge()
          .Name("gauge")
          .Pointer(pointer =>
          {
              pointer
                  .Value(10)
                  .Margin(5)
                  .Shape(GaugeLinearPointerShape.Arrow);
          })
    )
```
## See Also

* [Overview of the LinearGauge]({%slug overview_lineargaugehelper_aspnetcore%})
* [Pointers of the LinearGauge]({%slug scale_lineargaugehelper_aspnetcore%})