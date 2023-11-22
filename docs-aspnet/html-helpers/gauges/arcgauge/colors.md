---
title: Colors
page_title: Colors
description: "Learn how to set the Colors of the Telerik UI ArcGauge component for {{ site.framework }}."
slug: colors_arcgaugehelper_aspnetcore
position: 3
---

# Colors

The scale of the ArcGauge can be configured to show different colors based on the current value. The `Colors` option accepts a set of ranges with a respective `Color` option.

````HtmlHelper
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
{% if site.core %}
```TagHelper
    <kendo-arcgauge name="gauge" value="65" center-template="<span style='color: #: color #;'>#: value #%</span>">
        <scale min="0" max="100">
        </scale>
        <colors>
            <color from="0" to="25" color="#0058e9" />
            <color from="25" to="50" color="#37b400" />
            <color from="50" to="75" color="#ffc000" />
            <color from="75" to="100" color="#f31700" />
        </colors>
    </kendo-arcgauge>
```
{% endif %}

## See Also

* [Overview of the ArcGauge]({%slug overview_arcgaugehelper_aspnetcore%})
* [Configuring the ArcGauge Scale]({%slug scale_arcgaugehelper_aspnetcore%})