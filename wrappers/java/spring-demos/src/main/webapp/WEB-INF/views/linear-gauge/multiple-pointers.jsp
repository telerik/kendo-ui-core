<%@page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<demo:header />
	<div id="gauge-container">
         <kendo:linearGauge name="gauge">
         	<kendo:linearGauge-pointer>
            	<kendo:linearGauge-pointerItem value="10" color="#c20000" shape="arrow" />
            	<kendo:linearGauge-pointerItem value="50" color="#ff7a00" margin="10" />
            	<kendo:linearGauge-pointerItem value="30" color="#ffc700" />
            	<kendo:linearGauge-pointerItem value="45" color="#428bca" shape="arrow" />
            </kendo:linearGauge-pointer>
            <kendo:linearGauge-scale minorUnit="2" majorUnit="20" min="-40" max="60" vertical="true">
            	<kendo:linearGauge-scale-ranges>
            		<kendo:linearGauge-scale-range from="-40" to="-20" color="#2798df" />
            		<kendo:linearGauge-scale-range from="30" to="45" color="#ffc700" />
            		<kendo:linearGauge-scale-range from="45" to="60" color="#c20000" />
            	</kendo:linearGauge-scale-ranges>
            </kendo:linearGauge-scale>
         </kendo:linearGauge>
    </div>
    <style>
         #gauge-container {
             text-align: center;
             margin: 0 auto;
             background: transparent url(<c:url value="/resources/dataviz/gauge/linear-gauge-container.png" />) no-repeat 50% 50%;
             padding: 18px;
             width: 300px;
             height: 300px;
         }

         #gauge {
             height: 300px;
             display: inline-block;
             *display: inline;
             zoom: 1;
         }
     </style>
<demo:footer />