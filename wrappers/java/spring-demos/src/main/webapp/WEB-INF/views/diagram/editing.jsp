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

<kendo:diagram name="diagram">
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
                      <kendo:dataSource-schema-model-field name="firstName" type="string"/>
                      <kendo:dataSource-schema-model-field name="lastName" type="string"/>
                      <kendo:dataSource-schema-model-field name="title" type="string"/>
                      <kendo:dataSource-schema-model-field name="colorScheme" type="string"/>
                      <kendo:dataSource-schema-model-field name="image" type="string"/>
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
                      <kendo:dataSource-schema-model-field name="from" type="number"/>
                      <kendo:dataSource-schema-model-field name="to" type="number"/>
                      <kendo:dataSource-schema-model-field name="text" type="string"/>
                  </kendo:dataSource-schema-model-fields>
              </kendo:dataSource-schema-model>
          </kendo:dataSource-schema>
     </kendo:diagram-connectionsDataSource>
     <kendo:diagram-layout type="layered" />
     <kendo:diagram-shapeDefaults visual="visualTemplate" />
     <kendo:diagram-connectionDefaults>
     	<kendo:diagram-connectionDefaults-stroke color="#979797" width="2" />
	 </kendo:diagram-connectionDefaults>
 </kendo:diagram>

<demo:footer />
