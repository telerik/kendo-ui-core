---
title: Series Chart
page_title: Series in Kendo UI Chart  widget
description: How to use different series of data of a specified type, combine series to be shown in a single chart.
---

## Defining Series

The Chart plots one or more series of data of a specified type. Series are defined by adding them to the "series" array.

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


In this example we have defined two Bar series bound to inline data.

### Default options

Users can specify options to be applied to all series using "seriesDefaults":

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


In addition, default options can be defined for all series of a specified type:

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


**Note:** Options for individual series take precedence over options specified in seriesDefaults.

## Combining Series

Series of different types can be shown in a single chart. Please note the following limitations:

*   A chart can contain Bar or Column series, but not both.
*   A Pie series can't be used with other series, including other Pie series.
*   Scatter / Scatter Line series can't be used together with other series.
