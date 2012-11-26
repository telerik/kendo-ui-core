<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<demo:header />
     <div class="chart-wrapper">
         <% 
             String[] categories = {
                "Mon", "Tue",
                "Wed", "Thu",
                "Fri"
             };
         %>
         <kendo:chart name="chart">
             <kendo:chart-title text="Hybrid car mileage report" />
             <kendo:chart-legend position="top" />
             <kendo:chart-series>
                <kendo:chart-seriesItem type="column" stack="true" color="#13558E" data="<%= new int[] { 20, 40, 45, 30, 50 } %>" name="on battery" />
                <kendo:chart-seriesItem type="column" stack="true" color="#E21219" data="<%= new int[] { 20, 30, 35, 35, 40 } %>" name="on gas" />
                <kendo:chart-seriesItem type="line" color="#DE7E42" data="<%= new int[] { 30, 38, 40, 32, 42 } %>" name="MPG" axis="mpg" />
                <kendo:chart-seriesItem type="line" color="#057589" data="<%= new double[] { 7.8, 6.2, 5.9, 7.4, 5.6 } %>" name="l/100 km" axis="l100km" />
             </kendo:chart-series>
             // Align the first two value axes to the left
             // and the last two to the right.
             //
             // Right alignment is done by specifying a
             // crossing value greater than or equal to
             // the number of categories.
             <kendo:chart-categoryAxis>
                <kendo:chart-categoryAxisItem axisCrossingValue="<%= new int[] { 0, 0, 10, 10 } %>" categories="<%= categories %>" />
             </kendo:chart-categoryAxis>
             <kendo:chart-valueAxis>
                <kendo:chart-valueAxisItem min="0" max="100">
                    <kendo:chart-valueAxisItem-title text="miles" />
                </kendo:chart-valueAxisItem>
                <kendo:chart-valueAxisItem name="km" min="0" max="161" majorUnit="32">
                    <kendo:chart-valueAxisItem-title text="km" />
                </kendo:chart-valueAxisItem>
                <kendo:chart-valueAxisItem name="mpg" color="#DE7E42">
                    <kendo:chart-valueAxisItem-title text="miles per gallon" />
                </kendo:chart-valueAxisItem>
                <kendo:chart-valueAxisItem name="l100km" color="#057589">
                    <kendo:chart-valueAxisItem-title text="liters per 100km" />
                </kendo:chart-valueAxisItem>
             </kendo:chart-valueAxis>
         </kendo:chart>
     </div>
<demo:footer />
