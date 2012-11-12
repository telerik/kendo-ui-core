<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>

<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:url value="/dataviz/scatter-charts/remote-data/read" var="readUrl" />

<demo:header />
	<div id="example" class="k-content">
         <div class="chart-wrapper">
         	 <kendo:chart name="chart">
         	 	 <kendo:chart-title text="Charge current vs. charge time" />
         	 	 <kendo:chart-series>
         	 	 	<kendo:chart-seriesItem type="scatterLine" data="<%= new int[][] { {10, 10}, {15, 20}, {20, 25}, {32, 40}, {43, 50}, {55, 60}, {60, 70}, {70, 80}, {90, 100} } %>" name="0.8C" />
                    <kendo:chart-seriesItem type="scatterLine" data="<%= new int[][] { {10, 40}, {17, 50}, {18, 70}, {35, 90}, {47, 95}, {60, 100} } %>" name="1.6C" />
                    <kendo:chart-seriesItem type="scatterLine" data="<%= new int[][] { {10, 70}, {13, 90}, {25, 100} } %>" name="3.1C" />
         	 	 </kendo:chart-series>
         	 	 <kendo:chart-xAxis>
         	 	 	<kendo:chart-xAxisItem max="90">
         	 	 		<kendo:chart-xAxisItem-labels format="{0}m" />
         	 	 		<kendo:chart-xAxisItem-title text="Time" />
         	 	 	</kendo:chart-xAxisItem>
         	 	 </kendo:chart-xAxis>
         	 	 <kendo:chart-yAxis>
         	 	 	<kendo:chart-yAxisItem max="100">
         	 	 		<kendo:chart-yAxisItem-labels format="{0}%" />
         	 	 		<kendo:chart-yAxisItem-title text="Charge" />
         	 	 	</kendo:chart-yAxisItem>
         	 	 </kendo:chart-yAxis>
         	 	 <kendo:chart-tooltip visible="true" format="{1}% in {0} minutes" />
         	 </kendo:chart>
        </div>
    </div>
<demo:footer />