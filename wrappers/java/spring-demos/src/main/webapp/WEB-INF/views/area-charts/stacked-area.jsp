<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<demo:header />
     <div class="chart-wrapper">
         <% 
             String[] categories = {
                 "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011"
             };
         %>
         <kendo:chart name="chart">
             <kendo:chart-title text="Browser Usage Trends" />
             <kendo:chart-legend position="bottom" />
             <kendo:chart-series>
                <kendo:chart-seriesItem type="area" stack="true" data="<%= new double[] { 0, 0, 0, 0, 3.6, 9.8, 22.4, 34.6 } %>" name="Chrome" />
                <kendo:chart-seriesItem type="area" stack="true" data="<%= new double[] { 0, 23.6, 29.9, 36.3, 44.4, 46.4, 43.5, 37.7 } %>" name="Firefox" />
                <kendo:chart-seriesItem type="area" stack="true" data="<%= new double[] { 76.2, 68.9, 60.6, 56.0, 46.0, 37.2, 27.5, 20.2 } %>" name="Internet Explorer" />
                <kendo:chart-seriesItem type="area" stack="true" data="<%= new double[] { 16.5, 2.8, 2.5, 1.2, 0, 0, 0, 0 } %>" name="Mozilla" />
                <kendo:chart-seriesItem type="area" stack="true" data="<%= new double[] { 1.6, 1.5, 1.5, 1.6, 2.4, 2.3, 2.2, 2.5 } %>" name="Opera" />
                <kendo:chart-seriesItem type="area" stack="true" data="<%= new double[] { 0, 0, 0, 1.8, 2.7, 3.6, 3.8, 4.2 } %>" name="Safari" />
             </kendo:chart-series>
             <kendo:chart-categoryAxis>
                <kendo:chart-categoryAxisItem categories="<%= categories %>">
                	<kendo:chart-categoryAxisItem-majorGridLines visible="false"/>
                </kendo:chart-categoryAxisItem>
             </kendo:chart-categoryAxis>
             <kendo:chart-valueAxis>
                <kendo:chart-valueAxisItem axisCrossingValue="-10" max="100">
                    <kendo:chart-valueAxisItem-labels format="{0}%" />
                    <kendo:chart-valueAxisItem-line visible="false"/>
                </kendo:chart-valueAxisItem>
             </kendo:chart-valueAxis>
             <kendo:chart-tooltip visible="true" format="{0}%" template="#= series.name #: #= value #" />
         </kendo:chart>
     </div>
<demo:footer />
