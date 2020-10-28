---
title: Data Binding
page_title: jQuery Charts Documentation | StockChart Data Binding
description: "Get started with the jQuery StockChart by Kendo UI and learn how to bind it to data."
slug: databinding_kendoui_stockcharts
position: 2
---

# Data Binding

The Kendo UI StockChart provides the [single data-source](#single-data-source-mode) and [master and navigator data-source](#master-and-navigator-data-source-mode) binding modes.

In both modes, you have to set a [`dateField`](/api/javascript/dataviz/ui/stock-chart/configuration/datefield) to indicate the field that contains the date of the data item.

> * The StockChart supports only binding to time series.
> * Discrete categories and XY or Scatter series are not supported.

## Getting Started

You can bind the StockChart to both local and remote data over its DataSource. 

The following example demonstrates a service that returns stock price history data as JSON.

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

The following example demonstrates how to bind the StockChart to the remote service.

    $("#stockChart").kendoStockChart({
		dataSource: {
			transport: {
				read: "/stock?symbol=BA"
   			}
		},
		dateField: "Date"
    });

The following example demonstrates how to define the main and the Navigator series.

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

## Single Data-Source Mode

In the single data-source binding mode, the StockChart is set up with a single data source and that single Data Source instance is used for both the main and the **Navigator** panes. The single data-source binding mode is used for all series in the Chart including the **Navigator** pane. The Data Source is [fetched](/api/javascript/data/datasource/methods/fetch) once and is filtered internally by the Chart. No additional requests will be made unless the API methods of the Data Source are invoked. For a runnable example, refer to the [demo on the basic usage of the StockChart](https://demos.telerik.com/kendo-ui/financial/virtualization).

The following example demonstrates a StockChart in a single data-source binding mode.

```dojo
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

### Master and Navigator Data-Source Mode

You can configure a second data source to load the **Navigator** data usually with reduced time resolution. This approach enables the filtering of the main data source and can be made more efficient. In the master and navigator data-source binding mode, the StockChart is set up with two data source instances&mdash;one for the main chart (master) and one for the **Navigator** pane (navigator). For a runnable example, refer to the [demo on virtualization](https://demos.telerik.com/kendo-ui/financial/virtualization).

This mode is useful when the service is expected to provide views over the data with a different time resolution. The navigator can then load a low resolution preview while the main data source handles the detailed data.

The data for the **Navigator** will be fetched only once and without any filters. To change this behavior, change its configuration or call methods directly on the DataSource. The fetched data will be displayed in its entirety in the **Navigator** pane.

The main data source will be filtered based on the selected date range before being fetched. It is recommended that you use [server filtering](/api/javascript/data/datasource/configuration/serverfiltering) to make sure that only the visible range data is transferred. Even without applying server filtering, a reduction in the processing time will occur which is needed by the Chart to display the data.

Each subsequent pan, zoom, and selection operation will update the filters on the main data source and fetch it.

The following example demonstrates a StockChart in the master and navigator data-source binding mode.

```dojo
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
                    url: "https://demos.telerik.com/kendo-ui/service/StockData",
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
                        url: "https://demos.telerik.com/kendo-ui/service/StockData",
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

The following example demonstrates a sample filter submitted by the StockChart for the main data source. The `filter` field is always `Date` regardless of the `dateField` setting.

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

* [Basic Usage of the StockChart (Demo)](https://demos.telerik.com/kendo-ui/financial/index)
* [JavaScript API Reference of the StockChart](/api/javascript/dataviz/ui/stock-chart)
