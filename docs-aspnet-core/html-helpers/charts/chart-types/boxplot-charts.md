---
title: Box Plot Charts
page_title: Box Plot Charts | Kendo UI Charts HtmlHelper for ASP.NET Core
description: "Learn how to create a Kendo UI Box Plot Chart for ASP.NET Core and configure its options."
slug: boxplotcharts_aspnetcore_htmlhelper
---

# Box Plot Charts

The [Kendo UI Box Plot Chart HtmlHelper for ASP.NET Core](https://demos.telerik.com/aspnet-core/box-plot-charts/index) is useful for displaying variation in statistical samples of data.

The Box Plot Chart uses seven values&mdash;first and third quartile (q1 and q3), median (that is the second quartile), upper and lower value (inner fences), mean and outliers. The advantage of this type of series is that it displays detailed information about a set of data in a small space.

If you are not familiar with the usage and terminology of the box plots and want to understand it better, check the [Wikipedia page on box plots](https://en.wikipedia.org/wiki/Box_plot).

## Configuration

To create a Box Plot Chart, use the `BoxPlot` series type.

When you bind the Box Plot Chart, you have to set seven special properties of the `Series` object so that the Chart is successfully displayed:

* (Mandatory) `q1` (first quartile)
* (Mandatory) `q3Field` (third quartile)
* (Mandatory) `lower`
* (Mandatory) `upper`
* (Mandatory) `median` (second quartile)
* (Optional) `mean`
* (Optional) `outliers`

All properties except for `outliers` have to point to numeric fields in the DataSource. `outliers` has to point to a field that contains an array of numbers.

###### Example

      @(Html.Kendo().Chart()
            .Name("chart")
            .Title("Monthly Mean Temperatures (&deg;F)")
            .Legend(legend => legend.Visible(false))
            .Series(series => series
                .BoxPlot(new System.Collections.ArrayList() {
                    new { lower= 26.2, q1= 38.3 , median= 51.0, q3= 61.45, upper= 68.9, mean= 49.0, outliers= new [] {18.3, 20, 70, 72, 5}} ,
                    new { lower= 26.4, q1= 38.125, median= 46.8 , q3= 60.425, upper= 66.8, mean= 47.3, outliers= new [] {18, 69, 71.3,  71.5}},
                    new { lower= 31.6, q1= 41.725, median= 52.35, q3= 62.175, upper= 70.8, mean= 52.3, outliers= new [] {14, 16.4, 74}},
                    new { lower= 34.4, q1= 39.375, median= 49.9 , q3= 61.425, upper= 69.2, mean= 50.3, outliers= new [] {16, 18, 72, 72.5}} ,
                    new { lower= 29.9, q1= 38.35, median= 50.4, q3= 60.875, upper= 69.7, mean= 49.9, outliers= new [] {19, 20, 76, 78}},
                    new { lower= 22.3, q1= 36.875, median= 48.9 , q3= 62.65 , upper= 70.3, mean= 49.0, outliers= new [] {16.5, 17, 74, 75,  78}},
                    new { lower= 32.3, q1= 39.5, median= 54.1, q3= 61.175, upper= 67.3, mean= 50.8, outliers= new [] {13, 14, 15, 74.3,   75.2, 76}},
                    new { lower= 28.5, q1= 36.075, median= 50.5 , q3= 64.2, upper= 70.4, mean= 49.6, outliers= new [] {18, 22, 73.4, 75}},
                    new { lower= 33.6, q1= 40.65, median= 49.55, q3= 62.8, upper= 69.2, mean= 51.1, outliers= new [] {17, 73}},
                    new { lower= 33.6, q1= 38.6, median= 47.9, q3= 60.825, upper= 67.0, mean= 49.7, outliers= new [] {12, 13.5, 16, 73,   74.6, 77}},
                    new { lower= 31.9, q1= 36.425, median= 49.3, q3= 61.825, upper= 69.7, mean= 49.4, outliers= new [] {17, 76}},
                    new { lower= 34.0, q1= 41.225, median= 51.15, q3= 62.4, upper= 68.8, mean= 51.6, outliers= new [] {14.6, 17.3, 72.3,  74}}
                })
            )
            .CategoryAxis(categoryAxis => categoryAxis
                .Categories(new string[] { "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" })
                .MajorGridLines(majorGridLines => majorGridLines.Visible(false))
            )
      )

### Orientation

You can change the orientation of the Box Plot Chart by setting the series type to `VerticalBoxPlot`.

###### Example

      @(Html.Kendo().Chart()
         .Name("chart")
         .Title("Monthly Mean Temperatures (&deg;F)")
         .Legend(legend => legend.Visible(false))
         .Series(series => series
             .VerticalBoxPlot(new System.Collections.ArrayList() {
                 new { lower= 26.2, q1= 38.3 , median= 51.0, q3= 61.45, upper= 68.9, mean= 49.0, outliers= new [] {18.3, 20, 70, 72, 5}},
                 new { lower= 26.4, q1= 38.125, median= 46.8 , q3= 60.425, upper= 66.8, mean= 47.3, outliers= new [] {18, 69, 71.3, 71.5}},
                 new { lower= 31.6, q1= 41.725, median= 52.35, q3= 62.175, upper= 70.8, mean= 52.3, outliers= new [] {14, 16.4, 74}},
                 new { lower= 34.4, q1= 39.375, median= 49.9 , q3= 61.425, upper= 69.2, mean= 50.3, outliers= new [] {16, 18, 72, 72.5}},
                 new { lower= 29.9, q1= 38.35, median= 50.4, q3= 60.875, upper= 69.7, mean= 49.9, outliers= new [] {19, 20, 76, 78}},
                 new { lower= 22.3, q1= 36.875, median= 48.9 , q3= 62.65 , upper= 70.3, mean= 49.0, outliers= new [] {16.5, 17, 74, 75, 78}},
                 new { lower= 32.3, q1= 39.5, median= 54.1, q3= 61.175, upper= 67.3, mean= 50.8, outliers= new [] {13, 14, 15, 74.3, 75.2, 76}},
                 new { lower= 28.5, q1= 36.075, median= 50.5 , q3= 64.2, upper= 70.4, mean= 49.6, outliers= new [] {18, 22, 73.4, 75}},
                 new { lower= 33.6, q1= 40.65, median= 49.55, q3= 62.8, upper= 69.2, mean= 51.1, outliers= new [] {17, 73}},
                 new { lower= 33.6, q1= 38.6, median= 47.9, q3= 60.825, upper= 67.0, mean= 49.7, outliers= new [] {12, 13.5, 16, 73, 74.6, 77}},
                 new { lower= 31.9, q1= 36.425, median= 49.3, q3= 61.825, upper= 69.7, mean= 49.4, outliers= new [] {17, 76}},
                 new { lower= 34.0, q1= 41.225, median= 51.15, q3= 62.4, upper= 68.8, mean= 51.6, outliers= new [] {14.6, 17.3, 72.3, 74}}
             })
         )
         .CategoryAxis(categoryAxis => categoryAxis
             .Categories(new string[] { "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" })
             .MajorGridLines(majorGridLines => majorGridLines.Visible(false))
         )
      )

### Customizing Outliers

Outliers are values that appear outside the range between lower and upper values (inner fences). Based on their distance from the inner fences, the outliers in a box plot are mild and extreme. The Box Plot Chart renders them by default as crosses (mild) and circles (extreme).

You can configure the outliers separately and customize them by using:
* [`series.outliers`](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart/configuration/series.outliers) for mild outliers.
* [`series.extremes`](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart/configuration/series.extremes) for extreme outliers.

## See Also

* [Overview of the Kendo UI Chart Html Helper for ASP.NET Core ]({% slug htmlhelpers_charts_aspnetcore %})
* [Area Charts]({% slug areacharts_aspnetcore_htmlhelper %})
* [Bubble Charts]({% slug bubblecharts_aspnetcore_htmlhelper %})
* [Bar Charts]({% slug barcharts_aspnetcore_htmlhelper %})
* [Pie Charts]({% slug piecharts_aspnetcore_htmlhelper %})
* [Stock Charts]({% slug overview_stockcharthelper_aspnetcore %})
* [TreeMap]({% slug overview_treemaphelper_aspnetcore %})
* [Chart JavaScript API Reference](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart)
