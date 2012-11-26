<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<demo:header />
     <% 
         String[] colors = {
            "#cd1533", "#d43851",
            "#dc5c71", "#e47f8f",
            "#eba1ad", "#009bd7",
            "#26aadd", "#4db9e3",
            "#73c8e9", "#99d7ef"
         };
     %>
     
     <% 
         String[] categories = {
             "1990", "1995",
             "2000", "2005",
             "2010"
         };
     %>

     <div class="chart-wrapper">
         <kendo:chart name="chart" seriesColors="<%= colors %>">
             <kendo:chart-title text="World population by age group and sex" />
             <kendo:chart-legend visible="false" />
             <kendo:chart-series>
                <kendo:chart-seriesItem type="column" data="<%= new int[] { 1100941, 1139797, 1172929, 1184435, 1184654 } %>" name="0-19" stack="Female" />
                <kendo:chart-seriesItem type="column" data="<%= new int[] { 810169, 883051, 942151, 1001395, 1058439 } %>" name="20-39" stack="Female" />
                <kendo:chart-seriesItem type="column" data="<%= new int[] { 395533, 435485, 499861, 569114, 655066 } %>" name="40-64" stack="Female" />
                <kendo:chart-seriesItem type="column" data="<%= new int[] { 152171, 170262, 191015, 210767, 226956 } %>" name="65-79" stack="Female" />
                <kendo:chart-seriesItem type="column" data="<%= new int[] { 36724, 42939, 46413, 54984, 66029 } %>" name="80+" stack="Female" />
                <kendo:chart-seriesItem type="column" data="<%= new int[] { 1155600, 1202766, 1244870, 1263637, 1268165 } %>" name="0-19" stack="Male" />
                <kendo:chart-seriesItem type="column" data="<%= new int[] { 844496, 916479, 973694, 1036548, 1099507 } %>" name="20-39" stack="Male" />
                <kendo:chart-seriesItem type="column" data="<%= new int[] { 390590, 430666, 495030, 564169, 646563 } %>" name="40-64" stack="Male" />
                <kendo:chart-seriesItem type="column" data="<%= new int[] { 120614, 138868, 158387, 177078, 192156 } %>" name="65-79" stack="Male" />
                <kendo:chart-seriesItem type="column" data="<%= new int[] { 19442, 23020, 25868, 31462, 39223 } %>" name="80+" stack="Male" />
             </kendo:chart-series>
             <kendo:chart-categoryAxis>
                <kendo:chart-categoryAxisItem categories="<%= categories %>" />
             </kendo:chart-categoryAxis>
             <kendo:chart-valueAxis>
                <kendo:chart-valueAxisItem>
                    <kendo:chart-valueAxisItem-labels template="#= kendo.format('{0:N0}', value / 1000) # M" />
                </kendo:chart-valueAxisItem>
             </kendo:chart-valueAxis>
             <kendo:chart-tooltip visible="true" template="#= series.stack #s, age #= series.name #" />
         </kendo:chart>
     </div>
<demo:footer />
