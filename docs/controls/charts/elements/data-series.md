---
title: Data Series
page_title: jQuery Chart Documentation | Data Series
description: "Get started with the jQuery Chart by Kendo UI and learn how to plot one or more specified data series."
previous_url: /controls/charts/series
slug: seriestypeofcharts_widget
---

# Data Series

You can plot one or more data series of a specified type in the Kendo UI Chart.

## Getting Started

To define the data series, add them to the `series` array.

The following example demonstrates how to define two Bar series that are bound to inline data.

    $("#chart").kendoChart({
        series: [{
            type: "bar",
            name: "World",
            data: [15.7, 16.7, 20, 23.5, 26.6]
        }, {
            type: "bar",
            name: "United States",
            data: [67.96, 68.93, 75, 74, 78]
        }],
        categoryAxis: {
            categories: [2005, 2006, 2007, 2008, 2009]
        }
    });


## Applying Default Options

To specify the options that will be applied to all series, use `seriesDefaults`.

> Options for individual series take precedence over the options that are specified in `seriesDefaults`.

    $("#chart").kendoChart({
        seriesDefaults: {
            type: "bar"
        },
        series: [{
            name: "World",
            data: [15.7, 16.7, 20, 23.5, 26.6]
        }, {
            name: "United States",
            data: [67.96, 68.93, 75, 74, 78]
        }],
        categoryAxis: {
            categories: [2005, 2006, 2007, 2008, 2009]
        }
    });

You can also define default options for all series of a specified type.

    $("#chart").kendoChart({
        seriesDefaults: {
            type: "bar",
            bar: {
                color: "#f00"
            }
        },
        series: [{
            name: "World",
            data: [15.7, 16.7, 20, 23.5, 26.6]
        }, {
            name: "United States",
            data: [67.96, 68.93, 75, 74, 78]
        }],
        categoryAxis: {
            categories: [2005, 2006, 2007, 2008, 2009]
        }
    });


## Combining Data Series

You can display series of different types in a single chart.

## Known Limitations

* The Kendo UI Chart can contain either Bar or Column series but not both of them.
* A Pie series cannot be used with other series including other Pie series.
* Scatter and Scatter Line series cannot be used together with other series.

## See Also

* [Using the API of the Chart (Demo)](https://demos.telerik.com/kendo-ui/chart-api/index)
* [JavaScript API Reference of the Chart](/api/javascript/dataviz/ui/chart)
