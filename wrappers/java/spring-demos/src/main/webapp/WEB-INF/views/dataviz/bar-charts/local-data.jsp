<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<demo:header />
	<div id="example" class="k-content">
         <div class="chart-wrapper">
         	 <kendo:chart name="chart">
         	 	 <kendo:chart-title text="Internet Users" />
         	 	 <kendo:chart-legend position="bottom" />
         	 	 <kendo:dataSource data="${viewModel}" />
         	 	 <kendo:chart-series>
         	 	 	<kendo:chart-seriesItem type="bar" field="value" colorField="color" name="United States">
         	 	 		<kendo:chart-seriesItem-labels format="{0}%" visible="true" />
         	 	 	</kendo:chart-seriesItem>
         	 	 </kendo:chart-series>
         	 	 <kendo:chart-categoryAxis>
         	 	 	<kendo:chart-categoryAxisItem field="year" />
         	 	 </kendo:chart-categoryAxis>
         	 	 <kendo:chart-valueAxis>
         	 	 	<kendo:chart-valueAxisItem>
         	 	 		<kendo:chart-valueAxisItem-labels format="{0}%" />
         	 	 	</kendo:chart-valueAxisItem>
         	 	 </kendo:chart-valueAxis>
         	 </kendo:chart>
         </div>
    </div>
<demo:footer />