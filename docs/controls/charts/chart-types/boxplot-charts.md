---
title: Box Plot Charts
page_title: jQuery Chart Documentation | Box Plot Charts
description: "Learn how to create a Kendo UI Box Plot Chart and configure its options."
slug: chart-types-box-plot
---

# Box Plot Charts

Box Plot Charts are useful for displaying variations in statistical samples of data and data details in a small space.

* [Demo page for the Box Plot Chart](https://demos.telerik.com/kendo-ui/box-plot-charts/index)

## Getting Started

The Box Plot Chart uses the following values:

* First and third quartile (q1 and q3)
* Median (that is the second quartile)
* Upper and lower value (inner fences)
* Mean and outliers

To create a Box Plot series, use `boxPlot` in the `series` configuration.

* [Binding the Box Plot Chart](#binding-the-box-plot-chart)
* [Setting the orientation](#setting-the-orientation)
* [Customizing the outliers](#customizing-the-outliers)

## Binding the Box Plot Chart

When you bind the Box Plot Chart, you have to set the following special properties of the `Series` object so that the Chart is successfully displayed:

* (Mandatory) `q1Field` (first quartile)
* (Mandatory) `q3Field` (third quartile)
* (Mandatory) `lowerField`
* (Mandatory) `upperField`
* (Mandatory) `medianField` (second quartile)
* (Optional) `meanField`
* (Optional) `outliersField`

All properties except for `outliersField` have to point to numeric fields in the DataSource. `outliersField` has to point to a field that contains an array of numbers.

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

## Setting the Orientation

You can change the orientation of the Box Plot Chart by setting the series type to `verticalBoxPlot`.

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

## Customizing the Outliers

Outliers are values that appear outside the range between lower and upper values (inner fences). Based on their distance from the inner fences, the outliers in a box plot are mild and extreme. The Box Plot Chart renders them by default as crosses (mild) and circles (extreme).

You can configure the outliers separately and customize them by using:
* [`series.outliers`](/api/javascript/dataviz/ui/chart/configuration/series.outliers) for mild outliers.
* [`series.extremes`](/api/javascript/dataviz/ui/chart/configuration/series.extremes) for extreme outliers.

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

* [Basic Usage of the Box Plot Chart (Demo)](https://demos.telerik.com/kendo-ui/box-plot-charts/index)
* [JavaScript API Reference of the Chart](/api/javascript/dataviz/ui/chart)
