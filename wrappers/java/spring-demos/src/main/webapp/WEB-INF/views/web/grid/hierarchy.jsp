<%@page import="java.util.HashMap"%>
<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<c:url value="/web/grid/employees/" var="transportReadUrl" />
<c:url value="/web/grid/orders/" var="transportNestedReadUrl" />

<demo:header />

<%                
    HashMap<String, Object> data = new HashMap<String, Object>();
    data.put("employeeId", "#=employeeId#");
%>

<kendo:grid name="grid" pageable="true" sortable="true" height="430px" detailTemplate="template"
	dataBound="dataBound">            
	<kendo:grid-columns>
		<kendo:grid-column title="First Name" field="firstName" width="110px" />
		<kendo:grid-column title="Last Name" field="lastName" width="110px" />
		<kendo:grid-column title="Country" field="country" width="110px" />
		<kendo:grid-column title="City" field="city" width="110px" />
		<kendo:grid-column title="Title" field="title" />            
	</kendo:grid-columns>
	<kendo:dataSource pageSize="6" serverPaging="true" serverSorting="true">
		<kendo:dataSource-schema data="data" total="total"></kendo:dataSource-schema>             
		<kendo:dataSource-transport>
			<kendo:dataSource-transport-read url="${transportReadUrl}" type="POST" contentType="application/json"/>
			<kendo:dataSource-transport-parameterMap>
            	<script>
             		function parameterMap(options) { 
            			return JSON.stringify(options);
             		}
            	</script>
            </kendo:dataSource-transport-parameterMap>   
		</kendo:dataSource-transport>
	</kendo:dataSource>          
</kendo:grid>
		
<kendo:grid-detailTemplate id="template">
	<kendo:grid name="grid_#=employeeId#" pageable="true" sortable="true" scrollable="false">
		<kendo:grid-columns>
			<kendo:grid-column title="Order ID" field="orderId" width="70px" />
			<kendo:grid-column title="Ship Country" field="shipCountry" width="110px" />
			<kendo:grid-column title="Ship Address" field="shipAddress" />
			<kendo:grid-column title="Ship Name" field="shipName" width="200px" />            
		</kendo:grid-columns>		
		<kendo:dataSource pageSize="5" serverPaging="true" serverSorting="true">
			<kendo:dataSource-schema data="data" total="total"></kendo:dataSource-schema>             
			<kendo:dataSource-transport>
				<kendo:dataSource-transport-read url="${transportNestedReadUrl}" data="<%=data %>" type="POST" contentType="application/json"/>
				<kendo:dataSource-transport-parameterMap>
	            	<script>
	             		function parameterMap(options) { 
	            			return JSON.stringify(options);
	             		}
	            	</script>
	            </kendo:dataSource-transport-parameterMap>
			</kendo:dataSource-transport>
		</kendo:dataSource>                           
	</kendo:grid>            
</kendo:grid-detailTemplate>  

<script>
        function dataBound() {
            this.expandRow(this.tbody.find("tr.k-master-row").first());
        }
</script>             
<demo:footer />
