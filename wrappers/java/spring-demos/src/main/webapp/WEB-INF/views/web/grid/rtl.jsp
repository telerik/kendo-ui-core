<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>

<demo:header />
	<div class="k-rtl">
	    <kendo:grid name="grid" pageable="true" sortable="true" height="300">
	        <kendo:grid-columns>
	            <kendo:grid-column title="Product Name" field="productName" />
	            <kendo:grid-column title="Unit Price" field="unitPrice" format="{0:c}" />
	            <kendo:grid-column title="Units In Stock" field="unitsInStock" />
	            <kendo:grid-column title="Discontinued" field="discontinued" />
	        </kendo:grid-columns>
	        <kendo:dataSource data="${products}" pageSize="15">        
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
	    </kendo:grid>
    </div>
<demo:footer />
