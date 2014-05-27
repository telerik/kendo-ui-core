<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<demo:header />
     <div class="chart-wrapper">
         <% 
             String[] categories = {
        		 "2002","2003",
        		 "2004","2005",
        		 "2006","2007",
        		 "2008","2009",
        		 "2010","2011"
             };
         %>
         <kendo:chart name="chart">
             <kendo:chart-title text="Gross domestic product growth and percentage error" />
             <kendo:chart-legend visible="false" />
             <kendo:chart-series>
                <kendo:chart-seriesItem type="line" data="<%= new double[] { 3.907, 7.943, 7.848, 9.284, 9.263, 9.801, 3.890, 8.238, 9.552, 6.855 } %>" name="India">
                	<kendo:chart-seriesItem-errorBars value="percentage(20)" />
                </kendo:chart-seriesItem>
                <kendo:chart-seriesItem type="line" data="<%= new double[] { 1.988, 2.733, 3.994, 3.464, 4.001, 3.939, 1.333, -2.245, 4.339, 2.727 } %>" name="World">
                    <kendo:chart-seriesItem-errorBars value="percentage(20)" />
                </kendo:chart-seriesItem>                
             </kendo:chart-series>
             <kendo:chart-categoryAxis>
                <kendo:chart-categoryAxisItem categories="<%= categories %>">
                	<kendo:chart-categoryAxisItem-line visible="false"/>
                	<kendo:chart-categoryAxisItem-labels>
                		<kendo:chart-categoryAxisItem-labels-padding top="80"/>	
                	</kendo:chart-categoryAxisItem-labels>
                </kendo:chart-categoryAxisItem>
             </kendo:chart-categoryAxis>
             <kendo:chart-valueAxis>
                <kendo:chart-valueAxisItem axisCrossingValue="0">
                    <kendo:chart-valueAxisItem-labels format="{0}%" />
                    <kendo:chart-valueAxisItem-line visible="false" />
                </kendo:chart-valueAxisItem>
             </kendo:chart-valueAxis>
             <kendo:chart-tooltip visible="true" format="{0}%" />
         </kendo:chart>
     </div>
<demo:footer />
