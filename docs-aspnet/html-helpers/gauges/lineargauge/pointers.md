---
title: Pointers
page_title: Pointers
description: "Learn the Options of the Pointers of the Telerik UI LinearGauge component for {{ site.framework }}."
slug: pointers_lineargaugehelper_aspnetcore
position: 3
---

# Linear Gauge Pointers

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

```HtmlHelper
    @(Html.Kendo().LinearGauge()
          .Name("gauge")
          .Pointer(pointer => pointer
              .Value(65)
              .Shape(GaugeLinearPointerShape.Arrow)
          )
    )
```
{% if site.core %}
```TagHelper
    <kendo-lineargauge name="gauge">
        <lineargauge-pointers>
            <pointer value="65" shape="GaugeLinearPointerShape.Arrow"></pointer>
        </lineargauge-pointers>
    </kendo-lineargauge>
```
{% endif %}

## Color

The `Color` (`string`) parameter controls the color of the pointers. It accepts **CSS**, **HEX** and **RGB** colors.

```HtmlHelper
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
{% if site.core %}
```TagHelper
    <kendo-lineargauge name="gauge">
        <lineargauge-pointers>
            <pointer value="10" color="red" shape="GaugeLinearPointerShape.Arrow"></pointer>
            <pointer value="20" color="#008000" shape="GaugeLinearPointerShape.Arrow"></pointer>
            <pointer value="30" color="rgb(255,255,0)" shape="GaugeLinearPointerShape.Arrow"></pointer>
        </lineargauge-pointers>
    </kendo-lineargauge>
```
{% endif %}

## Opacity

The `Opacity` (`double`) parameter controls the opacity of the pointers. The value passed to it should be between **0** and **1**.

```HtmlHelper
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
{% if site.core %}
```TagHelper
    <kendo-lineargauge name="gauge">
        <lineargauge-pointers>
            <pointer value="10" color="red" shape="GaugeLinearPointerShape.Arrow" opacity="0.5"></pointer>
        </lineargauge-pointers>
    </kendo-lineargauge>
```
{% endif %}

## Size

The `Size` (`double`) parameter controls the size of the pointers. 

```HtmlHelper
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
{% if site.core %}
```TagHelper
    <kendo-lineargauge name="gauge">
        <lineargauge-pointers>
            <pointer value="10" size="15" shape="GaugeLinearPointerShape.Arrow"></pointer>
        </lineargauge-pointers>
    </kendo-lineargauge>
```
{% endif %}

## Margin

The `Margin` (`double`) parameter controls the margin between the [Scale]({%slug scale_lineargaugehelper_aspnetcore%}) and the pointers.

```HtmlHelper
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
{% if site.core %}
```TagHelper
    <kendo-lineargauge name="gauge">
        <lineargauge-pointers>
            <pointer value="10" margin="5" shape="GaugeLinearPointerShape.Arrow"></pointer>
        </lineargauge-pointers>
    </kendo-lineargauge>
```
{% endif %}

## See Also

* [Overview of the LinearGauge]({%slug overview_lineargaugehelper_aspnetcore%})
* [Pointers of the LinearGauge]({%slug scale_lineargaugehelper_aspnetcore%})