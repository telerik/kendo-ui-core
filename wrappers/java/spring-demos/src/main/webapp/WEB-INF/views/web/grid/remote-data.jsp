<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>

<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<c:url value="/json/products/" var="transportReadUrl" />

<demo:header />
    <kendo:grid name="grid" pageable="true" sortable="true" filterable="true" groupable="true">
        <kendo:grid-columns>
            <kendo:grid-column title="Product Name" field="productName" />
            <kendo:grid-column title="Unit Price" field="unitPrice" format="{0:c}" />
            <kendo:grid-column title="Units In Stock" field="unitsInStock" />
        </kendo:grid-columns>
        <kendo:dataSource pageSize="10" serverPaging="true" serverSorting="true" serverFiltering="true" serverGrouping="true">
            <kendo:dataSource-transport parameterMap="parameterMap">
                <kendo:dataSource-transport-read url="${transportReadUrl}" type="POST"  contentType="application/json"/>                
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
    
    <script>
    function parameterMap(options, type) {        
        return JSON.stringify(options);        
    }
    </script>
    
<demo:footer />
