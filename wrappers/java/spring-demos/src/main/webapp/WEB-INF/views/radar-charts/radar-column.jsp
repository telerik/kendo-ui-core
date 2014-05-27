<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<demo:header />
     <div class="chart-wrapper">
         <% 
             String[] categories = {
        		 "Df", "Pr", "A", "C", "D", "E",
                 "Th", "Ri", "Ni", "B", "F", "B",
                 "Se", "Mn", "Cu", "Zn", "K", "P",
                 "Fe", "Ca", "Na", "Ch", "Sf"
             };
         %>
         <kendo:chart name="chart">
             <kendo:chart-title text="Nutrient balance: Apples, raw" />
             <kendo:chart-legend position="bottom" />
             <kendo:chart-series>
                <kendo:chart-seriesItem
                	type="radarColumn"
                	data="<%= new double[] { 5, 1, 1, 5, 0, 1,
						                      1, 2, 1, 2, 1, 0,
						                      0, 2, 1, 0, 3, 1,
						                      1, 1, 0, 0, 0 } %>"
                	name="Nutrients" />
             </kendo:chart-series>
             <kendo:chart-valueAxis>
                <kendo:chart-valueAxisItem visible="false"/>
             </kendo:chart-valueAxis>
             <kendo:chart-categoryAxis>
                <kendo:chart-categoryAxisItem categories="<%= categories %>" />
             </kendo:chart-categoryAxis>
             <kendo:chart-legend visible="false" />
         </kendo:chart>
     </div>
<demo:footer />
