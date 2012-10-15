<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>

<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<c:url value="/json/products/" var="transportReadUrl" />

<demo:header /> 
   	<kendo:grid name="grid" pageable="true" sortable="true" filterable="true">
   		<kendo:grid-columns>
   			<kendo:grid-column title="Product Name" field="productName" />
   			<kendo:grid-column title="Unit Price" field="unitPrice" format="{0:c}" />
   			<kendo:grid-column title="Units In Stock" field="unitsInStock" />
   		</kendo:grid-columns>
   		<kendo:dataSource pageSize="10" serverPaging="true" serverSorting="true">
   			<kendo:dataSource-transport>
   				<kendo:dataSource-transport-read url="${transportReadUrl}" type="POST"/>
   				<kendo:dataSource-schema data="data" total="total" />
   			</kendo:dataSource-transport>
   		</kendo:dataSource>
   	</kendo:grid>
<demo:footer />