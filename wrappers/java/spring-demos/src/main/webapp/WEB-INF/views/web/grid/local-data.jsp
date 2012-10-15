<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>

<demo:header /> 
   	<kendo:grid name="grid" pageable="true" sortable="true" filterable="true">
   		<kendo:grid-columns>
   			<kendo:grid-column title="Product Name" field="productName" />
   			<kendo:grid-column title="Unit Price" field="unitPrice" format="{0:c}" />
   			<kendo:grid-column title="Units In Stock" field="unitsInStock" />
   		</kendo:grid-columns>
   		<kendo:dataSource data="${products}" pageSize="10" />
   		<kendo:grid-pageable input="true" numeric="false" />
   	</kendo:grid>
<demo:footer />