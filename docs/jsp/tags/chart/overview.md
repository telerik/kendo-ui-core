---
title: Overview
page_title: Overview | Chart JSP Tag
description: "Get started with the Chart JSP tag in Kendo UI."
slug: overview_chart_uiforjsp
position: 1
---

# Chart JSP Tag Overview

The Chart JSP tag is a server-side wrapper for the [Kendo UI Chart](/api/javascript/dataviz/ui/chart) widget.

## Getting Started

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI Chart for binding to data passed as a model attribute in Spring MVC.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for JSP]({% slug overview_uiforjsp %}).

**Step 2** Create a new action method and pass the `InternetUsers` list as the model.

###### Example

    	@RequestMapping(value = {"/", "/index"}, method = RequestMethod.GET)
	    public String index(Model model) {
	        model.addAttribute("viewModel", ChartDataRepository.InternetUsers());

	        return "/dataviz/bar-charts/local-data";
	    }

**Step 3** Add a server-bound chart.

###### Example

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

## Event Handling

### Subscribe to Events

You can subscribe to all [events exposed by Kendo UI Chart](/api/javascript/dataviz/ui/chart#events) by the handler name.

###### Example

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

## Reference

### Existing Instances

You are able to reference an existing Chart instance via the [`jQuery.data()`](http://api.jquery.com/jQuery.data/). Once a reference is established, you are able to use the [Chart API](/api/javascript/dataviz/ui/chart#methods) to control its behavior.

###### Example

    // Put this after your Kendo StockChart tag
    <script>
        $(function() {
            // Notice that the Name() of the chart is used to get its client-side instance
            var chart = $("#internetUsersChart").data("kendoChart");
        });
    </script>

## See Also

Other articles on Telerik UI for JSP and on the Chart:

* [Ajax Binding of the Chart]({% slug ajaxbinding_chart_uiforjsp %})
* [Overview of the Kendo UI Chart Widget]({% slug overview_kendoui_charts_widget %})
* [Telerik UI for JSP API Reference Folder](/api/jsp/autocomplete/animation)
* [Telerik UI for JSP Tags Folder]({% slug overview_autocomplete_uiforjsp %})
