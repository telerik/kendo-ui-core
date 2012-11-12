<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>

<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:url value="/dataviz/scatter-charts/date-axis/read" var="readUrl" />

<demo:header />
	<div id="example" class="k-content">
         <div class="chart-wrapper">
         	 <kendo:chart name="chart">
         	 	 <kendo:chart-title text="Closing stock prices" />
         	 	 <kendo:dataSource>
	        	 	 <kendo:dataSource-transport>
	             		 <kendo:dataSource-transport-read url="${readUrl}" dataType="json" type="POST" contentType="application/json" />
	                 </kendo:dataSource-transport>
	                 <kendo:dataSource-group>
	                 	 <kendo:dataSource-groupItem field="symbol" />
	                 </kendo:dataSource-group>
	                 <kendo:dataSource-sort>
        	 	 	 	 <kendo:dataSource-sortItem field="date" dir="asc" />
        	 	 	 </kendo:dataSource-sort>
        	 	 	 <kendo:dataSource-schema>
        	 	 	 	<kendo:dataSource-schema-model>
        	 	 	 		<kendo:dataSource-schema-model-fields>
        	 	 	 			<kendo:dataSource-schema-model-field name="date" type="date" />
        	 	 	 		</kendo:dataSource-schema-model-fields>
        	 	 	 	</kendo:dataSource-schema-model>
        	 	 	 </kendo:dataSource-schema>
                 </kendo:dataSource>
         	 	 <kendo:chart-series>
         	 	 	<kendo:chart-seriesItem type="scatterLine" xfield="date" yfield="close">
         	 	 		<kendo:chart-seriesItem-markers size="6" />
         	 	 	</kendo:chart-seriesItem>
         	 	 </kendo:chart-series>
         	 	 <kendo:chart-yAxis>
         	 	 	<kendo:chart-yAxisItem>
         	 	 		<kendo:chart-yAxisItem-labels format="\${0}" skip="1" />
         	 	 	</kendo:chart-yAxisItem>
         	 	 </kendo:chart-yAxis>
         	 	 <kendo:chart-tooltip visible="true" format="{0:d}, \${1}" />
         	 </kendo:chart>
        </div>
    </div>
<demo:footer />