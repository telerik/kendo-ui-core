---
title: Date Series
page_title: Working with date series in Kendo UI Javascript Chart widget
description: How to handle date series and date grouping in Chart UI widget.
position: 3
---

# Date Series

* [Categorical date series](#categorical-date-series)

    * [Category binding](#category-binding)
    * [Date grouping](#date-grouping)
    * [Aggregates](#aggregates)
    * [Base units](#base-units)

* [Scatter date series](#scatter-date-series)

## Categorical date series

Categorical series have built-in support for displaying dates. This includes:

* Automatic selection of granularity/base unit (minutes, hours, days, etc.)
* Label formatting matched to the granularity
* Grouping of categories into base units and series aggregates

Specifying categories of type Date will switch the axis to date mode.

The automatic mode selection can be overriden by setting
[categoryAxis.type](/api/dataviz/chart#configuration-categoryAxis.type) to "Date".

### Category binding

Date series should be bound using
[categoryField](/api/dataviz/chart#configuration-series.categoryField).

The categories (dates) for all series will be sorted and merged during data binding.

### Date grouping

If series contain more than one value for a given period (base unit),
then they'll be aggregated to display a single value.

#### Example: Date series

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

Note that the dates match the source:

![Chart with date category axis](/dataviz/chart/chart-category-date-axis.png)

#### Example: Date series with grouping by year

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

Notice how the chart now displays the maximum value for each year:

![Chart with grouped date category axis](/dataviz/chart/chart-category-date-axis-grouped.png)

### Aggregates

The aggregate type can be set for each series. Available options are:

* min
* max (default)
* count
* sum
* avg
* first
* function (values, series) (Custom aggregate)

#### Example: Date grouping with "sum" aggregate

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

### Base units

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

The [baseUnit](/api/dataviz/chart#configuration-categoryAxis.baseUnit) can be specified manually.
Valid options are:

* seconds
* minutes
* hours
* days
* weeks
* months
* years
* fit (see [Automatic fitting](#automatic-fitting))

You can also choose to show every n-th base unit by setting the
[baseUnitStep](/api/dataviz/chart#configuration-categoryAxis.baseUnitStep)
option.

#### Automatic fitting

Setting [baseUnit](/api/dataviz/chart#configuration-categoryAxis.baseUnit)
to "fit" will constraint the total number of base units to
[maxDateGroups](/api/dataviz/chart#configuration-categoryAxis.baseUnit).

The baseUnit and baseUnitStep will be chosen according to
[autoBaseUnitSteps](/api/dataviz/chart#configuration-categoryAxis.autoBaseUnitSteps)

##### Example: Fit date series

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

##### Labels format

The date category axis supports specifying one format per base unit.

    categoryAxis: {
        labels: {
            dateFormats: {
                days: "M/d"
            }
        }
    }

The [`labels.format` property](/api/dataviz/chart#categoryaxis.labels.format-string) takes priority, if specified.

The global KendoUI culture is used for formatting the dates.
It can be overriden by setting `labels.culture`.


## Scatter date series

Scatter series have built-in support for displaying dates.
This includes:

* Automatic selection of granularity/base unit (minutes, hours, days, etc.)
* Label formatting matched to the granularity

The X/Y axis will switch to date mode if the series values are of type Date.
The automatic mode selection can be overriden by specifying `type: "Date"`

The following options accept dates:

* [min](/api/dataviz/chart#configuration-xAxis.min)
* [max](/api/dataviz/chart#configuration-xAxis.max)
* [axisCrossingValue](/api/dataviz/chart#configuration-xAxis.axisCrossingValue)

The following options are expressed in base units:

* [minorUnit](/api/dataviz/chart#configuration-xAxis.minorUnit)
* [majorUnit](/api/dataviz/chart#configuration-xAxis.majorUnit)

### Base Units

The default base unit is determined from the axis (or series) range.
For example:

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

The base unit can also be specified manually. Valid options are:

* seconds
* minutes
* hours
* days
* weeks
* months
* years

#### Labels format

The date axis supports specifying one format per base unit.

    xAxis: {
        labels: {
            dateFormats: {
                days: "M/d"
            }
        }
    }

The [`labels.format` property](/api/dataviz/chart#xAxis.labels.format) property takes priority, if specified.

The global KendoUI culture is used for formatting the dates.
It can be overriden by setting [`labels.culture` property](/api/dataviz/chart#xAxis.labels.culture).

