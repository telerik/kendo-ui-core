<%@page import="java.util.HashMap"%>
<%@page import="java.util.Date"%>
<%@page import="java.util.List"%>
<%@page import="java.util.ArrayList"%>
<%@page import="java.util.Map"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>

<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>


<c:url value="/web/scheduler/api/read" var="readUrl" />
<c:url value="/web/scheduler/api/create" var="createUrl" />
<c:url value="/web/scheduler/api/update" var="updateUrl" />
<c:url value="/web/scheduler/api/destroy" var="destroyUrl" />

<%
	Date date = new SimpleDateFormat("yyyy/MM/dd").parse("2013/6/13");
	
	Date startTime = new SimpleDateFormat("yyyy/MM/dd hh:mm").parse("2013/6/13 7:00");
	
	List<Map<String, Object>> views = new ArrayList<Map<String, Object>>();
	
	Map<String, Object> agenda = new HashMap<String, Object>();
	
	agenda.put("text", "Agenda");
	agenda.put("value", "agenda");
	
	views.add(agenda);
	
	Map<String, Object> day = new HashMap<String, Object>();
	
	day.put("text", "Day");
	day.put("value", "day");
	
	views.add(day);
	
	Map<String, Object> month = new HashMap<String, Object>();
	
	month.put("text", "Month");
	month.put("value", "month");
	
	views.add(month);
	
	Map<String, Object> week = new HashMap<String, Object>();
	
	week.put("text", "Week");
	week.put("value", "week");
	
	views.add(week);
%>

<demo:header />
    <kendo:scheduler name="scheduler" timezone="Etc/UTC" height="400" date="<%= date %>" startTime="<%= startTime %>">
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
        <p>
            <label>Current Date:</label>
            <kendo:datePicker name="date" value="<%= date %>">
            	<kendo:datePicker-change>
            	<script>
            	function() {
            		var scheduler = $("#scheduler").data("kendoScheduler");
         		   	scheduler.date(this.value());
        		}
            	</script>
            	</kendo:datePicker-change>
            </kendo:datePicker>
        </p>
        <p>
            <label>Current View:</label>
            <kendo:dropDownList name="views" value="week" dataTextField="text" dataValueField="value">
            	<kendo:dataSource data="<%= views %>" />
            	<kendo:dropDownList-change>
            	<script>
            	function() {
            		var scheduler = $("#scheduler").data("kendoScheduler");
         		   	scheduler.view(this.value());
        		}
            	</script>
            	</kendo:dropDownList-change>
            </kendo:dropDownList>
        </p>
    </div>
<demo:footer />