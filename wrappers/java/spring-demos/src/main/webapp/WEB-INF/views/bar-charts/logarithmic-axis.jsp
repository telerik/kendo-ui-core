<%@page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<demo:header />
     <div class="chart-wrapper">
         <kendo:chart name="chart">
             <kendo:chart-title text="Fibonacci sequence" />           
             <kendo:chart-series>
                <kendo:chart-seriesItem data="${data}">                    
                </kendo:chart-seriesItem>
             </kendo:chart-series>
             <kendo:chart-tooltip visible="true"/>
             <kendo:chart-valueAxis>
                <kendo:chart-valueAxisItem type="log">
                    <kendo:chart-valueAxisItem-minorGridLines visible="true"/>
                </kendo:chart-valueAxisItem>
             </kendo:chart-valueAxis>
         </kendo:chart>
     </div>
<demo:footer />
