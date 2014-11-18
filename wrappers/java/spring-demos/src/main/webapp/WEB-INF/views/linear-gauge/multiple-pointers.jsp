<%@page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<demo:header />
	<div id="gauge-container">
         <kendo:linearGauge name="gauge">
            <kendo:linearGauge-pointer>
				<kendo:linearGauge-pointerItem value="10" color="#c20000" shape="arrow" />
				<kendo:linearGauge-pointerItem value="70" color="#ff7a00" margin="10" />
				<kendo:linearGauge-pointerItem value="140" color="#ffc700" />
            </kendo:linearGauge-pointer>
            <kendo:linearGauge-scale minorUnit="5" min="0" max="180" vertical="true" />
         </kendo:linearGauge>
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
	        var gauge = $("#gauge").data("kendoLinearGauge");
	        gauge.pointers[pointerIndex].value(this.value());
	    }

		$("#getValues").click(function () {
	        alert("All values: " + $("#gauge").data("kendoLinearGauge").allValues().join(", "));
	    });

	    $("#setValues").click(function () {
	        var values = $("#newValues").val().split(",");

	        values = $.map(values, function (val) {
	            return parseInt(val);
	        });

	        $("#gauge").data("kendoLinearGauge").allValues(values);
	    });
	</script>
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
             zoom: 1;
         }
     </style>
<demo:footer />