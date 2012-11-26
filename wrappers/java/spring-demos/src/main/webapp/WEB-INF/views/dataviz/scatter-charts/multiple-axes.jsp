<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<demo:header />
     <div class="chart-wrapper">
         <kendo:chart name="chart">
             <kendo:chart-title text="Dyno run results" />
             <kendo:chart-legend visible="false" />
             <kendo:dataSource data="${engineData}" />
             <kendo:chart-series>
                <kendo:chart-seriesItem type="scatterLine" xfield="RPM" yfield="power" width="2" name="Power">
                    <kendo:chart-seriesItem-tooltip format="{1} bhp @ {0:N0} rpm" />
                </kendo:chart-seriesItem>
                <kendo:chart-seriesItem type="scatterLine" xfield="RPM" yfield="torque" width="2" yaxis="torque" name="Torque">
                    <kendo:chart-seriesItem-tooltip format="{1} lb-ft @ {0:N0} rpm" />
                </kendo:chart-seriesItem>
             </kendo:chart-series>
             <kendo:chart-xAxis>
                // Align torque axis to the right by specifying
                // a crossing value greater than or equal to the axis maximum.
                <kendo:chart-xAxisItem axisCrossingValue="<%= new int[] { 0, 10000 } %>">
                    <kendo:chart-xAxisItem-labels format="{0:N0}" />
                    <kendo:chart-xAxisItem-title text="Engine rpm" />
                </kendo:chart-xAxisItem>
             </kendo:chart-xAxis>
             <kendo:chart-yAxis>
             <kendo:chart-yAxisItem>
                    <kendo:chart-yAxisItem-title text="Power (bhp)" />
                </kendo:chart-yAxisItem>
                <kendo:chart-yAxisItem name="torque">
                    <kendo:chart-yAxisItem-title text="Torque (lb-ft)" />
                </kendo:chart-yAxisItem>
             </kendo:chart-yAxis>
             <kendo:chart-tooltip visible="true" />
         </kendo:chart>
     </div>
<demo:footer />
