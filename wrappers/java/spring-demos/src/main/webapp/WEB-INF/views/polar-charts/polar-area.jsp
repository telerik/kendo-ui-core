<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<demo:header />
     <div class="chart-wrapper">
         <kendo:chart name="chart">
             <kendo:chart-title text="Polar area" />
             <kendo:chart-legend position="bottom" />
             <kendo:chart-series>
                <kendo:chart-seriesItem
                	type="polarArea"
                	name="at 3 ft"
                	data="<%= new double[][] {
	                	new double[] {10, 10}, new double[] {30, 20},
	                	new double[] {50, 30}, new double[] {70, 20},
	                	new double[] {90, 10}, new double[] {90, 0},
	                	new double[] {230, 10}, new double[] {235, 20},
	                	new double[] {240, 30}, new double[] {245, 20},
	                	new double[] {250, 10}
	         		} %>" />
             </kendo:chart-series>
         </kendo:chart>
     </div>
<demo:footer />
