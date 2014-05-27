<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<demo:header />
     <div class="chart-wrapper">
         <kendo:chart name="chart">
             <kendo:chart-title text="Share of Internet Population Growth, 2007 - 2012" position="bottom" />
             <kendo:chart-legend visible="false">
       	        <kendo:chart-legend-labels template="#= text # (#= value #%)"/>    
             </kendo:chart-legend>
             <kendo:chart-series>
                <kendo:chart-seriesItem type="pie" data="${pieData}" startAngle="150">
                	<kendo:chart-seriesItem-labels template="#= category #: #= value#%" visible="true" background="transparent" />
                </kendo:chart-seriesItem>
             </kendo:chart-series>
             <kendo:chart-tooltip visible="true" format="{0}%" />
         </kendo:chart>
     </div>
<demo:footer />
