---
title: Overview
page_title: Overview | StockChart JSP Tag
description: "Get started with the StockChart JSP tag in Kendo UI."
slug: overview_stockchart_uiforjsp
position: 1
---

# StockChart JSP Tag Overview

The Chart JSP tag is a server-side wrapper for the [Kendo UI StockChart](/api/javascript/dataviz/ui/stock-chart) widget.

## Getting Started

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI StockChart for binding to data, passed as a model attribute in Spring MVC.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for JSP]({% slug overview_uiforjsp %}).

**Step 2** Create a new action method and pass the **InternetUsers** list as the model.

###### Example

    	@RequestMapping(value = {"/", "/index"}, method = RequestMethod.GET)
	    public String index(Model model) {
	        model.addAttribute("viewModel", ChartDataRepository.BoeingStockData());

	        return "/dataviz/financial/index";
	    }

**Step 3** Add a server-bound chart.

###### Example

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

## Event Handling

### Subscribe to Events

You can subscribe to all [events exposed by Kendo UI StockChart](/api/javascript/dataviz/ui/stock-chart#events) by the handler name.

###### Example

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

## Reference

### Existing Instances

You are able to reference an existing StockChart instance via the [`jQuery.data()`](http://api.jquery.com/jQuery.data/). Once a reference is established, you are able to use the [StockChart API](/api/javascript/dataviz/ui/stock-chart#methods) to control its behavior.

###### Example

      // Put this after your Kendo StockChart tag
      <script>
          $(function() {
              // Notice that the Name() of the chart is used to get its client-side instance
              var chart = $("#stockChart").data("kendoChart");
          });
      </script>

## See Also

Other articles on Telerik UI for JSP and on the StockChart:

* [Ajax Binding of the StockChart]({% slug ajaxbinding_stockchart_uiforjsp %})
* [Overview of the Kendo UI StockChart Widget]({% slug overview_kendoui_stockcharts %})
* [Telerik UI for JSP API Reference Folder](/api/jsp/autocomplete/animation)
* [Telerik UI for JSP Tags Folder]({% slug overview_autocomplete_uiforjsp %})
