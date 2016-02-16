---
title: Ajax Binding
page_title: Ajax Binding | StockChart JSP Tag
description: "Get started with the Ajax binding of the StockChart JSP tag in Kendo UI."
slug: ajaxbinding_stockchart_uiforjsp
position: 2
---

## Ajax Binding

When configured for Ajax binding, the Kendo UI StockChart for JSP makes Ajax requests to populate its series.

### Configuration

To configure the Kendo UI StockChart for Ajax binding, follow the steps below (using the Spring MVC framework).

**Step 1** Add a new action method which will return data to populate the StockChart.

###### Example

	    @RequestMapping(value = "/index/read", method = RequestMethod.POST)
	    public @ResponseBody List<StockDataPoint> read() {
	    }

**Step 2** Return the data as JSON.

###### Example

	    @RequestMapping(value = "/index/read", method = RequestMethod.POST)
	    public @ResponseBody List<StockDataPoint> read() {
	        return ChartDataRepository.BoeingStockData();
	    }

**Step 3** In the view, configure the StockChart to use the action method created in the previous steps.

###### Example

         <kendo:stockChart name="stockChart" dateField="date">
         	<kendo:stockChart-title text="The Boeing Company (NYSE:BA)" />
			<kendo:dataSource>
        	 	 <kendo:dataSource-transport>
             		 <kendo:dataSource-transport-read url="${readUrl}" dataType="json" type="POST" contentType="application/json" />
                 </kendo:dataSource-transport>
            </kendo:dataSource>
         </kendo:stockChart>

**Step 4** Create the main and navigator series.

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

## See Also

Other articles on Telerik UI for JSP and on the StockChart:

* [Overview of the StockChart JSP Tag]({% slug overview_stockchart_uiforjsp %})
* [Overview of the StockChart Widget]({% slug overview_kendoui_stockcharts %})
* [Telerik UI for JSP API Reference Folder](/api/jsp/autocomplete/animation)
* [Telerik UI for JSP Tags Folder]({% slug overview_autocomplete_uiforjsp %})
