---
title: Data Binding
page_title: Data Binding | Kendo UI Stock Charts
description: "Learn how to bind the Kendo UI Stock Chart to data."
slug: databinding_kendoui_stockcharts
position: 2
---

# Stock Chart Data Binding

The Kendo UI Stock Chart provides two main modes for binding to data.

You can bind the Stock Chart to a single data source or
chose to provide an additional data source for the Navigator.

In both cases a [dateField](/api/javascript/dataviz/ui/stock-chart#configuration-dateField)
must be set to indicate the field that contains the date of the data item.

> **Important**
>
> The Stock Chart supports only binding to time series.
> Discrete categories and XY/scatter series are not supported.

## Binding Modes

### Single Data Source

In this mode you assign a single data source the Stock Chart configuration. It is used for
all series in the chart, including the Navigator pane below.
You can see it in action in the [Basic Usage demo](http://demos.telerik.com/kendo-ui/financial/virtualization).

The Data Source is [fetched](http://docs.telerik.com/kendo-ui/api/javascript/data/datasource#methods-fetch)
once and filtered internally by the chart.
No additional requests will be made unless you use the Data Source API directly.

##### Example - Stock Chart with a single data source

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

In this mode you supply two data source instances to the Stock Chart -
one for the main chart and one for the Navigator pane.
You can see it in action in the [Virtualization demo](http://demos.telerik.com/kendo-ui/financial/virtualization).

This mode makes sense when you can provide views over the data with different time resolution.
The Navigator can then load low a resolution preview while the main data source handles the detailed data.

The data for the Navigator will be fetched only once and without any filters.
This can be changed by altering its configuration or calling methods on the DataSource directly.
The fetched data will be displayed in its entirety in the navigator pane.

The main data source will be filtered based on the selected date range before being fetched.
It is recommended to use [server filtering](http://docs.telerik.com/kendo-ui/api/javascript/data/datasource#configuration-serverFiltering)
to make sure only the visible range data is transferred.
Even without server filtering, there'll be reduction of the processing time needed by the chart to display the data.

Each subsequent pan, zoom and selection operation will update the filters on the main data source
and fetch it.

> **Important**
>
> The filter field is always `Date` regardless of the `dateField` setting.

##### Example - Sample filter submitted by the Stock Chart for the main data source
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
