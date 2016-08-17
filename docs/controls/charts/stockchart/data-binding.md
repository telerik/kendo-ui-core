---
title: Data Binding
page_title: Data Binding | Kendo UI Stock Charts
description: "Learn how to bind the Kendo UI Stock Chart to data."
slug: databinding_kendoui_stockcharts
position: 2
---

# Stock Chart Data Binding

The Kendo UI Stock Chart provides two main modes for binding to data.

In the first mode, a single Data Source instance is used for both the main and the **Navigator** panes.

A second data source can be configured to load the **Navigator** data, usually with reduced time resolution. This mode enables filtering on the main data source and can be made more efficient.

In both cases, a [`dateField`](/api/javascript/dataviz/ui/stock-chart#configuration-dateField) must be set to indicate the field that contains the date of the data item.

> **Important**
> * The Stock Chart supports only binding to time series.
> * Discrete categories and XY/scatter series are not supported.

## Binding Modes

### Single Data Source

In this mode, the Stock Chart is set up with a single data source. It is used for all series in the Chart, including the **Navigator** pane below. To see the single data-binding mode in action, refer to the [demo on its basic usage](http://demos.telerik.com/kendo-ui/financial/virtualization).

The Data Source is [fetched](/api/javascript/data/datasource#methods-fetch) once and filtered internally by the Chart. No additional requests will be made unless the Data Source API methods are invoked.

The example below demonstrates a Stock Chart in a single data-binding mode.

###### Example

```html
    <div id="stock-chart"></div>
    <script>
        $("#stock-chart").kendoStockChart({
            dataSource: {
                data: [{
                    "Date": "2016/01/01",
                    "Open": 41.62,
                    "High": 41.69,
                    "Low": 39.81,
                    "Close": 40.12,
                    "Volume": 2632000
                }, {
                    "Date": "2016/03/01",
                    "Open": 40.62,
                    "High": 39.69,
                    "Low": 40.81,
                    "Close": 39.12,
                    "Volume": 2631986
                }
                ]
            },
            dateField: "Date",
            series: [{
                type: "candlestick",
                openField: "Open",
                highField: "High",
                lowField: "Low",
                closeField: "Close"
            }],
            navigator: {
                series: {
                    type: "area",
                    field: "Volume"
                }
            }
        });
    </script>
```

### Master and Navigator Data Source

In this mode, the Stock Chart is set up with two data source instances&mdash;one for the main chart (master) and one for the **Navigator** pane (navigator). To see it in action, refer to the [demo on virtualization](http://demos.telerik.com/kendo-ui/financial/virtualization).

This mode makes sense when the service is expected to provide views over the data with different time resolution. The navigator can then load a low resolution preview while the main data source handles the detailed data.

The data for the **Navigator** will be fetched only once and without any filters. To change this behavior, alter its configuration or call methods directly on the DataSource. The fetched data will be displayed in its entirety in the **Navigator** pane.

The main data source will be filtered based on the selected date range before being fetched. It is recommended to use [server filtering](/api/javascript/data/datasource#configuration-serverFiltering) to make sure that only the visible range data is transferred. Even without applying server filtering, there will be a reduction in the processing time needed by the Chart to display the data.

Each subsequent pan, zoom, and selection operation will update the filters on the main data source and fetch it.

The example below demonstrates a Stock Chart in the master and navigator data-binding mode.

##### Example

```html
    <div id="stock-chart"></div>
    <script>
    var stockDataSchema = {
        model: {
            fields: {
                Date: {
                    type: "date"
                }
            }
        }
    };

    $("#stock-chart").kendoStockChart({
        dataSource: {
            serverFiltering: true,
            transport: {
                read: {
                    url: "http://demos.telerik.com/kendo-ui/service/StockData",
                    dataType: "jsonp"
                },
                parameterMap: function(data) {
                    return { filter: JSON.stringify(data.filter) };
                }
            },
            schema: stockDataSchema
        },
        title: {
            text: "The ACME Company"
        },
        dateField: "Date",
        series: [{
            type: "candlestick",
            openField: "Open",
            highField: "High",
            lowField: "Low",
            closeField: "Close"
        }],
        navigator: {
            dataSource: {
                transport: {
                    read: {
                        url: "http://demos.telerik.com/kendo-ui/service/StockData",
                        dataType: "jsonp"
                    }
                },
                schema: stockDataSchema
            },
            series: {
                type: "area",
                field: "High"
            },
            select: {
                from: "2009/02/05",
                to: "2011/10/07"
            }
        }
    });
    </script>
```

> **Important**
>
> The filter field is always `Date` regardless of the `dateField` setting.

The example below demonstrates a sample filter submitted by the Stock Chart for the main data source.

##### Example

```json
{
    "logic": "and",
    "filters": [
        {
            "field": "Date",
            "operator": "gte",
            "value": "2009-01-31T22:00:00.000Z"
        },
        {
            "field": "Date",
            "operator": "lt",
            "value": "2011-10-06T21:00:00.000Z"
        }
    ]
}
```

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
* [Sparklines]({% slug overview_kendoui_sparklinescharts %})
* [TreeMap]({% slug overview_treemap_widget %})
* [Stock Chart JavaScript API Reference](/api/javascript/dataviz/ui/stock-chart)
