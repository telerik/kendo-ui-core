<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>

<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<c:url value="/web/grid/selection/read" var="transportReadUrl" />

<demo:header />
    <div class="demo-section">
        <h3>Grid with multiple row selection enabled</h3>
        <kendo:grid name="rowSelection" selectable="multiple" scrollable="false" navigatable="true">
	    	<kendo:grid-pageable buttonCount="5" />	    	    
	        <kendo:grid-columns>
	            <kendo:grid-column title="Order ID" field="orderId" width="200px"  />
	            <kendo:grid-column title="Freight" field="freight" width="200px" />
	            <kendo:grid-column title="Order Date" field="orderDate" format="{0:dd/MM/yyyy}"/>
	        </kendo:grid-columns>
	        <kendo:dataSource pageSize="5" serverPaging="true" serverSorting="true" serverFiltering="true" serverGrouping="true">
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
	                        </kendo:dataSource-schema-model-fields>
	                    </kendo:dataSource-schema-model>
	                </kendo:dataSource-schema>
	        </kendo:dataSource>
	    </kendo:grid>
    </div>

    <div class="demo-section">
        <h3>Grid with multiple cell selection enabled</h3>
         <kendo:grid name="cellSelection" selectable="multiple cell" scrollable="false" navigatable="true">
	    	<kendo:grid-pageable buttonCount="5" />	    		    		
	        <kendo:grid-columns>
	            <kendo:grid-column title="Order ID" field="orderId" width="200px"  />
	            <kendo:grid-column title="Freight" field="freight" width="200px" />
	            <kendo:grid-column title="Order Date" field="orderDate" format="{0:dd/MM/yyyy}"/>
	        </kendo:grid-columns>
	        <kendo:dataSource pageSize="5" serverPaging="true" serverSorting="true" serverFiltering="true" serverGrouping="true">
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
	                        </kendo:dataSource-schema-model-fields>
	                    </kendo:dataSource-schema-model>
	                </kendo:dataSource-schema>
	        </kendo:dataSource>
	    </kendo:grid>
    </div>
    
    <style scoped="scoped">
        .demo-section {
            width: 600px;
        }
        .demo-section h3 {
            margin: 5px 0 15px 0;
            text-align: center;
        }
    </style>
    
<demo:footer />
