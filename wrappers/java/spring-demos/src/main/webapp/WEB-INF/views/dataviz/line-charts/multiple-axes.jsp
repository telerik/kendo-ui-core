<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<demo:header />
     <div class="chart-wrapper">
         <% 
             String[] categories = {
        		 "1", "2", "3", "4", 
        		 "5", "6", "7", "8", 
        		 "9", "10", "11", "12", 
        		 "13", "14", "15", "16", 
        		 "17", "18", "19", "20", 
        		 "21", "22", "23", "24", 
        		 "25", "26", "27", "28", 
        		 "29", "30", "31"
             };
         %>
         <kendo:chart name="chart">
             <kendo:chart-title text="March Weather Report" />
             <kendo:chart-legend position="bottom" />
             <kendo:chart-series>
                <kendo:chart-seriesItem type="line" color="#ff1c1c" data="<%= new double[] { 6, 10, 10, 10, 10, 9, 5, 5, 10, 8, 8, 5, 8, 11, 9, 15, 20, 23, 24, 21, 21, 20, 22, 22, 20, 18, 16, 15, 20, 13.2, 18 } %>" name="Max. Temperature [&deg;C]" axis="temp" />
                <kendo:chart-seriesItem type="line" color="#ffae00" data="<%= new double[] { -5, -6, 0, -4, -3, -5.2, -5, -1.7, -1, 0, -0.4, -2, -2, -5, 4, -2, -4, -1, -1, 2, 4, -1, 1, 1, 4, 0, -1, 1, -2, 5.7, 5 } %>" name="Min. Temperature [&deg;C]" axis="temp" />
                <kendo:chart-seriesItem type="area" color="#73c100" data="<%= new double[] { 16.4, 21.7, 35.4, 19, 10.9, 13.6, 10.9, 10.9, 10.9, 16.4, 16.4, 13.6, 13.6, 29.9, 27.1, 16.4, 13.6, 10.9, 16.4, 10.9, 24.5, 10.9, 8.1, 19, 21.7, 27.1, 24.5, 16.4, 27.1, 29.9, 27.1 } %>" name="Wind Speed [km/h]" axis="wind" />
                <kendo:chart-seriesItem type="area" color="#007eff" data="<%= new double[] { 5.4, 2, 5.4, 3, 2, 1, 3.2, 7.4, 0, 8.2, 0, 1.8, 0.3, 0, 0, 2.3, 0, 3.7, 5.2, 6.5, 0, 7.1, 0, 4.7, 0, 1.8, 0, 0, 0, 1.5, 0.8 } %>" name="Rainfall [mm]" axis="rain" />
             </kendo:chart-series>
             // Align the first two value axes to the left
             // and the last two to the right.
             //
             // Right alignment is done by specifying a
             // crossing value greater than or equal to
             // the number of categories.
             <kendo:chart-categoryAxis>
                <kendo:chart-categoryAxisItem axisCrossingValue="<%= new int[] { 32, 32, 0 } %>" categories="<%= categories %>" justified="true" />
             </kendo:chart-categoryAxis>
             <kendo:chart-valueAxis>
                <kendo:chart-valueAxisItem name="rain" min="0" max="60" color="#007eff" />
                <kendo:chart-valueAxisItem name="wind"  min="0" max="60" color="#73c100" />
                <kendo:chart-valueAxisItem name="temp"  min="-30" max="30" />
             </kendo:chart-valueAxis>
             <kendo:chart-tooltip format="{0}" template="#= category #/03: #= value #" visible="true" />
         </kendo:chart>
     </div>
<demo:footer />
