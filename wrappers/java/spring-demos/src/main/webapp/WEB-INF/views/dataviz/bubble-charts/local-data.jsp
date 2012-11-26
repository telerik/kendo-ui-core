<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<demo:header />
     <div class="chart-wrapper">
         <kendo:chart name="chart">
             <kendo:chart-title text="Job Growth for 2011" />
             <kendo:chart-legend visible="false" />
             <kendo:dataSource data="${jobGrowth}" />
             <kendo:chart-series>
                <kendo:chart-seriesItem type="bubble" xfield="growth" yfield="jobs" sizeField="applications" categoryField="company" />
             </kendo:chart-series>
             <kendo:chart-xAxis>
                <kendo:chart-xAxisItem axisCrossingValue="-5000" majorUnit="2000">
                    <kendo:chart-xAxisItem-labels format="{0:N0}" skip="1" />
                    <kendo:chart-xAxisItem-plotBands>
                        <kendo:chart-xAxisItem-plotBand from="-5000" to="0" color="#00f" opacity="0.05" />
                    </kendo:chart-xAxisItem-plotBands>
                </kendo:chart-xAxisItem>
             </kendo:chart-xAxis>
             <kendo:chart-yAxis>
                <kendo:chart-yAxisItem>
                    <kendo:chart-yAxisItem-labels format="{0:N0}" skip="1" />
                    <kendo:chart-yAxisItem-line visible="false" />
                </kendo:chart-yAxisItem>
             </kendo:chart-yAxis>
             <kendo:chart-tooltip visible="true" format="{3}: {2:N0} applications" />
         </kendo:chart>
     </div>
<demo:footer />
