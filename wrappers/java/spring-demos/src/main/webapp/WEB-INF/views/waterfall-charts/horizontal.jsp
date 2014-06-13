<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<demo:header />
     <div class="chart-wrapper">
         <kendo:chart name="chart">
             <kendo:chart-title text="Request latency breakdown" />
             <kendo:chart-legend visible="false" />
             <kendo:dataSource data="${viewModel}" />
             <kendo:chart-series>
                <kendo:chart-seriesItem type="horizontalWaterfall" field="elapsed" categoryField="caption" summaryField="summary">
                	<kendo:chart-seriesItem-color>
					function pointColor(point) {
						var palette = ["#95c3cd", "#abc75b", "#c6816f", "#968cb2", "#c0c0c0", "#2ba6ff"];
					    return palette[point.index % palette.length];
					}
                	</kendo:chart-seriesItem-color>
                </kendo:chart-seriesItem>
             </kendo:chart-series>
             <kendo:chart-valueAxis>
                <kendo:chart-valueAxisItem>
                    <kendo:chart-valueAxisItem-labels format="{0} ms" />
                </kendo:chart-valueAxisItem>
             </kendo:chart-valueAxis>
         </kendo:chart>
     </div>
<demo:footer />

<script>
</script>