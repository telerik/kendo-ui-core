<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<demo:header />
	<div id="example" class="k-content">
         <div class="chart-wrapper">
         	 <kendo:chart name="chart">
         	 	 <kendo:chart-title text="Price-Performance Ratio" />
         	 	 <kendo:chart-legend visible="false" />
         	 	 <kendo:chart-series>
         	 	 	<kendo:chart-seriesItem type="scatter" data="<%= new int[][] { { 120, 102 } } %>" name="Pentium D 915">
         	 	 		<kendo:chart-seriesItem-labels template="#= series.name #" position="right" visible="true" />
         	 	 	</kendo:chart-seriesItem>
         	 	 	<kendo:chart-seriesItem type="scatter" data="<%= new int[][] { { 160, 118 } } %>" name="Pentium D 950">
         	 	 		<kendo:chart-seriesItem-labels template="#= series.name #" position="right" visible="true" />
         	 	 	</kendo:chart-seriesItem>
         	 	 	<kendo:chart-seriesItem type="scatter" data="<%= new int[][] { { 1000, 137 } } %>" name="Pentium XE 965">
         	 	 		<kendo:chart-seriesItem-labels template="#= series.name #" position="left" visible="true" />
         	 	 	</kendo:chart-seriesItem>
         	 	 	<kendo:chart-seriesItem type="scatter" data="<%= new int[][] { { 170, 125 } } %>" name="Athlon 64 X2 4200+">
         	 	 		<kendo:chart-seriesItem-labels template="#= series.name #" position="right" visible="true" />
         	 	 	</kendo:chart-seriesItem>
         	 	 	<kendo:chart-seriesItem type="scatter" data="<%= new int[][] { { 205, 138 } } %>" name="Athlon 64 X2 4600+">
         	 	 		<kendo:chart-seriesItem-labels template="#= series.name #" position="right" visible="true" />
         	 	 	</kendo:chart-seriesItem>
         	 	 	<kendo:chart-seriesItem type="scatter" data="<%= new int[][] { { 800, 147 } } %>" name="Athlon 64 FX-62">
         	 	 		<kendo:chart-seriesItem-labels template="#= series.name #" position="right" visible="true" />
         	 	 	</kendo:chart-seriesItem>
         	 	 	<kendo:chart-seriesItem type="scatter" data="<%= new int[][] { { 170, 130 } } %>" name="Core 2 Duo E6400">
         	 	 		<kendo:chart-seriesItem-labels template="#= series.name #" position="right" visible="true" />
         	 	 	</kendo:chart-seriesItem>
         	 	 	<kendo:chart-seriesItem type="scatter" data="<%= new int[][] { { 305, 163 } } %>" name="Core 2 Duo E6600">
         	 	 		<kendo:chart-seriesItem-labels template="#= series.name #" position="right" visible="true" />
         	 	 	</kendo:chart-seriesItem>
         	 	 	<kendo:chart-seriesItem type="scatter" data="<%= new int[][] { { 530, 177 } } %>" name="Core 2 Duo E6700">
         	 	 		<kendo:chart-seriesItem-labels template="#= series.name #" position="right" visible="true" />
         	 	 	</kendo:chart-seriesItem>
         	 	 	<kendo:chart-seriesItem type="scatter" data="<%= new int[][] { { 1000, 190 } } %>" name="Core 2 Duo Extreme X6800">
         	 	 		<kendo:chart-seriesItem-labels template="#= series.name #" position="left" visible="true" />
         	 	 	</kendo:chart-seriesItem>
         	 	 </kendo:chart-series>
         	 	 <kendo:chart-xAxis>
         	 	 	<kendo:chart-xAxisItem max="1000">
         	 	 		<kendo:chart-xAxisItem-labels format="\${0}" />
         	 	 		<kendo:chart-xAxisItem-title text="Price" />
         	 	 	</kendo:chart-xAxisItem>
         	 	 </kendo:chart-xAxis>
         	 	 <kendo:chart-yAxis>
         	 	 	<kendo:chart-yAxisItem min="80">
         	 	 		<kendo:chart-yAxisItem-labels format="{0}%" />
         	 	 		<kendo:chart-yAxisItem-title text="Performance Ratio" />
         	 	 	</kendo:chart-yAxisItem>
         	 	 </kendo:chart-yAxis>
         	 	 <kendo:chart-tooltip visible="true" template="#= series.name #" />
         	 </kendo:chart>
         </div>
    </div>
<demo:footer />