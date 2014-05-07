<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<c:url value="/web/grid/column-menu/read" var="transportReadUrl" />

<demo:header />
    <kendo:grid name="grid" pageable="true" sortable="true" filterable="true" columnMenu="true">
        <kendo:grid-columns>
            <kendo:grid-column title="Order ID" field="orderId" />
			<kendo:grid-column title="Ship Country" field="shipCountry" />
			<kendo:grid-column title="Ship Name" field="shipName" />   
			<kendo:grid-column title="Ship Address" field="shipAddress" />   					
        </kendo:grid-columns>
        <kendo:dataSource pageSize="10" serverPaging="true" serverSorting="true" serverFiltering="true">
            <kendo:dataSource-transport>            	
                <kendo:dataSource-transport-read url="${transportReadUrl}" type="POST"  contentType="application/json"/>
                <kendo:dataSource-transport-parameterMap>
                	<script>
	                	function parameterMap(options) { 	                		
	                		return JSON.stringify(options);	                		
	                	}
                	</script>
                </kendo:dataSource-transport-parameterMap>                
            </kendo:dataSource-transport>
            <kendo:dataSource-schema data="data" total="total">
                    <kendo:dataSource-schema-model>
                        <kendo:dataSource-schema-model-fields>
                            <kendo:dataSource-schema-model-field name="orderId" type="number" />
                            <kendo:dataSource-schema-model-field name="shipCountry" type="string" />
                            <kendo:dataSource-schema-model-field name="shipName" type="string" />
                            <kendo:dataSource-schema-model-field name="shipAddress" type="string" />
                        </kendo:dataSource-schema-model-fields>
                    </kendo:dataSource-schema-model>
                </kendo:dataSource-schema>
        </kendo:dataSource>
        <kendo:grid-pageable />
    </kendo:grid>
<demo:footer />
