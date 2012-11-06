<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<demo:header />
	<div id="example" class="k-content">
         <div class="chart-wrapper">
         	 <kendo:chart name="chart">
        	 	 <kendo:chart-title text="Spain electricity production (GWh)"></kendo:chart-title>
        	 	 <kendo:chart-legend position="top"></kendo:chart-legend>
        	 	 <kendo:dataSource>
        	 	 	 <kendo:dataSource-sort>
        	 	 	 <kendo:dataSource-sortItem field="year" dir="asc" />
        	 	 	 </kendo:dataSource-sort>
	        	 	 <kendo:dataSource-transport>
	             		 <kendo:dataSource-transport-read url="${readUrl}" dataType="json" type="POST" contentType="application/json" />
	                 </kendo:dataSource-transport>
                 </kendo:dataSource>
        	 	 <kendo:chart-series>
        	 	 	<kendo:chart-seriesItem type="area" field="nuclear" name="Nuclear"></kendo:chart-seriesItem>
        	 	 	<kendo:chart-seriesItem type="area" field="hydro" name="Hydro"></kendo:chart-seriesItem>
        	 	 	<kendo:chart-seriesItem type="area" field="wind" name="Wind"></kendo:chart-seriesItem>
        	 	 </kendo:chart-series>
        	 	 <kendo:chart-categoryAxis field="year">
        	 	 	<kendo:chart-categoryAxis-labels rotation="-90"></kendo:chart-categoryAxis-labels>
        	 	 </kendo:chart-categoryAxis>
        	 	 <kendo:chart-valueAxis majorUnit="10000">
        	 	 	<kendo:chart-valueAxis-labels format="{0:N0}"></kendo:chart-valueAxis-labels>
        	 	 </kendo:chart-valueAxis>
        	 	 <kendo:chart-tooltip visible="true" format="{0}%"></kendo:chart-tooltip>
        	 </kendo:chart>
        </div>
    </div>
<demo:footer />