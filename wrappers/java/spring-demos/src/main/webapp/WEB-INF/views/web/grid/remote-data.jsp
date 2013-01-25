<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>

<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<c:url value="/web/grid/remote-data/read" var="transportReadUrl" />

<demo:header />
    <kendo:grid name="grid" pageable="true" sortable="true" filterable="true">
    	<kendo:grid-scrollable/>
        <kendo:grid-columns>
            <kendo:grid-column title="Order ID" field="orderId" width="100px" filterable="false" />
            <kendo:grid-column title="Freight" field="freight" width="100px" />
            <kendo:grid-column title="Order Date" field="orderDate" format="{0:dd/MM/yyyy}" width="140px"/>
            <kendo:grid-column title="Ship Name" field="shipName" />
            <kendo:grid-column title="Ship City" field="shipCity" width="150px" />
        </kendo:grid-columns>
        <kendo:dataSource pageSize="20" serverPaging="true" serverSorting="true" serverFiltering="true" serverGrouping="true">
            <kendo:dataSource-transport>            	
                <kendo:dataSource-transport-read url="${transportReadUrl}" type="POST"  contentType="application/json"/>  
                <kendo:dataSource-transport-parameterMap>
                	function(options){return JSON.stringify(options);}
                </kendo:dataSource-transport-parameterMap>              
            </kendo:dataSource-transport>
            <kendo:dataSource-schema data="data" total="total" groups="data">
                    <kendo:dataSource-schema-model>
                        <kendo:dataSource-schema-model-fields>
                            <kendo:dataSource-schema-model-field name="orderId" type="number" />
                            <kendo:dataSource-schema-model-field name="freight" type="number" />
                            <kendo:dataSource-schema-model-field name="orderDate" type="date" />
                            <kendo:dataSource-schema-model-field name="shipName" type="string" />
                            <kendo:dataSource-schema-model-field name="shipCity" type="string" />
                        </kendo:dataSource-schema-model-fields>
                    </kendo:dataSource-schema-model>
                </kendo:dataSource-schema>
        </kendo:dataSource>
    </kendo:grid>
    <style scoped>
    	#grid .k-grid-content{
    		height:430px
    	}
    </style>
<demo:footer />
