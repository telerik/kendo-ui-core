<%@page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>

<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<c:url value="/treelist/events/create" var="createUrl" />
<c:url value="/treelist/events/read" var="readUrl" />
<c:url value="/treelist/events/update" var="updateUrl" />
<c:url value="/treelist/events/destroy" var="destroyUrl" />

<demo:header />

<kendo:treeList name="treelist" editable="true" height="540">
	<kendo:treeList-edit>
		<script>
			function onEdit(arg) {
	            var model = arg.model;
	
	            kendoConsole.log("TreeList edit: " + model.FirstName + " " + model.LastName);
	        }
		</script>
	</kendo:treeList-edit>
	
	<kendo:treeList-save>
		<script>
		function onSave(arg) {
            kendoConsole.log("TreeList save");
        }
		</script>
	</kendo:treeList-save>
	
	<kendo:treeList-remove>
		<script>
		function onRemove(arg) {
            kendoConsole.log("TreeList remove");
        }
		</script>
	</kendo:treeList-remove>
	
	<kendo:treeList-dataBound>
		<script>
		function onDataBound(arg) {
            kendoConsole.log("TreeList data bound");
        }
		</script>
	</kendo:treeList-dataBound>
	
	<kendo:treeList-dataBinding>
		<script>
		function onDataBinding(arg) {
            kendoConsole.log("TreeList data binding");
        }
		</script>
	</kendo:treeList-dataBinding>
	
	<kendo:treeList-toolbar>
		<kendo:treeList-toolbarItem name="create"/>
	</kendo:treeList-toolbar>
	<kendo:treeList-columns>
		<kendo:treeList-column field="firstName" title="First Name" width="220"></kendo:treeList-column>
		<kendo:treeList-column field="lastName" title="Last Name" width="100"></kendo:treeList-column>
		<kendo:treeList-column field="position" title="Position"></kendo:treeList-column>
		<kendo:treeList-column field="hireDate" title="Hire Date" format="{0:MMMM d, yyyy}"></kendo:treeList-column>		
		<kendo:treeList-column field="extension" title="Ext" width="140"></kendo:treeList-column>	
		<kendo:treeList-column width="200">			
			<kendo:treeList-column-command>
				<kendo:treeList-column-commandItem name="edit"></kendo:treeList-column-commandItem>				
				<kendo:treeList-column-commandItem name="destroy"></kendo:treeList-column-commandItem>
			</kendo:treeList-column-command>
		</kendo:treeList-column>	
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
                <kendo:dataSource-transport-create url="${createUrl}" dataType="json" type="POST" contentType="application/json" />
                <kendo:dataSource-transport-update url="${updateUrl}" dataType="json" type="POST" contentType="application/json" />
                <kendo:dataSource-transport-destroy url="${destroyUrl}" dataType="json" type="POST" contentType="application/json" />                
                <kendo:dataSource-transport-parameterMap>
                	<script>
	                	function parameterMap(options,type) { 	                		
	                		return JSON.stringify(options);	                		
	                	}
                	</script>
                </kendo:dataSource-transport-parameterMap>
            </kendo:dataSource-transport>
        </kendo:dataSource>        
</kendo:treeList>

<div class="box console-section">
       <h4>Console</h4>
       <div class="console"></div>
 </div>
     
<demo:footer />