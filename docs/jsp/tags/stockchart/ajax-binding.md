---
title: Ajax Binding
---

## Ajax Binding

When configured for ajax binding the Kendo StockChart for JSP will make an ajax requests to populate its series.

To configure the Kendo StockChart for ajax binding follow these steps (using Spring MVC framework):

1.  Add a new action method which will return data to populate the chart:

	    @RequestMapping(value = "/index/read", method = RequestMethod.POST)
	    public @ResponseBody List<StockDataPoint> read() {
	    }

2.  Return the data as JSON:

	    @RequestMapping(value = "/index/read", method = RequestMethod.POST)
	    public @ResponseBody List<StockDataPoint> read() {
	        return ChartDataRepository.BoeingStockData();
	    }

3.  In the view configure the chart to use the action method created in the previous steps:

         <kendo:stockChart name="stockChart" dateField="date">
         	<kendo:stockChart-title text="The Boeing Company (NYSE:BA)" />
			<kendo:dataSource>
        	 	 <kendo:dataSource-transport>
             		 <kendo:dataSource-transport-read url="${readUrl}" dataType="json" type="POST" contentType="application/json" />
                 </kendo:dataSource-transport>
            </kendo:dataSource>
         </kendo:stockChart>

4. Create the main and navigator series:

         <kendo:stockChart name="stockChart" dateField="date">
         	<kendo:stockChart-title text="The Boeing Company (NYSE:BA)" />
			<kendo:dataSource>
        	 	 <kendo:dataSource-transport>
             		 <kendo:dataSource-transport-read url="${readUrl}" dataType="json" type="POST" contentType="application/json" />
                 </kendo:dataSource-transport>
            </kendo:dataSource>
		    <kendo:stockChart-series>
		    	<kendo:stockChart-seriesItem type="candlestick" openField="open" highField="high" lowField="low" closeField="close" />
		    </kendo:stockChart-series>
		    <kendo:stockChart-navigator>
		    	<kendo:stockChart-navigator-series>
		    		<kendo:stockChart-navigator-seriesItem type="line" field="close" />
		    	</kendo:stockChart-navigator-series>
		    </kendo:stockChart-navigator>
	         </kendo:stockChart>