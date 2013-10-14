<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<demo:header />
     <div class="chart-wrapper">
         <kendo:chart name="chart">
             <kendo:chart-title text="A digital signal" />
             <kendo:chart-legend visible="false" />
             <kendo:chart-series>
             	<kendo:chart-seriesItem type="line" style="step"
             		data="<%= new double[] { 20, 1, 18, 3, 15, 5, 10, 6, 9, 6, 10, 5, 13, 3, 16, 1, 19, 1, 20, 2, 18, 5, 12, 7, 10, 8 } %>">
             		<kendo:chart-seriesItem-markers visible="false" />
             	</kendo:chart-seriesItem>
             </kendo:chart-series>
             <kendo:chart-categoryAxis>
                <kendo:chart-categoryAxisItem>
                	<kendo:chart-categoryAxisItem-title text="time" />
                	<kendo:chart-categoryAxisItem-majorGridLines visible="false" />
                	<kendo:chart-categoryAxisItem-majorTicks visible="false" />
                </kendo:chart-categoryAxisItem>
             </kendo:chart-categoryAxis>
             <kendo:chart-valueAxis>
                <kendo:chart-valueAxisItem visible="false">
                    <kendo:chart-valueAxisItem-title text="voltage" />
                    <kendo:chart-valueAxisItem-majorGridLines visible="false"/>
                </kendo:chart-valueAxisItem>
             </kendo:chart-valueAxis>
         </kendo:chart>
     </div>
<demo:footer />
