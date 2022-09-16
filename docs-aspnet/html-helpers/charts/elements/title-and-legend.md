---
title: Title and Legend
page_title: Title and Legend
description: "Learn how to control the appearance of Telerik UI Charts, change their themes and manage their animated transitions."
slug: htmlhelpers_charts_titleandlegend_aspnetcore
---

# Title and Legend

The Telerik UI Chart supports options for configuring the appearance of its title and legend.

## Setting the Title

To control the position of the title, use the following available `Position` options of the `Title` property:

* `"Top"`
* `"Bottom"`

```HtmlHelper
    @(Html.Kendo().Chart()
        .Name("chart")
        .Title(title => title.Position(ChartTitlePosition.Top).Text("Site Visitors Stats \n /thousands/"))
        // Other options.
    )
```
{% if site.core %}
```TagHelper

    <kendo-chart name="chart">
        <chart-title position="ChartTitlePosition.Top" text="Site Visitors Stats \n /thousands/"></chart-title>
        <!-- Other options.-->
    </kendo-chart>

```
{% endif %}

## Setting the Legend

The Chart legend displays the name of the configured data series.

* To control the position of the legend, use any of the following supported `Position` values:

    * `"Top"`
    * `"Bottom"`
    * `"Left"`
    * `"Right"`
    * `"Custom"`

```HtmlHelper
    @(Html.Kendo().Chart()
        .Name("chart")
        .Legend(legend => legend.Position(ChartLegendPosition.Bottom))
        // Other options.
    )
```
{% if site.core %}
```TagHelper

    <kendo-chart name="chart">
        <chart-legend position="ChartLegendPosition.Bottom"></chart-legend>
        <!-- Other options.-->
    </kendo-chart>

```
{% endif %}

* To customize the position of the legend, use the `offsetX` and `offsetY` options.

    ![Custom legend position](../images/chart-legend-custom-position.png)

```HtmlHelper
    @(Html.Kendo().Chart()
        .Name("chart")
        .Legend(legend => legend.Position(ChartLegendPosition.Custom).OffsetX(500).OffsetY(200))
        // Other options.
    )
```
{% if site.core %}
```TagHelper

    <kendo-chart name="chart">
        <chart-legend position="ChartLegendPosition.Custom" offset-x="500" offset-y="200"></chart-legend>
        <!-- Other options.-->
    </kendo-chart>

```
{% endif %}

* To exclude series from the legend, set their `VisibleInLegend` option to `false`.

```HtmlHelper
    @(Html.Kendo().Chart()
        .Name("chart")
        .Legend(legend => legend.Position(ChartLegendPosition.Top))
        .Series(series =>
        {
            series.Bar(new double[] { 56000, 63000, 74000, 91000, 117000, 138000 }).Name("Total Visits").VisibleInLegend(false);
            series.Bar(new double[] { 52000, 34000, 23000, 48000, 67000, 83000 }).Name("Unique visitors");
        })
        // Other options.
    )
```
{% if site.core %}
```TagHelper

    @{
        var total_visits = new double[] { 56000, 63000, 74000, 91000, 117000, 138000 };
        var unique_visitors = new double[] { 52000, 34000, 23000, 48000, 67000, 83000 };
    }

    <kendo-chart name="chart">
        <chart-legend position="ChartLegendPosition.Top"></chart-legend>
        <series>
            <series-item type="ChartSeriesType.Bar" name="Total Visits" data="total_visits" visible-in-legend="false">
            </series-item>
            <series-item type="ChartSeriesType.Bar" name="Unique visitors" data="unique_visitors">
            </series-item>
        </series>
        <!-- Other options.-->
    </kendo-chart>

```
{% endif %}

## See Also

* [Using the API of the Chart HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/chart-api/index)
* [Basic Usage of the Area Chart HtmlHelper for {{ site.framework }} (Demos)](https://demos.telerik.com/{{ site.platform }}/area-charts/index)
* [Basic Usage of the Area Chart TagHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/area-charts/tag-helper)
* [Server-Side API](/api/chart)
