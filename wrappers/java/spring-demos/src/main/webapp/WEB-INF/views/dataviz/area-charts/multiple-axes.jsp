<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<demo:header />
	<div id="example" class="k-content">
         <div class="chart-wrapper">
         	 <kendo:chart name="chart">
         	 	 <kendo:chart-title text="Hybrid car mileage report"></kendo:chart-title>
         	 	 <kendo:chart-legend position="top"></kendo:chart-legend>
         	 	 <kendo:chart-series>
         	 	 	<kendo:chart-seriesItem type="column" stack="true" color="#13558E" data="<%= new int[] { 20, 40, 45, 30, 50 } %>" name="on battery"></kendo:chart-seriesItem>
         	 	 	<kendo:chart-seriesItem type="column" stack="true" color="#E21219" data="<%= new int[] { 20, 30, 35, 35, 40 } %>" name="on gas"></kendo:chart-seriesItem>
         	 	 	<kendo:chart-seriesItem type="area" color="#DE7E42" data="<%= new int[] { 30, 38, 40, 32, 42 } %>" name="MPG" axis="mpg"></kendo:chart-seriesItem>
         	 	 	<kendo:chart-seriesItem type="area" color="#057589" data="<%= new double[] { 7.8, 6.2, 5.9, 7.4, 5.6 } %>" name="l/100 km" axis="l100km"></kendo:chart-seriesItem>
         	 	 </kendo:chart-series>
         	 	 // Align the first two value axes to the left
		         // and the last two to the right.
		         //
		         // Right alignment is done by specifying a
		         // crossing value greater than or equal to
		         // the number of categories.
         	 	 <kendo:chart-categoryAxis axisCrossingValue="<%= new int[] { 0, 0, 10, 10 } %>" categories="<%= new String[] { \"Mon\", \"Tue\", \"Wed\", \"Thu\", \"Fri\" } %>"></kendo:chart-categoryAxis>
         	 	 <kendo:chart-valueAxis>
         	 	 	<kendo:chart-valueAxis-labels format="{0}%"></kendo:chart-valueAxis-labels>
         	 	 </kendo:chart-valueAxis>
         	 	 <kendo:chart-tooltip visible="true" format="{0}%"></kendo:chart-tooltip>
         	 </kendo:chart>
         </div>
    </div>
<demo:footer />