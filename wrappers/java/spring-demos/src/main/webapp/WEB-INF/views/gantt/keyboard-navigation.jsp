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

    <kendo:gantt name="gantt" navigatable="true" height="400" showWorkDays="false" showWorkHours="false" snap="false">
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
    
    <div class="box">
        <div class="box-col">
            <h4>Focus</h4>
            <ul class="keyboard-legend" style="margin-bottom: 1em;">
                <li>
                    <span class="button-preview">
                        <span class="key-button leftAlign">Alt</span>
                        +
                            <span class="key-button">w</span>
                    </span>
                    <span class="button-descr">focuses the widget
                    </span>
                </li>
            </ul>

            <h4>Actions applied on Gantt's Timeline</h4>
            <ul class="keyboard-legend" style="margin-bottom: 1em;">
                <li>
                    <span class="button-preview">
                        <span class="key-button">Delete</span>
                    </span>
                    <span class="button-descr">deletes currently selected task and/or dependency
                    </span>
                </li>
            </ul>

            <h4>Actions applied on Gantt's TreeList header</h4>
            <ul class="keyboard-legend">
                <li>
                    <span class="button-preview">
                        <span class="key-button">Enter</span>
                    </span>
                    <span class="button-descr">sort by the column
                    </span>
                </li>
            </ul>
        </div>

        <div class="box-col">
            <h4>Actions applied on Gantt's TreeList data table</h4>
            <ul class="keyboard-legend">
                <li>
                    <span class="button-preview">
                        <span class="key-button wider">Arrow Keys</span>
                    </span>
                    <span class="button-descr">to navigate over the cells.
                    </span>
                </li>
                <li>
                    <span class="button-preview">
                        <span class="key-button">Enter</span>
                    </span>
                    <span class="button-descr">opens cell editor.
                    </span>
                </li>
                <li>
                    <span class="button-preview">
                        <span class="key-button">Esc</span>
                    </span>
                    <span class="button-descr">closes cell editor.
                    </span>
                </li>
                <li>
                    <span class="button-preview">
                        <span class="key-button">Space</span>
                    </span>
                    <span class="button-descr">selects currently highlighted cell's row.
                    </span>
                </li>
                <li>
                    <span class="button-preview">
                        <span class="key-button">Delete</span>
                    </span>
                    <span class="button-descr">deletes currently selected task.
                    </span>
                </li>
                <li>
                    <span class="button-preview">
                        <span class="key-button">1</span>
                        -
                        <span class="key-button">3</span>
                    </span>
                    <span class="button-descr">moves between the available views.
                    </span>
                </li>
                <li>
                    <span class="button-preview">
                        <span class="key-button">Alt Left Arrow</span>
                        /
                        <span class="key-button">Alt Right Arrow</span>
                    </span>
                    <span class="button-descr">scrolls timeline.
                    </span>
                </li>
                <li>
                    <span class="button-preview">
                        <span class="key-button">Ctrl Right Arrow</span>
                        /
                        <span class="key-button">Ctrl Left Arrow</span>
                    </span>
                    <span class="button-descr">expand/collapse summary row.
                    </span>
                </li>
            </ul>
        </div>

        <div class="box-col">
            <h4>Actions applied on 'Add Task' action DropDown</h4>
            <ul class="keyboard-legend">
                <li>
                    <span class="button-preview">
                        <span class="key-button wider leftAlign">Up Arrow</span>
                    </span>
                    <span class="button-descr">highlights previous item.
                    </span>
                </li>
                <li>
                    <span class="button-preview">
                        <span class="key-button wider leftAlign">Down Arrow</span>
                    </span>
                    <span class="button-descr">highlights next item.
                    </span>
                </li>
                <li>
                    <span class="button-preview">
                        <span class="key-button wider rightAlign">Enter</span>
                    </span>
                    <span class="button-descr">selects highlighted item.
                    </span>
                </li>
                <li>
                    <span class="button-preview">
                        <span class="key-button">Esc</span>
                    </span>
                    <span class="button-descr">closes the dropdown.
                    </span>
                </li>
            </ul>
        </div>
    </div>
    
<demo:footer />