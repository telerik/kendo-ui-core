<%@page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<demo:header />
     <div class="chart-wrapper">
         <% 
             String[] categories = {
        		 "In stock", "Damaged", "Reserved", "In transit", "Refurbished"
             };
         %>
         <kendo:chart name="chart">
             <kendo:chart-title text="Inventory" />
             <kendo:chart-legend visible="false" />
             <kendo:chart-series>
                <kendo:chart-seriesItem type="waterfall" data="<%= new int[] { 180, -60, -20, 10, 30 } %>">
                	<kendo:chart-seriesItem-labels visible="true" />
                </kendo:chart-seriesItem>
             </kendo:chart-series>
             <kendo:chart-categoryAxis>
                <kendo:chart-categoryAxisItem categories="<%= categories %>">
                	<kendo:chart-categoryAxisItem-majorGridLines visible="false"/>
                </kendo:chart-categoryAxisItem>
             </kendo:chart-categoryAxis>
             <kendo:chart-valueAxis>
                <kendo:chart-valueAxisItem>
                    <kendo:chart-valueAxisItem-majorGridLines visible="false"/>
                </kendo:chart-valueAxisItem>
             </kendo:chart-valueAxis>
         </kendo:chart>
     </div>
<demo:footer />
