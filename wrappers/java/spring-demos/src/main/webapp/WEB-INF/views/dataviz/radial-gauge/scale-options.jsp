<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<demo:header />
     <div class="configuration k-widget k-header" style="width:190px;">
        <span class="configHead">Gauge</span>
        <ul class="options">
            <li>
                <input id="labels" checked="checked" type="checkbox" autocomplete="off" />
                <label for="labels">Show labels</label>
            </li>
    
            <li>
                <input id="labels-inside" type="radio" value="inside" name="labels-position" checked="checked" />
                <label for="labels-inside">- inside the gauge</label>
            </li>
    
            <li>
                <input id="labels-outside" type="radio" value="outside" name="labels-position">
                <label for="labels-outside">- outside of the gauge</label>
            </li>
    
            <li>
                <input id="ranges" checked="checked" type="checkbox" autocomplete="off" />
                <label for="ranges">Show ranges</label>
            </li>
        </ul>
     </div>
     <div id="gauge-container">
         <kendo:radialGauge name="gauge">
            <kendo:radialGauge-pointer value="65" />
            <kendo:radialGauge-scale minorUnit="5" startAngle="-60" endAngle="240" max="180">
                <kendo:radialGauge-scale-labels position="inside" />
                <kendo:radialGauge-scale-ranges>
                    <kendo:radialGauge-scale-range from="80" to="120" color="#ffc700" />
                    <kendo:radialGauge-scale-range from="120" to="120" color="#ff7a00" />
                    <kendo:radialGauge-scale-range from="120" to="120" color="#c20000" />
                </kendo:radialGauge-scale-ranges>
            </kendo:radialGauge-scale>
         </kendo:radialGauge>
     </div>
	<script type="text/javascript">
	    $(document).ready(function () {
	        $(".configuration").bind("change", refresh);
	
	        window.configuredRanges = $("#gauge").data("kendoRadialGauge").options.scale.ranges;
	    });
	
	    function refresh() {
	        var gauge = $("#gauge").data("kendoRadialGauge"),
	            showLabels = $("#labels").prop("checked"),
	            showRanges = $("#ranges").prop("checked"),
	            positionInputs = $("input[name='labels-position']"),
	            labelsPosition = positionInputs.filter(":checked").val(),
	            options = gauge.options;
	
	        options.transitions = false;
	        options.scale.labels = options.scale.labels || {};
	        options.scale.labels.visible = showLabels;
	        options.scale.labels.position = labelsPosition;
	        options.scale.ranges = showRanges ? window.configuredRanges : [];
	
	        gauge.redraw();
	    }
	</script>
	<style>
        #gauge-container {
        	background: transparent url(<c:url value="/resources/dataviz/gauge/gauge-container.png" />) no-repeat 50% 0;
            width: 404px;
            height: 404px;
            text-align: center;
            margin: auto;
            padding-top: 27px;
        }

        #gauge {
            width: 330px;
            height: 330px;
            margin: 0 auto 0;
        }

        #gauge svg {
            left: 0 !important;
        }
    </style>
<demo:footer />
