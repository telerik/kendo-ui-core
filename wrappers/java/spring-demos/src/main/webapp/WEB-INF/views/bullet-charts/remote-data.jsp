<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>

<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:url value="/dataviz/bullet-charts/remote-data/read" var="readUrl" />

<demo:header />
     <div class="chart-wrapper">
         <kendo:chart name="chart-sales">
             <kendo:chart-title text="April sales per day" />
             <kendo:chart-legend visible="false" />
             <kendo:dataSource>
                 <kendo:dataSource-transport>
                     <kendo:dataSource-transport-read url="${readUrl}" dataType="json" type="POST" contentType="application/json" />
                 </kendo:dataSource-transport>
             </kendo:dataSource>
             <kendo:chart-series>
                <kendo:chart-seriesItem type="verticalBullet" currentField="current" targetField="target" gap="4">
                	<kendo:chart-seriesItem-target color="#aaaaaa" />
                </kendo:chart-seriesItem>
             </kendo:chart-series>
             <kendo:chart-valueAxis>
             	<kendo:chart-valueAxisItem min="2000" max="11000">
             		<kendo:chart-valueAxisItem-majorGridLines visible="false" />
             		<kendo:chart-valueAxisItem-minorTicks visible="true" />
             		<kendo:chart-valueAxisItem-plotBands>
             			<kendo:chart-valueAxisItem-plotBand from="1000" to="3000" color="#aaaaaa" opacity="0.55" />
             			<kendo:chart-valueAxisItem-plotBand from="3000" to="5000" color="#aaaaaa" opacity="0.4" />
             			<kendo:chart-valueAxisItem-plotBand from="5000" to="8000" color="#aaaaaa" opacity="0.25" />
             			<kendo:chart-valueAxisItem-plotBand from="8000" to="11000" color="#aaaaaa" opacity="0.1" />
             		</kendo:chart-valueAxisItem-plotBands>
             	</kendo:chart-valueAxisItem>
             </kendo:chart-valueAxis>
             <kendo:chart-categoryAxis>
             	<kendo:chart-categoryAxisItem field="category">
             		<kendo:chart-categoryAxisItem-majorGridLines visible="false" />
             	</kendo:chart-categoryAxisItem>
          	 </kendo:chart-categoryAxis>
             <kendo:chart-tooltip visible="true" shared="true" template="Target: #= value.target # items<br /> Actual: #= value.current # items" />
         </kendo:chart>
     </div>
     <style>
        .chart-wrapper {
            padding-top: 20px;
        }
        .chart-wrapper .k-tooltip {
            text-align: left;
        }
    </style>
<demo:footer />
