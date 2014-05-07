<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>

<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<c:url value="/web/grid/column-reordering/read" var="transportReadUrl" />

<demo:header />

    <kendo:grid name="grid" pageable="true" sortable="true" height="430px" reorderable="true" resizable="true">
    	<kendo:grid-scrollable/>
        <kendo:grid-columns>
            <kendo:grid-column title="Order Date" field="orderDate" format="{0:MM/dd/yyyy}" width="110px"/>
            <kendo:grid-column title="Ship Country" field="shipCountry" width="110px" />
            <kendo:grid-column title="Ship City" field="shipCity" width="110px" />
            <kendo:grid-column title="Ship Name" field="shipName" width="200px" />
            <kendo:grid-column title="Shipped Date" field="shippedDate" format="{0:MM/dd/yyyy}" />
            <kendo:grid-column title="ID" field="orderId" width="60px" />
        </kendo:grid-columns>
        <kendo:dataSource pageSize="15" serverPaging="true" serverSorting="true">
            <kendo:dataSource-transport>            	
                <kendo:dataSource-transport-read url="${transportReadUrl}" type="POST" contentType="application/json"/>  
                <kendo:dataSource-transport-parameterMap>
                	function(options){return JSON.stringify(options);}
                </kendo:dataSource-transport-parameterMap>              
            </kendo:dataSource-transport>
            <kendo:dataSource-schema data="data" total="total">
                    <kendo:dataSource-schema-model>
                        <kendo:dataSource-schema-model-fields>
                            <kendo:dataSource-schema-model-field name="orderId" type="number" />
                            <kendo:dataSource-schema-model-field name="shipCountry" type="string" />
                            <kendo:dataSource-schema-model-field name="shipName" type="string" />
                            <kendo:dataSource-schema-model-field name="shipCity" type="string" />  
                            <kendo:dataSource-schema-model-field name="shippedDate" type="date" />
                            <kendo:dataSource-schema-model-field name="orderDate" type="date" />                          
                        </kendo:dataSource-schema-model-fields>
                    </kendo:dataSource-schema-model>
                </kendo:dataSource-schema>
        </kendo:dataSource>
    </kendo:grid>
    
<demo:footer />
