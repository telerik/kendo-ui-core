<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>

<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:url value="/waterfall-charts/remote-data-binding/read" var="readUrl" />

<demo:header />
<div class="chart-wrapper">
	<kendo:chart name="chart">
		<kendo:chart-title text="\"Pocket price\" waterfall" />
		<kendo:chart-legend visible="false" />
		<kendo:dataSource>
			<kendo:dataSource-transport>
				<kendo:dataSource-transport-read url="${readUrl}" dataType="json"
					type="POST" contentType="application/json" />
			</kendo:dataSource-transport>
		</kendo:dataSource>
		<kendo:chart-series>
			<kendo:chart-seriesItem type="waterfall" field="value"
				categoryField="name" summaryField="summary">
				<kendo:chart-seriesItem-color>
				    function (point) {
				        var summary = point.dataItem.summary;
				        if (summary) {
				            return summary == "total" ? "#555" : "gray";
				        }
				
				        if (point.value > 0) {
				            return "green";
				        } else {
				            return "red";
				        }
				    }
                	</kendo:chart-seriesItem-color>
				<kendo:chart-seriesItem-labels format="C" position="insideEnd" visible="true" />
			</kendo:chart-seriesItem>
		</kendo:chart-series>
		<kendo:chart-valueAxis>
			<kendo:chart-valueAxisItem>
				<kendo:chart-valueAxisItem-labels format="C" />
			</kendo:chart-valueAxisItem>
		</kendo:chart-valueAxis>
	</kendo:chart>
</div>
<demo:footer />
