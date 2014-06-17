<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>

<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:url value="/range-bar-charts/remote-data-binding/read" var="readUrl" />

<demo:header />
     <div class="chart-wrapper">
         <kendo:chart name="chart">
             <kendo:chart-title text="Transfer speed Mbit/s" />
             <kendo:chart-legend position="top" />
             <kendo:dataSource>
                 <kendo:dataSource-transport>
                     <kendo:dataSource-transport-read url="${readUrl}" dataType="json" type="POST" contentType="application/json" />
                 </kendo:dataSource-transport>
             </kendo:dataSource>
             <kendo:chart-series>
                <kendo:chart-seriesItem type="rangeColumn" fromField="wiFiFrom" toField="wiFiTo" name="WiFi" />
                <kendo:chart-seriesItem type="rangeColumn" fromField="opticalFrom" toField="opticalTo" name="Optical" />
             </kendo:chart-series>
             <kendo:chart-categoryAxis>
                <kendo:chart-categoryAxisItem field="day">
                </kendo:chart-categoryAxisItem>
             </kendo:chart-categoryAxis>
             <kendo:chart-tooltip visible="true" template="#= value.from # - #= value.to #" />
         </kendo:chart>
    </div>
<demo:footer />
