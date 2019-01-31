---
title: Area Charts
page_title: Area Charts | Kendo UI Charts HtmlHelper for ASP.NET Core
description: "Learn how to define Kendo UI Area Charts."
slug: areacharts_aspnetcore_htmlhelper
---

# Area Charts

The [Kendo UI Area Chart HtmlHelper for ASP.NET Core](https://demos.telerik.com/aspnet-core/area-charts/index) is suitable for displaying quantitative data by using continuous lines passing through points defined by the values of their items.

The portion of the graph beneath the lines is filled with a particular color for each series. The different colors in an Area Chart are useful for emphasizing changes in values coming from several sets of similar data.

## Configuration

To define an Area Chart, use `Area` and `VerticalArea`.

### Axes

To configure the axes, use the `CategoryAxis` and `ValueAxis`. Multiple value axes are also supported.

###### Example

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
            .Categories(2005, 2006, 2007, 2008, 2009)
        )
        .ValueAxis(axis => axis
            .Labels(labels => labels.Format("{0}%"))
        )
    )


The configuration from the previous example results in the following Area Chart.

**Figure 1: A sample Area Chart**

![Area Chart](images/chart-area.png)

### Line Styles

The Area Charts support the rendering of lines between points by using different styles. You can set the supported styles through the [`line.style`](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart/configuration/series.line#series.line.style) option.

The supported styles are:

* Normal&mdash;This is the default style. It produces a straight line between data points.
* Step&mdash;The style renders the connection between data points through vertical and horizontal lines. It is suitable for indicating that the value is constant between the changes.
* Smooth&mdash;This style causes the Area Chart to display a fitted curve through data points. It is suitable when the data requires to be displayed with a curve, or when you wish to connect the points with smooth instead of straight lines.

**Figure 2: A step-line Area Chart**

![Step Line Chart](images/chart-step-area.png)

**Figure 3: A smooth-line Area Chart**

![Smooth Line Chart](images/chart-smooth-area.png)

## See Also

* [Overview of the Kendo UI Chart Html Helper for ASP.NET Core ]({% slug htmlhelpers_charts_aspnetcore %})
* [Bubble Charts]({% slug bubblecharts_aspnetcore_htmlhelper %})
* [BoxPlot Charts]({% slug boxplotcharts_aspnetcore_htmlhelper %})
* [Bar Charts]({% slug barcharts_aspnetcore_htmlhelper %})
* [Pie Charts]({% slug piecharts_aspnetcore_htmlhelper %})
* [Stock Charts]({% slug overview_stockcharthelper_aspnetcore %})
* [TreeMap]({% slug overview_treemaphelper_aspnetcore %})
* [Chart JavaScript API Reference](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart)
