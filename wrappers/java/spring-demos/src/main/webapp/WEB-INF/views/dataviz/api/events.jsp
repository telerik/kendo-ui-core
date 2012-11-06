<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>

<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<c:url value="/dataviz/api/events/read" var="readUrl" />

<demo:header />
	<div id="example" class="k-content">
        <div class="chart-wrapper">
        	 <kendo:chart name="chart" seriesClick="onSeriesClick" seriesHover="onSeriesHover"
        	 			  dataBound="onDataBound" axisLabelClick="onAxisLabelClick" plotAreaClick="onPlotAreaClick">
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
        	 	 	<kendo:chart-seriesItem type="column" field="nuclear" name="Nuclear"></kendo:chart-seriesItem>
        	 	 	<kendo:chart-seriesItem type="column" field="hydro" name="Hydro"></kendo:chart-seriesItem>
        	 	 	<kendo:chart-seriesItem type="column" field="wind" name="Wind"></kendo:chart-seriesItem>
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
    <div class="console"></div>
    <script>
	    function onSeriesClick(e) {
	        kendoConsole.log(kendo.format("Series click :: {0} ({1}): {2}",
	            e.series.name, e.category, e.value));
	    }
	
	    function onSeriesHover(e) {
	        kendoConsole.log(kendo.format("Series hover :: {0} ({1}): {2}",
	            e.series.name, e.category, e.value));
	    }
	
	    function onDataBound(e) {
	        kendoConsole.log("Data bound");
	    }
	
	    function onAxisLabelClick(e) {
	        kendoConsole.log(kendo.format("Axis label click :: {0} axis : {1}",
	            e.axis.type, e.text));
	    }
	
	    function onPlotAreaClick(e) {
	        kendoConsole.log(kendo.format("Plot area click :: {0} : {1:N0}",
	            e.category, e.value));
	    }
	</script>
<demo:footer />