<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<demo:header />
     <div class="chart-wrapper">
         <% 
             String[] categories = {
        		 "Experience", "Communication", "Friendliness",
                 "Subject knowledge", "Presentation", "Education"
             };
         %>
         <kendo:chart name="chart">
             <kendo:chart-title text="Employment candidate review" />
             <kendo:chart-legend position="bottom" />
             <kendo:chart-series>
                <kendo:chart-seriesItem
                	type="radarArea"
                	data="<%= new double[] { 10, 3, 3, 10, 2, 10 } %>"
                	name="Andrew Dodsworth" />
                <kendo:chart-seriesItem
                	type="radarArea"
                	data="<%= new double[] { 9, 7, 7, 9, 6, 7 } %>"
                	name="Margaret Peacock" />
                <kendo:chart-seriesItem
                	type="radarArea"
                	data="<%= new double[] { 4, 10, 10, 5, 5, 4 } %>"
                	name="Nancy Callahan" />
             </kendo:chart-series>
             <kendo:chart-valueAxis>
                <kendo:chart-valueAxisItem>
                    <kendo:chart-valueAxisItem-labels format="{0}%"/>
                    <kendo:chart-valueAxisItem-line visible="false"/>
                </kendo:chart-valueAxisItem>
             </kendo:chart-valueAxis>
             <kendo:chart-categoryAxis>
                <kendo:chart-categoryAxisItem categories="<%= categories %>">
                	<<kendo:chart-categoryAxisItem-majorGridLines visible="false" />
                </kendo:chart-categoryAxisItem>
             </kendo:chart-categoryAxis>
         </kendo:chart>
     </div>
<demo:footer />
