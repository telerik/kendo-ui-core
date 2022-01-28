---
title: Pointers
page_title: Pointers
description: "Learn the Options of the Pointers of the Telerik UI RadialGauge HtmlHelper for {{ site.framework }}."
slug: pointers_radialgaugehelper_aspnetcore
position: 3
---

## Radial Gauge Pointers

The `Pointers` of the Telerik UI RadialGauge for {{ site.framework }} are the values that will be marked on the scale. Customize them via the following options:

* [Pointer](#pointer)

* [PointerCap](#pointer-cap)

* [Multiple Pointers](#multiple-pointers)

## Pointer

* The `Color` (`string`) parameter controls the color of the pointers. It accepts **CSS**, **HEX** and **RGB** colors.
* The `Length` (`string`) parameter controls the pointers length (in percent) that is based on the distance to the scale. The default length of 1 indicates that the pointer exactly reaches the scale. Accepts values between 0.1 and 1.5.

````CSHTML
    @(Html.Kendo().RadialGauge()
        .Name("gauge")
        .Pointers(pointers =>
        {
            pointers.Add().Value(10).Color("#c20000").Length(0.5);
        })
    )
````

## Pointer Cap

* The `Color` (`string`) parameter controls the color of the pointer cap. It accepts **CSS**, **HEX** and **RGB** colors.

* The `Size` (`double`) parameter controls the size of the pointer cap in percentage according to the scale radius. (from 0 to 1). The default size is 0.05.

````CSHTML
    @(Html.Kendo().RadialGauge()
            .Name("gauge")
            .Pointers(pointers =>
            {
                pointers.Add().Value(10).Color("#c20000").Length(0.5).Cap(c => c.Size(0.15).Color("red"));
            })
        )   
````

## Multiple Pointers

The RadialGauge supports the usage of multiple pointers simultaneously. They can be declared within the `Pointers` option of the widget:

````CSHTML
    @(Html.Kendo().RadialGauge()
        .Name("gauge")
        .Pointers(pointers =>
        {
            pointers.Add().Value(10).Color("#c20000").Length(0.5).Cap(c => c.Size(0.15));
            pointers.Add().Value(70).Color("#ff7a00").Length(0.75).Cap(c => c.Size(0.1));
            pointers.Add().Value(140).Color("#ffc700");
        })
        .Scale(scale => scale
                .MinorUnit(5)
                .StartAngle(-30)
                .EndAngle(210)
                .Max(180)
        )
    )
````

## See Also

* [Overview of the RadialGauge]({%slug overview_radialgaugehelper_aspnetcore%})
* [Scale of the RadialGauge]({%slug scale_radialgaugehelper_aspnetcore%})