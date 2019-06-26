---
title: Bubble Charts
page_title: Bubble Charts | Kendo UI Charts HtmlHelpers for ASP.NET Core
description: "Learn how to create a Kendo UI Bubble Chart for ASP.NET Core to visualize data points and how to set its properties."
slug: bubblecharts_aspnetcore_htmlhelper
---

# Bubble Charts

The [Kendo UI Bubble Chart HtmlHelper](https://demos.telerik.com/aspnet-core/bubble-charts/index) displays data as points with coordinates and sizes defined by the value of their items.

## Getting Started

The Bubble Chart HtmlHelper is similar to the [Kendo UI Scatter Charts HtmlHelper](https://demos.telerik.com/aspnet-core/scatter-charts/index) in which the data points are replaced with bubbles. In this way a Bubble Chart displays three-dimensional data&mdash;two values for the coordinates of the items and one value for their size. A Bubble Chart is useful for visualizing different scientific relationships&mdash;for example, economic or social. The X-axis of the Bubble Charts is numerical and does not require items.

The Bubble Charts are well suited for displaying dozens to hundreds of values especially when you wish to visualize size values which differ by several orders of magnitude. As the size value is represented by a circle area, it is a best practice to plot positive values.

By default, negative values are not displayed. However, their area is going to be calculated as if their value was positive. The point label displays their actual value and they will also have a different color. To control this behavior, use the `negativeValues.visible` and `negativeValues.color` options that are applicable to each series.

## Creating the Bubble Chart

To create a Bubble Chart, use `Bubble` in the `Series` configuration.

The following example demonstrates how to create a Bubble Chart and visualizes several data points.

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

* [Basic Usage of the Bubble Chart Series Type HtmlHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/bubble-charts/index)
* [JavaScript API Reference of the Kendo UI Charts](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart)
