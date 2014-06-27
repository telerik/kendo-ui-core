<%@page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>

<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:url value="/financial/virtualization/read" var="readUrl" />

<demo:header />
     <kendo:stockChart name="stockChart" dateField="date">
        <kendo:stockChart-title text="The ACME Company" />
        <kendo:dataSource serverFiltering="true">
             <kendo:dataSource-transport>
                <kendo:dataSource-transport-read url="${readUrl}" dataType="json" type="POST" contentType="application/json" />  
                <kendo:dataSource-transport-parameterMap>
                	<script>
	                	function parameterMap(options) {
                			return JSON.stringify(options);
	                	}
                	</script>
                </kendo:dataSource-transport-parameterMap>
             </kendo:dataSource-transport>
        </kendo:dataSource>
        <kendo:stockChart-series>
            <kendo:stockChart-seriesItem type="candlestick" openField="open" highField="high" lowField="low" closeField="close" />
        </kendo:stockChart-series>
        <kendo:stockChart-navigator>
	        <kendo:dataSource>
	             <kendo:dataSource-transport>
	                <kendo:dataSource-transport-read url="${readUrl}" dataType="json" type="POST" contentType="application/json" />  
	                <kendo:dataSource-transport-parameterMap>
	                	<script>
		                	function parameterMap(options) {
	                			return JSON.stringify(options);
		                	}
	                	</script>
	                </kendo:dataSource-transport-parameterMap>
                 </kendo:dataSource-transport>
	        </kendo:dataSource>
            <kendo:stockChart-navigator-series>
                <kendo:stockChart-navigator-seriesItem type="area" field="high" />
            </kendo:stockChart-navigator-series>
            <kendo:stockChart-navigator-select from="${from}" to="${to}" />
        </kendo:stockChart-navigator>
     </kendo:stockChart>
<demo:footer />
