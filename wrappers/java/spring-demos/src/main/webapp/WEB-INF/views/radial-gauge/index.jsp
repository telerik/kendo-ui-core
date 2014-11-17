<%@page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<demo:header />
	<link href="<c:url value='/Content/web/kendo.common.min.css' />" rel="stylesheet" type="text/css" />
    <link href="<c:url value='/Content/web/kendo.default.min.css' />" rel="stylesheet" type="text/css" />
    <script src="<c:url value='/Scripts/kendo.web.min.js' />"></script>
    
     <div id="gauge-container">
         <kendo:radialGauge name="gauge">
            <kendo:radialGauge-pointer>
            	<kendo:radialGauge-pointerItem value="65" />
            </kendo:radialGauge-pointer>
            <kendo:radialGauge-scale minorUnit="5" startAngle="-30" endAngle="210" max="180" />
         </kendo:radialGauge>
         <kendo:slider name="gauge-value" value="65" change="change" min="0" max="180" showButtons="false">
         </kendo:slider>
     </div>
	<script>
	    function change(e) {
	        $("#gauge").data("kendoRadialGauge").value($("#gauge-value").val());
	    }
	</script>
    <style>
        #gauge-container {
        	background: transparent url(<c:url value="/resources/dataviz/gauge/gauge-container-partial.png" />) no-repeat 50% 50%;
            width: 386px;
            height: 386px;
            text-align: center;
            margin: 0 auto 30px auto;
        }

        #gauge {
            width: 350px;
            height: 300px;
            margin: 0 auto;
            border-color: transparent;
        }

        #gauge-container .k-slider {
            margin-top: -11px;
            width: 140px;
        }
    </style>
<demo:footer />
