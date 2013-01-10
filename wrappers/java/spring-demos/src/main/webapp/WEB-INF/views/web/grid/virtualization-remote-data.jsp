<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>

<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<c:url value="/web/grid/virtualization-remote-data/read" var="transportReadUrl" />

<demo:header />
    <kendo:grid name="grid" sortable="true" height="200">
    	<kendo:grid-scrollable virtual="true"/>
        <kendo:grid-columns>
            <kendo:grid-column title="OrderID" field="orderId" />
            <kendo:grid-column title="CustomerID" field="customerId" />
            <kendo:grid-column title="Ship Name" field="shipName" />            
            <kendo:grid-column title="Ship City" field="shipCity" />
        </kendo:grid-columns>
        <kendo:dataSource pageSize="100" serverPaging="true" serverSorting="true">
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
            <kendo:dataSource-schema data="data" total="total" groups="data">
                    <kendo:dataSource-schema-model>
                        <kendo:dataSource-schema-model-fields>
                            <kendo:dataSource-schema-model-field name="productName" type="string" />
                            <kendo:dataSource-schema-model-field name="unitPrice" type="number" />
                            <kendo:dataSource-schema-model-field name="unitsInStock" type="number" />
                        </kendo:dataSource-schema-model-fields>
                    </kendo:dataSource-schema-model>
                </kendo:dataSource-schema>
        </kendo:dataSource>
    </kendo:grid>
<demo:footer />
