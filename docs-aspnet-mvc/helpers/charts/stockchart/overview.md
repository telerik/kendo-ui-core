---
title: Overview
page_title: StockChart Overview | Telerik UI for ASP.NET MVC HTML Helpers
description: "Learn the basics when working with the Telerik UI StockChart HtmlHelper for ASP.NET MVC."
slug: overview_stockcharthelper_aspnetmvc
position: 1
---

# StockChart HtmlHelper Overview

The Telerik UI StockChart HtmlHelper for ASP.NET MVC is a server-side wrapper for the Kendo UI StockChart widget.

The StockChart is a specialized control visualizing the price movement of any financial instrument over a certain period of time.

* [Demo page for the StockChart](https://demos.telerik.com/aspnet-mvc/financial)

## Basic Configuration

[This runnable demo](https://demos.telerik.com/aspnet-mvc/financial) demonstrates how to define a StockChart Chart by using the StockChart HtmlHelper.

## Functionality and Features

The StockChart provides options for [Ajax and server data binding]({% slug ajaxbinding_stockcharthelper_aspnetmvc %}).

## Events

You can subscribe to all StockChart [events](/api/stockchart).

### Handling by Handler Name

The following example demonstrates how to subscribe to events by a handler name.

```ASPX
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
            // Handle the dataBound event.
        }

        function stockChart_seriesClick() {
            // Handle the series click event.
        }
    </script>
```
```Razor
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
            // Handle the dataBound event.
        }

        function stockChart_seriesClick() {
            // Handle the seriesClick event.
        }
    </script>
```

### Handling by Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

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
                    // Handle the dataBound event inline.
                }
            </text>)
            .SeriesClick(@<text>
                function() {
                    // Handle the seriesClick event inline.
                }
            </text>)
        )
    )

## Referencing Existing Instances

To reference an existing Kendo UI StockChart instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [StockChart client-side API](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/stock-chart) to control its behavior.

    // Place the following after the StockChart for ASP.NET MVC declaration.
    <script>
        $(function() {
            // The Name() of the StockChart is used to get its client-side instance.
            var chart = $("#stockChart").data("kendoStockChart");
        });
    </script>

## See Also

* [Basic Usage of the StockChart HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/financial)
* [Server-Side API](/api/stockchart)
