---
title: Colors
page_title: Colors
description: "Learn how to set the colors of the Telerik UI Circular Gauge component for {{ site.framework }}."
slug: colors_circulargaugehelper_aspnetcore
position: 3
---

# Circular Gauge Colors

The scale of the Circular Gauge can show different colors for different values. This allows for a diversified usage of the widget. The `Colors` option accepts a set of ranges with a respective `Color` option:

```HtmlHelper
    @(Html.Kendo().CircularGauge()
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
```
{% if site.core %}
```TagHelper
    <kendo-circulargauge name="gauge" value="65" center-template="<span style='color: #: color #;'>#: value #%</span>">
        <scale min="0" max="100">
        </scale>
        <colors>
            <color from="0" to="25" color="#0058e9" />
            <color from="25" to="50" color="#37b400" />
            <color from="50" to="75" color="#ffc000" />
            <color from="75" to="100" color="#f31700" />
        </colors>
    </kendo-circulargauge>
```
{% endif %}

## See Also

* [Overview of the Circular Gauge]({%slug overview_circulargaugehelper_aspnetcore%})
* [Scale of the Circular Gauge]({%slug scale_circulargaugehelper_aspnetcore%})