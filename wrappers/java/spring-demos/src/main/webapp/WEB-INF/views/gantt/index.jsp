<%@page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@page import="java.util.HashMap"%>
<%@page import="java.util.ArrayList"%>
<%@page import="java.util.Date"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>

<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>


<c:url value="/gantt/tasks/read" var="tasksReadUrl" />
<c:url value="/gantt/tasks/create" var="tasksCreateUrl" />
<c:url value="/gantt/tasks/update" var="tasksUpdateUrl" />
<c:url value="/gantt/tasks/destroy" var="tasksDestroyUrl" />

<c:url value="/gantt/dependencies/read" var="dependencyReadUrl" />
<c:url value="/gantt/dependencies/create" var="dependencyCreateUrl" />
<c:url value="/gantt/dependencies/update" var="dependencyUpdateUrl" />
<c:url value="/gantt/dependencies/destroy" var="dependencyDestroyUrl" />

<demo:header />
    <kendo:gantt name="gantt" height="700" showWorkDays="false" showWorkHours="false" snap="false">
    	<kendo:gantt-views>
    		<kendo:gantt-view type="day" />
    		<kendo:gantt-view type="week" selected="true" />
    		<kendo:gantt-view type="month"  />
    	</kendo:gantt-views>
    	
    	<kendo:gantt-columns>
    		<kendo:gantt-column field="id" title="ID" width="50" />
    		<kendo:gantt-column field="title" title="Title" editable="true" />
    		<kendo:gantt-column field="start" title="Start Time" format="{0:MM/dd/yyyy}" width="100" />
    		<kendo:gantt-column field="end" title="End Time" format="{0:MM/dd/yyyy}" width="100" />
    	</kendo:gantt-columns>
    	
        <kendo:dataSource batch="false">
             <kendo:dataSource-schema>
                <kendo:dataSource-schema-model id="id">
                     <kendo:dataSource-schema-model-fields>
                         <kendo:dataSource-schema-model-field name="id" type="number" />
                         <kendo:dataSource-schema-model-field name="orderId" type="number" />
                         <kendo:dataSource-schema-model-field name="parentId" defaultValue="null" nullable="true" type="number" />
                         <kendo:dataSource-schema-model-field name="start" type="date" />
                         <kendo:dataSource-schema-model-field name="end" type="date" />
                         <kendo:dataSource-schema-model-field name="title" defaultValue="No title" type="string" />
                         <kendo:dataSource-schema-model-field name="percentComplete" type="number" />
                         <kendo:dataSource-schema-model-field name="expanded" type="boolean" defaultValue="true" />
                         <kendo:dataSource-schema-model-field name="summary" type="boolean" />
                    </kendo:dataSource-schema-model-fields>
                </kendo:dataSource-schema-model>
            </kendo:dataSource-schema>
            <kendo:dataSource-transport>
                <kendo:dataSource-transport-create url="${tasksCreateUrl}" dataType="json" type="POST" contentType="application/json" />
                <kendo:dataSource-transport-read url="${tasksReadUrl}" dataType="json" type="POST" contentType="application/json" />
                <kendo:dataSource-transport-update url="${tasksUpdateUrl}" dataType="json" type="POST" contentType="application/json" />
                <kendo:dataSource-transport-destroy url="${tasksDestroyUrl}" dataType="json" type="POST" contentType="application/json" />
                <kendo:dataSource-transport-parameterMap>
                	<script>
	                	function parameterMap(options, type) {
                			return JSON.stringify(options.models || [ options ]);
	                	}
                	</script>
                </kendo:dataSource-transport-parameterMap>              
            </kendo:dataSource-transport>
        </kendo:dataSource>
    	
        <kendo:dependencies batch="false">
             <kendo:dataSource-schema>
                <kendo:dataSource-schema-model id="id">
                     <kendo:dataSource-schema-model-fields>
                         <kendo:dataSource-schema-model-field name="id" type="number" />
                         <kendo:dataSource-schema-model-field name="predecessorId" type="number" />
                         <kendo:dataSource-schema-model-field name="successorId" type="number" />
                         <kendo:dataSource-schema-model-field name="type" type="number" />
                    </kendo:dataSource-schema-model-fields>
                </kendo:dataSource-schema-model>
            </kendo:dataSource-schema>
            <kendo:dataSource-transport>
                <kendo:dataSource-transport-create url="${dependencyCreateUrl}" dataType="json" type="POST" contentType="application/json" />
                <kendo:dataSource-transport-read url="${dependencyReadUrl}" dataType="json" type="POST" contentType="application/json" />
                <kendo:dataSource-transport-update url="${dependencyUpdateUrl}" dataType="json" type="POST" contentType="application/json" />
                <kendo:dataSource-transport-destroy url="${dependencyDestroyUrl}" dataType="json" type="POST" contentType="application/json" />
                <kendo:dataSource-transport-parameterMap>
                	<script>
	                	function parameterMap(options, type) { 
                			return JSON.stringify(options.models || [ options ]);
	                	}
                	</script>
                </kendo:dataSource-transport-parameterMap>              
            </kendo:dataSource-transport>
        </kendo:dependencies>
    </kendo:gantt>
    
<demo:footer />