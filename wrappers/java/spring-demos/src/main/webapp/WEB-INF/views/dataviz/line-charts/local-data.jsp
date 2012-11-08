<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<demo:header />
	<div id="example" class="k-content">
         <div class="chart-wrapper">
         	 <kendo:chart name="chart">
         	 	 <kendo:chart-title text="Internet Users"></kendo:chart-title>
         	 	 <kendo:chart-legend position="bottom"></kendo:chart-legend>
         	 	 <kendo:dataSource data="${internetUsers}">
            	 </kendo:dataSource>
         	 	 <kendo:chart-series>
         	 	 	<kendo:chart-seriesItem type="line" field="value" name="United States">
         	 	 		<kendo:chart-seriesItem-labels format="{0}%" visible="true"></kendo:chart-seriesItem-labels>
         	 	 	</kendo:chart-seriesItem>
         	 	 </kendo:chart-series>
         	 	 <kendo:chart-categoryAxis>
         	 	 	<kendo:chart-categoryAxisItem field="year"></kendo:chart-categoryAxisItem>
         	 	 </kendo:chart-categoryAxis>
         	 	 <kendo:chart-valueAxis>
         	 	 	<kendo:chart-valueAxisItem>
         	 	 		<kendo:chart-valueAxisItem-labels format="{0}%"></kendo:chart-valueAxisItem-labels>
         	 	 	</kendo:chart-valueAxisItem>
         	 	 </kendo:chart-valueAxis>
         	 </kendo:chart>
         </div>
    </div>
<demo:footer />