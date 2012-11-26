<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<demo:header />
     <div id="gauge-container">
         <kendo:radialGauge name="gauge">
            <kendo:radialGauge-pointer value="65" />
            <kendo:radialGauge-scale minorUnit="5" startAngle="-30" endAngle="210" max="180" />
         </kendo:radialGauge>
         <input id="gauge-value" value="65" onchange="javascript:change();">
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
        }

        #gauge-container input {
            margin-top: -11px;
            width: 140px;
        }
    </style>
<demo:footer />
