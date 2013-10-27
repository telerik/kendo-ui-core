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
         %>
         <kendo:chart name="chart">
             <kendo:chart-title text="Gross domestic product growth and standard error" />
             <kendo:chart-legend visible="false" />
             <kendo:chart-series>                
                <kendo:chart-seriesItem type="column" data="<%= new double[] {4.743, 7.295, 7.175, 6.376, 8.153, 8.535, 5.247, -7.832, 4.3, 4.3 } %>">
                	<kendo:chart-seriesItem-errorBars value="stderr" />
                </kendo:chart-seriesItem>
             </kendo:chart-series>
             <kendo:chart-categoryAxis>
                <kendo:chart-categoryAxisItem categories="<%= categories %>">
                	<kendo:chart-categoryAxisItem-line visible="false"/>
                	<kendo:chart-categoryAxisItem-labels>
                		<kendo:chart-categoryAxisItem-labels-padding top="175"/>
                	</kendo:chart-categoryAxisItem-labels>
                </kendo:chart-categoryAxisItem>
             </kendo:chart-categoryAxis>
             <kendo:chart-valueAxis>             	
                <kendo:chart-valueAxisItem axisCrossingValue="0">
                	<kendo:chart-valueAxisItem-line visible="false"/>
                    <kendo:chart-valueAxisItem-labels format="{0}%" />
                </kendo:chart-valueAxisItem>
             </kendo:chart-valueAxis>
             <kendo:chart-tooltip visible="true" format="{0}%" />
         </kendo:chart>
     </div>
<demo:footer />
