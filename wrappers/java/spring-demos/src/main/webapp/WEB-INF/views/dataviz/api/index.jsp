<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<demo:header />
	<div id="example" class="k-content">
         <div class="configuration k-widget k-header" style="width:170px;">
             <span class="configHead">API Functions</span>
             <ul class="options">
                 <li>
                     <input id="typeColumn" name="seriesType"
                             type="radio" value="column" checked="checked" autocomplete="off" />
                     <label for="typeColumn">Columns</label>
                 </li>
                 <li>
                     <input id="typeBar" name="seriesType"
                             type="radio" value="bar" autocomplete="off" />
                     <label for="typeBar">Bars</label>
                 </li>
                 <li>
                     <input id="typeLine" name="seriesType"
                             type="radio" value="line" autocomplete="off" />
                     <label for="typeLine">Lines</label>
                 </li>
                 <li>
                     <input id="stack" type="checkbox" autocomplete="off" checked="checked" />
                     <label for="stack">Stacked</label>
                 </li>
             </ul>
             <p>
                 <strong>refresh()</strong> will be called on each configuration change
             </p>
         </div>

         <div class="chart-wrapper">
         	 <kendo:chart name="chart">
         	 	 <kendo:chart-title text="Internet Usersl"></kendo:chart-title>
         	 	 <kendo:chart-legend position="bottom"></kendo:chart-legend>
         	 	 <kendo:chart-series>
         	 	 	<kendo:chart-seriesItem type="column" data="<%= new double[] { 67.96, 68.93, 75, 74, 78 } %>" name="United States"></kendo:chart-seriesItem>
         	 	 	<kendo:chart-seriesItem type="column" data="<%= new double[] { 15.7, 16.7, 20, 23.5, 26.6 } %>" name="World"></kendo:chart-seriesItem>
         	 	 </kendo:chart-series>
         	 	 <kendo:chart-categoryAxis>
         	 	 	<kendo:chart-categoryAxisItem categories="<%= new String[] { \"2005\", \"2006\", \"2007\", \"2008\", \"2009\" } %>"></kendo:chart-categoryAxisItem>
         	 	 </kendo:chart-categoryAxis>
         	 	 <kendo:chart-valueAxis>
         	 	 	<kendo:chart-valueAxisItem>
         	 	 		<kendo:chart-valueAxisItem-labels format="{0}%"></kendo:chart-valueAxisItem-labels>
         	 	 	</kendo:chart-valueAxisItem>
         	 	 </kendo:chart-valueAxis>
         	 	 <kendo:chart-tooltip visible="true" format="{0}%"></kendo:chart-tooltip>
         	 </kendo:chart>
         </div>
    </div>
    <script>
	     $(document).ready(function() {
	    	 $(".configuration").bind("change", refresh);
	     });
	     
	     function refresh() {
	         var chart = $("#chart").data("kendoChart"),
	             series = chart.options.series,
	             type = $("input[name=seriesType]:checked").val(),
	             stack = $("#stack").prop("checked");

	         for (var i = 0, length = series.length; i < length; i++) {
	             series[i].stack = stack;
	             series[i].type = type;
	         };

	         chart.refresh();
	     }
	</script>
	
	<style>
	    .chart-wrapper {
	        margin: auto;
	        width: 466px;
	        height: 434px;
	    }
	                
	    .chart-wrapper .k-chart {
	        height: 280px;
	        padding: 37px;
	        width: 390px;
	    }
	</style>
<demo:footer />