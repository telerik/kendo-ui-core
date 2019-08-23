---
title: Ajax Binding
page_title: Ajax Binding | Kendo UI StockChart HtmlHelper for ASP.NET MVC
description: "Learn the basics about binding the Telerik UI StockChart HtmlHelper for ASP.NET MVC to data."
previous_url: /helpers/stockchart/ajax-binding
slug: ajaxbinding_stockcharthelper_aspnetmvc
position: 2
---

# Data Binding

The StockChart enables you to populate it with data by using [server](#server-binding) and [Ajax](#ajax-binding) data binding.

## Server Binding

The server binding binds the StockChart to a supplied model.

To configure the Chart for server binding:

1. Make sure you followed all the steps from the [introductory article on Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %}).
1. Create a new action method and pass the data list as the model.

        public ActionResult Index()
        {
            return View(ChartDataRepository.BoeingStockData());
        }

1. Make your view strongly typed.

    ```ASPX
        <%@ Page Language="C#" MasterPageFile="~/Views/Shared/Site.Master"
            Inherits="System.Web.Mvc.ViewPage<IEnumerable<Kendo.Mvc.Examples.Models.StockDataPoint>>" %>
    ```
    ```Razor
        @model IEnumerable<Kendo.Mvc.Examples.Models.StockDataPoint>
    ```

1. Add a server-bound StockChart.

    ```ASPX
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
    ```Razor
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

## Ajax Binding

The Ajax binding makes Ajax requests to get the data for the StockChart.

To configure the StockChart for Ajax binding:

1. Add a new action method which returns data to populate the StockChart.

    public partial class HomeController : Controller
    {
        public ActionResult _BoeingStockData()
        {
        }
    }

<!--_-->
1. Return the data as JSON.

    public ActionResult InternetUsers_Read()
    {
        return Json(ChartDataRepository.BoeingStockData());
    }

1. In the view, configure the Chart to use the action method created in the previous steps.

    ```ASPX
        <%: Html.Kendo().StockChart<Kendo.Mvc.Examples.Models.StockDataPoint>()
            .Name("stockChart")
            .Title("The Boeing Company (NYSE:BA)")
            .DataSource(ds => ds.Read(read => read
                .Action("_BoeingStockData", "Home")
            ))
            .DateField("Date")
        %>
    ```
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

1. Create the main and navigator data series.

    ```ASPX
        <%: Html.Kendo().StockChart<Kendo.Mvc.Examples.Models.StockDataPoint>()
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
        %>
    ```
    ```Razor
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

## See Also

* [Basic Usage of the StockChart HtmlHelper for ASP.NET MVC (Demos)](https://demos.telerik.com/aspnet-mvc/area-charts/index)
* [Server-Side API](/api/chart)
