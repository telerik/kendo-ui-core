<%@page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<c:url value="/diagram/events/read" var="readUrl" />
<c:url value="/resources/dataviz/diagram/people" var="imageRootUrl" />

<demo:header />

<kendo:diagram name="diagram" itemRotate="onItemRotate" pan="onPan" select="onSelect" zoomStart="onZoomStart" zoomEnd="onZoomEnd" click="onClick">
     <kendo:dataSource>
         <kendo:dataSource-transport>
             <kendo:dataSource-transport-read url="${readUrl}" type="POST"  contentType="application/json"/>     
         </kendo:dataSource-transport>
         <kendo:dataSource-schema>
             <kendo:dataSource-schema-hierarchical-model children="items" />
         </kendo:dataSource-schema>
     </kendo:dataSource>
     <kendo:diagram-layout type="layered" />
     <kendo:diagram-shapeDefaults visual="visualTemplate" />
     <kendo:diagram-connectionDefaults>
     	<kendo:diagram-connectionDefaults-stroke color="#979797" width="2" />
	 </kendo:diagram-connectionDefaults>
</kendo:diagram>

<div class="box">
    <h4>Console log</h4>
    <div class="console"></div>
</div>
<script type="text/javascript">
	function onItemRotate(e) {
	    var rotation = e.item.rotate();
	    kendoConsole.log("Rotate - angle: " + rotation.angle + " center: " + rotation.x + "," + rotation.y);
	}
	
	function onPan(e) {
	    kendoConsole.log("Pan: " + e.pan.toString());
	}
	
	function onSelect(e) {
	    var action;
	    var items;
	    if (e.selected.length) {
	        action = "Selected";
	        items = e.selected;
	    } else if (e.deselected.length) {
	        action = "Deselected";
	        items = e.deselected;
	    }
	
	    kendoConsole.log(action + ": " + items.length);
	}
	
	function onZoomStart(e) {
	    kendoConsole.log("Zoom start: " + e.zoom);
	}
	
	function onZoomEnd(e) {
	    kendoConsole.log("Zoom end: " + e.zoom);
	}
	
	function onClick(e) {
	    kendoConsole.log("Click: " + elementText(e.item));
	}
	
	var diagram = kendo.dataviz.diagram;
	var Shape = diagram.Shape;
	var Connection = diagram.Connection;
	var Point = diagram.Point;
	
	function elementText(element) {
	    var text;
	    if (element instanceof Shape) {
	        text = dataItemName(element.dataItem);
	    } else if (element instanceof Point) {
	        text = "(" + element.x + "," + element.y + ")";
	    } else if (element instanceof Connection) {
	        var source = element.source();
	        var target = element.target();
	        var sourceElement = source.shape || source;
	        var targetElement = target.shape || target;
	        text = elementText(sourceElement) + " - " + elementText(targetElement);
	    }
	    return text;
	}
	
	function dataItemName(dataItem) {
	    return dataItem.firstName + " " + dataItem.lastName;
	}

    function visualTemplate(options) {
        var dataviz = kendo.dataviz;
        var g = new dataviz.diagram.Group();
        var dataItem = options.dataItem;

        g.append(new dataviz.diagram.Rectangle({
            width: 210,
            height: 75,
            stroke: {
                width: 0
            },
            fill: dataItem.colorScheme
        }));

        g.append(new dataviz.diagram.TextBlock({
            text: dataItem.firstName + " " + dataItem.lastName,
            x: 85,
            y: 20,
            color: "#fff"
        }));

        g.append(new dataviz.diagram.TextBlock({
            text: dataItem.title,
            x: 85,
            y: 40,
            color: "#fff"
        }));

        g.append(new dataviz.diagram.Image({
            source: "${imageRootUrl}/" + dataItem.image,
            x: 3,
            y: 3,
            width: 68,
            height: 68
        }));

        return g;
    }
</script>
<demo:footer />
