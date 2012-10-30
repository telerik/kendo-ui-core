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
         	 	 <kendo:chart-series>
         	 	 	<kendo:chart-seriesItem  data="<%= new int[] {1,2,3} %>"></kendo:chart-seriesItem>
         	 	 </kendo:chart-series>
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
<demo:footer />