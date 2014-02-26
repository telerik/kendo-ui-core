<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<c:url value="/dataviz/diagram/index/read" var="readUrl" />

<demo:header />

<script type="text/javascript">
var dataviz = kendo.dataviz;
function visualTemplate(options) {
    var dataItem = options.dataItem;
    var g = new dataviz.diagram.Group({
        autoSize: true
    });

    g.append(new dataviz.diagram.Rectangle({
        width: 210,
        height: 75,
        stroke: {
            width: 0
        },
        minWidth: 20,
        minHeight: 20,
        content: {
            color: "#ffffff"
        },
        background: dataItem.background,
    }));

    g.append(new dataviz.diagram.TextBlock({
        text: dataItem.name + " " + dataItem.lastName,
        x: 85,
        y: 20,
        color: "#ffffff"
    }));

    g.append(new dataviz.diagram.TextBlock({
        text: dataItem.position,
        x: 85,
        y: 40,
        color: "#ffffff"
    }));

    g.append(new dataviz.diagram.Image({
        source: dataItem.image,
        x: 3,
        y: 3,
        width: 68,
        height: 68
    }));

    return g;
}
</script>

<kendo:diagram name="diagram" visualTemplate="visualTemplate">
     <kendo:dataSource>
         <kendo:dataSource-transport>
             <kendo:dataSource-transport-read url="${readUrl}" type="POST"  contentType="application/json"/>     
         </kendo:dataSource-transport>
         <kendo:dataSource-schema>
             <kendo:dataSource-schema-hierarchical-model children="items" />
         </kendo:dataSource-schema>
     </kendo:dataSource>
     <kendo:diagram-layout type="layered" />
     <kendo:diagram-shapeDefaults editable="false" rotatable="false" resizable="false" />
     <kendo:diagram-connectionsDefaults>
     	<kendo:diagram-connectionsDefaults-stroke color="#979797" width="2" />
	 </kendo:diagram-connectionsDefaults>
 </kendo:diagram>

<script type="text/javascript">
$(document).ready(function() {
    var diagram = $("#diagram").getKendoDiagram();
    diagram.bringIntoView(diagram.shapes);
});
</script>

<demo:footer />
