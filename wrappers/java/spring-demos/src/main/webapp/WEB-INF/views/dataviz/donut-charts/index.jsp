<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<demo:header />
	<div id="example" class="k-content">
         <div class="chart-wrapper">
         	 <kendo:chart name="chart">
         	 	 <kendo:chart-title text="Break-up of Spain Electricity Production for 2008"></kendo:chart-title>
         	 	 <kendo:chart-legend position="bottom"></kendo:chart-legend>
         	 	 <kendo:chart-series>
         	 	 	<kendo:chart-seriesItem type="donut" data="${donutData}"></kendo:chart-seriesItem>
         	 	 </kendo:chart-series>
         	 	 <kendo:chart-tooltip visible="true" format="{0}%"></kendo:chart-tooltip>
         	 </kendo:chart>
         </div>
    </div>
<demo:footer />