<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<demo:header />
     <div class="chart-wrapper">
         <kendo:chart name="chart">
             <kendo:chart-title text="Polar plot" />
             <kendo:chart-series>
                <kendo:chart-seriesItem
                	type="polarLine"
                	data="<%= new double[][] {
                				new double[] {10, 10}, new double[] {20, 20},
                				new double[] {30, 30}, new double[] {40, 40},
                				new double[] {60, 50}, new double[] {80, 60},
                    			new double[] {100, 70}, new double[] {140, 80},
                    			new double[] {180, 90}, new double[] {240, 100}                		
                		  } %>" />
             </kendo:chart-series>
         </kendo:chart>
     </div>
<demo:footer />
