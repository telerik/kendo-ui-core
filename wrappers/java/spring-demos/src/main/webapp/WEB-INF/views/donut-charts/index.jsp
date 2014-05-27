<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<demo:header />
     <div class="chart-wrapper">
         <kendo:chart name="chart">
             <kendo:chart-title text="Share of Internet Population Growth" position="bottom" />
             <kendo:chart-legend visible="false" />
             <kendo:chart-series>
                <kendo:chart-seriesItem type="donut" data="${donutData2011}" startAngle="150">
                </kendo:chart-seriesItem>
                <kendo:chart-seriesItem type="donut" data="${donutData2012}" startAngle="150">
                	<kendo:chart-seriesItem-labels position="outsideEnd" visible="true" template="#= category #: #= value#%" background="transparent" />
                </kendo:chart-seriesItem>
             </kendo:chart-series>
             <kendo:chart-tooltip visible="true" template="#= category # (#= series.name #): #= value #%" />
         </kendo:chart>
     </div>
<demo:footer />
