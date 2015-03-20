---
title: Overview
page_title: Documentation for Sparkline widget in Kendo UI DataViz
description: How to create a sparkline, enable the visualization of a series that displays inline data, explore the quick overview of Sparkline widget major features.
---

# Sparkline Overview

## Getting started

Sparklines are simple, word-sized graphics that can be embedded in text, tables or headlines.
The concept for such graphics was developed by Edward Tufte.

Kendo UI Sparkline is a version of the Chart widget tailored for this specific application.

While sparklines are typically line charts, other types are supported as well:

*   Line (default)
*   Bar (Data Bars)
*   Column
*   Area
*   Pie
*   Bullet

Please visit the [Kendo UI Roadmap](http://www.telerik.com/support/whats-new/kendo-ui-web/roadmap) for additional information about
new Sparkline types and features.

### Creating a Sparkline

To create a sparkline, add an empty span in the HTML and give it an ID.

#### Example

    <span id="sparkline"></span>

Optionally, set the line-height of the desired sparkline inline or with CSS.

Notes:
* The width of line, area and column sparklines is determined by the number of data points.
* Bar and Bullet graphs have a default width that can be overriden with CSS.
* The Pie width equals the line-height to make a square.

#### Example

    <span id="sparkline" style="line-height: 60px"></span>

The sparkline is rendered by selecting the span with a jQuery selector and calling the kendoSparkline() function.

#### Example

    $("#sparkline").kendoSparkline([1, 2, 3, 2, 1]);

### Data Binding

The Sparklines can visualize series bound to both local and remote data.

#### Binding to local data

Binding to local data can be done by:

* Passing an array with values to the widget constructor
* Setting the root-level *data* field to an array with values
* Configuring a series and setting its *data* option

#### Example

    // The following configurations are identical

    $("#sparkline").kendoSparkline([200, 450, 300, 125]);

    $("#sparkline").kendoSparkline({
        type: "line",
        data: [200, 450, 300, 125]
    });

    $("#sparkline").kendoSparkline({
        series: [{
            type: "line",
            data: [200, 450, 300, 125]
        }]
    });

#### Binding to remote data

See [Binding to a Data Source](/dataviz/chart/data-binding#binding-to-a-data-source)

## Axes

Sparklines are categorical (discrete) charts and have an implicit category and value axis.
The awareness for their existence is important even though they are not typically visible.

The axis orientation (horizontal or vertical) is inferred from the series type.

### Category axis

While category names are not visible (by default), they will be displayed in tooltips.

Use the categoryAxis object to set the category names:

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

The category name can also be bound to a field of the data item:

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

#### Displaying Dates

The category axis provides built-in support for displaying dates. This includes:

* Automatic selection of granularity/base unit (minutes, hours, days, etc.)
* Label formatting matched to the granularity
* Grouping of categories into base units and series aggregates

Specifying categories of type Date will switch the axis to date mode.
The automatic mode selection can be overriden by specifying `type: "Date"`

##### Base Unit

The default base unit is determined from the smallest duration between categories.
For example:

    categoryAxis: {
        categories: [new Date(2005, 0, 1), new Date(2006, 0, 1)]
        // baseUnit is set to "years"
    }

    categoryAxis: {
        categories: [new Date(2005, 1, 1), new Date(2005, 1, 2)]
        // baseUnit is set to "days"
    }

The base unit can also be specified manually. Valid options are:

* minutes
* hours
* days
* months
* years

##### Series Aggregates

If more than one category falls within a base unit, then its
values are aggregated to display a single point.

For example:

    <span id="sparkline"></span>
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

Produces the following sparkline. Note that values are displayed as-is:

![Sparkline with date category axis](/dataviz/sparkline/sparkline-category-date-axis.png)

Now change the base unit to "years":

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

Notice how the sparkline now displays the maximum value for each year:

![Sparkline with grouped date category axis](/dataviz/sparkline/sparkline-category-date-axis-grouped.png)

The aggregate function can be changed for each series:

    series: [{
        aggregate: "sum",
        type: "column",
        data: [20, 40, 45, 30, 50]
    }]

Available options are:

* min
* max
* count
* sum
* avg
* function (values, series) (Custom aggregate)

### Value axis

The Sparkline currently supports only Numeric value axes.

Configuration options are accessible through the [`valueAxis` object](/api/dataviz/sparkline#valueaxis-object):

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


Here we have configured a Numeric axis with a minimum value of 0 and a maximum value of 100.

## Plot Bands

Each axis can be configured to display bands with different colors for predefined value ranges.

The category index (zero based) is used as a value for the category axis.

For example:

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

