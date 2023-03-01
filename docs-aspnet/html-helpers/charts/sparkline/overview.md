---
title: Overview
page_title: Sparkline Overview
description: "Learn the basics when working with the Telerik UI Sparkline component for {{ site.framework }}."
slug: overview_sparklineshelper_aspnetcore
position: 1
---

# {{ site.framework }} Sparkline Overview

The Telerik UI Sparkline TagHelper and HtmlHelper for {{ site.framework }} are server-side wrappers for the Kendo UI Sparkline widget.

Sparklines are very small charts that are drawn without axes, coordinates, legends, titles, or other chart-specific elements. They behave like inline elements as they are rendered inside a `span` element so that they can be easily embedded in text as opposed to the standard Telerik UI Charts which behave like block elements as they are rendered inside `div` elements.

{% if site.has_cta_panels == true %}
{% include cta-panel-introduction.html %}
{% endif %}

While Sparklines are typically line charts, other types are supported as well:

* Line (default)
* Bar (Data Bars)
* Column
* Area
* Pie
* Bullet

 Generally, Sparklines are simple, word-sized graphics that can be embedded in chunks of text, tables, or headlines. The concept for such graphics was developed by [Edward Tufte](https://en.wikipedia.org/wiki/Edward_Tufte). The Telerik UI Sparkline component is a version of the Telerik UI Chart that is tailored for this specific application.

* [Demo page for the Sparkline](https://demos.telerik.com/kendo-ui/sparklines/index)

## Basic Configuration

To create the Sparklines, add the component tags to the view and provide it with a `Name`. Optionally, set the width and height of the desired chart by using CSS.

> * The width of the Line, Area, and Column Sparklines is determined by the number of data points.
> * Bar and Bullet graphs have a default width that can be overridden with CSS.
> * The Pie width equals the line-height to make a square.

```HtmlHelper
    @(Html.Kendo().Sparkline()
            .Name("temp-log")
            .Type(SparklineType.Column)
            .Tooltip(tooltip => tooltip.Format("{0} &deg;C"))
            .Data(ViewBag.TemperatureData)
    )
```
{% if site.core %}
```TagHelper
    <kendo-sparkline name="temp-log"
                     data="@ViewBag.TemperatureData"
                     type="SparklineType.Column">
        <tooltip format="{0} &deg;C"></tooltip>
    </kendo-sparkline>
```
{% endif %}

## Functionality and Features

* [Data binding]({% slug overview_sparklinesdatabinding_aspnetcore %})
* [Axes configuration]({% slug axesconfig_sparklines_aspnetcore %})

## See Also

* [Basic Usage of the Sparkline HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/sparklines/index)
* [Server-Side API](/api/sparkline)
