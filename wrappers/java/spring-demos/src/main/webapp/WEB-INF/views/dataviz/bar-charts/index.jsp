<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<demo:header />
     <div class="chart-wrapper">
         <% 
             String[] categories = {
                 "Jan", "Feb", 
                 "Mar", "Apr",
                 "May", "Jun"
             };
         %>
         <kendo:chart name="chart">
             <kendo:chart-title text="Site Visitors Stats /thousands/" />
             <kendo:chart-legend visible="false" />
             <kendo:chart-chartArea background="transparent" />
             <kendo:chart-series>
                <kendo:chart-seriesItem type="bar" data="<%= new double[] { 56000, 63000, 74000, 91000, 117000, 138000 } %>" name="Total Visits" />
                <kendo:chart-seriesItem type="bar" data="<%= new double[] { 52000, 34000, 23000, 48000, 67000, 83000 } %>" name="Unique visitors" />
             </kendo:chart-series>
             <kendo:chart-categoryAxis>
                <kendo:chart-categoryAxisItem categories="<%= categories %>">
                	<kendo:chart-categoryAxisItem-majorGridLines visible="false"/>
                </kendo:chart-categoryAxisItem>
             </kendo:chart-categoryAxis>
             <kendo:chart-valueAxis>
                <kendo:chart-valueAxisItem max="140000">
                    <kendo:chart-valueAxisItem-line visible="false"/>
                    <kendo:chart-valueAxisItem-majorGridLines visible="true"/>
                </kendo:chart-valueAxisItem>
             </kendo:chart-valueAxis>
             <kendo:chart-tooltip visible="true" template="#= series.name #: #= value #" />
         </kendo:chart>
     </div>
    <style>
	    #chart {
	    	background: center no-repeat url(<c:url value="/resources/shared/styles/world-map.png" />)
	    }
	</style>
<demo:footer />
