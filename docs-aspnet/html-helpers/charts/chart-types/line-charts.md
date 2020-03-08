---
title: Line Charts
page_title: Line Charts
description: "Learn how to define and configure Telerik UI Line Charts."
slug: linecharts_aspnetcore_htmlhelper
---

# Line Charts

The Telerik UI Line Chart HtmlHelper for {{ site.framework }} extension is a server-side wrapper for the Kendo UI Line Chart widget.

Line Charts are suitable for displaying quantitative data by using continuous lines passing through points defined by the values of their items.

* [Demo page for the Line Chart](https://demos.telerik.com/{{ site.platform }}/line-charts/index)

## Getting Started

You can use the Line Chart HtmlHelper to render a trend over time and compare sets of similar data.

To create a Line series in the Chart HtmlHelper, use `Line` and `VerticalLine` in the `Series` configuration.

* [Configuring the axes](#configuring-the-axes)
* [Configuring the line styles](#configuring-the-line-styles)
* [Setting the line type](#setting-the-line-type)
* [Customizing the markers](#customizing-the-markers)

## Configuring the Axes

To configure the axes, use the `CategoryAxis` and `ValueAxis` settings. Multiple value axes are also supported.

    @(Html.Kendo().Chart()
         .Name("chart")
         .Title("Internet Users")
         .Legend(legend => legend
             .Position(ChartLegendPosition.Bottom)
         )
         .Series(series =>
         {
             series.Line(new double[] { 15.7, 16.7, 20, 23.5, 26.6 }).Name("World");
             series.Line(new double[] { 67.96, 68.93, 75, 74, 78 }).Name("United States");
         })
         .CategoryAxis(axis => axis
             .Categories("2005", "2006", "2007", "2008", "2009")
             .MajorGridLines(lines => lines.Visible(false))
         )
         .ValueAxis(axis => axis
             .Numeric().Labels(labels => labels.Format("{0}%"))
         )
    )

The configuration from the previous example results in the following Line Chart.

![A sample Line Chart](images/chart-line.png)

## Configuring the Line Styles

You can render the lines between the points by setting different styles through the `Style` configuration in the `SeriesDefaults` common settings.

The supported line styles are:

* Normal&mdash;This is the default style. It produces a straight line between data points.
* Step&mdash;This style renders the connection between data points through vertical and horizontal lines. It is suitable for indicating that the value is constant between the changes.
* Smooth&mdash;This style causes the Line Chart to display a fitted curve through data points. It is suitable when the data requires to be displayed with a curve, or when you wish to connect the points with smooth instead of straight lines.

```
   .SeriesDefaults(seriesDefaults =>
       seriesDefaults.Line().Style(ChartLineStyle.Smooth)
   )
```

You can also set the line style for each Line series individually.

```
   .Series(series =>
   {
       series.Line(new double[] { 15.7, 26.7, 20, 23.5, 26.6 }).Name("World").Style(ChartLineStyle.Smooth);
       series.Line(new double[] { 67.96, 68.93, 75, 54, 78 }).Name("United States").Style(ChartLineStyle.Smooth);
   })
```

![A step-line Line Chart](images/chart-step-line.png)

The following image displays a smooth-line Line Chart.

![A smooth-line Line Chart](images/chart-smooth-line.png)

## Setting the Line Type

By default, the Chart draws its Line series as solid lines. You can configure the line to be drawn through different dash styles by setting `DashType`.

```
     .Series(series =>
     {
         series.Line(new double[] { 15.7, 16.7, 20, 23.5, 26.6 }).Name("World").DashType(ChartDashType.Dot);
         series.Line(new double[] { 67.96, 68.93, 75, 74, 78 }).Name("United States");
     })
```

![A dotted Line Series](images/chart-dotted-line.png)

## Customizing the Markers

The series markers are the visuals that represent the point value in the Line series. You can customize or hide them through the `Markers` configuration.

```
   series.Line(new double[] { 15.7, 16.7, 20, 23.5, 26.6 }).Name("World")
      .Markers(m=>m
          .Type(ChartMarkerShape.Square)
          .Rotation(45)
          .Background("yellow")
      );
```

![A Line Chart with custom markers](images/chart-line-markers.png)

You can also completely draw custom markers for the Line series through the `Visual` setting as shown in the [Custom Visuals](https://demos.telerik.com/{{ site.platform }}/line-charts/visuals) demo.

## See Also

* [Basic Usage of the Line Chart HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/line-charts/index)
* [Server-Side API](/api/chart)
