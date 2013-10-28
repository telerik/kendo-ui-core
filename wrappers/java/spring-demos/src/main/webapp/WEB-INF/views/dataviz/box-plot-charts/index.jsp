<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<demo:header />
     <div class="chart-wrapper">
         <% 
             String[] categories = {
                 "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
             };         	
         %>
         <kendo:chart name="chart">
             <kendo:chart-title text="Monthly Mean Temperatures (&deg;F)" />
             <kendo:chart-legend visible="false" />
             <kendo:chart-series>
                <kendo:chart-seriesItem type="boxPlot" data="${monthlyMeanTemperatures}" />
             </kendo:chart-series>
             <kendo:chart-categoryAxis>
                <kendo:chart-categoryAxisItem categories="<%= categories %>">
                	<kendo:chart-categoryAxisItem-majorGridLines visible="false"/>
                </kendo:chart-categoryAxisItem>
             </kendo:chart-categoryAxis>
         </kendo:chart>
     </div>
<demo:footer />


