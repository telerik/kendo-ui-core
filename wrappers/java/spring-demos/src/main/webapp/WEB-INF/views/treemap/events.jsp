<%@page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<c:url value="/treemap/events/read" var="readUrl" />

<demo:header />
<kendo:treeMap name="treeMap" textField="Name" valueField="Value" dataBound="onDataBound" itemCreated="onItemCreated">
     <kendo:dataSource>
         <kendo:dataSource-transport>
             <kendo:dataSource-transport-read url="${readUrl}" type="POST"  contentType="application/json"/>     
         </kendo:dataSource-transport>
         <kendo:dataSource-schema>
             <kendo:dataSource-schema-hierarchical-model children="items" />
         </kendo:dataSource-schema>
     </kendo:dataSource>
</kendo:treeMap>
<div class="console"></div>
<script>
	function onDataBound(e) {
	    kendoConsole.log("Data bound");
	}
	
	function onItemCreated(e) {
	    kendoConsole.log("Item is created");
	}
</script>
<demo:footer />