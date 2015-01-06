<%@page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>



<c:url value="/diagram/events/read" var="readUrl" />
<c:url value="/diagram/events/update" var="updateUrl" />
<c:url value="/diagram/events/create" var="createUrl" />
<c:url value="/diagram/events/destroy" var="destroyUrl" />

<c:url value="/diagram/events/readConnections" var="readConnectionsUrl" />
<c:url value="/diagram/events/updateConnection" var="updateConnectionUrl" />
<c:url value="/diagram/events/createConnection" var="createConnectionUrl" />
<c:url value="/diagram/events/destroyConnection" var="destroyConnectionUrl" />

<c:url value="/resources/dataviz/diagram/people" var="imageRootUrl" />

<demo:header />

<script type="text/javascript">
	function onDataBound(e) {
	    kendoConsole.log("Diagram data bound");
	}
	
	function onEdit(e) {
	    kendoConsole.log("Diagram edit");
	}
	
	function onAdd(e) {
	    kendoConsole.log("Diagram add");
	}
	
	function onRemove(e) {
	    kendoConsole.log("Diagram remove");
	}
	
	function onCancel(e) {
	    kendoConsole.log("Diagram cancel");
	}
	
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
	
	function onMouseEnter(e) {
		kendoConsole.log("Mouse enter: " + elementText(e.item));
	}
	
	function onMouseLeave(e) {
		kendoConsole.log("Mouse leave: " + elementText(e.item));
	}
	
	var diagram = kendo.dataviz.diagram;
	var Shape = diagram.Shape;
	var Connection = diagram.Connection;
	var Point = diagram.Point;

	function elementText(element) {
	    var text;
	    if (element instanceof Shape) {
	        text = element.dataItem.jobTitle;
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
	
	function visualTemplate(options) {
	    var dataviz = kendo.dataviz;
	    var g = new dataviz.diagram.Group();
	    var dataItem = options.dataItem;
	
	    if (dataItem.jobTitle === "President") {
	        g.append(new dataviz.diagram.Circle({
	            radius: 60,
	            stroke: {
	                width: 2,
	                color: dataItem.color || "#586477"
	            },
	            fill: "#e8eff7"
	        }));
	    } else {
	        g.append(new dataviz.diagram.Rectangle({
	            width: 240,
	            height: 67,
	            stroke: {
	                width: 0
	            },
	            fill: "#e8eff7"
	        }));
	
	        g.append(new dataviz.diagram.Rectangle({
	            width: 8,
	            height: 67,
	            fill: dataItem.color,
	            stroke: {
	                width: 0
	            }
	        }));
	    }
	
	    return g;
	}
</script>

<kendo:diagram name="diagram" style="height:600px;"
	dataBound="onDataBound"
	edit="onEdit"
	add="onAdd"
	remove="onRemove" 
	cancel="onCancel"
	itemRotate="onItemRotate"
	pan="onPan"
	select="onSelect"
	zoomStart="onZoomStart"
	zoomEnd="onZoomEnd"
	click="onClick"
	mouseEnter="onMouseEnter"
	mouseLeave="onMouseLeave">
     <kendo:dataSource>
           <kendo:dataSource-transport>
               <kendo:dataSource-transport-create url="${createUrl}" dataType="json" type="POST" contentType="application/json" />
               <kendo:dataSource-transport-read url="${readUrl}" dataType="json" type="POST" contentType="application/json"/>
               <kendo:dataSource-transport-update url="${updateUrl}" dataType="json" type="POST" contentType="application/json" />
               <kendo:dataSource-transport-destroy url="${destroyUrl}" dataType="json" type="POST" contentType="application/json" />
               <kendo:dataSource-transport-parameterMap>
               	<script>
                	function parameterMap(options,type) {
                		return JSON.stringify(options);
                	}
               	</script>
               </kendo:dataSource-transport-parameterMap>
           </kendo:dataSource-transport>
          <kendo:dataSource-schema>
              <kendo:dataSource-schema-model id="id">
                  <kendo:dataSource-schema-model-fields>
                  	  <kendo:dataSource-schema-model-field name="id" type="number" editable="false"/>
                      <kendo:dataSource-schema-model-field name="jobTitle" type="string"/>
                      <kendo:dataSource-schema-model-field name="color" type="string"/>
                  </kendo:dataSource-schema-model-fields>
              </kendo:dataSource-schema-model>
          </kendo:dataSource-schema>
     </kendo:dataSource>
     <kendo:diagram-connectionsDataSource>
           <kendo:dataSource-transport>
               <kendo:dataSource-transport-create url="${createConnectionUrl}" dataType="json" type="POST" contentType="application/json" />
               <kendo:dataSource-transport-read url="${readConnectionsUrl}" dataType="json" type="POST" contentType="application/json"/>
               <kendo:dataSource-transport-update url="${updateConnectionUrl}" dataType="json" type="POST" contentType="application/json" />
               <kendo:dataSource-transport-destroy url="${destroyConnectionUrl}" dataType="json" type="POST" contentType="application/json" />
               <kendo:dataSource-transport-parameterMap>
               	<script>
                	function parameterMap(options,type) {
                		return JSON.stringify(options);
                	}
               	</script>
               </kendo:dataSource-transport-parameterMap>
           </kendo:dataSource-transport>
          <kendo:dataSource-schema>
              <kendo:dataSource-schema-model id="id">
                  <kendo:dataSource-schema-model-fields>
                  	  <kendo:dataSource-schema-model-field name="id" type="number" editable="false"/>
                  	  <kendo:dataSource-schema-model-field name="text" type="string"/>
                      <kendo:dataSource-schema-model-field name="from" from="fromShapeId" type="number"/>
                      <kendo:dataSource-schema-model-field name="to" from="toShapeId" type="number"/>
                      <kendo:dataSource-schema-model-field name="fromX" from="fromPointX" type="number"/>
                      <kendo:dataSource-schema-model-field name="fromY" from="fromPointY" type="number"/>
                      <kendo:dataSource-schema-model-field name="toX" from="toPointX" type="number"/>
                      <kendo:dataSource-schema-model-field name="toY" from="toPointY" type="number"/>                      
                  </kendo:dataSource-schema-model-fields>
              </kendo:dataSource-schema-model>
          </kendo:dataSource-schema>
     </kendo:diagram-connectionsDataSource>
     <kendo:diagram-layout type="tree" subtype="tipover" underneathHorizontalOffset="140" />
     <kendo:diagram-shapeDefaults visual="visualTemplate">     	
     	<kendo:diagram-shapeDefaults-content fontSize="17" template="#= dataItem.jobTitle #" />
     </kendo:diagram-shapeDefaults>
     <kendo:diagram-connectionDefaults>
     	<kendo:diagram-connectionDefaults-stroke color="#586477" width="2" />
	 </kendo:diagram-connectionDefaults>
 </kendo:diagram>

<div class="box">
    <h4>Console log</h4>
    <div class="console"></div>
</div>

<demo:footer />
