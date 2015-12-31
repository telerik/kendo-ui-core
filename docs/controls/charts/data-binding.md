---
title: Data Binding
page_title: Data Binding | Kendo UI Charts
description: "Learn how to handle the Kendo UI Charts data binding to inline data and to a data source."
slug: databinding_charts_widget
position: 3
---

# Data Binding

## Bind to Inline Data

The Kendo UI Chart data points can be specified as part of the series definitions. The type of the data points depends on the type of the series.

### Categorical Series

Categorical series, such as [Bar](http://demos.telerik.com/kendo-ui/bar-charts/index), [Line](http://demos.telerik.com/kendo-ui/line-charts/index), [Area](http://demos.telerik.com/kendo-ui/area-charts/index) and other Kendo UI Charts, expect a data point of type `Number`. The category names are populated independently in the category axis.

> **Important**
>
> All series must contain the same number of points in an order identical to the category one.

The example below demonstrates inline binding of column series.

###### Example

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

### Scatter Series

This category of Kendo UI Charts includes the two-dimensional [Scatter](http://demos.telerik.com/kendo-ui/scatter-charts/index) and [Scatter Line](http://demos.telerik.com/kendo-ui/scatter-charts/scatter-line) series. The data point should be an array containing two values&mdash;X and Y, as demonstrated in the example below.

###### Example

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

## Bind to Data Source

The [Kendo UI DataSource component](/framework/datasource/overview) can be used to bind a kendo UI Chart to both local and remote data. It supports variety of formats, including JSON, JSONP, XML, and OData.

### Set the Data Source

The Chart accepts either a DataSource instance, or an object with the DataSource options.

The example below demonstrates how to set the DataSource configuration.

###### Example

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

The example below demonstrates how to set the DataSource instance.

###### Example

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

### Bind to Remote Data

The Chart can be bound to remote data by configuring the DataSource `transport`. The transport defines the way the DataSource interacts with remote data.

The example below demonstrates how the following JSON string is returned from the `/sales` service.

###### Example

    [{ "year": "2000", "sales": 200 },
      { "year": "2001", "sales": 450 },
      { "year": "2002", "sales": 300 },
      { "year": "2003", "sales": 125 }]


Bind the data source to this service and sort it by year, as demonstrated below.

###### Example

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

### Categorical Series

#### Value Field

Categorical series, such as [Bar](http://demos.telerik.com/kendo-ui/bar-charts/index), [Line](http://demos.telerik.com/kendo-ui/line-charts/index), [Area](http://demos.telerik.com/kendo-ui/area-charts/index) Kendo UI Charts, are bound to a value field. The category names are populated independently by binding the category axis.

> **Important**
>
> All series must contain the same number of points in an order identical to the category one.

The example below demonstrates data-bound categorical series.

###### Example

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

#### Category Field

In addition to value fields, each series allows for specifying a category field. The category values from all series are concatenated and each point is mapped to its category. Point order is not significant. Series points are [aggregated](/api/dataviz/chart#configuration-series.aggregate) to produce one value per category.

The example below demonstrates how to bind with `categoryField`

###### Example

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

### Scatter Series

Scatter series are bound to the fields specified as `xField` and `yField`, as demonstrated below.

###### Example

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


## See Also

Other articles on Kendo UI Charts:

* [Chart Overview]({% slug overview_kendoui_charts_widget %})
* [Date Series]({% slug dateseries_charts_widget %})
* [Tooltip]({% slug tooltip_charts_widget %})
* [Chart Notes]({% slug chartnotes_charts_widget %})
* [Title and Legend]({% slug titlelegend_features_charts %})
* [Appearance]({% slug appearance_charts_widget %})
* [Error Bars]({% slug errorbars_charts_widget %})
* [Data Series]({% slug seriestypeofcharts_widget %})
* [Types of Kendo UI Charts]({% slug areacharts_widget %})
* [Chart JavaScript API Reference](/api/javascript/dataviz/ui/chart)
