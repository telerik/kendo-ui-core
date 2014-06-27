<%@page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<demo:header />
     <div class="chart-wrapper">
         <kendo:chart name="chart">
             <kendo:chart-title text="Cash flow" />
             <kendo:chart-legend visible="false" />
             <kendo:dataSource data="${viewModel}" />
             <kendo:chart-series>
                <kendo:chart-seriesItem type="waterfall" field="amount" categoryField="period" summaryField="summary">
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
                    <kendo:chart-seriesItem-labels format="C0" position="insideEnd" visible="true" />
                </kendo:chart-seriesItem>
             </kendo:chart-series>
             <kendo:chart-valueAxis>
                <kendo:chart-valueAxisItem>
                    <kendo:chart-valueAxisItem-labels format="C0" />
                </kendo:chart-valueAxisItem>
             </kendo:chart-valueAxis>
         </kendo:chart>
     </div>
<demo:footer />

<script>
</script>