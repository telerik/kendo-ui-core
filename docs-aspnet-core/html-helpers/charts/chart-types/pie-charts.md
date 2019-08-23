---
title: Pie Charts
page_title: Pie Charts | Telerik UI Charts HtmlHelper for ASP.NET Core
description: "Learn how to create a Telerik UI Pie Chart for ASP.NET Core and specify its point value, category label, and other properties."
slug: piecharts_aspnetcore_htmlhelper
---

# Pie Charts

The [Telerik UI Pie Chart HtmlHelper for ASP.NET Core extension](https://demos.telerik.com/aspnet-core/pie-charts/index) is a server-side wrapper for the Kendo UI Pie Chart widget.

Pie Charts display data as single-series sectors from a two-dimensional circle. It is useful for rendering data as a part of the whole.

The [Donut Chart HTMLHelper for ASP.NET Core](https://demos.telerik.com/aspnet-core/donut-charts/index) is a Pie Chart variation with the same ability to display a single data series in a two-dimensional circle and is likewise useful for displaying data as a part of the whole.

* [Demo page for the Pie Chart HtmlHelper for ASP.NET Core](https://demos.telerik.com/aspnet-core/pie-charts/index)
* [Demo page for the Donut Chart HtmlHelper for ASP.NET Core](https://demos.telerik.com/aspnet-core/donut-charts/index)

## Getting Started

To create a Pie series in the Chart HtmlHelper, use `Pie` in the `Series` configuration.

* [Creating the Pie Chart](#creating-the-pie-chart)
* [Configuring the effects overlay](#configuring-the-effects-overlay)

## Initializing the Pie Chart

The following example demonstrates how to define a single series of type `"pie"`. Additional series are not supported and each data point is an object that specifies the point value, category label, and other properties.

        @(Html.Kendo().Chart()
           .Name("chart")
           .Title("Break-up of Spain Electricity Production for 2008")
           .Legend(legend => legend
               .Position(ChartLegendPosition.Bottom)
           )
           .SeriesColors(new string[] { "#03a9f4", "#ff9800", "#fad84a", "#4caf50" })
           .Series(series =>
           {
               series.Pie(new dynamic[] {
               new {category="Hydro",value=22,color="#9de219"},
               new {category="Solar",value=2,color="#90cc38"},
               new {category="Nuclear",value=49,color="#068c35"},
               new {category="Wind",value=27,color="#006634"}})
               .Overlay(o => o.Gradient(ChartSeriesGradient.RoundedBevel));
           })
           .Tooltip(tooltip => tooltip.
               Template("${ category } - ${ value }%").Visible(true)
           )
        )

**Figure 1: A sample Pie Chart**

![Pie Chart](images/pie-chart.png)

## Configuring the Effects Overlay

Each segment has a transparent effect overlay that adds depth to the two-dimensional shape. The overlay transparent gradient is configurable.

    .Series(series =>
    {
       series.Pie(new dynamic[] {})
       .Overlay(o => o.Gradient(ChartSeriesGradient.None));
    })

The Pie Chart supports the following `ChartSeriesGradient` options:

* (Default) `RoundedBevel`

        **Figure 2: A Pie Chart with the `RoundedBevel` overlay applied**

        ![Pie Chart with roundedBevel overlay](images/pie-chart.png)

* `SharpBevel`

        **Figure 3: A Pie Chart with the `SharpBevel` overlay applied**

        ![Pie Chart with sharpBevel overlay](images/chart-pie-overlay-sharpbevel.png)

* `None`

        **Figure 4: A Pie Chart with no overlay**

        ![Pie Chart with no overlay](images/chart-pie-overlay-none.png)

## See Also

* [Basic Usage of the Pie Chart HtmlHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/pie-charts/index)
* [Server-Side API](/api/chart)
