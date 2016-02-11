---
title: Ajax Binding
page_title: Ajax Binding | Chart JSP Tag
description: "Get started with the Ajax binding of the Chart JSP tag in Kendo UI."
slug: ajaxbinding_chart_uiforjsp
position: 2
---

# Ajax Binding

## Getting Started

When configured for Ajax binding, the Kendo UI Chart for JSP makes Ajax requests to populate its series.

### Configuration

To configure the Kendo Chart for Ajax binding, follow the steps below (using the Spring MVC framework).

**Step 1** Add a new action method which will return data to populate the Chart.

###### Example

	    @RequestMapping(value = "/remote-data/read", method = RequestMethod.POST)
	    public @ResponseBody List<ElectricityProduction> read() {
			List<ElectricityProduction> data =
				ChartDataRepository.SpainElectricityProduction();
	    }

**Step 2** Return the data as JSON.

###### Example

	    @RequestMapping(value = "/remote-data/read", method = RequestMethod.POST)
	    public @ResponseBody List<ElectricityProduction> read() {
			List<ElectricityProduction> data =
				ChartDataRepository.SpainElectricityProduction();
			return data;
	    }

**Step 3** In the view configure the Chart to use the action method created in the previous steps.

###### Example

		<kendo:chart name="chart">
			 <kendo:dataSource>
			 	 <kendo:dataSource-sort>
			 	 	 <kendo:dataSource-sortItem field="year" dir="asc" />
			 	 </kendo:dataSource-sort>
		 	 <kendo:dataSource-transport>
		    		 <kendo:dataSource-transport-read url="${readUrl}" dataType="json" type="POST" contentType="application/json" />
		        </kendo:dataSource-transport>
		       </kendo:dataSource>
			 <kendo:chart-series>
			 	<kendo:chart-seriesItem type="column" field="nuclear" name="Nuclear" />
			 	<kendo:chart-seriesItem type="column" field="hydro" name="Hydro" />
			 	<kendo:chart-seriesItem type="column" field="wind" name="Wind" />
			 </kendo:chart-series>
			 <kendo:chart-categoryAxis>
		 	 	<kendo:chart-categoryAxisItem field="year" />
		 	 </kendo:chart-categoryAxis>
		</kendo:chart>

## See Also

Other articles on Telerik UI for JSP and on the AutoComplete:

* [Overview of the Chart JSP Tag]({% slug overview_chart_uiforjsp %})
* [Overview of the Kendo UI Chart Widget]({% slug overview_kendoui_charts_widget %})
* [Telerik UI for JSP API Reference Folder](/api/jsp/autocomplete/animation)
* [Telerik UI for JSP Tags Folder]({% slug overview_autocomplete_uiforjsp %})
