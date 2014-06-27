<%@page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<c:url value="/map/bubble-layer/read" var="readUrl" />

<demo:header />

<div class="box">
    <div id="info" class="box-col"></div>
    <div class="box-col select-col">
        <h4>Bubble symbol</h4>
        <ul id="select-symbol">
            <li>Circle</li>
            <li>Square</li>
        </ul>
    </div>
</div>


<script id="info-template" type="text/x-kendo-template">
    <h4>#: city #, #= country #</h4>
    <p class="info">Population #= kendo.toString(pop2010 * 1000, "N0") #</p>
</script>
<script id="empty-info-template" type="text/x-kendo-template">
    <h4>Hover over urban areas</h4>
    <p>&nbsp;</p>
</script>

<kendo:map name="map" center="<%= new double[] {45, 45} %>" zoom="4" minZoom="3" wraparound="false"
           shapeMouseEnter="onShapeMouseEnter" reset="onReset">
    <kendo:map-layers>
        <kendo:map-layer type="tile"
            urlTemplate="http://otile3.mqcdn.com/tiles/1.0.0/sat/#= zoom #/#= x #/#= y #.png"
            attribution="Tiles &copy; <a href='http://www.mapquest.com/' target='_blank'>MapQuest</a>" />
        <kendo:map-layer type="bubble" locationField="location" valueField="pop2010">
             <kendo:dataSource>
                 <kendo:dataSource-transport>
                     <kendo:dataSource-transport-read url="${readUrl}" dataType="json" type="POST" contentType="application/json" />
                 </kendo:dataSource-transport>
             </kendo:dataSource>
             <kendo:map-layer-style>
                <kendo:map-layer-style-fill color="#fff" opacity="0.4"/>
                <kendo:map-layer-style-stroke width="0" />
             </kendo:map-layer-style>
        </kendo:map-layer>
    </kendo:map-layers>
</kendo:map>

<script>
    var template = kendo.template($("#info-template").html());
    var emptyTemplate = kendo.template($("#empty-info-template").html());
    var activeShape;

    function onShapeMouseEnter(e) {
        if (activeShape) {
            activeShape.options.set("stroke", null);
        }

        activeShape = e.shape;
        activeShape.options.set("stroke", { width: 1.5, color: "#fff" });

        $("#info").html(template(e.shape.dataItem));
    }

    function onReset() {
        $("#info").html(emptyTemplate({}));
        activeShape = null;
    }
    
    $("#select-symbol").kendoMobileButtonGroup({
        select: function(e) {
            var layer = $("#map").data("kendoMap").layers[1];
            layer.options.symbol = e.index === 0 ? "circle" : "square";
            layer.reset();
        },
        index: 0
    });
</script>

<style>
    .select-col {
        float: right;
    }
    
    #example .box,
   .demo-section {
        margin: 1em auto;
    }
</style>

<demo:footer />
