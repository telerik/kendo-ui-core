<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>

<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<c:url value="/dataviz/api/events/read" var="readUrl" />

<demo:header />
	<div id="example" class="k-content">
        <div class="chart-wrapper">
        	 <kendo:chart name="chart" seriesClick="onSeriesClick" seriesHover="onSeriesHover"
        	 			  dataBound="onDataBound"
        	 			  axisLabelClick="onAxisLabelClick"
        	 			  plotAreaClick="onPlotAreaClick"
        	 			  dragStart="onDragStart"
        	 			  drag="onDrag"
        	 			  dragEnd="onDragEnd"
        	 			  zoomStart="onZoomStart"
        	 			  zoom="onZoom"
        	 			  zoomEnd="onZoomEnd">
        	 	 <kendo:chart-title text="Spain electricity production (GWh)" />
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
        	 	 	<kendo:chart-seriesItem type="column" field="nuclear" name="Nuclear" />
        	 	 	<kendo:chart-seriesItem type="column" field="hydro" name="Hydro" />
        	 	 	<kendo:chart-seriesItem type="column" field="wind" name="Wind" />
        	 	 </kendo:chart-series>
        	 	 <kendo:chart-categoryAxis>
        	 	 	<kendo:chart-categoryAxisItem field="year">
        	 	 		<kendo:chart-categoryAxisItem-labels rotation="-90" />
        	 	 	</kendo:chart-categoryAxisItem>
        	 	 </kendo:chart-categoryAxis>
        	 	 <kendo:chart-valueAxis>
        	 	 	<kendo:chart-valueAxisItem majorUnit="10000">
        	 	 		<kendo:chart-valueAxisItem-labels format="{0:N0}" />
        	 	 	</kendo:chart-valueAxisItem>
        	 	 </kendo:chart-valueAxis>
        	 	 <kendo:chart-tooltip visible="true" format="{0}%" />
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

	    function onDragStart(e) {
	        kendoConsole.log("Drag start");
	    }

	    function onDrag(e) {
	        kendoConsole.log("Drag");
	    }

	    function onDragEnd(e) {
	        kendoConsole.log("Drag end");
	    }

	    function onZoomStart(e) {
	        kendoConsole.log("Zoom start");
	    }

	    function onZoom(e) {
	        kendoConsole.log(kendo.format("Zoom :: {0}", e.delta));
	    }

	    function onZoomEnd(e) {
	        kendoConsole.log("Zoom end");
	    }
	</script>
<demo:footer />