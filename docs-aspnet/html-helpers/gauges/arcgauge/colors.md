---
title: Colors
page_title: Colors
description: "Learn how to set the Colors of the Telerik UI ArcGauge HtmlHelper for {{ site.framework }}."
slug: colors_arcgaugehelper_aspnetcore
position: 3
---

## Arc Gauge Colors

The scale of the ArcGauge can be configured to show different colors for the different values. This allows for a diversified usage of the widget. The `Colors` option accepts a set of ranges with a respective `Color` option:

````CSHTML
    @(Html.Kendo().ArcGauge()
        .Name("gauge")
        .Value(65)
        .Scale(x => x.Min(0).Max(100))
        .CenterTemplate("<span style='color: #: color #;'>#: value #%</span>")
        .Colors(colors =>
        {
            colors.Add().From(0).To(25).Color("#0058e9");
            colors.Add().From(25).To(50).Color("#37b400");
            colors.Add().From(50).To(75).Color("#ffc000");
            colors.Add().From(75).To(100).Color("#f31700");
        })
    )
````

## See Also

* [Overview of the ArcGauge]({%slug overview_arcgaugehelper_aspnetcore%})
* [scale of the ArcGauge]({%slug scale_arcgaugehelper_aspnetcore%})