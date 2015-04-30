---
title: Ajax Binding
---

## Ajax Binding

When configured for ajax binding the Kendo Chart for JSP will make an ajax requests to populate its series.

To configure the Kendo Chart for ajax binding follow these steps (using Spring MVC framework):

1.  Add a new action method which will return data to populate the chart:

	    @RequestMapping(value = "/remote-data/read", method = RequestMethod.POST)
	    public @ResponseBody List<ElectricityProduction> read() {
			List<ElectricityProduction> data =
				ChartDataRepository.SpainElectricityProduction();
	    }

2.  Return the data as JSON:

	    @RequestMapping(value = "/remote-data/read", method = RequestMethod.POST)
	    public @ResponseBody List<ElectricityProduction> read() {
			List<ElectricityProduction> data =
				ChartDataRepository.SpainElectricityProduction();
			return data;
	    }

3.  In the view configure the chart to use the action method created in the previous steps:

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
