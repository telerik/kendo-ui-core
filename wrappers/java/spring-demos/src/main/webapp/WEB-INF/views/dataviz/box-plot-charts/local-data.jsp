<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<demo:header />
     <div class="chart-wrapper">
         <kendo:chart name="chart">
             <kendo:chart-title text="Monthly Mean Temperatures (&deg;F)" />
             <kendo:chart-legend visible="false" />
              <kendo:dataSource data="${ozoneConcentration}" />
             <kendo:chart-series>
                <kendo:chart-seriesItem type="boxPlot"  />
             </kendo:chart-series>
             <kendo:chart-categoryAxis>
                <kendo:chart-categoryAxisItem field="year">
                	<kendo:chart-categoryAxisItem-majorGridLines visible="false"/>
                </kendo:chart-categoryAxisItem>
             </kendo:chart-categoryAxis>
         </kendo:chart>
     </div>
<demo:footer />