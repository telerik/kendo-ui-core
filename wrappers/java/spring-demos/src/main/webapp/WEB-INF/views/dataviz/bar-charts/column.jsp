<%@page import="java.util.HashMap"%>
<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<demo:header />
     <div class="chart-wrapper">
         <% 
             String[] categories = {
        		 "2002", "2003", 
        		 "2004", "2005",
        		 "2006", "2007", 
        		 "2008", "2009", 
        		 "2010", "2011"
             };
         	
         	HashMap<String, Object> padding = new HashMap<String, Object>();
         	padding.put("top", 145);

         %>
         <kendo:chart name="chart">
             <kendo:chart-title text="Gross domestic product growth /GDP annual %/" />
             <kendo:chart-legend position="top" />
             <kendo:chart-chartArea background="transparent" />
             <kendo:chart-series>
                <kendo:chart-seriesItem type="column" data="<%= new double[] {3.907, 7.943, 7.848, 9.284, 9.263, 9.801, 3.890, 8.238, 9.552, 6.855 } %>" name="India" />
                <kendo:chart-seriesItem type="column" data="<%= new double[] {4.743, 7.295, 7.175, 6.376, 8.153, 8.535, 5.247, -7.832, 4.3, 4.3 } %>" name="Russian Federation" />
                <kendo:chart-seriesItem type="column" data="<%= new double[] {0.010, -0.375, 1.161, 0.684, 3.7, 3.269, 1.083, -5.127, 3.690, 2.995 } %>" name="Germany" />
                <kendo:chart-seriesItem type="column" data="<%= new double[] {1.988, 2.733, 3.994, 3.464, 4.001, 3.939, 1.333, -2.245, 4.339, 2.727 } %>" name="World" />
             </kendo:chart-series>
             <kendo:chart-categoryAxis>
                <kendo:chart-categoryAxisItem categories="<%= categories %>">
                	<kendo:chart-categoryAxisItem-line visible="false"/>
                	<kendo:chart-categoryAxisItem-labels padding="<%= padding %>" />
                </kendo:chart-categoryAxisItem>
             </kendo:chart-categoryAxis>
             <kendo:chart-valueAxis>
                <kendo:chart-valueAxisItem>
                    <kendo:chart-valueAxisItem-labels format="{0}%" />
                </kendo:chart-valueAxisItem>
             </kendo:chart-valueAxis>
             <kendo:chart-tooltip visible="true" format="{0}%" template="#= series.name #: #= value #" />
         </kendo:chart>
     </div>
     <style>
	    #chart {
	    	background: center no-repeat url(<c:url value="/resources/shared/styles/world-map.png" />);
	    	height: 430px;
	    }
	</style>
<demo:footer />
