<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
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
	                    type="radio" value="months" autocomplete="off" />
	            <label for="baseUnitMonths">Months</label>
	        </li>
	        <li>
	            <input id="baseUnitWeeks" name="baseUnit"
	                    type="radio" value="weeks" checked="checked" autocomplete="off" />
	            <label for="baseUnitMonths">Weeks</label>
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
	                    type="radio" value="sum" autocomplete="off" />
	            <label for="aggregateSum">Sum</label>
	        </li>
	        <li>
	            <input id="aggregateAvg" name="aggregate"
	                    type="radio" value="avg" checked="checked" autocomplete="off" />
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
    <div class="chart-wrapper">
		<% 
		String[] categories = {
				"2011/12/20",
				"2011/12/21",
				"2011/12/22",
				"2011/12/23",
				"2011/12/24",
				"2011/12/25",
				"2011/12/26",
				"2011/12/27",
				"2011/12/28",
				"2011/12/29",
				"2011/12/30",
				"2011/12/31",
				"2012/01/01",
				"2012/01/02",
				"2012/01/03",
				"2012/01/04",
				"2012/01/05"
		};
		%>
 	 	<kendo:chart name="chart">
	 	 	 <kendo:chart-series>
	 	 	 	<kendo:chart-seriesItem type="area" data="<%= new int[] { 30, 50, 45, 40, 35, 40, 42, 40, 35, 43, 38, 30, 48, 50, 55, 35, 30 } %>" aggregate="avg" />
	 	 	 </kendo:chart-series>
	 	 	 <kendo:chart-categoryAxis>
	 	 	 	<kendo:chart-categoryAxisItem type="date" categories="<%= categories %>" baseUnit="weeks" />
	 	 	 </kendo:chart-categoryAxis>
	 	 </kendo:chart>
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
	        background: url(<c:url value="/resources/shared/styles/chart-wrapper-small.png" />) transparent no-repeat 0 0;
	    }
                
    	.chart-wrapper .k-chart {
	       height: 280px;
	       padding: 37px;
	       width: 390px;
	    }
	</style>
<demo:footer />