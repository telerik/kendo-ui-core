---
title: Overview
page_title: StockChart | Telerik UI for ASP.NET Core HtmlHelpers
description: "Learn the basics when working with the Kendo UI StockChart HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: overview_stockcharthelper_aspnetcore
position: 1
---

# StockChart HtmlHelper Overview

The StockChart HtmlHelper extension is a server-side wrapper for the [Kendo UI StockChart](https://demos.telerik.com/kendo-ui/financial/index) widget.

## Getting Started

### Binding

The UI for ASP.NET StockChart makes Ajax requests when bound to a data source.

## Configuration

Below are steps for you to follow when configuring the Kendo UI StockChart for ASP.NET MVC for Ajax binding.

### Add a New Action Method

Add a new action method which returns data to populate the StockChart.

```Razor
    @(Html.Kendo().StockChart<Kendo.Mvc.Examples.Models.StockDataPoint>()
        .Name("stockChart")
        .Title("The Boeing Company (NYSE:BA)")
        .DataSource(ds => ds.Read(read => read
            .Action("_BoeingStockData", "Home")
        ))
        .DateField("Date")
    )
```
```Model
    public class StockDataPoint
    {
        public DateTime Date { get; set; }

        public decimal Close { get; set; }

        public long Volume { get; set; }

        public decimal Open { get; set; }

        public decimal High { get; set; }

        public decimal Low { get; set; }

        public string Symbol { get; set; }
    }
```
```HomeController
    public IActionResult Index()
    {
        return View();
    }

    public IActionResult _BoeingStockData()
    {
        using (var db = GetContext())
        {
            // Return the data as JSON.
            return Json(
                (from s in db.Stocks
                where s.Symbol == "BA"
                select new StockDataPoint
                {
                    Date = s.Date,
                    Open = s.Open,
                    High = s.High,
                    Low = s.Low,
                    Close = s.Close,
                    Volume = s.Volume
                }).ToList()
            );
        }
    }
```

### Create the Data Series

Create the main and navigator data series.

###### Example

```
    @(Html.Kendo().StockChart<Kendo.Mvc.Examples.Models.StockDataPoint>()
        .Name("stockChart")
        .Title("The Boeing Company (NYSE:BA)")
        .DataSource(ds => ds.Read(read => read
            .Action("_BoeingStockData", "Home")
        ))
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

You can subscribe to all StockChart [events](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/stock-chart#events).

### By Handler Name

The following example demonstrates how to subscribe to events by a handler name.

###### Example

```
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
        function stockChart_dataBound(e) {
            //Handle the dataBound event.
        }

        function stockChart_seriesClick(e) {
            //Handle the seriesClick event.
        }
    </script>
```

### By Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

###### Example

```
    @(Html.Kendo().StockChart(Model)
    	.Name("stockChart")
    	.Title("The Boeing Company (NYSE:BA)")
    	.DateField("Date")
    	.Series(series => {
    	    series.Candlestick(s => s.Open, s => s.High, s => s.Low, s => s.Close);
    	})
    	.Events(e => e
    	  .DataBound(@<text>
    	       function(e) {
    	           //Handle the dataBound event inline.
    	       }
    	  </text>)
    	  .SeriesClick(@<text>
    	       function(e) {
    	           //Handle the seriesClick event inline.
    	       }
    	  </text>)
    	)
    )
```

## Reference

### Existing Instances

To reference an existing Kendo UI StockChart instance, use the [`jQuery.data()`](https://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [StockChart API](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/stock-chart#methods) to control its behavior.

###### Example

    //Put this after your Kendo UI StockChart for ASP.NET Core declaration.
    <script>
        $(function() {
            // Notice that the Name() of the StockChart is used to get its client-side instance.
            var chart = $("#stockChart").data("kendoStockChart");
        });
    </script>

## See Also

* [Overview of the Kendo UI StockChart Widget](https://docs.telerik.com/kendo-ui/controls/charts/stockchart/overview)
* [Telerik UI for ASP.NET Core StockChart live demos](https://demos.telerik.com/aspnet-core/financial/index)
* [Overview of the Telerik UI for ASP.NET Core charts]({% slug htmlhelpers_charts_aspnetcore %})
* [Overview of the Telerik UI for ASP.NET Core TreeMap]({% slug overview_treemaphelper_aspnetcore %})
