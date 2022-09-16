---
title: Axes Configuration
page_title: jQuery Sparkline Charts Documentation | Axes Configuration
description: "Get started with the jQuery Sparkline by Kendo UI and learn how to configure their axes."
slug: axes_kendoui_sparklinescharts
position: 3
---

# Axes Configuration

The Sparkline widget is a categorical (discrete) chart and has an implicit category and a value axis.

The axis orientation (horizontal or vertical) is inferred from the series type.

## Setting the Category Axis

While category names are not visible by default, they are displayed in tooltips.

The following example demonstrates how to use the `categoryAxis` object to set the category names.

    <span id="sparkline"></span>
    <script>
    $("#sparkline").kendoSparkline({
        series: [{
            name: "World",
            data: [15.7, 16.7, 20, 23.5, 26.6]
        }],
        categoryAxis: {
            categories: [2005, 2006, 2007, 2008, 2009]
        }
    });
    <script>

You can also bind the category name to a field of the data item.

    <span id="sparkline"></span>
    <script>
    var internetUsers = [ {
        "country": "United States",
        "year": "2005",
        "value": 67.96
        }, {
        "country": "United States",
        "year": "2006",
        "value": 68.93
    }];

    $("#sparkline").kendoSparkline({
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
    </script>

### Displaying Dates

The category axis provides built-in support for displaying dates. This includes:

* Automatic selection of granularity/base unit (minutes, hours, days, and so on)
* Label formatting matched to the granularity
* Grouping of categories into base units and series aggregates

Specifying categories of type `Date` switches the axis to a date mode. The automatic mode selection can be overridden by specifying `type: "Date"`.

### Setting Base Units

To set the base units in the Sparkline chart, use any of the following approaches:

* [Default configuration](#default-configuration)
* [Manual configuration](#manual-configuration)
* [Series aggregates](#series-aggregates)The category axis provides built-in support for displaying dates. This includes:

#### Default Configuration

To determine a default base, use the smallest duration between categories.

    categoryAxis: {
        categories: [new Date(2005, 0, 1), new Date(2006, 0, 1)]
        // baseUnit is set to "years"
    }

    categoryAxis: {
        categories: [new Date(2005, 1, 1), new Date(2005, 1, 2)]
        // baseUnit is set to "days"
    }

#### Manual Configuration

You can also manually specify the [`baseUnit`](/api/javascript/dataviz/ui/chart/configuration/categoryaxis.baseunit).

The following options are valid:

* Minutes
* Hours
* Days
* Months
* Years

#### Series Aggregates

If two or more categories fall within a base unit, its values are aggregated to display a single point.

  span id="sparkline"></span>
    <script>
    $("#sparkline").kendoSparkline({
        series: [{
            type: "column",
            data: [20, 40, 45, 30, 50]
        }],
        categoryAxis: {
            categories: [
                new Date("2011/12/30"),
                new Date("2011/12/31"),
                new Date("2012/01/01"),
                new Date("2012/01/02"),
                new Date("2012/01/03")
            ]
        }
    });
    </script>

The code from the previous example results in the following Sparkline chart. Note that values are displayed as are.

![Sparkline with a date category axis](sparkline-category-date-axis.png)

The following example demonstrates the Sparkline with its base unit changed to `"years"`.

    categoryAxis: {
        baseUnit: "years",
        categories: [
            new Date("2011/12/30"),
            new Date("2011/12/31"),
            new Date("2012/01/01"),
            new Date("2012/01/02"),
            new Date("2012/01/03")
        ]
    }

The following example demonstrates a Sparkline with a grouped date category axis. Note the way the Sparkline displays the maximum value for each year.

![Sparkline with a grouped date category axis](sparkline-category-date-axis-grouped.png)

You can also change the aggregate function for each series.

    series: [{
        aggregate: "sum",
        type: "column",
        data: [20, 40, 45, 30, 50]
    }]

The available options are:

* `min`
* `max`
* `count`
* `sum`
* `avg`
* `function` (values, series; custom aggregate)

## Setting the Value Axis

The Sparkline currently supports only Numeric value axes.

### Getting Started

To access the configuration options, use the [`valueAxis`](/api/dataviz/sparkline#valueaxis-object) object. The following example configures a numeric axis with a minimum value of `0` and a maximum value of `100`.

    <span id="sparkline"></span>
    <script>
    $("#sparkline").kendoSparkline({
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
    </script>

### Setting the Plot Bands

You can configure each axis to display bands with different colors for predefined value ranges. The category index (zero based) is used as a value for the category axis.

    <span id="sparkline"></span>
    <script>
    $("#sparkline").kendoSparkline({
        data: [15.7, 16.7, 20, 23.5, 26.6],
        valueAxis: {
            plotBands: [{
                from: 0,
                to: 20,
                color: "#f99"
            }]
        }
    });
    </script>

## See Also

* [Basic Usage of the Sparkline (Demo)](https://demos.telerik.com/kendo-ui/sparklines/index)
* [JavaScript API Reference of the Sparkline](/api/javascript/dataviz/ui/sparkline)
