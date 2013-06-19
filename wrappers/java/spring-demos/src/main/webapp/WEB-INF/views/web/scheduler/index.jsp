<%@page import="java.util.HashMap"%>
<%@page import="java.util.ArrayList"%>
<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>

<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@page import="java.util.*" %>

<c:url value="/web/scheduler/tasks/" var="transportReadUrl" />
<%
	java.text.SimpleDateFormat sdf = new java.text.SimpleDateFormat("yyyy/MM/dd");
	Date date = sdf.parse("2013/6/13");
	
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
    <kendo:scheduler name="scheduler" timezone="Etc/UTC" height="600" date="<%= date %>">
    	<kendo:scheduler-views>
    		<kendo:scheduler-view type="day" />
    		<kendo:scheduler-view type="week" />
    		<kendo:scheduler-view type="month" />
    		<kendo:scheduler-view type="agenda" />
    	</kendo:scheduler-views>
    	<kendo:scheduler-resources>
    		<kendo:scheduler-resource field="ownerId" title="Owner">
    			<kendo:dataSource data="<%= resources %>" />
    		</kendo:scheduler-resource>
    	</kendo:scheduler-resources>
        <kendo:dataSource batch="true">
             <kendo:dataSource-schema data="data" total="total">
                <kendo:dataSource-schema-model id="taskId">
                     <kendo:dataSource-schema-model-fields>
                         <kendo:dataSource-schema-model-field name="taskId" type="number" />
                         <kendo:dataSource-schema-model-field name="title" type="string" />
                         <kendo:dataSource-schema-model-field name="description" type="string" />
                         <kendo:dataSource-schema-model-field name="isAllDay" type="boolean" />
                         <kendo:dataSource-schema-model-field name="ownerId" type="number" defaultValue="1" />
                         <kendo:dataSource-schema-model-field name="start" type="date" />
                         <kendo:dataSource-schema-model-field name="end" type="date" />
                    </kendo:dataSource-schema-model-fields>
                </kendo:dataSource-schema-model>
            </kendo:dataSource-schema>
            <kendo:dataSource-transport>
                <kendo:dataSource-transport-read url="${transportReadUrl}" type="POST" contentType="application/json"/>
                <kendo:dataSource-transport-parameterMap>
                	function(options){return JSON.stringify(options);}
                </kendo:dataSource-transport-parameterMap>              
            </kendo:dataSource-transport>
        </kendo:dataSource>
    </kendo:scheduler>
<demo:footer />