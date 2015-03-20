---
title: Overview
related: chart-overview
---

# Stock Chart Overview

## Getting started

The Stock Chart is a specialized widget for visualizing stock price and related graphs.

It includes extensive touch support and a navigator pane for easy browsing of extended time periods.

The widget extends the [Chart widget](/dataviz/chart/overview) and shares most if its features. 

![Stock Chart](/dataviz/stockchart/stock-chart.png)

Supported series types:

*   Candlestick
*   OHLC
*   Column
*   Line
*   Area

Note that all of the above are also accessible from the Chart widget.

Please visit the [Kendo UI Roadmap](http://www.telerik.com/support/whats-new/kendo-ui-web/roadmap) for additional information about new Chart types and features.

### Creating a Stock Chart

To create a chart, add an empty div in the HTML and give it an ID.

    <div id="stockChart"></div>

Optionally, set the width and height of the desired chart inline or with CSS.

    <div id="stockChart" style="width: 600px; height: 400px"></div>

The chart is rendered by selecting the div with a jQuery selector and calling the kendoStockChart() function.

    $("#stockChart").kendoStockChart({
		// Options
    });

The chart can be given a title by specifying the "text" property of the "title" option.

    $("#stockChart").kendoStockChart({
        title: {
             text: "The Boeing Company"
        }
    });

### Data Binding

The Stock Chart can be bound to both local and remota data via its DataSource. Binding is limited to time series only.

#### Date field

Each data point must have an associated date. The date field value must be either:

* Date instance
* String parsable by new Date([field value])
* String in ASP.NET JSON format, i.e. "\/Date(1320825600000-0800)\/"

The name of the field is specified using the `dateField` option:

    $("#stockChart").kendoStockChart({
		dateField: "SampleDate"
		...
    });
	
It can be omitted if the field name is "date" (the default value).

> Note: Data points must be sorted in ascending order by date. Consider sorting the data on the server or use the DataSource [sort option](/api/framework/datasource#sort-array--objectdefault).

#### Navigator binding

The navigator pane has its own set of series. They share the same syntax and are bound to the chart data source.

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

You can omit the array if defining a single series:

    $("#stockChart").kendoStockChart({
		...
		navigator: {
	    	series: {
     	   		type: "area",
     	   		field: "Volume"
			}
		}
    });

#### Example

Let's assume a service that returns stock price history data as JSON:

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

Start by binding the Stock Chart to the remote service:

    $("#stockChart").kendoStockChart({
		dataSource: {
			transport: {
				read: "/stock?symbol=BA"
   			}
		},
		dateField: "Date"
    });

Go ahead and define the main and the navigator series:

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

