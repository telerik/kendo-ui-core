<%@page import="java.util.HashMap"%>
<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<c:url value="/web/grid/detailtemplate/employees/" var="transportReadUrl" />
<c:url value="/web/grid/detailtemplate/orders/" var="transportNestedReadUrl" />

<demo:header />

<%
	HashMap<String, Object> data = new HashMap<String, Object>();
	data.put("employeeId", "#=employeeId#");
%>

<kendo:grid name="grid" pageable="true" sortable="true" detailTemplate="template">
    <kendo:grid-columns>
        <kendo:grid-column title="First Name" field="firstName" />
        <kendo:grid-column title="Last Name" field="lastName" />
        <kendo:grid-column title="Country" field="country" />
        <kendo:grid-column title="City" field="city" />
        <kendo:grid-column title="Title" field="title" />
    </kendo:grid-columns>
    <kendo:dataSource pageSize="6" serverPaging="true" serverSorting="true">
        <kendo:dataSource-schema data="data" total="total"></kendo:dataSource-schema>
        <kendo:dataSource-transport>
            <kendo:dataSource-transport-read url="${transportReadUrl}" type="POST" contentType="application/json" />
        </kendo:dataSource-transport>
    </kendo:dataSource>
</kendo:grid>

<kendo:grid-detailTemplate id="template">
    <kendo:tabStrip name="tabStrip_#=employeeId#">
        <kendo:tabStrip-items>
            <kendo:tabStrip-item text="Orders" selected="true">
                <kendo:tabStrip-item-content>
                    <kendo:grid name="grid_#=employeeId#" pageable="true" sortable="true" scrollable="false">
                        <kendo:grid-columns>
                            <kendo:grid-column title="Order ID" field="orderId" />
                            <kendo:grid-column title="Ship Country" field="shipCountry" />
                            <kendo:grid-column title="Ship Address" field="shipAddress" />
                            <kendo:grid-column title="Ship Name" field="shipName" />
                        </kendo:grid-columns>
                        <kendo:dataSource pageSize="6" serverPaging="true" serverSorting="true">
                            <kendo:dataSource-schema data="data" total="total"></kendo:dataSource-schema>
                            <kendo:dataSource-transport>
                                <kendo:dataSource-transport-read url="${transportNestedReadUrl}" data="<%=data %>" 
                                    type="POST" contentType="application/json" />
                            </kendo:dataSource-transport>
                        </kendo:dataSource>
                    </kendo:grid>
                </kendo:tabStrip-item-content>
            </kendo:tabStrip-item>
            <kendo:tabStrip-item text="Contact Information">
                <kendo:tabStrip-item-content>
                    <div class='employee-details'>
                        <ul>
                            <li><label>Country:</label>#= country #</li>
                            <li><label>City:</label>#= city #</li>
                            <li><label>Address:</label>#= address #</li>
                            <li><label>Home Phone:</label>#= homePhone #</li>
                        </ul>
                    </div>
                </kendo:tabStrip-item-content>
            </kendo:tabStrip-item>
        </kendo:tabStrip-items>
    </kendo:tabStrip>
</kendo:grid-detailTemplate>
    
<style scoped="scoped">
.employee-details ul {
	list-style: none;
	font-style: italic;
	margin-bottom: 20px;
}

.employee-details label {
	display: inline-block;
	width: 90px;
	font-style: normal;
	font-weight: bold;
}
</style>

<demo:footer />
