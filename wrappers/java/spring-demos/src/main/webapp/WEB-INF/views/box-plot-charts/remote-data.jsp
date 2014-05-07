<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>

<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:url value="/dataviz/box-plot-charts/remote-data/read" var="readUrl" />

<demo:header />
     <div class="chart-wrapper">         
         <kendo:chart name="chart">
             <kendo:chart-title text="Monthly Mean Temperatures (&deg;F)" />
             <kendo:chart-legend visible="false" />
             <kendo:dataSource>
                 <kendo:dataSource-sort>
                     <kendo:dataSource-sortItem field="year" dir="asc" />
                 </kendo:dataSource-sort>
                 <kendo:dataSource-transport>
                     <kendo:dataSource-transport-read url="${readUrl}" dataType="json" type="POST" contentType="application/json" />
                 </kendo:dataSource-transport>
             </kendo:dataSource>
             <kendo:chart-series>
                <kendo:chart-seriesItem type="boxPlot" lowerField="lower" q1Field="q1" medianField="median" q3Field="q3"
                	upperField="upper" meanField="mean" outliersField="outliers" categoryField="year" />
             </kendo:chart-series>
         </kendo:chart>
    </div>
<demo:footer />
