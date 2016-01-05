---
title: Date Series
page_title: Date Series | Kendo UI Charts
description: "Learn how to handle date series and date grouping in the Kendo UI Charts."
slug: dateseries_charts_widget
position: 4
---

# Date Series

## Categorical Date Series

Categorical series, such as [Bar](http://demos.telerik.com/kendo-ui/bar-charts/index), [Line](http://demos.telerik.com/kendo-ui/line-charts/index), [Area](http://demos.telerik.com/kendo-ui/area-charts/index) and other Kendo UI Charts, have built-in support for displaying dates. This includes:

* Automatic selection of granularity/base unit (minutes, hours, days, etc.)
* Label formatting matched to the granularity
* Grouping of categories into base units and series aggregates

Specifying categories of type `Date` switches the axis to a date mode. The automatic mode selection can be overridden by setting [`categoryAxis.type`](/api/dataviz/chart#configuration-categoryAxis.type) to `Date`.

### Category Binding

Date series must be bound by using [`categoryField`](/api/dataviz/chart#configuration-series.categoryField). The categories (dates) for all series are sorted and merged during data binding.

### Date Grouping

If the series contain more than one value for a given period (base unit), they are aggregated to display a single value, as demonstrated in the example below.

###### Example

    <div id="chart" style="width: 350px; height: 250px;"></div>
    <script>
    var seriesData = [{
        date: new Date("2011/12/30"),
        value: 20
    }, {
        date: new Date("2011/12/31"),
        value: 40
    }, {
        date: new Date("2012/01/01"),
        value: 45
    }, {
        date: new Date("2012/01/02"),
        value: 30
    }, {
        date: new Date("2012/01/03"),
        value: 50
    }];

    $("#chart").kendoChart({
        dataSource: {
            data: seriesData
        },
        series: [{
            type: "column",
            field: "value",
            categoryField: "date"
        }]
    });
    </script>

Note that the dates match the source.

**Figure 1. A chart with date category axis**

![Chart with date category axis](/controls/charts/chart-category-date-axis.png)

The example below demonstrates date series grouped by year.

###### Example

    <div id="chart" style="width: 350px; height: 250px;"></div>
    <script>
    var seriesData = [{
        date: new Date("2011/12/30"),
        value: 20
    }, {
        date: new Date("2011/12/31"),
        value: 40
    }, {
        date: new Date("2012/01/01"),
        value: 45
    }, {
        date: new Date("2012/01/02"),
        value: 30
    }, {
        date: new Date("2012/01/03"),
        value: 50
    }];

    $("#chart").kendoChart({
        dataSource: {
            data: seriesData
        },
        series: [{
            type: "column",
            field: "value",
            categoryField: "date"
        }],
        categoryAxis: {
            baseUnit: "years"
        }
    });
    </script>

Notice the way the chart now displays the maximum value for each year.

**Figure 2. A chart with a grouped date category axis.**

![Chart with grouped date category axis](/controls/charts/chart-category-date-axis-grouped.png)

### Aggregates

You are able to set the aggregate type for each series. The available options are:

* `min`
* `max` (default)
* `count`
* `sum`
* `avg`
* `first`
* `function` (values, series) (Custom aggregate)

The example below demonstrates how to handle date grouping with the `sum` aggregate.

###### Example

    <div id="chart" style="width: 350px; height: 250px;"></div>
    <script>
    var seriesData = [{
        date: new Date("2011/12/30"),
        value: 20
    }, {
        date: new Date("2011/12/31"),
        value: 40
    }, {
        date: new Date("2012/01/01"),
        value: 45
    }, {
        date: new Date("2012/01/02"),
        value: 30
    }, {
        date: new Date("2012/01/03"),
        value: 50
    }];

    $("#chart").kendoChart({
        dataSource: {
            data: seriesData
        },
        series: [{
            type: "column",
            field: "value",
            categoryField: "date",
            aggregate: "sum"
        }],
        categoryAxis: {
            baseUnit: "years"
        }
    });
    </script>

### Base Units

#### Default Configuration

The default base unit is determined by the smallest duration between categories, as demonstrated below.

###### Example

    categoryAxis: {
        categories: [new Date(2005, 0, 1), new Date(2006, 0, 1)]
        // baseUnit is set to "years"
    }

    categoryAxis: {
        categories: [new Date(2005, 1, 1), new Date(2005, 1, 2)]
        // baseUnit is set to "days"
    }

#### Manual Configuration

The [`baseUnit`](/api/dataviz/chart#configuration-categoryAxis.baseUnit) can be specified manually. The valid options are:

* seconds
* minutes
* hours
* days
* weeks
* months
* years
* fit (see [Automatic fitting](#automatic-fitting))

You can also choose to display every n-th base unit by setting the [`baseUnitStep`](/api/dataviz/chart#configuration-categoryAxis.baseUnitStep) option.

#### Automatic Fitting

Setting the [`baseUnit`](/api/dataviz/chart#configuration-categoryAxis.baseUnit) to `fit`, constraints the total number of base units to [`maxDateGroups`](/api/dataviz/chart#configuration-categoryAxis.baseUnit). The `baseUnit` and `baseUnitStep` are chosen according to the [`autoBaseUnitSteps`](/api/dataviz/chart#configuration-categoryAxis.autoBaseUnitSteps).

The example below demonstrates how to fit the date series.

###### Example

    <div id="chart" style="width: 350px; height: 250px;"></div>
    <script>
    $("#chart").kendoChart({
        dataSource: {
            data: [{
                value: 1,
                date: new Date(2012, 1, 1)
            }, {
                value: 2,
                date: new Date(2012, 2, 1)
            }]
        },
        series:[{
            type: "line",
            field: "value",
            categoryField: "date"
        }],
        categoryAxis: {
            baseUnit: "fit",

            // Constraint number of groups to 5
            maxDateGroups: 5,

            autoBaseUnitSteps: {
                // Would produce 31 groups
                // => Skip to weeks
                days: [1],

                // Not allowed as no steps are defined
                // => Skip to months
                weeks: [],

                // Results in 2 groups
                // => Chosen
                months: [1]
            }
        }
    });
    </script>

#### Labels Format

The date category axis supports specifying one format per base unit.

###### Example

    categoryAxis: {
        labels: {
            dateFormats: {
                days: "M/d"
            }
        }
    }

The [`labels.format` property](/api/dataviz/chart#categoryaxis.labels.format-string) takes priority, if specified. The global `KendoUI` culture is used for formatting the dates. It can be overridden by setting `labels.culture`.

## Scatter Date Series

Scatter series have built-in support for displaying dates. This includes:

* Automatic selection of granularity/base unit (minutes, hours, days, etc.)
* Label formatting matched to the granularity

The X/Y axis switch to a date mode if the series values are of type `Date`. The automatic mode selection can be overridden by specifying `type: "Date"`. The following options accept dates:

* [`min`](/api/dataviz/chart#configuration-xAxis.min)
* [`max`](/api/dataviz/chart#configuration-xAxis.max)
* [`axisCrossingValue`](/api/dataviz/chart#configuration-xAxis.axisCrossingValue)

The following options are expressed in base units:

* [`minorUnit`](/api/dataviz/chart#configuration-xAxis.minorUnit)
* [`majorUnit`](/api/dataviz/chart#configuration-xAxis.majorUnit)

### Base Units

#### Default Configuration

The default base unit is determined by the axis (or series) range, as demonstrated below.

###### Example

    xAxis: {
        min: new Date(2005, 0, 1),
        max: new Date(2006, 0, 1)
        // baseUnit is set to "years"
    }

    xAxis: {
        min: new Date(2005, 1, 1),
        max: new Date(2005, 1, 2)
        // baseUnit is set to "days"
    }

#### Manual Configuration

The base unit can also be specified manually. The valid options are:

* seconds
* minutes
* hours
* days
* weeks
* months
* years

#### Labels Format

The date axis supports specifying one format per base unit.

###### Example

    xAxis: {
        labels: {
            dateFormats: {
                days: "M/d"
            }
        }
    }

The [`labels.format` property](/api/dataviz/chart#xAxis.labels.format) takes priority, if specified. The global `KendoUI` culture is used for formatting the dates. It can be overriden by setting [`labels.culture` property](/api/dataviz/chart#xAxis.labels.culture).

## See Also

Other articles on Kendo UI Charts:

* [Overview of the Chart Widgets]({% slug overview_kendoui_charts_widget %})
* [Data Binding]({% slug databinding_charts_widget %})
* [Tooltip]({% slug tooltip_charts_widget %})
* [Chart Notes]({% slug chartnotes_charts_widget %})
* [Title and Legend]({% slug titlelegend_features_charts %})
* [Appearance]({% slug appearance_charts_widget %})
* [Error Bars]({% slug errorbars_charts_widget %})
* [Data Series]({% slug seriestypeofcharts_widget %})
* [Types of Kendo UI Charts]({% slug areacharts_widget %})
* [Chart JavaScript API Reference](/api/javascript/dataviz/ui/chart)
