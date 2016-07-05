---
title: Ajax Binding
page_title: Ajax Binding | Kendo UI StockChart HtmlHelper
description: "Configure the Kendo UI StockChart for ASP.NET MVC for Ajax binding."
slug: ajaxbinding_stockcharthelper_aspnetmvc
position: 2
---

## Ajax Binding

When configured for an Ajax binding, the Kendo UI StockChart for ASP.NET MVC makes Ajax requests to populate its series.

## Configuration

Below are steps for you to follow when configuring the Kendo UI StockChart for ASP.NET MVC for Ajax binding.

### Add a New Action Method

Add a new action method which returns data to populate the StockChart.

###### Example

	    public partial class HomeController : Controller
	    {
	        public ActionResult _BoeingStockData()
	        {
	        }
	    }

<!--_-->
### Return Data

Return the data as JSON.

###### Example

        public ActionResult InternetUsers_Read()
        {
            return Json(ChartDataRepository.BoeingStockData());
        }

### Configure the Chart

In the view, configure the Chart to use the action method created in the previous steps.

###### Example

```tba-WebForms

	     <%: Html.Kendo().StockChart<Kendo.Mvc.Examples.Models.StockDataPoint>()
	      .Name("stockChart")
	      .Title("The Boeing Company (NYSE:BA)")
	      .DataSource(ds => ds.Read(read => read
	          .Action("_BoeingStockData", "Home")
	      ))
	      .DateField("Date")
	      %>
```
```tab-Razor

        @(Html.Kendo().StockChart<Kendo.Mvc.Examples.Models.StockDataPoint>()
        .Name("stockChart")
        .Title("The Boeing Company (NYSE:BA)")
        .DataSource(ds => ds.Read(read => read
            .Action("_BoeingStockData", "Home")
        ))
        .DateField("Date")
        )
```

### Create the Data Series

Create the main and navigator data series.

###### Example

```tab-ASPX

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
```tab-Razor

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

Other articles on Telerik UI for ASP.NET MVC and on the StockChart:

* [Overview of the StockChart HtmlHelper]({% slug overview_stockcharthelper_aspnetmvc %})
* [Overview of the Kendo UI StockChart Widget]({% slug overview_kendoui_stockcharts %})
* [Scaffolding of the Kendo UI Chart for ASP.NET MVC]({% slug scaffoldingchart_aspnetmvc %})
* [Overview of Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %})
* [Fundamentals of Telerik UI for ASP.NET MVC]({% slug fundamentals_aspnetmvc %})
* [Scaffolding in Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Telerik UI for ASP.NET MVC API Reference Folder](/api/aspnet-mvc/Kendo.Mvc/AggregateFunction)
* [Telerik UI for ASP.NET MVC HtmlHelpers Folder]({% slug overview_barcodehelper_aspnetmvc %})
* [Tutorials on Telerik UI for ASP.NET MVC]({% slug overview_timeefficiencyapp_aspnetmvc6 %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})
