<%@page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>

<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<c:url value="/treelist/api/create" var="createUrl" />
<c:url value="/treelist/api/read" var="readUrl" />
<c:url value="/treelist/api/update" var="updateUrl" />
<c:url value="/treelist/api/destroy" var="destroyUrl" />

<demo:header />

<div class="box">
	<div class="box-col">
		<h4>Selection</h4>
		<ul class="options">
			<li><input type="text" value="0" id="selectRow"
				class="k-textbox" />
				<button class="selectRow k-button">Select row</button></li>
			<li>
				<button class="clearSelection k-button">Clear selected rows</button>
			</li>
		</ul>
	</div>
	<div class="box-col">
		<h4>Expand / Collapse</h4>
		<ul class="options">
			<li><input type="text" value="0" id="groupRow" class="k-textbox" />
				<button class="toggleGroup k-button">Collapse/Expand group</button>
			</li>
		</ul>
	</div>
</div>

<script>
 $(document).ready(function () {
     $(".clearSelection").click(function () {
         $("#treelist").data("kendoTreeList").clearSelection();
     });

     var selectRow = function (e) {
         if (e.type != "keypress" || kendo.keys.ENTER == e.keyCode) {
             var treelist = $("#treelist").data("kendoTreeList"),
                 rowIndex = $("#selectRow").val(),
                 row = treelist.content.find("tr:visible").eq(rowIndex);

             treelist.select(row);
         }
     };

     var toggleGroup = function (e) {
         if (e.type != "keypress" || kendo.keys.ENTER == e.keyCode) {
             var treelist = $("#treelist").data("kendoTreeList"),
                 rowIndex = $("#groupRow").val(),
                 row = treelist.content.find("tr:visible").eq(rowIndex);

             if (row.has(".k-i-collapse").length) {
                 treelist.collapse(row);
             } else {
                 treelist.expand(row);
             }
         }
     };


     $(".selectRow").click(selectRow);
     $("#selectRow").keypress(selectRow);

     $(".toggleGroup").click(toggleGroup);
     $("#groupRow").keypress(toggleGroup);
 });
</script>

<kendo:treeList name="treelist" height="540" selectable="true">		
	<kendo:treeList-columns>
		<kendo:treeList-column field="firstName" title="First Name" width="220"></kendo:treeList-column>
		<kendo:treeList-column field="lastName" title="Last Name" width="100"></kendo:treeList-column>
		<kendo:treeList-column field="position" title="Position"></kendo:treeList-column>
		<kendo:treeList-column field="hireDate" title="Hire Date" format="{0:MMMM d, yyyy}"></kendo:treeList-column>		
		<kendo:treeList-column field="extension" title="Ext" width="140"></kendo:treeList-column>			
	</kendo:treeList-columns>	
	<kendo:dataSource >
             <kendo:dataSource-schema>
                <kendo:dataSource-schema-model id="employeeId">
                    <kendo:dataSource-schema-model-fields>
                    	<kendo:dataSource-schema-model-field name="employeeId" type="number" editable="false" nullable="false"/>                    	
                    	<kendo:dataSource-schema-model-field name="parentId" from="reportsTo" type="number" nullable="true"/>
                    	<kendo:dataSource-schema-model-field name="reportsTo" type="number" nullable="true"/>
                        <kendo:dataSource-schema-model-field name="firstName" type="string">
                        	<kendo:dataSource-schema-model-field-validation required="true" />
                        </kendo:dataSource-schema-model-field>
                        <kendo:dataSource-schema-model-field name="lastName" type="string">
	                        <kendo:dataSource-schema-model-field-validation required="true" />
                        </kendo:dataSource-schema-model-field>
                        <kendo:dataSource-schema-model-field name="position" type="string" />
                        <kendo:dataSource-schema-model-field name="phone" type="string" />
                        <kendo:dataSource-schema-model-field name="hireDate" type="date" />
                        <kendo:dataSource-schema-model-field name="extension" type="number" >
                        	<kendo:dataSource-schema-model-field-validation required="true" min="0"/>
                        </kendo:dataSource-schema-model-field>
                    </kendo:dataSource-schema-model-fields>
                </kendo:dataSource-schema-model>
            </kendo:dataSource-schema>
            <kendo:dataSource-transport>                
                <kendo:dataSource-transport-read url="${readUrl}" dataType="json" type="POST" contentType="application/json"/>                                
            </kendo:dataSource-transport>
        </kendo:dataSource>        
</kendo:treeList>
     
<demo:footer />