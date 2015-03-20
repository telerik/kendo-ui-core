---
title: Data Binding
page_title: Overview of data binding in Kendo UI Javascript Chart widget
description: How to handle binding to inline data, binding to a data source in Chart UI widget.
position: 2
---

# Data Binding

## Contents

* [Binding to inline data](#binding-to-inline-data)

    * [Categorical series](#categorical-series)
    * [Scatter series](#scatter-series)

* [Binding to a Data Source](#binding-to-a-data-source)

    * [Setting a Data Source](#specifying-a-data-source)
    * [Binding to local data](#binding-to-local-data)
    * [Binding to remote data](#binding-to-remote-data)
    * [Data-bound categorical series](#data-bound-categorical-series)
    * [Data-bound scatter series](#data-bound-scatter-series)

## Binding to inline data

The chart data points can be specified as part of the series definitions. The type of the data points depends on the type of the series.

### Categorical series

Categorical series such as bar, line, area, etc. expect a data point of type Number.
The category names are populated independently in the category axis.

> All series must contain the same number of points in order identical .

#### Example: Inline binding of column series
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
        series: [{
            name: "Series 1",
            type: "column",
            data: [200, 450, 300, 125, 100]
        }, {
            name: "Series 2",
            type: "column",
            data: [210, null, 200, 100, null]
        }],
        categoryAxis: {
            categories: ["Mon", "Tue", "Wed", "Thu", "Fri"]
        }
    });
    </script>

### Scatter series

This category includes the two-dimensional scatter and scatter line series. The data point should be an array containing two values - X and Y.

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
        series: [{
            name: "Example Series",
            type: "scatterLine",
            data:[[0, 0], [1, 1]]
        }]
    });
    </script>

## Binding to a Data Source

The DataSource component can be used to bind the Chart to both local and remote data.
It supports variety of formats, including JSON, JSONP, XML, and OData.

### Setting a Data Source

The Chart will accept either a DataSource instance or an object with the DataSource options.

#### Example: Set Data Source configuration

    <div id="chart"></div>
    <script>
        var seriesData = [
            { sales: 200 }, { sales: 450 },
            { sales: 300 }, { sales: 125 }
        ];

        $("#chart").kendoChart({
            dataSource:{
                data: seriesData
            },
            series: [{
                field: "sales"
            }]
        });
    </script>

#### Example: Set Data Source instance

    <div id="chart"></div>
    <script>
        var seriesData = [
            { sales: 200 }, { sales: 450 },
            { sales: 300 }, { sales: 125 }
        ];

        var ds = new kendo.data.DataSource({
             data: seriesData
        });

        $("#chart").kendoChart({
            dataSource: ds,
            series: [{
                field: "sales"
            }]
        });
    </script>

### Binding to remote data

The chart can be bound to remote data by configuring the DataSource `transport`. The transport defines how the DataSource will interact with remote data.

In the below example, the following JSON string is returned from the "/sales" service.

#### Example: Sample JSON
    [{ "year": "2000", "sales": 200 },
      { "year": "2001", "sales": 450 },
      { "year": "2002", "sales": 300 },
      { "year": "2003", "sales": 125 }]

We will bind the data source to this service and sort it by year.

#### Example: Remote binding
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
        dataSource: {
            transport: {
                read: {
                    url: "/sales",
                    dataType: "json"
                }
            },
            sort: {
                field: "year",
                dir: "asc"
            }
        }
    });
    </script>

### Data-bound categorical series

Categorical series such as bar, line and area are bound to a value field.
The category names are populated independently by binding the category axis.

> All series must contain the same number of points in order identical to the category order.

#### Example: Data-bound categorical series
    <div id="chart"></div>
    <script>
    var seriesData = [{
        year: "2000",
        sold: 100,
        produced: 200
    }, {
        year: "2001",
        sold: 250,
        produced: 280
    }];

    $("#chart").kendoChart({
        dataSource: {
            data: seriesData
        },
        series: [{
            name: "Sold",
            field: "sold"
        }, {
            name: "Producted",
            field: "produced"
        }],
        categoryAxis: {
            field: "year"
        }
    });
    </script>

#### Category binding

In addition to value field(s), each series can specify a category field.

The category values from all series will be concatenated and each point will be mapped to its category.
Point order is not significant.

Series points will be [aggregated](/api/dataviz/chart#configuration-series.aggregate) to produce one value per category.

##### Example: Binding with categoryField
    <div id="chart"></div>
    <script>
    var seriesData = [{
        year: "2000",
        sold: 100,
        product: "A"
    }, {
        year: "2001",
        sold: 150,
        product: "A"
    }, {
        year: "2000",
        sold: 200,
        product: "B"
    }];

    $("#chart").kendoChart({
        title: {
            text: "Sales summary"
        },
        dataSource: {
            data: seriesData
        },
        series: [{
            field: "sold",
            categoryField: "year",
            aggregate: "sum"
        }]
    });
    </script>

### Data-bound scatter series

Scatter series are bound to the fields specified as "xField" and "yField".

#### Example: Binding scatter series
    <div id="chart"></div>
    <script>
    var xyData = [{
        x: 10, y: 20,
    }, {
        x: 100, y: 200
    } ];

    $("#chart").kendoChart({
        dataSource: {
            data: xyData
        },
        series: [{
            type: "scatter",
            xField: "x",
            yField: "y"
        }]
    });
    </script>

