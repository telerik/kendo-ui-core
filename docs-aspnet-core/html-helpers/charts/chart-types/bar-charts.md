---
title: Bar Charts
page_title: Bar Charts | Kendo UI Charts HtmlHelper for ASP.NET Core
description: "Learn how to set the properties of Kendo UI Bar Charts HtmlHelper for ASP.NET Core."
slug: barcharts_aspnetcore_htmlhelper
---

# Bar Charts

The [Kendo UI Bar Chart HtmlHelper for ASP.NET Core](https://demos.telerik.com/aspnet-core/bar-charts/index) displays data through horizontal or vertical bars whose lengths vary according to their value.

Bar Charts are suitable for displaying a comparison between sets of data&mdash;for example, a summary of unique and total site visitors over a certain period of time.

The [Kendo UI Bullet Chart HtmlHelper for ASP.NET Core](https://demos.telerik.com/aspnet-core/bullet-charts/index) is a variation of a Kendo UI Bar Chart. You can use it as a replacement for dashboard gauges and meters. The bullet graph compares a given quantitative measure, such as temperature, against qualitative ranges, such as warm, hot, mild, cool, chilly, cold, and so on, and a symbol marker that encodes the comparative measure, such as the max temperature a year ago.

The [Kendo UI Range Bar Chart HtmlHelper for ASP.NET Core](https://demos.telerik.com/aspnet-core/range-bar-charts/index) is yet another variation of the Kendo UI Bar Chart. It displays data as bars where each bar represents a value range that spans between its minimum and maximum levels. A Range Bar type has floating bars unlike the standard Kendo UI Bar Chart that has bars that are anchored to its `x`-axis.

## Configuration

### Column Chart

The [Kendo UI Column Chart for ASP.NET Core](https://demos.telerik.com/aspnet-core/bar-charts/column) is rendered when the `Series` is `Column`.

###### Example

    @(Html.Kendo().Chart()
        .Name("chart")
        .Title("Kendo Chart Example")
        .Legend(legend => legend
            .Position(ChartLegendPosition.Bottom)
        )
        .Series(series =>
        {
            series.Column(new double[] { 200, 450, 300, 125 }).Name("Example Series");
        })
        .CategoryAxis(axis => axis
            .Categories(2000, 2001, 2002, 2003)
        )
    )


**Figure 1: A sample Column Chart with categories**

![Column Chart with categories](images/chart-column-categories.png)

### Bar Chart

Setting the `Series` object to `"Bar"` renders horizontal bars, as demonstrated in the following example.

###### Example

    @(Html.Kendo().Chart()
       .Name("chart")
       .Title("Kendo Chart Example")
       .Legend(legend => legend
           .Position(ChartLegendPosition.Bottom)
       )
       .Series(series =>
       {
           series.Bar(new double[] { 200, 450, 300, 125 }).Name("Example Series");
       })
       .CategoryAxis(axis => axis
           .Categories(2000, 2001, 2002, 2003)
       )
    )

**Figure 2: A sample Bar Chart**

![Bar Chart](images/chart-bar.png)

## See Also

* [Overview of the Kendo UI Chart Html Helper for ASP.NET Core ]({% slug htmlhelpers_charts_aspnetcore %})
* [Area Charts]({% slug areacharts_aspnetcore_htmlhelper %})
* [Bubble Charts]({% slug bubblecharts_aspnetcore_htmlhelper %})
* [BoxPlot Charts]({% slug boxplotcharts_aspnetcore_htmlhelper %})
* [Pie Charts]({% slug piecharts_aspnetcore_htmlhelper %})
* [Stock Charts]({% slug overview_stockcharthelper_aspnetcore %})
* [TreeMap]({% slug overview_treemaphelper_aspnetcore %})
* [Chart JavaScript API Reference](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart)
