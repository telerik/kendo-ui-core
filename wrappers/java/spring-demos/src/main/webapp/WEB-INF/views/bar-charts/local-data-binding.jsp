<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<demo:header />
     <div class="chart-wrapper">
         <kendo:chart name="chart">
             <kendo:chart-title text="Comments per day" align="left" />
             <kendo:chart-legend visible="false" />
             <kendo:dataSource data="${viewModel}" />
             <kendo:chart-series>
                <kendo:chart-seriesItem type="column" field="value" colorField="userColor">
                    <kendo:chart-seriesItem-labels background="transparent" visible="true" />
                </kendo:chart-seriesItem>
             </kendo:chart-series>
             <kendo:chart-categoryAxis>
                <kendo:chart-categoryAxisItem field="day">
                	<kendo:chart-categoryAxisItem-majorGridLines visible="false"/>
                	<kendo:chart-categoryAxisItem-line visible="false"/>
                </kendo:chart-categoryAxisItem>
             </kendo:chart-categoryAxis>
             <kendo:chart-valueAxis>
                <kendo:chart-valueAxisItem max="28" visible="false">
                    <kendo:chart-valueAxisItem-majorGridLines visible="false"/>
                </kendo:chart-valueAxisItem>
             </kendo:chart-valueAxis>
         </kendo:chart>
     </div>
<demo:footer />
