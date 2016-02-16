---
title: Overview
page_title: Overview | Kendo UI Sparklines
description: "Learn how to create the Kendo UI Sparklines and explore its major features."
slug: overview_kendoui_sparklinescharts
position: 1
---

# Sparklines Overview

The [Kendo UI Sparklines widget](http://demos.telerik.com/kendo-ui/sparklines/index) is a very small chart, drawn without axes, coordinates, legends, titles or other chart-specific elements. It behaves like an inline element, as it is rendered inside a `span`, as opposed to the standard Kendo UI Charts, which behave like block elements, as they are rendered inside `div` elements, so that it can be easily embedded in text.

Generally, the Sparklines are simple, word-sized graphics that can be embedded in chunks of text, tables, or headlines. The concept for such graphics was developed by [Edward Tufte](https://en.wikipedia.org/wiki/Edward_Tufte).

The Kendo UI Sparklines widget is a version of the Kedno UI Chart widget, tailored for this specific application. While Sparklines are typically line charts, other types are supported as well:

*   Line (default)
*   Bar (Data Bars)
*   Column
*   Area
*   Pie
*   Bullet

For additional information on new Kendo UI Chart types and features, refer to the [Kendo UI Roadmap](http://www.telerik.com/support/whats-new/kendo-ui-web/roadmap).

## Getting Started

### Create the Sparklines

To create the Sparklines, add an empty `span` in the HTML, provide it with an ID, and, optionally, set the width and height of the desired chart inline or via CSS, as demonstrated in the example below.

###### Example

    <span id="sparkline" style="line-height: 60px"></span>

> **Important**
> * The width of the line, area, and column Sparklines is determined by the number of data points.
> * Bar and Bullet graphs have a default width that can be overridden via CSS.
> * The Pie width equals the line-height to make a square.

### Initialize the Sparklines

The Kendo UI Sparklines widget is rendered by selecting the `span` with a jQuery selector and calling the `kendoSparkline()` function, as demonstrated below.

###### Example

    $("#sparkline").kendoSparkline([1, 2, 3, 2, 1]);

## Data Binding

The Sparklines can visualize series bound to both local and remote data.

### Bind to Local Data

Binding to local data can be done through:

* Passing an array with values to the widget constructor.
* Setting the root-level `data` field to an array with values.
* Configuring a series and setting its `data` option.

###### Example

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

### Bind to Remote Data

For detailed information on remote data binding, refer to the article on [binding Kendo UI Charts to a Data Source]({% slug databinding_charts_widget %}).

## Axes

The Sparklines widget is a categorical (discrete) chart and has an implicit category and a value axis. The axis orientation (horizontal or vertical) is inferred from the series type.

### Category Axis

While category names are not visible by default, they are displayed in tooltips.

The example below demonstrates how to use the `categoryAxis` object to set the category names.

###### Example

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

The category name can also be bound to a field of the data item.

###### Example

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

#### Date display

The category axis provides built-in support for displaying dates. This includes:

* Automatic selection of granularity/base unit (minutes, hours, days, etc.)
* Label formatting matched to the granularity
* Grouping of categories into base units and series aggregates

Specifying categories of type `Date` switches the axis to a date mode. The automatic mode selection can be overridden by specifying `type: "Date"`.

#### Base Units

##### Default configuration

The default base unit is determined by the smallest duration between categories, as demonstrated in the example below.

###### Example

    categoryAxis: {
        categories: [new Date(2005, 0, 1), new Date(2006, 0, 1)]
        // baseUnit is set to "years"
    }

    categoryAxis: {
        categories: [new Date(2005, 1, 1), new Date(2005, 1, 2)]
        // baseUnit is set to "days"
    }

##### Manual configuration

The [`base unit`](/api/javascript/dataviz/ui/chart#configuration-categoryAxis.baseUnit) can also be specified manually. The valid options are:

* minutes
* hours
* days
* months
* years

#### Series Aggregates

If more than one category falls within a base unit, then its values are aggregated to display a single point, as demonstrated in the example below.

###### Example

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

This code results in the following Sparklines. Note that values are displayed as are.

**Figure 1. Sparklines with a date category axis**

![Sparkline with date category axis](/controls/charts/sparkline/sparkline-category-date-axis.png)

The example below demonstrates the Sparklines with its base unit changed to `"years"`.

###### Example

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

Notice below how the Sparklines display the maximum value for each year.

**Figure 2. Sparklines with a grouped date category axis**

![Sparkline with grouped date category axis](/controls/charts/sparkline/sparkline-category-date-axis-grouped.png)

The aggregate function can be changed for each series, as demonstrated below.

###### Example

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
* `function` (values, series) (Custom aggregate)

### Value Axis

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

#### Plot Bands

Each axis can be configured to display bands with different colors for predefined value ranges. The category index (zero based) is used as a value for the category axis, as demonstrated in the example below.

###### Example

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

Other articles on Kendo UI Charts and chart types:

* [Overview of the Chart Widgets]({% slug overview_kendoui_charts_widget %})
* [Data Series Charts]({% slug seriestypeofcharts_widget %})
* [Area Charts]({% slug areacharts_widget %})
* [Bar Charts]({% slug bartypeofcharts_widget %})
* [Bubble Charts]({% slug bubblecharts_widget %})
* [Funnel Charts]({% slug funnelcharts_widget %})
* [Line Charts]({% slug linetypeoscharts_widget %})
* [Pie Charts]({% slug pietypecharts_widget %})
* [Scatter Charts]({% slug scattercharts_widget %})
* [Stock Charts]({% slug overview_kendoui_stockcharts %})
* [TreeMap]({% slug overview_treemap_widget %})
* [Sparklines JavaScript API Reference](/api/javascript/dataviz/ui/sparkline)
