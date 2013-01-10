<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>

<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<c:url value="/web/grid/selection/read" var="transportReadUrl" />

<demo:header />
    <kendo:grid name="grid" pageable="true" selectable="multiple">
        <kendo:grid-columns>
            <kendo:grid-column title="Product Name" field="productName" />
            <kendo:grid-column title="Unit Price" field="unitPrice" format="{0:c}" />
            <kendo:grid-column title="Units In Stock" field="unitsInStock" />
        </kendo:grid-columns>
        <kendo:dataSource pageSize="5" serverPaging="true">
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
            <kendo:dataSource-schema data="data" total="total" />
        </kendo:dataSource>
    </kendo:grid>
    
    <kendo:grid name="grid2" pageable="true" selectable="multiple cell">
        <kendo:grid-columns>
            <kendo:grid-column title="Product Name" field="productName" />
            <kendo:grid-column title="Unit Price" field="unitPrice" format="{0:c}" />
            <kendo:grid-column title="Units In Stock" field="unitsInStock" />
        </kendo:grid-columns>
        <kendo:dataSource pageSize="5" serverPaging="true">
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
            <kendo:dataSource-schema data="data" total="total" />
        </kendo:dataSource>
    </kendo:grid>
    
<demo:footer />
