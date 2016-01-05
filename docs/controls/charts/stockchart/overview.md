---
title: Overview
page_title: Overview | Kendo UI Stock Charts
description: "Learn how to create a Kendo UI Stock Chart and explore its major features."
slug: overview_kendoui_stockcharts
position: 1
---

# Stock Chart Overview

The [Kendo UI Stock Chart widget](http://demos.telerik.com/kendo-ui/financial/index) is a specialized control visualizing the price movement of any financial instrument over a certain period of time. It includes extensive touch support and a navigator pane for easy browsing of extended time periods. Generally, the Stock Chart extends the [Kendo UI Chart widget]({% slug overview_kendoui_charts_widget %}) and shares most of its features.

**Figure 1. A sample Stock Chart**

![Stock Chart](/controls/charts/stockchart/stock-chart.png)

The series types supported by the Stock Charts are:

* [Candlestick](https://en.wikipedia.org/wiki/Candlestick_chart)
* [Open-high-low-close (OHLC)](https://en.wikipedia.org/wiki/Open-high-low-close_chart)
* Column
* Line
* Area

Note that all of the above are also accessible from the Kendo UI Chart widget.

For additional information on new Kendo UI Chart types and features, refer to the [Kendo UI Roadmap](http://www.telerik.com/support/whats-new/kendo-ui-web/roadmap).

## Getting Started

### Create the Stock Chart

To create a chart, add an empty `div` in the HTML, provide it with an ID, and, optionally, set the width and height of the desired chart inline or via CSS, as demonstrated in the example below.

###### Example

    <div id="stockChart" style="width: 600px; height: 400px"></div>

### Initialize the Stock Chart

The Kendo UI Stock Chart widget is rendered by selecting the `div` with a jQuery selector and calling the `kendoStockChart()` function, as demonstrated below.

###### Example

    $("#stockChart").kendoStockChart({
		// Options
    });

## Configuration

### Add Title

This chart can be given a title by specifying the `text` property of the `title` object, as demonstrated in the example below.

###### Example

    $("#stockChart").kendoStockChart({
        title: {
             text: "The Boeing Company"
        }
    });

### Configure Date Field

Each data point must have an associated date. The date field value must be any of the below values:

* Date instance
* String, parsable by `new Date([field value])`
* String in an ASP.NET JSON format, e.g. `"\/Date(1320825600000-0800)\/"`

The name of the field is specified by using the `dateField` option, as demonstrated below.

###### Example

    $("#stockChart").kendoStockChart({
		dateField: "SampleDate"
		...
    });

It can be omitted if the field name is `"date"` (the default value).

> **Importnat**
>
> Data points must be sorted by date in ascending order. Consider sorting the data on the server or use the DataSource [`sort` option](/api/framework/datasource#sort-array--objectdefault).

### Set Navigator Pane

The navigator pane has its own set of series. They share the same syntax and are bound to the chart data source, as demonstrated in the example below.

###### Example

    $("#stockChart").kendoStockChart({
		...
		navigator: {
	    	series: [{
     	   		type: "area",
     	   		field: "Volume"
			}, {
				type: "line",
				field: "ExpectedVolume"
			}]
		}
    });

You can omit the array if defining a single series.

###### Example

    $("#stockChart").kendoStockChart({
		...
		navigator: {
	    	series: {
     	   		type: "area",
     	   		field: "Volume"
			}
		}
    });

### Bind to Data

Kendo UI Stock Charts can be bound to both local and remote data via its DataSource. Binding is limited to time series only.

The example below demonstrates a service that returns stock price history data as JSON.

###### Example

		[
    		{
        		"Date": "2000/01/03",
        		"Open": 41.62,
        		"High": 41.69,
        		"Low": 39.81,
        		"Close": 40.12,
    			"Volume": 2632000
    		},
			...
		]

Bind the Stock Chart to the remote service, as shown below.

###### Example

    $("#stockChart").kendoStockChart({
		dataSource: {
			transport: {
				read: "/stock?symbol=BA"
   			}
		},
		dateField: "Date"
    });

Define the main and the Navigator series.

###### Example

    $("#stockChart").kendoStockChart({
		dataSource: {
			transport: {
				read: "/stock?symbol=BA"
   			}
		},
		dateField: "Date"
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
