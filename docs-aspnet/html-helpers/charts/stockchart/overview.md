---
title: Overview
page_title: StockChart Overview
description: "Learn the basics when working with the Telerik UI StockChart HtmlHelper for {{ site.framework }}."
previous_url: /helpers/charts/stockchart/overview
slug: overview_stockcharthelper_aspnetcore
position: 1
---

# StockChart HtmlHelper Overview

The Telerik UI StockChart HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI StockChart widget.

The StockChart is a specialized control visualizing the price movement of any financial instrument over a certain period of time. StockCharts include extensive touch support and a navigator pane for easy browsing of extended time periods. Generally, StockCharts extend the Telerik UI Chart and share most of its features.

* [Demo page for the StockChart](https://demos.telerik.com/{{ site.platform }}/financial/index)

All of the following series types that are supported by the StockChart are also accessible from a Telerik UI Chart:

* [Candlestick](https://en.wikipedia.org/wiki/Candlestick_chart)
* [Open-high-low-close (OHLC)](https://en.wikipedia.org/wiki/Open-high-low-close_chart)
* Column
* Line
* Area

## Basic Configuration

The UI for ASP.NET StockChart makes Ajax requests when it is bound to a data source and has to be configured for Ajax binding.

1. Add the new action method.

  The following example demonstrates how to add a new action method which returns data to populate the StockChart.

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

1. Create the data series.

    The following example demonstrates how to create the main and the navigator data series.

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

## Functionality and Features

The StockChart provides options for [binding it to data]({% slug databinding_stockchart_aspnetcore %}).

## Events

You can subscribe to all StockChart [events](/api/Kendo.Mvc.UI.Fluent/ChartEventBuilder).

### Handling Events by Handler Name

The following example demonstrates how to subscribe to events by a handler name.

```
    @(Html.Kendo().StockChart<Kendo.Mvc.Examples.Models.StockDataPoint>()
    	.Name("stockChart")
    	.Title("The Boeing Company (NYSE:BA)")
    	.DateField("Date")
    	.Series(series => {
    	    series.Candlestick(s => s.Open, s => s.High, s => s.Low, s => s.Close);
    	}){% if site.core %}
        .Events((Action<Kendo.Mvc.UI.Fluent.StockChartEventBuilder>)(x => 
            x.DataBound("stockChart_dataBound")
            .SeriesClick("stockChart_seriesClick")
            )
        )
        {% else %}
    	.Events(e => e
    	  .DataBound("stockChart_dataBound")
    	  .SeriesClick("stockChart_seriesClick")
    	){% endif %}
    )

    <script>
        function stockChart_dataBound(e) {
            // Handle the dataBound event.
        }

        function stockChart_seriesClick(e) {
            // Handle the seriesClick event.
        }
    </script>
```

### Handling Events by Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

```
    @(Html.Kendo().StockChart<Kendo.Mvc.Examples.Models.StockDataPoint>()
    	.Name("stockChart")
    	.Title("The Boeing Company (NYSE:BA)")
    	.DateField("Date")
    	.Series(series => {
    	    series.Candlestick(s => s.Open, s => s.High, s => s.Low, s => s.Close);
    	}){% if site.core %}
        .Events((Action<Kendo.Mvc.UI.Fluent.StockChartEventBuilder>)(e => e
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
        ){% else %}
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
    	){% endif %}
    )
```

## Referencing Existing Instances

To reference an existing Kendo UI StockChart instance, use the [`jQuery.data()`](https://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [StockChart client-side API](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/stock-chart#methods) to control its behavior.

    // Place the following after the declaration of the Barcode for {{ site.framework }}.
    <script>
        $(function() {
            // The Name() of the StockChart is used to get its client-side instance.
            var chart = $("#stockChart").data("kendoStockChart");
        });
    </script>

## See Also

* [Basic Usage of the StockChart HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/financial/index)
* [Server-Side API](/api/stockchart)
