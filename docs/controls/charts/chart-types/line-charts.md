---
title: Line Chart
page_title: Line chart widget in Kendo UI DataViz
description: Step-by-step instructions how to create a line chart in Kendo UI DataViz, configuration of a line chart.
---

## Line Charts

Use "line" series type to create a line chart. The chart orientation can be changed using "verticalLine".

    $("#chart").kendoChart({
        title: {
            text: "Internet Users"
        },
        legend: {
            position: "bottom"
        },
        seriesDefaults: {
            type: "line"
        },
        series: [{
            name: "World",
            data: [15.7, 16.7, 20, 23.5, 26.6]
        }, {
            name: "United States",
            data: [67.96, 68.93, 75, 74, 78]
        }],
        valueAxis: {
            labels: {
                format: "{0}%"
            }
        },
        categoryAxis: {
            categories: [2005, 2006, 2007, 2008, 2009]
        }
    });


This configuration produces the following line chart:

![Line Chart](/dataviz/chart/chart-types/chart-line.png)

## Dash type

The default line type is solid. The following dash styles are available through the "dashType" option:

![Dash Type](/dataviz/chart/chart-types/chart-dash-types.png)


For example:

    series: [{
        name: "World",
        data: [15.7, 16.7, 20, 23.5, 26.6],
        dashType: "dot"
    }]

## Style

The line chart supports rendering the lines between the points with different styles. The supported styles are "normal", "step" and "smooth" and can be set with the [style](/api/dataviz/chart#configuration-series.style) option. The default style is "normal" and will produce a straight line between the data points. When the style is set to "step", the data points will be connected only with vertical and horizontal lines. This style can be used to indicate that the value is constant between the changes. 
 
![Step Line Chart](/dataviz/chart/chart-types/chart-step-line.png)

When the style is set to "smooth", the chart will display a fitted curve through the data points. The "smooth" style can be used if the data requires to be displayed with a curve or you just wish to connect the points with smooth instead of straight lines. 

![Smooth Line Chart](/dataviz/chart/chart-types/chart-smooth-line.png)
