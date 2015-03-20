---
title: Ajax Binding
---

## Ajax Binding

When configured for ajax binding the Kendo StockChart for ASP.NET MVC will make an ajax requests to populate its series.

To configure the Kendo StockChart for ajax binding follow these steps:

1.  Add a new action method which will return data to populate the chart:

	    public partial class HomeController : Controller
	    {
	        public ActionResult _BoeingStockData()
	        {	
	        }
	    }

2.  Return the data as JSON:

        public ActionResult InternetUsers_Read()
        {
            return Json(ChartDataRepository.BoeingStockData());
        }

3.  In the view configure the chart to use the action method created in the previous steps:
    - WebForms

            <%: Html.Kendo().StockChart<Kendo.Mvc.Examples.Models.StockDataPoint>()
		        .Name("stockChart")
		        .Title("The Boeing Company (NYSE:BA)")
		        .DataSource(ds => ds.Read(read => read
		            .Action("_BoeingStockData", "Home")
		        ))
		        .DateField("Date")
            %>
    - Razor

            @(Html.Kendo().StockChart<Kendo.Mvc.Examples.Models.StockDataPoint>()
		        .Name("stockChart")
		        .Title("The Boeing Company (NYSE:BA)")
		        .DataSource(ds => ds.Read(read => read
		            .Action("_BoeingStockData", "Home")
		        ))
		        .DateField("Date")
            )

4. Create the main and navigator data series:
    - WebForms

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
    - Razor

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