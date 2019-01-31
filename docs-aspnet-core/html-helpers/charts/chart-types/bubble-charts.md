---
title: Bubble Charts
page_title: Bubble Charts | Kendo UI Charts HtmlHelpers for ASP.NET Core
description: "Learn how to create a Kendo UI Bubble Chart for ASP.NET Core to visualize data points and how to set its properties."
slug: bubblecharts_aspnetcore_htmlhelper
---

# Bubble Charts

The [Kendo UI Bubble Chart HtmlHelper](https://demos.telerik.com/aspnet-core/bubble-charts/index) displays data as points with coordinates and sizes defined by the value of their items.

The Bubble Chart HtmlHelper is similar to the [Kendo UI Scatter Charts HtmlHelper](https://demos.telerik.com/aspnet-core/scatter-charts/index) in which the data points are replaced with bubbles. In this way a Bubble Chart displays three-dimensional data&mdash;two values for the coordinates of the items and one value for their size. A Bubble Chart is useful for visualizing different scientific relationships&mdash;fr example, economic or social. The X-axis of the Bubble Charts is numerical and does not require items.

## Basic Usage

### Suitability

The Bubble Charts are well suited for displaying dozens to hundreds of values especially when you wish to visualize size values which differ by several orders of magnitude. As the size value is represented by a circle area, it is a best practice to plot positive values.

### Negative Values

By default, negative values are not displayed. However, their area is going to be calculated as if their value was positive. The point label displays their actual value and they will also have a different color. To control this behavior, use the `negativeValues.visible` and `negativeValues.color` options that are applicable to each series.

## Getting Started

### Create the Bubble Chart

The following example visualizes several data points.

###### Example

    @(Html.Kendo().Chart()
        .Name("chart")
        .Series(series =>
        {
            series.Bubble(new dynamic[] {
            new {
              x =  10,
              y = 12000,
              size = 0.1
            }, new {
              x = 24,
              y =  62000,
              size =  0.25
            }
            }).Name("Sales");
        })
    )

**Figure 1: A sample Bubble Chart**

 ![Bubble Chart](images/chart-bubble.png)

## See Also

* [Overview of the Kendo UI Chart Html Helper for ASP.NET Core ]({% slug htmlhelpers_charts_aspnetcore %})
* [Area Charts]({% slug areacharts_aspnetcore_htmlhelper %})
* [BoxPlot Charts]({% slug boxplotcharts_aspnetcore_htmlhelper %})
* [Bar Charts]({% slug barcharts_aspnetcore_htmlhelper %})
* [Pie Charts]({% slug piecharts_aspnetcore_htmlhelper %})
* [Stock Charts]({% slug overview_stockcharthelper_aspnetcore %})
* [TreeMap]({% slug overview_treemaphelper_aspnetcore %})
* [Chart JavaScript API Reference](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart)
