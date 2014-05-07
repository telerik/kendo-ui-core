<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>

<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:url value="/dataviz/pie-charts/remote-data/read" var="readUrl" />

<demo:header />
	 
     <div class="chart-wrapper">
     <h3>1024x768 screen resolution trends</h3>
     <c:forEach items = "${years}" var="year">
		    <kendo:chart name="chart${year}" class="small-chart">
		        <kendo:chart-title text="${year}" />
		        <kendo:chart-legend visible="false" />
		        <kendo:dataSource>
		            <kendo:dataSource-sort>
		                <kendo:dataSource-sortItem field="year" dir="asc" />
		            </kendo:dataSource-sort>
		            <kendo:dataSource-filter>
		            	<kendo:dataSource-filterItem field="year" value="${year}" operator="eq"/>
		            </kendo:dataSource-filter>
		            <kendo:dataSource-transport>
		                <kendo:dataSource-transport-read url="${readUrl}" dataType="json" type="POST" contentType="application/json" />
		            </kendo:dataSource-transport>
		        </kendo:dataSource>
		        <kendo:chart-series>
		           <kendo:chart-seriesItem type="pie" field="share" categoryField="resolution" colorField="color" padding="0" />
		        </kendo:chart-series>
		        <kendo:chart-tooltip visible="true" format="{0:N0}" template="#= category # - #= kendo.format('{0:P}', percentage)#"/>
		    </kendo:chart>
   		</c:forEach>      
    </div>
    <style scoped>
    .chart-wrapper {
        text-align: center;
        width: 700px;
        height: 340px;
        margin:0 auto;
    }
    .chart-wrapper h3 {
        padding: 1em 0;
        font-size: 1.5em;
        font-weight: normal;
    }
    .k-chart.small-chart {
        display: inline-block;
        width: 120px;
        height: 120px;
    }
</style>
<demo:footer />
