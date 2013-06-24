<%@page import="java.util.HashMap"%>
<%@page import="java.util.ArrayList"%>
<%@page import="java.util.Date"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>

<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>


<c:url value="/web/scheduler/index/read" var="readUrl" />
<c:url value="/web/scheduler/index/create" var="createUrl" />
<c:url value="/web/scheduler/index/update" var="updateUrl" />
<c:url value="/web/scheduler/index/destroy" var="destroyUrl" />

<%
	Date date = new SimpleDateFormat("yyyy/MM/dd").parse("2013/6/13");
	
	Date startTime = new SimpleDateFormat("yyyy/MM/dd hh:mm").parse("2013/6/13 7:00");
	
	ArrayList<HashMap<String, Object>> resources = new ArrayList<HashMap<String, Object>>();
	
	HashMap<String, Object> alex = new HashMap<String, Object>();
	alex.put("text", "Alex");
	alex.put("value", 1);
	alex.put("color", "#ef701d");
	resources.add(alex);
	HashMap<String, Object> bob = new HashMap<String, Object>();
	bob.put("text", "Bob");
	bob.put("value", 2);
	bob.put("color", "#5fb1f7");
	resources.add(bob);
	HashMap<String, Object> charlie = new HashMap<String, Object>();
	charlie.put("text", "Charlie");
	charlie.put("value", 3);
	charlie.put("color", "#35a964");
	resources.add(charlie);

%>
<demo:header />
	 <div id="people">
        <input checked type="checkbox" id="alex" value="1">
        <input checked type="checkbox" id="bob" value="2">
        <input type="checkbox" id="charlie" value="3">
    </div>
    <kendo:scheduler name="scheduler" timezone="Etc/UTC" height="600" date="<%= date %>" startTime="<%= startTime %>">
    	<kendo:scheduler-views>
    		<kendo:scheduler-view type="day" />
    		<kendo:scheduler-view type="week" selected="true" />
    		<kendo:scheduler-view type="month"  />
    		<kendo:scheduler-view type="agenda" />
    	</kendo:scheduler-views>
    	<kendo:scheduler-resources>
    		<kendo:scheduler-resource field="ownerId" title="Owner">
    			<kendo:dataSource data="<%= resources %>" />
    		</kendo:scheduler-resource>
    	</kendo:scheduler-resources>
        <kendo:dataSource batch="true">
           	<kendo:dataSource-filter>
           		<kendo:dataSource-filterItem logic="or">
           			<kendo:dataSource-filterItem field="ownerId" operator="eq" value="1" />
           			<kendo:dataSource-filterItem field="ownerId" operator="eq" value="2" />
           		</kendo:dataSource-filterItem>
           	</kendo:dataSource-filter>
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
    
<script>
    $("#people :checkbox").change(function(e) {
        var checked = $.map($("#people :checked"), function(checkbox) {
            return parseInt($(checkbox).val());
        });

        var filter = {
            logic: "or",
            filters: $.map(checked, function(value) {
                return {
                    operator: "eq",
                    field: "ownerId",
                    value: value
                };
            })
        };

        var scheduler = $("#scheduler").data("kendoScheduler");

        scheduler.dataSource.filter(filter);
    });
</script>
<style scoped>
#people {
    background: url(<c:url value="/resources/web/scheduler/team-schedule.png" />) transparent no-repeat;
    height: 115px;
    position: relative;
}
#alex {
    position: absolute;
    left: 404px;
    top: 81px;
}
#bob {
    position: absolute;
    left: 519px;
    top: 81px;
}
#charlie {
    position: absolute;
    left: 634px;
    top: 81px;
}
</style>
<demo:footer />