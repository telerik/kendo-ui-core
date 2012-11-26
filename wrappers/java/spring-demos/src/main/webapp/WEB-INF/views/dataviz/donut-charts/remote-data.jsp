<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>

<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:url value="/dataviz/donut-charts/remote-data/read" var="readUrl" />

<demo:header />
     <div class="chart-wrapper">
         <kendo:chart name="chart" class="combined-donuts">
             <kendo:chart-title text="Screen resolution trends" />
             <kendo:chart-legend position="top" />
             <kendo:dataSource>
                 <kendo:dataSource-transport>
                     <kendo:dataSource-transport-read url="${readUrl}" dataType="json" type="POST" contentType="application/json" />
                 </kendo:dataSource-transport>
                 <kendo:dataSource-group>
                     <kendo:dataSource-groupItem field="year" dir="asc" />
                 </kendo:dataSource-group>
                 <kendo:dataSource-sort>
                     <kendo:dataSource-sortItem field="orderNumber" dir="asc" />
                 </kendo:dataSource-sort>
             </kendo:dataSource>
             <kendo:chart-series>
                <kendo:chart-seriesItem type="donut" field="share" categoryField="resolution" visibleInLegendField="visibleInLegend" padding="10" />
             </kendo:chart-series>
             <kendo:chart-tooltip visible="true" template="#= dataItem.Resolution #: #= value #%" />
         </kendo:chart>
         <div class="single-donuts">
             <kendo:chart name="chart2006" class="donut">
                 <kendo:chart-title text="2006" />
                 <kendo:chart-legend visible="false" />
                 <kendo:dataSource>
                     <kendo:dataSource-transport>
                         <kendo:dataSource-transport-read url="${readUrl}" dataType="json" type="POST" contentType="application/json" />
                     </kendo:dataSource-transport>
                     <kendo:dataSource-filter>
                         <kendo:dataSource-filterItem field="year" operator="eq" value="2006" />
                     </kendo:dataSource-filter>
                     <kendo:dataSource-sort>
                         <kendo:dataSource-sortItem field="orderNumber" dir="asc" />
                     </kendo:dataSource-sort>
                 </kendo:dataSource>
                 <kendo:chart-series>
                    <kendo:chart-seriesItem type="donut" field="share" categoryField="resolution" visibleInLegendField="visibleInLegend" padding="0" />
                 </kendo:chart-series>
                 <kendo:chart-tooltip visible="true" template="#= dataItem.Resolution #: #= value #%" />
             </kendo:chart>
             
             <kendo:chart name="chart2008" class="donut">
                 <kendo:chart-title text="2008" />
                 <kendo:chart-legend visible="false" />
                 <kendo:dataSource>
                     <kendo:dataSource-transport>
                         <kendo:dataSource-transport-read url="${readUrl}" dataType="json" type="POST" contentType="application/json" />
                     </kendo:dataSource-transport>
                     <kendo:dataSource-filter>
                         <kendo:dataSource-filterItem field="year" operator="eq" value="2008" />
                     </kendo:dataSource-filter>
                     <kendo:dataSource-sort>
                         <kendo:dataSource-sortItem field="orderNumber" dir="asc" />
                     </kendo:dataSource-sort>
                 </kendo:dataSource>
                 <kendo:chart-series>
                    <kendo:chart-seriesItem type="donut" field="share" categoryField="resolution" visibleInLegendField="visibleInLegend" padding="0" />
                 </kendo:chart-series>
                 <kendo:chart-tooltip visible="true" template="#= dataItem.Resolution #: #= value #%" />
             </kendo:chart>
             
             <kendo:chart name="chart2010" class="donut">
                 <kendo:chart-title text="2010" />
                 <kendo:chart-legend visible="false" />
                 <kendo:dataSource>
                     <kendo:dataSource-transport>
                         <kendo:dataSource-transport-read url="${readUrl}" dataType="json" type="POST" contentType="application/json" />
                     </kendo:dataSource-transport>
                     <kendo:dataSource-filter>
                         <kendo:dataSource-filterItem field="year" operator="eq" value="2010" />
                     </kendo:dataSource-filter>
                     <kendo:dataSource-sort>
                         <kendo:dataSource-sortItem field="orderNumber" dir="asc" />
                     </kendo:dataSource-sort>
                 </kendo:dataSource>
                 <kendo:chart-series>
                    <kendo:chart-seriesItem type="donut" field="share" categoryField="resolution" visibleInLegendField="visibleInLegend" padding="0" />
                 </kendo:chart-series>
                 <kendo:chart-tooltip visible="true" template="#= dataItem.Resolution #: #= value #%" />
             </kendo:chart>
         </div>
    </div>
    
    <style scoped>
	    .chart-wrapper 
	    {
	    	text-align: center;
	    	padding-top: 20px;
	    	background-repeat: no-repeat;
	    }
	    .single-donuts
	    {
	    	width: 390px;
	    	height: 150px;
	    	margin: 0 auto;
	    }
	    .chart-wrapper .donut 
	    {
	    	float: left;
	    	width: 130px;
	    	height: 130px;
	    	padding: 0;
	    }
	    .chart-wrapper .combined-donuts 
	    {
	    	width: 500px;
	    	height: 280px;
	    	margin: 0 auto;
	    	padding: 0;
	    }
	</style>
<demo:footer />
