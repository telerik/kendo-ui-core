<%@page import="java.util.Date"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>

<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>


<c:url value="/web/scheduler/events/read" var="readUrl" />
<c:url value="/web/scheduler/events/create" var="createUrl" />
<c:url value="/web/scheduler/events/update" var="updateUrl" />
<c:url value="/web/scheduler/events/destroy" var="destroyUrl" />

<%
	Date date = new SimpleDateFormat("yyyy/MM/dd").parse("2013/6/13");
	
	Date startTime = new SimpleDateFormat("yyyy/MM/dd hh:mm").parse("2013/6/13 7:00");
%>
<demo:header />
<script>
function scheduler_dataBinding(e) {
    kendoConsole.log("dataBinding");
}

function scheduler_dataBound(e) {
    kendoConsole.log("dataBound");
}

function scheduler_save(e) {
    kendoConsole.log("save");
}

function scheduler_remove(e) {
    kendoConsole.log("remove");
}

function scheduler_cancel(e) {
    kendoConsole.log("cancel");
}

function scheduler_edit(e) {
    kendoConsole.log("edit");
}

function scheduler_moveStart(e) {
    kendoConsole.log("moveStart");
}

function scheduler_move(e) {
    kendoConsole.log("move");
}

function scheduler_moveEnd(e) {
    kendoConsole.log("moveEnd");
}

function scheduler_resizeStart(e) {
    kendoConsole.log("resizeStart");
}

function scheduler_resize(e) {
    kendoConsole.log("resize");
}

function scheduler_resizeEnd(e) {
    kendoConsole.log("resizeEnd");
}
</script>
    <kendo:scheduler name="scheduler" timezone="Etc/UTC" height="400" date="<%= date %>" startTime="<%= startTime %>"
    	dataBinding="scheduler_dataBinding" dataBound="scheduler_dataBound" save="scheduler_save"
    	remove="scheduler_remove" edit="scheduler_edit" cancel="scheduler_cancel" moveStart="scheduler_moveStart"
    	moveEnd="scheduler_moveEnd" move="scheduler_move" resizeStart="scheduler_resizeStart"
    	resizeEnd="scheduler_resizeEnd" resize="scheduler_resize">
    	<kendo:scheduler-views>
    		<kendo:scheduler-view type="day" />
    		<kendo:scheduler-view type="week" selected="true" />
    		<kendo:scheduler-view type="month"  />
    		<kendo:scheduler-view type="agenda" />
    	</kendo:scheduler-views>
        <kendo:dataSource batch="true">
             <kendo:dataSource-schema>
                <kendo:dataSource-schema-model id="taskId">
                     <kendo:dataSource-schema-model-fields>
                         <kendo:dataSource-schema-model-field name="taskId" type="number" />
                         <kendo:dataSource-schema-model-field name="title" defaultValue="No title" type="string" />
                         <kendo:dataSource-schema-model-field name="description" type="string" />
                         <kendo:dataSource-schema-model-field name="isAllDay" type="boolean" />
                         <kendo:dataSource-schema-model-field name="recurrenceRule" type="string" nullable="true"/>
                         <kendo:dataSource-schema-model-field name="recurrenceId" type="number" nullable="true" />
                         <kendo:dataSource-schema-model-field name="recurrenceException" type="string" nullable="true" />
                         <kendo:dataSource-schema-model-field name="ownerId" type="number" defaultValue="1" />
                         <kendo:dataSource-schema-model-field name="start" type="date" />
                         <kendo:dataSource-schema-model-field name="end" type="date" />
                    </kendo:dataSource-schema-model-fields>
                </kendo:dataSource-schema-model>
            </kendo:dataSource-schema>
            <kendo:dataSource-transport>
                <kendo:dataSource-transport-create url="${createUrl}" dataType="json" type="POST" contentType="application/json" />
                <kendo:dataSource-transport-read url="${readUrl}" dataType="json" type="POST" contentType="application/json" />
                <kendo:dataSource-transport-update url="${updateUrl}" dataType="json" type="POST" contentType="application/json" />
                <kendo:dataSource-transport-destroy url="${destroyUrl}" dataType="json" type="POST" contentType="application/json" />
                <kendo:dataSource-transport-parameterMap>
                	<script>
	                	function parameterMap(options, type) { 
	                		if(type==="read"){
	                			return JSON.stringify(options);
	                		} else {
	                			return JSON.stringify(options.models);
	                		}
	                	}
                	</script>
                </kendo:dataSource-transport-parameterMap>              
            </kendo:dataSource-transport>
        </kendo:dataSource>
    </kendo:scheduler>
    <div class="demo-section">
        <h3 class="title">Console log</h3>
        <div class="console"></div>
    </div>
<demo:footer />