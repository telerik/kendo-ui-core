<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>

<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:url value="/dataviz/radar-charts/grouped-data/read" var="readUrl" />

<demo:header />
     <div class="chart-wrapper">
         <% 
             String[] seriesColors = {
        		 "#1b79e4", "#3b6ad3", "#5d5ac2",
                 "#8348ae", "#a23a9d", "#c42a8c", "#e51a7a"
             };
         %>
         <kendo:chart name="chart" seriesColors="<%= seriesColors %>">
             <kendo:chart-title text="Wind Rose" />
             <kendo:chart-legend position="right">
             	<kendo:chart-legend-labels template="#= (series.data[0] || {}).categoryText # m/s" />
             </kendo:chart-legend>
             <kendo:dataSource>
                 <kendo:dataSource-transport>
                     <kendo:dataSource-transport-read url="${readUrl}" dataType="json" type="POST" contentType="application/json" />
                 </kendo:dataSource-transport>
                 <kendo:dataSource-group>
                     <kendo:dataSource-groupItem field="category" />
                 </kendo:dataSource-group>
                 <kendo:dataSource-sort>
                     <kendo:dataSource-sortItem field="dir" dir="asc" />
                 </kendo:dataSource-sort>
             </kendo:dataSource>
             <kendo:chart-series>
                <kendo:chart-seriesItem type="radarColumn" field="frequency" stack="true" />
             </kendo:chart-series>
              <kendo:chart-categoryAxis>
                <kendo:chart-categoryAxisItem field="dirText">
                    <kendo:chart-categoryAxisItem-labels format="MMM" />
                </kendo:chart-categoryAxisItem>
             </kendo:chart-categoryAxis>
             <kendo:chart-valueAxis>
                <kendo:chart-valueAxisItem visible="false" />
             </kendo:chart-valueAxis>
             <kendo:chart-tooltip template="#= category # (#= dataItem.categoryText # m/s) #= value #%" visible="true" />
         </kendo:chart>
     </div>
<demo:footer />
