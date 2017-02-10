---
title: Overview
page_title: Overview | Kendo UI StockChart HtmlHelper
description: "Get started with the server-side wrapper for the Kendo UI StockChart widget for ASP.NET MVC."
slug: overview_stockcharthelper_aspnetmvc
position: 1
---

# StockChart HtmlHelper Overview

The StockChart HtmlHelper extension is a server-side wrapper for the [Kendo UI StockChart](https://demos.telerik.com/kendo-ui/financial/index) widget.

## Getting Started

### The Basics

There are two ways to bind a Kendo UI StockChart for ASP.NET MVC:

* `server`&mdash;The StockChart is bound to a supplied model.
* `ajax`&mdash;The StockChart makes Ajax requests when binding.

### Server Binding

Below are listed the steps for you to follow when configuring the Kendo UI StockChart for server binding.

1. Make sure you followed all the steps from the [introductory article on Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %}).

1. Create a new action method and pass the data list as the model.

    ###### Example

            public ActionResult Index()
            {
                return View(ChartDataRepository.BoeingStockData());
            }

1. Make your view strongly typed.

    ###### Example

    ```tab-ASPX

            <%@ Page Language="C#" MasterPageFile="~/Views/Shared/Site.Master"
               		 Inherits="System.Web.Mvc.ViewPage<IEnumerable<Kendo.Mvc.Examples.Models.StockDataPoint>>" %>
    ```
    ```tab-Razor

            @model IEnumerable<Kendo.Mvc.Examples.Models.StockDataPoint>
    ```

1. Add a server-bound StockChart.

    ###### Example

    ```tab-ASPX

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
    ```
    ```tab-Razor

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
    ```

## Event Handling

You can subscribe to all StockChart [events](/api/javascript/dataviz/ui/stock-chart#events).

### By Handler Name

The following example demonstrates how to subscribe to events by a handler name.

###### Example

```tab-ASPX

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
                //Handle the dataBound event.
            }

            function stockChart_seriesClick() {
                //Handle the series click event.
            }
        </script>
```
```tab-Razor

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
                //Handle the dataBound event.
            }

            function stockChart_seriesClick() {
                //Handle the seriesClick event.
            }
        </script>
```

### By Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

###### Example

```tab-Razor

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
    		           //Handle the dataBound event inline.
    		       }
    		  </text>)
    		  .SeriesClick(@<text>
    		       function() {
    		           //Handle the seriesClick event inline.
    		       }
    		  </text>)
    		)
        )
```

## Reference

### Existing Instances

To reference an existing Kendo UI StockChart instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [StockChart API](../../../kendo-ui/api/javascript/dataviz/ui/stock-chart#methods) to control its behavior.

###### Example

      //Put this after your Kendo UI StockChart for ASP.NET MVC declaration.
      <script>
          $(function() {
              //Notice that the Name() of the StockChart is used to get its client-side instance.
              var chart = $("#stockChart").data("kendoStockChart");
          });
      </script>

## See Also

* [ASP.NET MVC API Reference: StockChartBuilder](/api/Kendo.Mvc.UI.Fluent/StockChartBuilder)
* [Ajax Binding of the Kendo UI StockChart for ASP.NET MVC]({% slug ajaxbinding_stockcharthelper_aspnetmvc %})
* [Overview of the Kendo UI StockChart Widget](http://docs.telerik.com/kendo-ui/controls/charts/stockchart/overview)
* [Scaffolding of the Kendo UI Chart for ASP.NET MVC]({% slug scaffoldingchart_aspnetmvc %})
* [Overview of Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %})
* [Fundamentals of Telerik UI for ASP.NET MVC]({% slug fundamentals_aspnetmvc %})
* [Scaffolding in Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Telerik UI for ASP.NET MVC API Reference Folder](/api/Kendo.Mvc/AggregateFunction)
* [Telerik UI for ASP.NET MVC HtmlHelpers Folder]({% slug overview_barcodehelper_aspnetmvc %})
* [Tutorials on Telerik UI for ASP.NET MVC]({% slug overview_timeefficiencyapp_aspnetmvc6 %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})
