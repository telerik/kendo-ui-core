<%@page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@page import="java.util.HashMap"%>
<%@page import="java.util.ArrayList"%>
<%@page import="java.util.Date"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>

<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>


<c:url value="/scheduler/pdf-export/read" var="readUrl" />
<c:url value="/scheduler/pdf-export/create" var="createUrl" />
<c:url value="/scheduler/pdf-export/update" var="updateUrl" />
<c:url value="/scheduler/pdf-export/destroy" var="destroyUrl" />
<c:url value="/scheduler/pdf-export/save" var="saveUrl" />

<%
	Date date = new SimpleDateFormat("yyyy/MM/dd").parse("2013/6/13");
	
	Date startTime = new SimpleDateFormat("yyyy/MM/dd hh:mm").parse("2013/6/13 7:00");
	
	ArrayList<HashMap<String, Object>> resources = new ArrayList<HashMap<String, Object>>();
	
	HashMap<String, Object> alex = new HashMap<String, Object>();
	alex.put("text", "Alex");
	alex.put("value", 1);
	alex.put("color", "#f8a398");
	resources.add(alex);
	HashMap<String, Object> bob = new HashMap<String, Object>();
	bob.put("text", "Bob");
	bob.put("value", 2);
	bob.put("color", "#51a0ed");
	resources.add(bob);
	HashMap<String, Object> charlie = new HashMap<String, Object>();
	charlie.put("text", "Charlie");
	charlie.put("value", 3);
	charlie.put("color", "#56ca85");
	resources.add(charlie);

%>
<demo:header />

<style scoped>
    /*
        Register the DejaVu Sans font

        We'll use it for both display and embedding in the PDF file.
        The standard PDF fonts have no support for Unicode characters.
    */
    @font-face {
      font-family: "DejaVu Sans";
      src: url("../resources/shared/styles/fonts/DejaVuSans.ttf") format("truetype");
    }
    @font-face {
      font-family: "DejaVu Sans";
      font-weight: bold;
      src: url("../resources/shared/styles/fonts/DejaVuSans-Bold.ttf") format("truetype");
    }
    @font-face {
      font-family: "DejaVu Sans";
      font-weight: bold;
      font-style: italic;
      src: url("../resources/shared/styles/fonts/DejaVuSans-BoldOblique.ttf") format("truetype");
    }
    @font-face {
      font-family: "DejaVu Sans";
      font-style: italic;
      src: url("../resources/shared/styles/fonts/DejaVuSans-Oblique.ttf") format("truetype");
    }

    /* Use the DejaVu Sans font for the Scheduler */
    .k-scheduler {
        font-family: "DejaVu Sans", "Arial", sans-serif;
    }
</style>

<script>
    // Import DejaVu Sans font for embedding
    kendo.pdf.defineFont({
        "DejaVu Sans"             : "../resources/shared/styles/fonts/DejaVuSans.ttf",
        "DejaVu Sans|Bold"        : "../resources/shared/styles/fonts/DejaVuSans-Bold.ttf",
        "DejaVu Sans|Bold|Italic" : "../resources/shared/styles/fonts/DejaVuSans-Oblique.ttf",
        "DejaVu Sans|Italic"      : "../resources/shared/styles/fonts/DejaVuSans-Oblique.ttf"
    });
</script>

<!-- Load Pako ZLIB library to enable PDF compression -->
<script src="../resources/shared/js/pako.min.js"></script>

    <kendo:scheduler name="scheduler" timezone="Etc/UTC" height="600" date="<%= date %>" startTime="<%= startTime %>">
        <kendo:scheduler-toolbar>
        	<kendo:scheduler-toolbarItem name="pdf" />
        </kendo:scheduler-toolbar>
        <kendo:scheduler-pdf proxyURL="${saveUrl}" fileName="Kendo UI Scheduler Export.pdf" />
    	<kendo:scheduler-views>
    		<kendo:scheduler-view type="day" />
    		<kendo:scheduler-view type="workWeek" selected="true" />
    		<kendo:scheduler-view type="week" />
    		<kendo:scheduler-view type="month"  />
			<kendo:scheduler-view type="agenda" />
			<kendo:scheduler-view type="timeline" />
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
<demo:footer />