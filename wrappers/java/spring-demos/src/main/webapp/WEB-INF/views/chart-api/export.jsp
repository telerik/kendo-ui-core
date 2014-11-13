<%@page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<c:url value="/chart-api/export/save" var="proxyUrl" />

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
    <script>    
	    $(".export-pdf").click(function() {
	        var chart = $("#chart").getKendoChart();
	        chart.exportPDF({ paperSize: "auto", margin: { left: "1cm", top: "1cm", right: "1cm", bottom: "1cm" } }).done(function(data) {
	            kendo.saveAs({
	                dataURI: data,
	                fileName: "chart.pdf",
	                proxyURL: "${proxyUrl}"
	            });
	        });
	    });
	
	    $(".export-img").click(function() {
	        var chart = $("#chart").getKendoChart();
	        chart.exportImage().done(function(data) {
	            kendo.saveAs({
	                dataURI: data,
	                fileName: "chart.png",
	                proxyURL: "${proxyUrl}"	
	            });
	        });
	    });
	
	    $(".export-svg").click(function() {
	        var chart = $("#chart").getKendoChart();
	        chart.exportSVG().done(function(data) {
	            kendo.saveAs({
	                dataURI: data,
	                fileName: "chart.svg",
	                proxyURL: "${proxyUrl}"
	            });
	        });
	    });
    </script>
    <div class="chart-wrapper">
         <% 
            String[] categories = {
                "Mon", "Tue",
                "Wed", "Thu",
                "Fri"
            };
         %>
         <kendo:chart name="chart">
             <kendo:chart-title text="Hybrid car mileage report" />
             <kendo:chart-legend position="top" />
             <kendo:chart-series>
                <kendo:chart-seriesItem type="column" stack="true" color="#cc6e38" data="<%= new int[] { 20, 40, 45, 30, 50 } %>" name="on battery" />
                <kendo:chart-seriesItem type="column" stack="true" color="#ef955f" data="<%= new int[] { 20, 30, 35, 35, 40 } %>" name="on gas" />
                <kendo:chart-seriesItem type="line" color="#ec5e0a" data="<%= new int[] { 30, 38, 40, 32, 42 } %>" name="mpg" axis="mpg" />
                <kendo:chart-seriesItem type="line" color="#4e4141" data="<%= new double[] { 7.8, 6.2, 5.9, 7.4, 5.6 } %>" name="l/100 km" axis="l100km" />
             </kendo:chart-series>
             // Align the first two value axes to the left
             // and the last two to the right.
             //
             // Right alignment is done by specifying a
             // crossing value greater than or equal to
             // the number of categories.
             <kendo:chart-categoryAxis>
                <kendo:chart-categoryAxisItem axisCrossingValue="<%= new int[] { 0, 0, 10, 10 } %>" categories="<%= categories %>" />
             </kendo:chart-categoryAxis>
             <kendo:chart-valueAxis>
                <kendo:chart-valueAxisItem min="0" max="100">
                    <kendo:chart-valueAxisItem-title text="miles" />
                </kendo:chart-valueAxisItem>
                <kendo:chart-valueAxisItem name="km" min="0" max="161" majorUnit="32">
                    <kendo:chart-valueAxisItem-title text="km" />
                </kendo:chart-valueAxisItem>
                <kendo:chart-valueAxisItem name="mpg" color="#ec5e0a">
                    <kendo:chart-valueAxisItem-title text="miles per gallon" />
                </kendo:chart-valueAxisItem>
                <kendo:chart-valueAxisItem name="l100km" color="#4e4141">
                    <kendo:chart-valueAxisItem-title text="liters per 100km" />
                </kendo:chart-valueAxisItem>
             </kendo:chart-valueAxis>
         </kendo:chart>
     </div>
<demo:footer />
