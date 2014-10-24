<%@page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>

<demo:header /> 
 
<kendo:treeList name="treelist" height="540" >
	<kendo:treeList-columns>
		<kendo:treeList-column field="position" title="Position"></kendo:treeList-column>
		<kendo:treeList-column field="firstName" title="Name"></kendo:treeList-column>
		<kendo:treeList-column field="phone" title="Phone"></kendo:treeList-column>		
	</kendo:treeList-columns>
	<kendo:dataSource data="${employees}">  
		<kendo:dataSource-schema>
                <kendo:dataSource-schema-model id="employeeId">
                    <kendo:dataSource-schema-model-fields>
                    	<kendo:dataSource-schema-model-field name="employeeId" type="number" />                    	
                    	<kendo:dataSource-schema-model-field name="parentId" from="reportsTo" type="number" nullable="true"/>
                        <kendo:dataSource-schema-model-field name="firstName" type="string" />                        
                        <kendo:dataSource-schema-model-field name="phone" type="string" />  
                        <kendo:dataSource-schema-model-field name="position" type="string" />                                              
                    </kendo:dataSource-schema-model-fields>
                </kendo:dataSource-schema-model>
            </kendo:dataSource-schema>     
    </kendo:dataSource>        
</kendo:treeList>  
  
<demo:footer />
