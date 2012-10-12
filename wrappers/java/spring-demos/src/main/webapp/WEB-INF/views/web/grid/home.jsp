<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>

<demo:header />
      	<kendo:grid name="grid">
      		<kendo:grid-pageable></kendo:grid-pageable>
      		<kendo:grid-columns>
      			<kendo:grid-column title="ProductID" field="productId" />
      		</kendo:grid-columns>
      		<kendo:dataSource data="${products}" pageSize="10"></kendo:dataSource>
      	</kendo:grid>
<demo:footer />