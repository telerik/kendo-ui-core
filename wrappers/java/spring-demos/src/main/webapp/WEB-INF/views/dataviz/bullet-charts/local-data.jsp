<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<demo:header />
     <div class="chart-wrapper">
         <kendo:chart name="chart-mmHg">
             <kendo:chart-legend visible="false" />
             <kendo:dataSource data="${mmhgData}" />
             <kendo:chart-series>
                <kendo:chart-seriesItem type="verticalBullet" color="#ffffff" opacity="0.8" currentField="current" targetField="target">
                	<kendo:chart-seriesItem-target color="#ffffff" />
                </kendo:chart-seriesItem>
             </kendo:chart-series>
             <kendo:chart-valueAxis>
             	<kendo:chart-valueAxisItem min="715" max="790">
             		<kendo:chart-valueAxisItem-majorGridLines visible="false" />
             		<kendo:chart-valueAxisItem-minorTicks visible="true" />
             		<kendo:chart-valueAxisItem-plotBands>
             			<kendo:chart-valueAxisItem-plotBand from="715" to="752" color="#2890cc" opacity="0.5" />
             			<kendo:chart-valueAxisItem-plotBand from="752" to="772" color="#2890cc" opacity="0.7" />
             			<kendo:chart-valueAxisItem-plotBand from="772" to="790" color="#2890cc" opacity="0.5" />
             			<kendo:chart-valueAxisItem-plotBand from="761" to="761.5" color="#ff0000" />
             		</kendo:chart-valueAxisItem-plotBands>
             	</kendo:chart-valueAxisItem>
             </kendo:chart-valueAxis>
             <kendo:chart-categoryAxis>
             	<kendo:chart-categoryAxisItem field="category">
             		<kendo:chart-categoryAxisItem-majorGridLines visible="false" />
             		<kendo:chart-categoryAxisItem-majorTicks visible="false" />
             		<kendo:chart-categoryAxisItem-title text="mmHg" />
             	</kendo:chart-categoryAxisItem>
          	 </kendo:chart-categoryAxis>
             <kendo:chart-tooltip visible="true" shared="true" template="Maximum: #= value.target # <br /> Average: #= value.current #" />
         </kendo:chart>
         <kendo:chart name="chart-hPa">
             <kendo:chart-legend visible="false" />
             <kendo:dataSource data="${hPaData}" />
             <kendo:chart-series>
                <kendo:chart-seriesItem type="verticalBullet" data="${hPaData}" color="#ffffff" opacity="0.8" currentField="current" targetField="target">
                	<kendo:chart-seriesItem-target color="#ffffff" />
                </kendo:chart-seriesItem>
             </kendo:chart-series>
             <kendo:chart-valueAxis>
             	<kendo:chart-valueAxisItem min="955" max="1050">
             		<kendo:chart-valueAxisItem-majorGridLines visible="false" />
             		<kendo:chart-valueAxisItem-minorTicks visible="true" />
             		<kendo:chart-valueAxisItem-plotBands>
             			<kendo:chart-valueAxisItem-plotBand from="955" to="1002" color="#8ebc00" opacity="0.6" />
             			<kendo:chart-valueAxisItem-plotBand from="1002" to="1027" color="#8ebc00" opacity="0.8" />
             			<kendo:chart-valueAxisItem-plotBand from="1027" to="1050" color="#8ebc00" opacity="0.6" />
             			<kendo:chart-valueAxisItem-plotBand from="1014" to="1014.5" color="#ff0000" />
             		</kendo:chart-valueAxisItem-plotBands>
             	</kendo:chart-valueAxisItem>
             </kendo:chart-valueAxis>
             <kendo:chart-categoryAxis>
             	<kendo:chart-categoryAxisItem field="category" axisCrossingValue="14">
             		<kendo:chart-categoryAxisItem-majorGridLines visible="false" />
             		<kendo:chart-categoryAxisItem-majorTicks visible="false" />
             		<kendo:chart-categoryAxisItem-title text="mmHg" />
             	</kendo:chart-categoryAxisItem>
          	 </kendo:chart-categoryAxis>
             <kendo:chart-tooltip visible="true" shared="true" template="Maximum: #= value.target # <br /> Average: #= value.current #" />
         </kendo:chart>
     </div>
     <style>
        .chart-wrapper {
            padding-top: 20px;
        }
        .chart-wrapper .k-chart {
            width: 325px;
            margin: 0 10px;
            display: inline-block;
        }
        .chart-wrapper .k-tooltip {
            text-align: left;
        }
    </style>
<demo:footer />
