<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>

<demo:header />
   	<kendo:grid name="grid" pageable="true" groupable="true" sortable="true">
   		<kendo:grid-columns>
   			<kendo:grid-column title="Product Name" field="productName" />
   			<kendo:grid-column title="Unit Price" field="unitPrice" />
   			<kendo:grid-column title="Units In Stock" field="unitsInStock" />
   		</kendo:grid-columns>
   		<kendo:dataSource data="${products}" pageSize="10" />
   	</kendo:grid>
<demo:footer />