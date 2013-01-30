<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>

<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<c:url value="/web/grid/virtualization-remote-data/read" var="transportReadUrl" />

<demo:header />
    <kendo:grid name="grid" sortable="true" height="430px">
    	<kendo:grid-scrollable virtual="true"/>
        <kendo:grid-columns>
            <kendo:grid-column title="Order ID" field="orderId" width="60px" />
            <kendo:grid-column title="Customer ID" field="customerId" width="90px" />
            <kendo:grid-column title="Ship Name" field="shipName" width="220px" />   
            <kendo:grid-column title="Ship Address" field="shipAddress" width="280px" />           
            <kendo:grid-column title="Ship City" field="shipCity" width="110px" />
            <kendo:grid-column title="Ship Country" field="shipCountry" width="110px" />
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
                            <kendo:dataSource-schema-model-field name="orderId" type="number" />
                            <kendo:dataSource-schema-model-field name="customerId" type="string" />
                            <kendo:dataSource-schema-model-field name="shipName" type="string" />
                            <kendo:dataSource-schema-model-field name="shipAddress" type="string" />
                            <kendo:dataSource-schema-model-field name="shipCity" type="string" />
                            <kendo:dataSource-schema-model-field name="shipCountry" type="string" />
                        </kendo:dataSource-schema-model-fields>
                    </kendo:dataSource-schema-model>
                </kendo:dataSource-schema>
        </kendo:dataSource>
    </kendo:grid>
<demo:footer />
