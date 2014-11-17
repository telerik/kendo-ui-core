<%@page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<demo:header />
	<div id="gauge-container">
         <kendo:radialGauge name="gauge">
            <kendo:radialGauge-pointer>
            	<kendo:radialGauge-pointerItem value="10" color="#c20000">
            		<kendo:radialGauge-pointerItem-cap size="0.15" />
            	</kendo:radialGauge-pointerItem>
            	<kendo:radialGauge-pointerItem value="70" color="#ff7a00">
            		<kendo:radialGauge-pointerItem-cap size="0.1" />
            	</kendo:radialGauge-pointerItem>
            	<kendo:radialGauge-pointerItem value="140" color="#ffc700" />
            </kendo:radialGauge-pointer>
            <kendo:radialGauge-scale minorUnit="5" startAngle="-30" endAngle="210" max="180" />
         </kendo:radialGauge>
    </div>

	<div class="box">
        <div class="box-col">
            <h4>Red pointer value</h4>
                <kendo:slider name="gauge-value0" value="10" style="width: 220px;" min="0" max="180" showButtons="false" change="onSliderChange"></kendo:slider>
            <h4 style="margin-top: 30px;">Get all pointer values</h4>
            <button id="getValues" class="k-button">Get all</button>
        </div>
        <div class="box-col">
            <h4>Orange pointer value</h4>
                <kendo:slider name="gauge-value1" value="70" style="width: 220px;" min="0" max="180" showButtons="false" change="onSliderChange"></kendo:slider>
            <h4 style="margin-top: 30px;">Set all pointer values</h4>
            <input id="newValues" class="k-textbox" value="100, 10, 80" style="width: 110px;" />
            <button id="setValues" class="k-button">Set all</button>
        </div>
        <div class="box-col">
            <h4>Yellow pointer value</h4>
                <kendo:slider name="gauge-value2" value="140" style="width: 220px;" min="0" max="180" showButtons="false" change="onSliderChange"></kendo:slider>
        </div>
    </div>

	<script>
		function onSliderChange(e) {
	        var id = this.element.attr("id");
	        var pointerIndex = id.substr(id.length - 1);
	        var gauge = $("#gauge").data("kendoRadialGauge");
	        gauge.pointers[pointerIndex].value(this.value());
	    }
	
		$("#getValues").click(function () {
	        alert("All values: " + $("#gauge").data("kendoRadialGauge").allValues().join(", "));
	    });
	
	    $("#setValues").click(function () {
	        var values = $("#newValues").val().split(",");
	
	        values = $.map(values, function (val) {
	            return parseInt(val);
	        });
	
	        $("#gauge").data("kendoRadialGauge").allValues(values);
	    });
	</script>
	<style>
         #gauge-container {
             background: transparent url(<c:url value="/resources/dataviz/gauge/gauge-container.png" />) no-repeat 50% 50%;
             width: 404px;
             height: 404px;
             text-align: center;
             margin: 0 auto 30px auto;
         }

         #gauge {
             width: 330px;
             height: 330px;
             margin: 0 auto 0;
         }
     </style>
<demo:footer />