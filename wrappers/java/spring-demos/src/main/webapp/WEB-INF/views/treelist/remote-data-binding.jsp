<%@page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>

<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<c:url value="/treelist/read" var="transportReadUrl" />

<demo:header /> 
 
<kendo:treeList name="treelist">
	<kendo:treeList-columns>
		<kendo:treeList-column field="firstName" title="First Name" width="250"></kendo:treeList-column>
		<kendo:treeList-column field="lastName" title="Last Name" ></kendo:treeList-column>
		<kendo:treeList-column field="position" title="Position"></kendo:treeList-column>		
		<kendo:treeList-column field="extension" title="Ext" format="{0:#}"></kendo:treeList-column>		
	</kendo:treeList-columns>
	<kendo:dataSource>
             <kendo:dataSource-schema>
                <kendo:dataSource-schema-model id="employeeId">
                    <kendo:dataSource-schema-model-fields>
                    	<kendo:dataSource-schema-model-field name="employeeId" type="number" />                    	
                    	<kendo:dataSource-schema-model-field name="parentId" from="reportsTo" type="number" nullable="true"/>
                    	<kendo:dataSource-schema-model-field name="hasChildren" from="hasEmployees"/>
                        <kendo:dataSource-schema-model-field name="firstName" type="string" />
                        <kendo:dataSource-schema-model-field name="lastName" type="string" />
                        <kendo:dataSource-schema-model-field name="position" type="string" />                        
                        <kendo:dataSource-schema-model-field name="extension" type="number" />
                    </kendo:dataSource-schema-model-fields>
                </kendo:dataSource-schema-model>
            </kendo:dataSource-schema>
            <kendo:dataSource-transport>
                <kendo:dataSource-transport-read url="${transportReadUrl}" type="POST"  contentType="application/json"/>
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
  
<demo:footer />
