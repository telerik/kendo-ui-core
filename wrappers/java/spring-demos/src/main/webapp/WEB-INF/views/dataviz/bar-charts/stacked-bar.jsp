<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<demo:header />
	<div id="example" class="k-content">
         <div class="chart-wrapper">
         	 <% String[] categories = {
					 "2005", "2006",
					 "2007", "2008",
					 "2009"
				 };
			 %>
         	 <kendo:chart name="chart">
         	 	 <kendo:chart-title text="Internet Users" />
         	 	 <kendo:chart-legend position="bottom" />
         	 	 <kendo:chart-series>
         	 	 	<kendo:chart-seriesItem type="bar" stack="true" data="<%= new double[] { 15.7, 16.7, 20, 23.5, 26.6 } %>" name="World" />
         	 	 	<kendo:chart-seriesItem type="bar" stack="true" data="<%= new double[] { 67.96, 68.93, 75, 74, 78 } %>" name="United States" />
         	 	 </kendo:chart-series>
         	 	 <kendo:chart-categoryAxis>
         	 	 	<kendo:chart-categoryAxisItem categories="<%= categories %>" />
         	 	 </kendo:chart-categoryAxis>
         	 	 <kendo:chart-valueAxis>
         	 	 	<kendo:chart-valueAxisItem>
         	 	 		<kendo:chart-valueAxisItem-labels format="{0}%" />
         	 	 	</kendo:chart-valueAxisItem>
         	 	 </kendo:chart-valueAxis>
         	 	 <kendo:chart-tooltip visible="true" format="{0}%" />
         	 </kendo:chart>
         </div>
    </div>
<demo:footer />