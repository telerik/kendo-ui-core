---
title: Overview
---

# Chart

The Chart tag is a server-side wrapper for the [Kendo UI Chart](/api/dataviz/chart) widget.

## Getting Started

Here is how to configure the Kendo Chart for binding to a data passed as model attribute in Spring MVC:

1.  Make sure you have followed all the steps from the [Introduction](/jsp/introduction) help topic.

2.  Create a new action method and pass the InternetUsers list as the model:

    	@RequestMapping(value = {"/", "/index"}, method = RequestMethod.GET)
	    public String index(Model model) {
	        model.addAttribute("viewModel", ChartDataRepository.InternetUsers());
	     
	        return "/dataviz/bar-charts/local-data";
	    }

4.  Add a server bound chart:

		<kendo:chart name="chart">
			 <kendo:dataSource data="${viewModel}" />
			 <kendo:chart-series>
			 	<kendo:chart-seriesItem type="bar" field="value" colorField="color" name="United States">
			 		<kendo:chart-seriesItem-labels format="{0}%" visible="true" />
			 	</kendo:chart-seriesItem>
			 </kendo:chart-series>
			 <kendo:chart-categoryAxis>
			 	<kendo:chart-categoryAxisItem field="year" />
			 </kendo:chart-categoryAxis>
		</kendo:chart>

## Accessing an Existing Chart

You can reference an existing chart instance via [jQuery.data()](http://api.jquery.com/jQuery.data/).
Once a reference has been established, you can use the [API](/api/dataviz/chart#methods) to control its behavior.

### Accessing an existing Chart instance

    // Put this after your Kendo StockChart tag
    <script>
        $(function() {
            // Notice that the Name() of the chart is used to get its client-side instance
            var chart = $("#internetUsersChart").data("kendoChart");
        });
    </script>

## Handling Kendo UI Chart events

You can subscribe to all [events](/api/dataviz/chart#events) exposed by Kendo UI Chart:


### Subscribe by handler name

	<kendo:chart name="chart" dataBound="internetUsersChart_dataBound"
							  seriesClick="internetUsersChart_seriesClick">
		 <kendo:dataSource data="${viewModel}" />
		 <kendo:chart-series>
		 	<kendo:chart-seriesItem type="bar" field="value" colorField="color" name="United States">
		 		<kendo:chart-seriesItem-labels format="{0}%" visible="true" />
		 	</kendo:chart-seriesItem>
		 </kendo:chart-series>
		 <kendo:chart-categoryAxis>
		 	<kendo:chart-categoryAxisItem field="year" />
		 </kendo:chart-categoryAxis>
	</kendo:chart>

    <script>
        function internetUsersChart_dataBound() {
            // Handle the dataBound event
        }
	    
        function internetUsersChart_seriesClick() {
            // Handle the series click event
        }
    </script>

