---
title: Data Series
page_title: Data Series | Kendo UI Charts
description: "Learn how to create Kendo UI Series Charts by using different data series."
slug: seriestypeofcharts_widget
position: 2
---

# Data Series

The [Kendo UI Charts](http://demos.telerik.com/kendo-ui/) plot one or more data series of a specified type.

## Configuration

### Define Data Series

Data series are defined by adding them to the `series` array.

The example below demonstrates how to define two Bar series bound to inline data.

###### Example

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


### Apply Default Options

Users can specify options to be applied to all series by using `seriesDefaults`, as demonstrated below.

###### Example

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


In addition, default options can be defined for all series of a specified type.

###### Example

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


> **Important**
>
> Options for individual series take precedence over options specified in `seriesDefaults`.

### Combine Data Series

Series of different types can be displayed in a single chart.

## Known Limitations

* A Kendo UI Chart can contain either Bar, or Column series, but not both of them.
* A Pie series cannot be used with other series, including other Pie series.
* Scatter and Scatter Line series cannot be used together with other series.

## See Also

Other articles on Kendo UI Charts:

* [Overview of the Chart Widgets]({% slug overview_kendoui_charts_widget %})
* [Data Binding]({% slug databinding_charts_widget %})
* [Date Series]({% slug dateseries_charts_widget %})
* [Tooltip]({% slug tooltip_charts_widget %})
* [Chart Notes]({% slug chartnotes_charts_widget %})
* [Title and Legend]({% slug titlelegend_features_charts %})
* [Appearance]({% slug appearance_charts_widget %})
* [Error Bars]({% slug errorbars_charts_widget %})
* [Types of Kendo UI Charts]({% slug areacharts_widget %})
* [Chart JavaScript API Reference](/api/javascript/dataviz/ui/chart)
