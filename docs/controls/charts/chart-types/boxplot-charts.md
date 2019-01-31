---
title: Box Plot Charts
page_title: Box Plot Charts | Kendo UI Charts
description: "Learn how to create a Kendo UI Box Plot Chart and configure its options."
slug: chart-types-box-plot
---

# Box Plot Charts

The [Kendo UI Box Plot Chart widget](http://demos.telerik.com/kendo-ui/box-plot-charts/index) is useful for displaying variation in statistical samples of data. The Box Plot Chart uses seven values—first and third quartile (q1 and q3), median (that is the second quartile), upper and lower value (inner fences), mean and outliers. The advantage of this type of series is that it displays detailed information about a set of data in a small space.

If you are not familiar with the usage and terminology of the box plots and want to understand it better, check the [Wikipedia page on box plots](https://en.wikipedia.org/wiki/Box_plot).

## Configuration

Use the `boxPlot` series type to create a Kendo UI Box Plot Chart.

When binding the Box Plot Chart, there are seven special properties of the `series` object that you should set in order to display the chart successfully—`q1Field` (first quartile), `q3Field` (third quartile), `lowerField`, `upperField`, `medianField` (second quartile), `meanField`, `outliersField`. The first five are required, while `meanField` and `outliersField` are optional. All properties have to point to numeric fields in the DataSource, with the exception of `outliersField` which has to point to a field that contains an array of numbers. The example below shows the result of such a configuration

###### Example

```dojo
    <div id="chart"></div>
    <script>
      $("#chart").kendoChart({
        series: [{
          type: 'boxPlot',
          q1Field: 'q1',
          q3Field: 'q3',
          lowerField: 'lower',
          upperField: 'upper',
          medianField: 'median',
          meanField: 'mean',
          outliersField: 'outliers'
        }],
        dataSource: {
          data: [
            { year: 2004, lower: 1.8, q1: 2.75, median: 3.35, q3: 3.825, upper: 4.9, mean: 3.4 },
            { year: 2005, lower: 1.7, q1: 2.275, median: 3.2, q3: 3.825, upper: 5.5, outliers: [0.5, 6.7] },
            { year: 2006, lower: 1.2, q1: 1.95, median: 2.45, q3: 3.075, upper: 3.5, mean: 2.5 },
            { year: 2007, lower: 1.3, q1: 1.9, median: 3.05, q3: 3.425, upper: 4, mean: 2.7, outliers: [7, 8.5] }
          ]
        },
        categoryAxis: {
          field: 'year'
        },
        tooltip: {
          visible: true
        }
      });
    </script>
```

### Orientation

The Box Plot Chart orientation can be changed by setting the series type to `verticalBoxPlot`.

###### Example

```dojo
    <div id="chart"></div>
    <script>
      $("#chart").kendoChart({
        series: [{
          type: 'verticalBoxPlot',
          q1Field: 'q1',
          q3Field: 'q3',
          lowerField: 'lower',
          upperField: 'upper',
          medianField: 'median',
          meanField: 'mean',
          outliersField: 'outliers'
        }],
        dataSource: {
          data: [
            { year: 2004, lower: 1.8, q1: 2.75, median: 3.35, q3: 3.825, upper: 4.9, mean: 3.4 },
            { year: 2005, lower: 1.7, q1: 2.275, median: 3.2, q3: 3.825, upper: 5.5, outliers: [0.5, 6.7] },
            { year: 2006, lower: 1.2, q1: 1.95, median: 2.45, q3: 3.075, upper: 3.5, mean: 2.5 },
            { year: 2007, lower: 1.3, q1: 1.9, median: 3.05, q3: 3.425, upper: 4, mean: 2.7, outliers: [7, 8.5] }
          ]
        },
        categoryAxis: {
          field: 'year'
        },
        tooltip: {
          visible: true
        }
      });
    </script>
```

### Customizing Outliers

Outliers are values that appear outside of the range closed by the lower and upper values (inner fences). There are two types of outliers in a box plot based on their distance from the inner fences—mild and extreme. The Box Plot Chart renders them by default as crosses (mild) and circles (extreme). To let you configure them separately, the Chart has two configuration options—[`series.outliers`](/api/javascript/dataviz/ui/chart/configuration/series.outliers) for mild outliers and [`series.extremes`](/api/javascript/dataviz/ui/chart/configuration/series.extremes) for extreme outliers. You can use them to customize the outliers, as shown below:

###### Example

```dojo
    <div id="chart"></div>
    <script>
      $("#chart").kendoChart({
        series: [{
          type: 'verticalBoxPlot',
          q1Field: 'q1',
          q3Field: 'q3',
          lowerField: 'lower',
          upperField: 'upper',
          medianField: 'median',
          meanField: 'mean',
          outliersField: 'outliers',
          outliers: {
            border: {
              color: "green"
            },
            type: "triangle"
          },
          extremes: {
            border: {
              color: "red"
            },
            type: "square",
            rotation: 45
          }
        }],
        dataSource: {
          data: [
            { year: 2004, lower: 1.8, q1: 2.75, median: 3.35, q3: 3.825, upper: 4.9, mean: 3.4 },
            { year: 2005, lower: 1.7, q1: 2.275, median: 3.2, q3: 3.825, upper: 5.5, outliers: [0.5, 6.7] },
            { year: 2006, lower: 1.2, q1: 1.95, median: 2.45, q3: 3.075, upper: 3.5, mean: 2.5 },
            { year: 2007, lower: 1.3, q1: 1.9, median: 3.05, q3: 3.425, upper: 4, mean: 2.7, outliers: [7, 8.5] }
          ]
        },
        categoryAxis: {
          field: 'year'
        },
        tooltip: {
          visible: true
        }
      });
    </script>
```

## See Also

* [Overview of the Chart Widgets]({% slug overview_kendoui_charts_widget %})
* [Data Series Charts]({% slug seriestypeofcharts_widget %})
* [Area Charts]({% slug areacharts_widget %})
* [Bar Charts]({% slug bartypeofcharts_widget %})
* [Bullet Charts]({% slug chart-types-bullet %})
* [Bubble Charts]({% slug bubblecharts_widget %})
* [Line Charts]({% slug linetypeoscharts_widget %})
* [Pie Charts]({% slug pietypecharts_widget %})
* [Scatter Charts]({% slug scattercharts_widget %})
* [Sparklines]({% slug overview_kendoui_sparklinescharts %})
* [Stock Charts]({% slug overview_kendoui_stockcharts %})
* [TreeMap]({% slug overview_treemap_widget %})
* [Chart JavaScript API Reference](/api/javascript/dataviz/ui/chart)
