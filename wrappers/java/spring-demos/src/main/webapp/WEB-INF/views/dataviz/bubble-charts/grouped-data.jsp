<%@page import="java.util.HashMap"%>
<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>

<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:url value="/dataviz/bubble-charts/grouped-data/read" var="readUrl" />

<% 
	HashMap<String, Object> xMargin = new HashMap<String, Object>();
	xMargin.put("top", -25);
	
	HashMap<String, Object> yMargin = new HashMap<String, Object>();
	yMargin.put("right", -30);
	
	HashMap<String, Object> yPadding = new HashMap<String, Object>();
	yPadding.put("left", 20);
%>

<demo:header />
     <div class="chart-wrapper">
         <kendo:chart name="chart">
             <kendo:chart-title text="Olypmic Medals Won by Japan" />
             <kendo:chart-legend visible="false" />
             <kendo:dataSource>
                 <kendo:dataSource-transport>
                     <kendo:dataSource-transport-read url="${readUrl}" dataType="json" type="POST" contentType="application/json" />
                 </kendo:dataSource-transport>
                 <kendo:dataSource-group>
                     <kendo:dataSource-groupItem field="country" />
                 </kendo:dataSource-group>
             </kendo:dataSource>
             <kendo:chart-series>
                <kendo:chart-seriesItem type="bubble" xfield="year" yfield="standing" sizeField="number" colorField="color" opacity="0.9" />
             </kendo:chart-series>
             <kendo:chart-xAxis>
                <kendo:chart-xAxisItem majorUnit="4" min="1980" max="2015" >
                    <kendo:chart-xAxisItem-labels skip="1" margin="<%= xMargin %>" />
                    <kendo:chart-xAxisItem-line visible="false" />
                    <kendo:chart-xAxisItem-majorGridLines visible="false"/>
                </kendo:chart-xAxisItem>
             </kendo:chart-xAxis>
             <kendo:chart-yAxis>
                <kendo:chart-yAxisItem majorUnit="1" min="0" max="3.7">
                    <kendo:chart-yAxisItem-labels step="1" skip="1" template="#= value # place" margin="<%= yMargin %>" padding="<%= yPadding %>"/>
                    <kendo:chart-yAxisItem-line visible="false" />
                    <kendo:chart-yAxisItem-majorGridLines visible="false"/>
                </kendo:chart-yAxisItem>
             </kendo:chart-yAxis>
             <kendo:chart-tooltip visible="true" template="#= value.x #: #= value.size # Medals" />
         </kendo:chart>
    </div>
    <style>
	    .chart-wrapper {
	        position: relative;
	    }
	</style>
<demo:footer />
