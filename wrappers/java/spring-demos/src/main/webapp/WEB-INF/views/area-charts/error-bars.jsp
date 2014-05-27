<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@page pageEncoding="UTF-8" %>

<demo:header />
     <div class="chart-wrapper">
         <% 
             String[] categories = {
        		 "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010"
             };
         %>
         <kendo:chart name="chart">
             <kendo:chart-title text="GDP growth and standard deviation" />
             <kendo:chart-legend  visible="false"/>
             <kendo:chart-chartArea background="transparent" />
             <kendo:chart-series>
             	<kendo:chart-seriesItem type="area" data="<%= new double[] { 7.943, 7.848, 9.284, 9.263, 9.801, 3.890, 8.238, 9.552 } %>">
             		<kendo:chart-seriesItem-errorBars value="stddev" />
             	</kendo:chart-seriesItem>
             </kendo:chart-series>
             <kendo:chart-categoryAxis>
                <kendo:chart-categoryAxisItem categories="<%= categories %>">
                	<kendo:chart-categoryAxisItem-majorGridLines visible="false"/>
                </kendo:chart-categoryAxisItem>
             </kendo:chart-categoryAxis>
             <kendo:chart-valueAxis>
                <kendo:chart-valueAxisItem axisCrossingValue="-10">
                    <kendo:chart-valueAxisItem-labels format="{0}%" />
                    <kendo:chart-valueAxisItem-line visible="false"/>
                </kendo:chart-valueAxisItem>
             </kendo:chart-valueAxis>
             <kendo:chart-tooltip visible="true" format="{0}%" template="#= value # (σ = #= kendo.toString(high - low, 'N2') #)" />
         </kendo:chart>
     </div>

<demo:footer />
