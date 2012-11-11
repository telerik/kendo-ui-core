<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<demo:header />
	<div class="configuration k-widget k-header" style="width:170px;">
	    <span class="configHead">Base date unit</span>
	    <ul class="options">
	        <li>
	            <input id="baseUnitAuto" name="baseUnit"
	                    type="radio" value="" autocomplete="off" />
	            <label for="baseUnitAuto">Automatic (default)</label>
	        </li>
	        <li>
	            <input id="baseUnitYears" name="baseUnit"
	                    type="radio" value="years" autocomplete="off" />
	            <label for="baseUnitYears">Years</label>
	        </li>
	        <li>
	            <input id="baseUnitMonths" name="baseUnit"
	                    type="radio" value="months" checked="checked" autocomplete="off" />
	            <label for="baseUnitMonths">Months</label>
	        </li>
	        <li>
	            <input id="baseUnitDays" name="baseUnit"
	                    type="radio" value="days" autocomplete="off" />
	            <label for="baseUnitDays">Days</label>
	        </li>
	    </ul>
	    <span class="configHead">Aggregate function</span>
	    <ul class="options">
	        <li>
	            <input id="aggregateMax" name="aggregate"
	                    type="radio" value="max" autocomplete="off" />
	            <label for="aggregateMax">Max (default)</label>
	        </li>
	        <li>
	            <input id="aggregateMin" name="aggregate"
	                    type="radio" value="min" autocomplete="off" />
	            <label for="aggregateMin">Min</label>
	        </li>
	        <li>
	            <input id="aggregateSum" name="aggregate"
	                    type="radio" value="sum" checked="checked" autocomplete="off" />
	            <label for="aggregateSum">Sum</label>
	        </li>
	        <li>
	            <input id="aggregateAvg" name="aggregate"
	                    type="radio" value="avg" autocomplete="off" />
	            <label for="aggregateAvg">Avg</label>
	        </li>
	        <li>
	            <input id="aggregateCount" name="aggregate"
	                    type="radio" value="count" autocomplete="off" />
	            <label for="aggregateCount">Count</label>
	        </li>
	    </ul>
	    <p>Custom aggregate functions are supported.</p>
	</div>
	<div id="example" class="k-content">
         <div class="chart-wrapper">
         	 <% 
			 	 String[] categories = {
         			"2011/12/30", "2011/12/31",
         			"2012/01/01", "2012/01/02",
         			"2012/01/03"
				 };
			 %>
         	 <kendo:chart name="chart">
         	 	 <kendo:chart-title text="Units sold" />
         	 	 <kendo:chart-series>
         	 	 	<kendo:chart-seriesItem type="column" data="<%= new int[] { 20, 40, 45, 30, 50 } %>" aggregate="sum" />
         	 	 </kendo:chart-series>
         	 	 <kendo:chart-categoryAxis>
         	 	 	<kendo:chart-categoryAxisItem type="date" categories="<%= categories %>" baseUnit="months" />
         	 	 </kendo:chart-categoryAxis>
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
	            categoryAxis = chart.options.categoryAxis,
	            baseUnitInputs = $("input:radio[name=baseUnit]"),
	            aggregateInputs = $("input:radio[name=aggregate]");
	
	        for (var i = 0, length = series.length; i < length; i++) {
	            series[i].aggregate = aggregateInputs.filter(":checked").val();
	        }
	
	        categoryAxis.baseUnit = baseUnitInputs.filter(":checked").val();
	
	        chart.refresh();
	    }
	</script>
    <style>
	    .chart-wrapper {
	        margin: 0 0 0 20px;
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