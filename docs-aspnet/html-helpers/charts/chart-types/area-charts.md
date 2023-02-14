---
title: Area Charts
page_title: Area Charts
description: "Learn how to define Telerik UI Area Charts."
slug: areacharts_aspnetcore_htmlhelper
---

# Area Charts

{% if site.core %}
The Telerik UI Area Chart TagHelper and HtmlHelper for {{ site.framework }} are server-side wrappers for the Kendo UI Area Chart widget.
{% else %}
The Telerik UI Area Chart HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI Area Chart widget.
{% endif %}

Area Charts are suitable for displaying quantitative data by using continuous lines passing through points defined by the values of their items.

* [Demo page for the Area Chart HtmlHelper](https://demos.telerik.com/{{ site.platform }}/area-charts/index)
{% if site.core %}
* [Demo page for the Area Chart TagHelper](https://demos.telerik.com/{{ site.platform }}/area-charts/tag-helper)
{% endif %}

## Getting Started

The portion of the graph beneath the lines is filled with a particular color for each series. The different colors in an Area Chart are useful for emphasizing changes in the values which come from several sets of similar data.

To create an Area series in the Chart component, use `Area` and `VerticalArea` in the `Series` configuration.

* [Configuring the axes](#configuring-the-axes)
* [Configuring the line styles](#configuring-the-line-styles)

## Configuring the Axes

To configure the axes, use the `CategoryAxis` and `ValueAxis`. Multiple value axes are also supported.

```HtmlHelper
    @(Html.Kendo().Chart()
        .Name("chart")
        .Title("Internet Users")
        .Legend(legend => legend
            .Position(ChartLegendPosition.Bottom)
        )
        .SeriesDefaults(seriesDefaults =>
            seriesDefaults.Area()
        )
        .Series(series =>
        {
            series.Area(new double[] { 15.7, 16.7, 20, 23.5, 26.6 }).Name("World");
            series.Area(new double[] { 67.96, 68.93, 75, 74, 78 }).Name("United States");
        })
        .CategoryAxis(axis => axis
             .Categories(new string[] { "2005", "2006", "2007", "2008", "2009" })
        )
        .ValueAxis(axis => axis
            .Labels(labels => labels.Format("{0}%"))
        )
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc
    @{ 
        var categories = new string[] { "2005", "2006", "2007", "2008", "2009" };
    }
    <kendo-chart name="chart">
        <category-axis>
            <category-axis-item categories="categories">
            </category-axis-item>
        </category-axis>
        <series>
            <series-item type="ChartSeriesType.Area"
                        name="World"
                        data="new double[] { 15.7, 16.7, 20, 23.5, 26.6 }">
            </series-item>
            <series-item type="ChartSeriesType.Area"
                        name="United States"
                        data="new double[] { 67.96, 68.93, 75, 74, 78 }">
            </series-item>
        </series>
        <value-axis>
            <value-axis-item>
                <labels format="{0}%">
                </labels>
            </value-axis-item>
        </value-axis>
        <chart-legend position="ChartLegendPosition.Bottom">
        </chart-legend>
        <chart-title text="Internet Users">
        </chart-title>
    </kendo-chart>

```
{% endif %}

The configuration from the previous example results in the following Area Chart.

![{{ site.product_short }} A sample Area Chart](images/chart-area.png)

## Configuring the Line Styles

The Area Charts support the rendering of lines between points by using different styles. You can set the supported styles through the [`line.style`](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart/configuration/series.line#series.line.style) option.

The Area Chart supports the following styles:

* Normal&mdash;The default style. It produces a straight line between data points.
* Step&mdash;The style renders the connection between data points through vertical and horizontal lines. It is suitable for indicating that the value is constant between the changes.
* Smooth&mdash;This style causes the Area Chart to display a fitted curve through data points. It is suitable when the data requires to be displayed with a curve, or when you wish to connect the points with smooth instead of straight lines.

![{{ site.product_short }} A step-line Area Chart](images/chart-step-area.png)

The following image displays a smooth-line Area Chart.

![{{ site.product_short }} A smooth-line Area Chart](images/chart-smooth-area.png)

## See Also

* [Basic Usage of the Area Chart HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/area-charts/index)
* [Basic Usage of the Area Chart TagHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/area-charts/tag-helper)
* [Server-Side API](/api/chart)
