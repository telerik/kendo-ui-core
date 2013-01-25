<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>

<demo:header />
    <kendo:grid name="grid" pageable="true" sortable="true" filterable="true">
    	<kendo:grid-scrollable />    	
        <kendo:grid-columns>
            <kendo:grid-column title="Product Name" field="productName" />
            <kendo:grid-column title="Unit Price" field="unitPrice" format="{0:c}" width="130px"/>
            <kendo:grid-column title="Units In Stock" field="unitsInStock" width="130px"/>
            <kendo:grid-column title="Discontinued" field="discontinued" width="130px"/>
        </kendo:grid-columns>
        <kendo:dataSource data="${products}" pageSize="20">        
            <kendo:dataSource-schema>
                <kendo:dataSource-schema-model>
                    <kendo:dataSource-schema-model-fields>
                        <kendo:dataSource-schema-model-field name="productName" type="string" />
                        <kendo:dataSource-schema-model-field name="unitPrice" type="number" />
                        <kendo:dataSource-schema-model-field name="unitsInStock" type="number" />
                        <kendo:dataSource-schema-model-field name="discontinued" type="bool" />
                    </kendo:dataSource-schema-model-fields>
                </kendo:dataSource-schema-model>
            </kendo:dataSource-schema>
        </kendo:dataSource>
        <kendo:grid-pageable input="true" numeric="false" />
    </kendo:grid>
    <style>
    #grid .k-grid-content{
    	height: 430px; 	
    }
    </style>
<demo:footer />
