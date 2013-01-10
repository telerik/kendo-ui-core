<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>

<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<c:url value="/web/grid/editing-inline/create" var="createUrl" />
<c:url value="/web/grid/editing-inline/read" var="readUrl" />
<c:url value="/web/grid/editing-inline/update" var="updateUrl" />
<c:url value="/web/grid/editing-inline/destroy" var="destroyUrl" />


<demo:header />
    <kendo:grid name="grid" pageable="true" sortable="true" scrollable="true" navigatable="true">
    	<kendo:grid-editable mode="inline"/>
        <kendo:grid-toolbar>
            <kendo:grid-toolbarItem name="create"/>
        </kendo:grid-toolbar>
        <kendo:grid-columns>
            <kendo:grid-column title="Product Name" field="productName" />
            <kendo:grid-column title="Unit Price" field="unitPrice" format="{0:c}" />
            <kendo:grid-column title="Units In Stock" field="unitsInStock" />
            <kendo:grid-column title="Discontinued" field="discontinued" />
            <kendo:grid-column title="&nbsp;" >
            	<kendo:grid-column-command>
            		<kendo:grid-column-commandItem name="edit" />
            		<kendo:grid-column-commandItem name="destroy" />
            	</kendo:grid-column-command>
            </kendo:grid-column>
        </kendo:grid-columns>
        <kendo:dataSource pageSize="10">
            <kendo:dataSource-transport>
                <kendo:dataSource-transport-create url="${createUrl}" dataType="json" type="POST" contentType="application/json" />
                <kendo:dataSource-transport-read url="${readUrl}" dataType="json" type="POST" contentType="application/json"/>
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
            <kendo:dataSource-schema>
                <kendo:dataSource-schema-model id="productId">
                    <kendo:dataSource-schema-model-fields>
                        <kendo:dataSource-schema-model-field name="productName" type="string">
                        	<kendo:dataSource-schema-model-field-validation required="true" />
                        </kendo:dataSource-schema-model-field>
                        <kendo:dataSource-schema-model-field name="unitPrice" type="number">
                        	<kendo:dataSource-schema-model-field-validation required="true" min="1" />
                        </kendo:dataSource-schema-model-field>
                        <kendo:dataSource-schema-model-field name="unitsInStock" type="number">
                        	<kendo:dataSource-schema-model-field-validation required="true" min="0" />
                        </kendo:dataSource-schema-model-field>
                        <kendo:dataSource-schema-model-field name="discontinued" type="boolean" />
                    </kendo:dataSource-schema-model-fields>
                </kendo:dataSource-schema-model>
            </kendo:dataSource-schema>
        </kendo:dataSource>
    </kendo:grid>    
<demo:footer />
