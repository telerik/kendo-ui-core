<%@page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<demo:header />
	<div class="box">
        <h4>Advanced Export options</h4>
        <div class="box-col">
            <button class='export-pdf k-button'>Export as PDF</button>
        </div>
        <div class="box-col">
            <button class='export-img k-button'>Export as Image</button>
        </div>
        <div class="box-col">
            <button class='export-svg k-button'>Export as SVG</button>
        </div>
    </div>
	<div id="gauge-container">
         <kendo:radialGauge name="gauge">
            <kendo:radialGauge-pointer>
            	<kendo:radialGauge-pointerItem value="20" color="#c20000">
            		<kendo:radialGauge-pointerItem-cap size="0.15" />
            	</kendo:radialGauge-pointerItem>
            	<kendo:radialGauge-pointerItem value="80" color="#ff7a00">
            		<kendo:radialGauge-pointerItem-cap size="0.1" />
            	</kendo:radialGauge-pointerItem>
            	<kendo:radialGauge-pointerItem value="140" color="#ffc700" />
            </kendo:radialGauge-pointer>
            <kendo:radialGauge-scale minorUnit="5" startAngle="-30" endAngle="210" max="180">
                <kendo:radialGauge-scale-labels position="inside" />
                <kendo:radialGauge-scale-ranges>
                    <kendo:radialGauge-scale-range from="80" to="120" color="#bb6e36" />
                    <kendo:radialGauge-scale-range from="120" to="150" color="#b8b8b8" />
                    <kendo:radialGauge-scale-range from="150" to="180" color="#f3ac32" />
                </kendo:radialGauge-scale-ranges>
            </kendo:radialGauge-scale>
         </kendo:radialGauge>
    </div>

	<script>
		$(".export-pdf").click(function() {
	        var gauge = $("#gauge").getKendoRadialGauge();
	        gauge.exportPDF({ paperSize: "auto", margin: { left: "1cm", top: "1cm", right: "1cm", bottom: "1cm" } }).done(function (data) {
	            kendo.saveAs({
	                dataURI: data,
	                fileName: "chart.pdf",
	                proxyURL: "http://demos.telerik.com/kendo-ui/service/export"
	            });
	        });
	    });
	
	    $(".export-img").click(function() {
	        var gauge = $("#gauge").getKendoRadialGauge();
	        gauge.exportImage().done(function(data) {
	            kendo.saveAs({
	                dataURI: data,
	                fileName: "chart.png",
	                proxyURL: "http://demos.telerik.com/kendo-ui/service/export"
	            });
	        });
	    });
	
	    $(".export-svg").click(function() {
	        var gauge = $("#gauge").getKendoRadialGauge();
	        gauge.exportSVG().done(function(data) {
	            kendo.saveAs({
	                dataURI: data,
	                fileName: "chart.svg",
	                proxyURL: "http://demos.telerik.com/kendo-ui/service/export"
	            });
	        });
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