---
title: Data Binding
page_title: jQuery Chart Documentation | Data Binding
description: "Get started with the jQuery Chart by Kendo UI and learn how to bind it to inline data and to a data source."
previous_url: /controls/charts/chart/data-binding
slug: databinding_charts_widget
position: 2
---

# Data Binding

You can populate the Kendo UI Chart with data by [binding it to inline data](#inline-data) and [binding it to a data source](#data-source).

## Inline Data

You can specify the data points of the Charts as part of the series definitions. The type of the data points depends on the type of the series.

Binding the Chart to arrays of values is the fastest form of data binding where the values are provided as an array for each series. However, you are not allowed to add metadata to the data points and the array will contain only the values which will be plotted.

Binding the Chart to arrays of objects is a more flexible alternative which enables you to configure the fields for each series as they cannot be inferred as is the case with the simple arrays. The major benefit of this approach is that you can associate metadata with the series points. It is also possible to combine the data for many series in a single object.

* [Binding categorical series to inline data](#binding-categorical-series-to-inline-data)
* [Binding scatter series to inline data](#binding-scatter-series-to-inline-data)
* [Binding categorical series to arrays of objects](#binding-categorical-series-to-arrays-of-objects)
* [Binding scatter series to arrays of objects](#binding-scatter-series-to-arrays-of-objects)

### Binding Categorical Series to Inline Data

[Categorical series]({% slug htmlhelpers_categoricalcharts_aspnetcore %}), such as Bar, Line, or Area, expect a data point of a numeric type. The category names are populated independently in the category axis.

> To keep the Chart consistent, all series have to contain the same number of points in an order that matches the order of the categories which are declared in `categoryAxis`.

```dojo
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
```

### Binding Scatter Series to Inline Data

[Scatter series]({% slug scattercharts_widget %}) include the two-dimensional Scatter and ScatterLine series. Each data point in the series has to be an array which contains an X and a Y value.

```dojo
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
```

### Binding Categorical Series to Arrays of Objects

You can also supply the Chart with objects and specify fields to which the series will be bound. This approach allows you to access additional fields, for example, in tooltips.

```dojo
    <div id="chart"></div>
    <script>
    var seriesData = [
        { day: "Mon", sales1: 200, sales2: 210 },
        { day: "Tue", sales1: 450 },
        { day: "Wed", sales1: 300, sales2: 200 },
        { day: "Thu", sales1: 125, sales2: 100 },
        { day: "Fri", sales1: 100 }
    ];

    $("#chart").kendoChart({
        series: [{
            name: "Series 1",
            type: "column",
            data: seriesData,
            field: "sales1"
        }, {
            name: "Series 2",
            type: "column",
            data: seriesData,
            field: "sales2"
        }],
        categoryAxis: {
            categoryField: "day"
        }
    });
    </script>
```

### Binding Scatter Series to Arrays of Objects

To bind a scatter series to an array of objects, the data point has to be an array with X and Y values.

```dojo
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
```

## Data Source

The most powerful form of data binding is to use the [Kendo UI DataSource component](/framework/datasource/overview). The Data Source supports binding to both local and remote data in various formats and using various transport protocols such as JSON, XML, JSONP, and oData. The usage of the DataSource incurs a performance overhead. For more information, refer to the article on [performance tips]({% slug tipsandtricks_kendouistyling %}).

* [Setting the data source](#setting-the-data-source)
* [Binding to remote data](#binding-to-remote-data)
* [Binding to grouped data](#binding-to-grouped-data)
* [Binding categorical series to a value field](#binding-categorical-series-to-a-value-field)
* [Binding categorical series to a category field](#binding-categorical-series-to-a-category-field)
* [Binding scatter series to a data source](#binding-scatter-series-to-a-data-source)

### Setting the Data Source

The Chart accepts either a DataSource instance or an object with the DataSource options.

```dojo
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
```

The following example demonstrates how to set the DataSource instance.

```dojo
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
```

### Binding to Remote Data

You can bind the Chart to remote data by configuring the DataSource `transport` which defines the way the DataSource interacts with remote data.

The following example demonstrates how the following JSON string is returned from the `/sales` service.

    [{ "year": "2000", "sales": 200 },
      { "year": "2001", "sales": 450 },
      { "year": "2002", "sales": 300 },
      { "year": "2003", "sales": 125 }]

The following example demonstrates how to bind the data source to this service and sort it by year.

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

### Binding to Grouped Data

The Chart enables you to bind it to grouped data and creates the categories depending on the first group.

> All series must contain the same number of points. If a different number of points in the `series.categoryField` exists, use groups instead of `categoryAxis.field`.

```dojo
    <div id="chart"></div>
    <script>
    var data =  [
          { "group": "Group 1", "value": 200, "category": "category 1" },
          { "group": "Group 2", "value": 400, "category": "category 1"  },
          { "group": "Group 3", "value": 500, "category": "category 1"  },
          { "group": "Group 1", "value": 300, "category": "category 2" },
          { "group": "Group 2", "value": 600, "category": "category 4" },
          { "group": "Group 3", "value": 500, "category": "category 2" },
          { "group": "Group 1", "value": 100, "category": "category 3" },
          { "group": "Group 3", "value": 200, "category": "category 4" }]

    $("#chart").kendoChart({
        dataSource: {
            data: data,
            group: {
                field: "group"
            },
            sort: {
                field: "category",
                dir: "asc"
            }
        },
        series: [{
            type: "column",
            field: "value",
            categoryField: "category"
        }]
    });
    </script>
```

### Binding Categorical Series to a Value Field

You can bind categorical series to a value field. The category names are populated independently by binding the category axis.

> All series must contain the same number of points in an identical to the category order.

```dojo
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
            name: "Produced",
            field: "produced"
        }],
        categoryAxis: {
            field: "year"
        }
    });
    </script>
```

### Binding Categorical Series to a Category Field

Categorical series allow you to specify a category field. The category values from all series are concatenated and each point is mapped to its category. The point order is insignificant. Series points are [aggregated](/api/dataviz/chart#configuration-series.aggregate) to produce a single value per category.

```dojo
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
```

### Binding Scatter Series to a Data Source

To bind the scatter series to a data source, use the fields that are specified as `xField` and `yField`.

```dojo
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
```

## See Also

* [Using the API of the Chart (Demo)](https://demos.telerik.com/kendo-ui/chart-api/index)
* [JavaScript API Reference of the Chart](/api/javascript/dataviz/ui/chart)
