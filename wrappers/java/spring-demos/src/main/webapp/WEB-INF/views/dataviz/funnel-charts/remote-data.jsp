<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>

<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:url value="/dataviz/funnel-charts/remote-data/read" var="readUrl" />

<demo:header />
     <div class="chart-wrapper">
         <kendo:chart name="chart">
             <kendo:chart-title text="Spain windpower electricity production (GWh)" />
             <kendo:chart-legend visible="false" />
             <kendo:dataSource>
                 <kendo:dataSource-sort>
                     <kendo:dataSource-sortItem field="year" dir="desc" />
                 </kendo:dataSource-sort>
                 <kendo:dataSource-transport>
                     <kendo:dataSource-transport-read url="${readUrl}" dataType="json" type="POST" contentType="application/json" />
                 </kendo:dataSource-transport>
             </kendo:dataSource>
             <kendo:chart-series>
                <kendo:chart-seriesItem type="funnel" field="wind" categoryField="year" segmentSpacing="2"
                	dynamicSlope="true" dynamicHeight="false">
                	<kendo:chart-seriesItem-labels visible="true" template="#= dataItem.year #" />
               	</kendo:chart-seriesItem>
             </kendo:chart-series>
             <kendo:chart-tooltip visible="true" template="#= dataItem.year # - #= value # GWh" />
         </kendo:chart>
    </div>
    
    <style scoped>
        .chart-wrapper .k-chart {
            width: 400px;
            margin: 0 auto;
        }
    </style>
<demo:footer />
