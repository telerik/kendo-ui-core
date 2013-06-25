<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<demo:header />
     <div class="chart-wrapper">
         <kendo:chart name="chart">
             <kendo:chart-title text="Protein quality, Apple raw" />
             <kendo:dataSource data="${proteinQuality}" />
             <kendo:chart-series>
                <kendo:chart-seriesItem type="radarColumn" field="score" name="Proteins" />
             </kendo:chart-series>
             <kendo:chart-categoryAxis>
                <kendo:chart-categoryAxisItem field="abbr" />
             </kendo:chart-categoryAxis>
             <kendo:chart-valueAxis>
                <kendo:chart-valueAxisItem visible="false" />
             </kendo:chart-valueAxis>
             <kendo:chart-tooltip visible="false" />
             <kendo:chart-legend visible="false" />
         </kendo:chart>
     </div>
<demo:footer />
