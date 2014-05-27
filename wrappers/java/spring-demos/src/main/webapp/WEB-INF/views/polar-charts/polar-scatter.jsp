<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<demo:header />
     <div class="chart-wrapper">
         <kendo:chart name="chart">
             <kendo:chart-title text="Buck spread" />
             <kendo:chart-legend position="bottom" />
             <kendo:chart-series>
                <kendo:chart-seriesItem
                	type="polarScatter"
                	name="at 3 ft"
                	data="<%= new double[][] {
       		      		new double[] {150, 3}, new double[] {150, 3.1},
       		      		new double[] {152, 3.2}, new double[] {152, 3.1},
       		      		new double[] {151, 3.2}, new double[] {153, 3.3},
       		      		new double[] {149, 3}
	         		} %>" />
                <kendo:chart-seriesItem
                	type="polarScatter"
                	name="at 7 ft"
                	data="<%= new double[][] {
                		new double[] {270, 5}, new double[] {250, 7},
                		new double[] {259, 4}, new double[] {270, 7},
                		new double[] {265, 5}, new double[] {250, 7},
                		new double[] {263, 8}, new double[] {261, 5}
	         		} %>" />
             </kendo:chart-series>
             <kendo:chart-yAxis>
             	<kendo:chart-yAxisItem max="10" visible="false" />
             </kendo:chart-yAxis>
         </kendo:chart>
     </div>
<demo:footer />
