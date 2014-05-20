<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<demo:header />
     <div class="chart-wrapper">
         <kendo:chart name="chart">
             <kendo:chart-title text="Sun position at equinox" />
             <kendo:dataSource data="${sunPosition}" />
             <kendo:chart-series>
                <kendo:chart-seriesItem type="polarLine" xfield="azimuth" yfield="altitude">
                	<kendo:chart-seriesItem-labels
                		template="#= dataItem.time.substring(0,2) #h" position="below" visible="true"
                	/>
                </kendo:chart-seriesItem>
             </kendo:chart-series>
             <kendo:chart-yAxis>
                <kendo:chart-yAxisItem>
                	<kendo:chart-yAxisItem-labels visible="false" />
                </kendo:chart-yAxisItem>
             </kendo:chart-yAxis>
             <kendo:chart-xAxis>
                <kendo:chart-xAxisItem startAngle="-90" majorUnit="30" />
             </kendo:chart-xAxis>
         </kendo:chart>
     </div>
<demo:footer />
