<%@page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<c:url value="/diagram/editing/read" var="readUrl" />
<c:url value="/diagram/editing/update" var="updateUrl" />
<c:url value="/diagram/editing/create" var="createUrl" />
<c:url value="/diagram/editing/destroy" var="destroyUrl" />

<c:url value="/diagram/editing/readConnections" var="readConnectionsUrl" />
<c:url value="/diagram/editing/updateConnection" var="updateConnectionUrl" />
<c:url value="/diagram/editing/createConnection" var="createConnectionUrl" />
<c:url value="/diagram/editing/destroyConnection" var="destroyConnectionUrl" />

<c:url value="/resources/dataviz/diagram/people" var="imageRootUrl" />

<demo:header />

<script type="text/javascript">
	function visualTemplate(options) {
	    var dataviz = kendo.dataviz;
	    var g = new dataviz.diagram.Group();
	    var dataItem = options.dataItem;
	    
	    if (dataItem.jobTitle === "President") {
	        g.append(new dataviz.diagram.Circle({
	            radius: 60,
	            stroke: {
	                width: 2,
	                color: "#586477"
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
	
	function onDataBound(e) {
	    var that = this;
	    setTimeout(function () {
	        that.bringIntoView(that.shapes);
	    }, 0);
	}
</script>

<kendo:diagram name="diagram" dataBound="onDataBound" style="height:600px;">
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

<demo:footer />
