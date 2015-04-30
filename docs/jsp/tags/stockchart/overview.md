---
title: Overview
---

# StockChart

The Chart tag is a server-side wrapper for the [Kendo UI StockChart](/api/dataviz/stock-chart) widget.

## Getting Started

Here is how to configure the Kendo StockChart for binding to a data passed as model attribute in Spring MVC:

1.  Make sure you have followed all the steps from the [Introduction](/jsp/introduction) help topic.

2.  Create a new action method and pass the InternetUsers list as the model:

    	@RequestMapping(value = {"/", "/index"}, method = RequestMethod.GET)
	    public String index(Model model) {
	        model.addAttribute("viewModel", ChartDataRepository.BoeingStockData());
	     
	        return "/dataviz/financial/index";
	    }

4.  Add a server bound chart:

         <kendo:stockChart name="stockChart" dateField="date">
         	<kendo:stockChart-title text="The Boeing Company (NYSE:BA)" />
			<kendo:dataSource data="${viewModel}" />
            <kendo:stockChart-series>
            	<kendo:stockChart-seriesItem type="candlestick" openField="open" highField="high" lowField="low" closeField="close" />
            </kendo:stockChart-series>
            <kendo:stockChart-navigator>
            	<kendo:stockChart-navigator-series>
            		<kendo:stockChart-navigator-seriesItem type="line" field="close" />
            	</kendo:stockChart-navigator-series>
            </kendo:stockChart-navigator>
         </kendo:stockChart>

## Accessing an Existing StockChart

You can reference an existing chart instance via [jQuery.data()](http://api.jquery.com/jQuery.data/).
Once a reference has been established, you can use the [API](/api/dataviz/stock-chart#methods) to control its behavior.

### Accessing an existing StockChart instance

    // Put this after your Kendo StockChart tag
    <script>
        $(function() {
            // Notice that the Name() of the chart is used to get its client-side instance
            var chart = $("#stockChart").data("kendoChart");
        });
    </script>

## Handling Kendo UI StockChart events

You can subscribe to all [events](/api/dataviz/stock-chart#events) exposed by Kendo UI StockChart:


### Subscribe by handler name

	<kendo:chart name="chart" dateField="date"
							  dataBound="stock_dataBound"
							  seriesClick="stock_seriesClick">
         	<kendo:stockChart-title text="The Boeing Company (NYSE:BA)" />
			<kendo:dataSource data="${viewModel}" />
            <kendo:stockChart-series>
            	<kendo:stockChart-seriesItem type="candlestick" openField="open" highField="high" lowField="low" closeField="close" />
            </kendo:stockChart-series>
            <kendo:stockChart-navigator>
            	<kendo:stockChart-navigator-series>
            		<kendo:stockChart-navigator-seriesItem type="line" field="close" />
            	</kendo:stockChart-navigator-series>
            </kendo:stockChart-navigator>
	</kendo:chart>

    <script>
        function stock_dataBound() {
            // Handle the dataBound event
        }
	    
        function stock_seriesClick() {
            // Handle the series click event
        }
    </script>

