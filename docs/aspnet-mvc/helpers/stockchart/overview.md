---
title: Overview
---

# StockChart

The StockChart HtmlHelper extension is a server-side wrapper for the [Kendo UI StockChart](/api/dataviz/stock-chart) widget.

## Getting Started

There are two ways to bind a Kendo StockChart for ASP.NET MVC:

*   server - the chart will bind to a supplied model
*   ajax - the chart will make ajax requests when binding

Here is how to configure the Kendo StockChart for server binding:

1.  Make sure you have followed all the steps from the [Introduction](/aspnet-mvc/introduction) help topic.

2.  Create a new action method and pass the data list as the model:

        public ActionResult Index()
        {
            return View(ChartDataRepository.BoeingStockData());
        }

3.  Make your view strongly typed:
    - WebForms

            <%@ Page Language="C#" MasterPageFile="~/Views/Shared/Site.Master"
               		 Inherits="System.Web.Mvc.ViewPage<IEnumerable<Kendo.Mvc.Examples.Models.StockDataPoint>>" %>
    - Razor

            @model IEnumerable<Kendo.Mvc.Examples.Models.StockDataPoint>
4.  Add a server bound chart:
    - WebForms

            <%: Html.Kendo().StockChart(Model)
		        .Name("stockChart")
		        .Title("The Boeing Company (NYSE:BA)")
		        .DateField("Date")
		        .Series(series => {
		            series.Candlestick(s => s.Open, s => s.High, s => s.Low, s => s.Close);
		        })
		        .Navigator(nav => nav
		            .Series(series => {
		                series.Line(s => s.Volume);
		            })
		        )
            %>
    - Razor

            @(Html.Kendo().StockChart(Model)
		        .Name("stockChart")
		        .Title("The Boeing Company (NYSE:BA)")
		        .DateField("Date")
		        .Series(series => {
		            series.Candlestick(s => s.Open, s => s.High, s => s.Low, s => s.Close);
		        })
		        .Navigator(nav => nav
		            .Series(series => {
		                series.Line(s => s.Volume);
		            })
		        )
            )

## Accessing an Existing StockChart

You can reference an existing stock chart instance via [jQuery.data()](http://api.jquery.com/jQuery.data/).
Once a reference has been established, you can use the [API](/api/dataviz/stock-chart#methods) to control its behavior.

### Accessing an existing StockChart instance

    // Put this after your Kendo StockChart for ASP.NET MVC declaration
    <script>
        $(function() {
            // Notice that the Name() of the chart is used to get its client-side instance
            var chart = $("#stockChart").data("kendoStockChart");
        });
    </script>

## Handling Kendo UI StockChart events

You can subscribe to all [events](/api/dataviz/stock-chart#events) exposed by Kendo UI Chart:


### WebForms - subscribe by handler name

    <%: Html.Kendo().StockChart(Model)
	        .Name("stockChart")
	        .Title("The Boeing Company (NYSE:BA)")
	        .DateField("Date")
	        .Series(series => {
	            series.Candlestick(s => s.Open, s => s.High, s => s.Low, s => s.Close);
	        })
            .Events(e => e
                .DataBound("stockChart_dataBound")
                .SeriesClick("stockChart_seriesClick")
            )
    %>

    <script>
        function stockChart_dataBound() {
            // Handle the dataBound event
        }
	    
        function stockChart_seriesClick() {
            // Handle the series click event
        }
    </script>


### Razor - subscribe by handler name

    @(Html.Kendo().StockChart(Model)
		.Name("stockChart")
		.Title("The Boeing Company (NYSE:BA)")
		.DateField("Date")
		.Series(series => {
		    series.Candlestick(s => s.Open, s => s.High, s => s.Low, s => s.Close);
		})
		.Events(e => e
		  .DataBound("stockChart_dataBound")
		  .SeriesClick("stockChart_seriesClick")
		)
    )

    <script>
        function stockChart_dataBound() {
            // Handle the dataBound event
        }
	    
        function stockChart_seriesClick() {
            // Handle the seriesClick event
        }
    </script>


### Razor - subscribe by template delegate

    @(Html.Kendo().StockChart(Model)
		.Name("stockChart")
		.Title("The Boeing Company (NYSE:BA)")
		.DateField("Date")
		.Series(series => {
		    series.Candlestick(s => s.Open, s => s.High, s => s.Low, s => s.Close);
		})
		.Events(e => e
		  .DataBound(@<text>
		       function() {
		           // Handle the dataBound event inline
		       }
		  </text>)
		  .SeriesClick(@<text>
		       function() {
		           // Handle the seriesClick event inline
		       }
		  </text>)
		)
    )

