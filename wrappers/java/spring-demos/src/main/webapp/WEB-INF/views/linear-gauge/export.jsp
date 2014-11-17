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
    
    <script>
	    $(".export-pdf").click(function () {
	        var gauge = $("#gauge").getKendoLinearGauge();
	        gauge.exportPDF({ paperSize: "auto", margin: { left: "1cm", top: "1cm", right: "1cm", bottom: "1cm" } }).done(function (data) {
	            kendo.saveAs({
	                dataURI: data,
	                fileName: "chart.pdf",
	                proxyURL: "http://demos.telerik.com/kendo-ui/service/export"
	            });
	        });
	    });
	
	    $(".export-img").click(function () {
	        var gauge = $("#gauge").getKendoLinearGauge();
	        gauge.exportImage().done(function (data) {
	            kendo.saveAs({
	                dataURI: data,
	                fileName: "chart.png",
	                proxyURL: "http://demos.telerik.com/kendo-ui/service/export"
	            });
	        });
	    });
	
	    $(".export-svg").click(function () {
	        var gauge = $("#gauge").getKendoLinearGauge();
	        gauge.exportSVG().done(function (data) {
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