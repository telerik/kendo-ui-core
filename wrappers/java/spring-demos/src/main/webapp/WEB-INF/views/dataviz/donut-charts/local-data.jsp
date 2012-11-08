<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<demo:header />
	<div id="example" class="k-content">
         <div class="chart-wrapper">
         	 <kendo:chart name="chart" seriesColors="<%= new String[] { \"#42a7ff\", \"#666666\", \"#999999\", \"#cccccc\" } %>">
         	 	 <kendo:chart-title text="Break-up of Spain Electricity Production for 2008"></kendo:chart-title>
         	 	 <kendo:chart-legend position="bottom"></kendo:chart-legend>
         	 	 <kendo:dataSource data="${spainElectricityBreakdown}">
            	 </kendo:dataSource>
         	 	 <kendo:chart-series>
         	 	 	<kendo:chart-seriesItem type="donut" field="percentage" categoryField="source" explodeField="explode"></kendo:chart-seriesItem>
         	 	 </kendo:chart-series>
         	 	 <kendo:chart-tooltip visible="true" template="${ category } - ${ value }%"></kendo:chart-tooltip>
         	 </kendo:chart>
         </div>
    </div>
<demo:footer />