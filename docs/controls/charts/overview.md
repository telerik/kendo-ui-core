---
title: Overview
page_title: Overview | Kendo UI Charts
description: "Learn how to create a chart, enable the visualization of a series that displays inline data, and explore the major features of Kendo UI Charts."
previous_url: /howto/add-charts-and-graphs-to-an-application
slug: overview_kendoui_charts_widget
position: 1
---

# Chart Overview

The [Kendo UI Charts](http://demos.telerik.com/kendo-ui/) use modern browser technologies to render high-quality data visualizations. All graphics are rendered on the client using [Scalable Vector Graphics (SVG)](https://en.wikipedia.org/wiki/Scalable_Vector_Graphics) with a fallback to [Canvas](http://www.canvasgfx.com/) and [Vector Markup Language (VML)](https://en.wikipedia.org/wiki/Vector_Markup_Language).

Kendo UI Charts support the following series types:

* Bar and Column
* Line and Vertical Line
* Area and Vertical Area
* Bullet
* Pie and Donut
* Scatter
* Scatter Line
* Bubble
* Radar and Polar

For additional information on new Kendo UI Chart types and features, refer to the [Kendo UI Roadmap](http://www.telerik.com/support/whats-new/kendo-ui-web/roadmap).

## Getting Started

### Create the Chart

To create a chart, add an empty `div` in the HTML, provide it with an ID, and, optionally, set the width and height of the desired chart inline or via CSS, as demonstrated in the example below.

###### Example

    <div id="chart" style="width: 400px; height: 600px"></div>

### Initialize the Chart

The Kendo UI Chart widget is rendered by selecting the `div` with a jQuery selector and calling the `kendoChart()` function, as demonstrated below.

###### Example

    $("#chart").kendoChart();

This results in the chart below.

**Figure 1. An empty chart**

![Empty Chart](/controls/charts/chart-empty.png)</img>

## Configuration

### Add Title

This chart can be given a title by specifying the `text` property of the `title` object, as demonstrated in the example below.

###### Example

    $("#chart").kendoChart({
        title: {
             text: "Kendo Chart Example"
        }
    });

### Bind to Data

Kendo UI Charts can visualize series bound to both local and remote data.

#### Bind to Local Arrays

Start by creating a series that displays inline data.

###### Example

    $("#chart").kendoChart({
        title: {
             text: "Kendo Chart Example"
        },
        series: [
             { name: "Example Series", data: [200, 450, 300, 125] }
        ]
    });

This results in the chart below.

**Figure 2. A chart without ctegories**

![Column Chart without categories](/controls/charts/chart-column-no-categories.png)</img>

Notice that the columns have no label across the category axis. Specify the labeling for the series in the [`categoryAxis` property](/api/dataviz/chart#categoryAxis), as demonstrated in the example below.

###### Example

    $("#chart").kendoChart({
        title: {
             text: "Kendo Chart Example"
        },
        series: [
             { name: "Example Series", data: [200, 450, 300, 125] }
        ],
        categoryAxis:{
             categories: [ 2000, 2001, 2002, 2003 ]
        }
    });


This results in the chart below.

**Figure 3. A chart with categories**

![Column Chart with categories](/controls/charts/chart-column-categories.png)</img>

## Categorical Charts

Categorical charts, such as [Kendo UI Bar](http://demos.telerik.com/kendo-ui/bar-charts/index), [Column](http://demos.telerik.com/kendo-ui/bar-charts/column), and [Line Charts](http://demos.telerik.com/kendo-ui/line-charts/index), use one category axis and one value axis. The axis orientation (horizontal or vertical) is inferred from the series type.

### Category Axis

Use the `categoryAxis` object to set the category names, as demonstrated in the example below.

###### Example

    $("#chart").kendoChart({
        series: [{
            name: "World",
            data: [15.7, 16.7, 20, 23.5, 26.6]
        }],
        categoryAxis: {
            categories: [2005, 2006, 2007, 2008, 2009]
        }
    });

The category name can also be bound to a field of the data item, as demonstrated below.

###### Example

    var internetUsers = [ {
        "country": "United States",
        "year": "2005",
        "value": 67.96
        }, {
        "country": "United States",
        "year": "2006",
        "value": 68.93
    }];

    $("#chart").kendoChart({
        dataSource: {
            data: internetUsers
        },
        series: [{
            field: "value",
            name: "United States"
        }],
        categoryAxis: {
            field: "year"
        }
    });

### Value Axis

The Kendo UI Chart currently supports only Numeric value axes. Configuration options are accessible through the [`valueAxis` object](/api/dataviz/chart#valueaxis-object).

The example below demonstrates how to configure a Numeric axis with a minimum value of 0 and a maximum value of 100.

###### Example

    $("#chart").kendoChart({
        series: [{
            name: "World",
            data: [15.7, 16.7, 20, 23.5, 26.6]
        }],
        valueAxis: {
            min: 0,
            max: 100
        },
        categoryAxis: {
            categories: [2005, 2006, 2007, 2008, 2009]
        }
    });

### Multiple Value Axes

A Kendo UI Chart might have more than one value axis. These additional axes must have unique names.

The example below demonstrates how to define the `temperature` and `humidity` axes. Series are associated to a value axis by specifying its name.

###### Example

    $("#container").kendoChart({
        title: {
            text: "Average temperature and humidity"
        },
        legend: {
            position: "bottom"
        },
        series: [{
                name: "Temperature",
                data: [20, 25, 32],
                axis: "temperature"
            }, {
                name: "Humidity",
                data: [45, 50, 80],
                axis: "humidity"
        }],
        categoryAxis: {
            categories: ["Aug", "Sep", "Oct"]
        },
        valueAxis: [{
            name: "temperature",
            labels: {
                format: "{0}C"
            }
        }, {
            name: "humidity",
            labels: {
                format: "{0}%"
            }
        }]
    });

This results in the chart below.

**Figure 4. A chart with multiple axes**

![Chart with multiple axes](/controls/charts/chart-multiple-axes.png)

### Arrangement of Value Axes

You are able to control the arrangement of the value axes by specifying the values (category indices) at which they cross the category axis, as demonstrated below.

###### Example

    categoryAxis: {
        categories: ["Aug", "Sep", "Oct"],
        axisCrossingValue: [0, 3]
    }


The first value axis crosses the category axis at the first category (leftmost). The second value axis crosses it at the last category.

**Figure 5. A chart with customized axis-crossing values**

![Bar chart with customized axis crossing values](/controls/charts/chart-axis-crossing-values.png)

## Scatter Charts

### Primary X/Y Axes

XY Kendo UI Charts, such as [Scatter](http://demos.telerik.com/kendo-ui/scatter-charts/index) and [Scatter Line](http://demos.telerik.com/kendo-ui/scatter-charts/scatter-line) ones, use one or more X and Y axes. These axes are configured through the `xAxis` and the `yAxis` objects, as demonstrated in the example below.

###### Example

    $("#chart").kendoChart({
        series: [{
            type: "scatter",
            name: "Pentium D 915",
            data: [[120, 102]]
        }],
        xAxis: {
            max: 1000
        },
        yAxis: {
            min: 80
        }
    });

### Multiple X/Y Axes

You are also able to define more X and Y axes in addition to the primary axes, as demonstrated in the example below. These additional axes must have unique names. Series are associated to a X and Y axes by specifying their name.

> **Important**
>
> Do not specify a name for the primary X and Y axes.

###### Example

    $("#container").kendoChart({
        title: {
            text: "Dyno run results"
        },
        legend: {
            position: "bottom"
        },
        seriesDefaults: {
            type: "scatterLine"
        },
        series: [{
            name: "Power",
            data: [[1000,  10], [1500, 19], [2000, 30]]
        }, {
            name: "Torque",
            data: [[1000,  50], [1500, 65], [2000, 80]],
            yAxis: "torque"
        }],
        xAxis: {
            title: "Engine rpm"
        },
        yAxis: [{
            labels: {
                format: "{0} bhp"
            }
        }, {
            name: "torque",
            labels: {
                format: "{0} Nm"
            }
        }]
    });


The first series is associated with the default Y axis, as no axis name is specified. The `torque` series are plotted on the `torque` Y axis.

**Figure 6. A Scatter chart with multiple axes**

![Scatter chart with multiple axes](/controls/charts/chart-scatter-line-multiple-axes.png)

### Arrangement of X/Y Axes

You are able to control the arrangement of the X and Y axes by specifying the values at which they cross the primary axes.

###### Example

    xAxis: {
        title: "Engine rpm",
        axisCrossingValue: [0, 2500]
    }


The primary Y axis crosses the X axis at 0 (leftmost). The second, `torque` Y axis crosses the X axis at the 2500 mark or at its right end, whichever comes first.

**Figure 7. A Scatter chart with customized axis-crossing values**

![Scatter line chart with customized axis crossing value](/controls/charts/chart-scatter-line-axis-crossing-value.png)

## Axis Features

### Axis Title

You can add a title to clearly indicate the role of the axis, as demonstrated below.

###### Example

    $("#container").kendoChart({
        title: {
            text: "Average temperature and humidity"
        },
        legend: {
            position: "bottom"
        },
        series: [{
                name: "Temperature",
                data: [20, 25, 32],
                axis: "temperature"
            }, {
                name: "Humidity",
                data: [45, 50, 80],
                axis: "humidity"
        }],
        categoryAxis: {
            categories: ["Aug", "Sep", "Oct"],
            axisCrossingValue: [0, 3]
        },
        valueAxis: [{
            name: "temperature",
            title: {
                text: "Temperature, Celsius"
            }
        }, {
            name: "humidity",
            title: {
                text: "Relative Humidity"
            }
        }]
    });

**Figure 8. A chart with axis titles**

![Chart with axis titles](/controls/charts/chart-axis-titles.png)

### Plot Bands

Each axis can be configured to display bands with different colors for predefined value ranges. The category index (zero based) is used as a value for the category axis.

###### Example

    valueAxis: [{
        name: "temperature",
        title: {
            text: "Temperature, Celsius"
        },
        plotBands: [{
            from: 30,
            to: 40,
            color: "#f99"
        }]
        }, {
        name: "humidity",
        title: {
            text: "Relative Humidity"
        }
    }]


**Figure 9. A chart with axis plot bands**

![Chart with axis plot bands](/controls/charts/chart-plot-bands.png)

### Global Settings

Sometimes you need to apply settings to all axes. In such cases it is convenient to use the [`axisDefaults` object](/api/javascript/dataviz/ui/chart#axisdefaults-object).

###### Example

    $("#chart").kendoChart({
        series: [{
            type: "scatter",
            name: "Pentium D 915",
            data: [[120, 102]]
        }],
        axisDefaults: {
            labels: {
                font: "16px Verdana"
            }
        }
    });

## See Also

Other articles on Kendo UI Charts:

* [Data Binding of the Chart Widgets]({% slug databinding_charts_widget %})
* [Date Series]({% slug dateseries_charts_widget %})
* [Tooltip]({% slug tooltip_charts_widget %})
* [Chart Notes]({% slug chartnotes_charts_widget %})
* [Title and Legend]({% slug titlelegend_features_charts %})
* [Appearance]({% slug appearance_charts_widget %})
* [Error Bars]({% slug errorbars_charts_widget %})
* [Data Series]({% slug seriestypeofcharts_widget %})
* [Types of Kendo UI Charts]({% slug areacharts_widget %})
* [Chart JavaScript API Reference](/api/javascript/dataviz/ui/chart)

For runnable examples on Kendo UI Charts, refer to the [how-to section of articles]({% slug howto_createdynamicplotbands_charts %}).
