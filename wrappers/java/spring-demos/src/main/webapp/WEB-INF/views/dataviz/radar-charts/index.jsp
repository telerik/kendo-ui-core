<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<demo:header />
     <div class="chart-wrapper">
         <% 
             String[] categories = {
        		 "Santander", "JP Morgan", "HSBC", "Credit Suisse",
                 "Goldman Sachs", "Morgan Stanley", "Societe Generale", "UBS",
                 "BNP Paribas", "Unicredit", "Credit Agricole", "Deutsche Bank",
                 "Barclays", "Citigroup", "RBS"
             };
         %>
         <kendo:chart name="chart">
             <kendo:chart-title text="Market Value of Major Banks" />
             <kendo:chart-legend position="bottom" />
             <kendo:chart-series>
                <kendo:chart-seriesItem
                	type="radarLine"
                	data="<%= new double[] { 116, 165, 215, 75, 100, 49, 80, 116, 108, 90, 67, 76, 91, 255, 120 } %>"
                	name="Market value as of 2007" />
                <kendo:chart-seriesItem
                	type="radarLine"
                	data="<%= new double[] { 64, 85, 97, 27, 16, 26, 35, 32, 26, 17, 10, 7, 19, 5 } %>"
                	name="Market value as of 2009" />
             </kendo:chart-series>
             <kendo:chart-categoryAxis>
                <kendo:chart-categoryAxisItem categories="<%= categories %>"/>
             </kendo:chart-categoryAxis>
             <kendo:chart-valueAxis>
                <kendo:chart-valueAxisItem>
                    <kendo:chart-valueAxisItem-labels format="${0}"/>
                </kendo:chart-valueAxisItem>
             </kendo:chart-valueAxis>
             <kendo:chart-tooltip visible="true" format="${0} bln" />
         </kendo:chart>
     </div>
<demo:footer />
