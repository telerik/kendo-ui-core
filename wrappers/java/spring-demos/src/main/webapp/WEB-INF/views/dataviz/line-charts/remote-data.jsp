<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>

<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:url value="/dataviz/line-charts/remote-data/read" var="readUrl" />

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
        	 	 	<kendo:chart-seriesItem type="line" field="nuclear" name="Nuclear"></kendo:chart-seriesItem>
        	 	 	<kendo:chart-seriesItem type="line" field="hydro" name="Hydro"></kendo:chart-seriesItem>
        	 	 	<kendo:chart-seriesItem type="line" field="wind" name="Wind"></kendo:chart-seriesItem>
        	 	 </kendo:chart-series>
        	 	 <kendo:chart-categoryAxis>
         	 	 	<kendo:chart-categoryAxisItem field="year">
         	 	 		<kendo:chart-categoryAxisItem-labels rotation="-90"></kendo:chart-categoryAxisItem-labels>
         	 	 	</kendo:chart-categoryAxisItem>
         	 	 </kendo:chart-categoryAxis>
         	 	 <kendo:chart-valueAxis>
         	 	 	<kendo:chart-valueAxisItem majorUnit="10000">
         	 	 		<kendo:chart-valueAxisItem-labels format="{0:N0}"></kendo:chart-valueAxisItem-labels>
         	 	 	</kendo:chart-valueAxisItem>
         	 	 </kendo:chart-valueAxis>
        	 	 <kendo:chart-tooltip visible="true" format="{0}%"></kendo:chart-tooltip>
        	 </kendo:chart>
        </div>
    </div>
<demo:footer />