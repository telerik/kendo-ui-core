<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<demo:header />
    <div>
        <c:url value="/web/autocomplete/template/read" var="readUrl" />

        <%
        String template = "<img src=\"/spring-demos/resources/web/Customers/#:data.customerID#.jpg\" alt=\"#:data.customerID#\" />" +
                "<dl>" +
                "<dt>Contact:</dt><dd>#:data.contactName#</dd>" +
                "<dt>Company:</dt><dd>#:data.companyName#</dd>" +
            "</dl>";
        %>
        
        <label for="customers">Choose customer:</label>
        
        <kendo:autoComplete name="customers" dataTextField="contactName" placeholder="type 'John' ..." template="<%=template%>" height="300">
            <kendo:dataSource serverFiltering="true">
                <kendo:dataSource-transport>
                   <kendo:dataSource-transport-read url="${readUrl}" type="POST" contentType="application/json"/>
                   <kendo:dataSource-transport-parameterMap>
	                	<script>
		                	function parameterMap(options) {
		                		return JSON.stringify(options);	
		                	}
	                	</script>
	                </kendo:dataSource-transport-parameterMap>
                </kendo:dataSource-transport>
                <kendo:dataSource-schema data="data" total="total">
                </kendo:dataSource-schema>
            </kendo:dataSource>
        </kendo:autoComplete>
        
        <script>
	    $(document).ready(function() {
	        var autocomplete = $("#customers").data("kendoAutoComplete");
	
	        // set width of the drop-down list
	        autocomplete.list.width(400);
	    });
</script>
    </div>
    <style scoped="scoped">
        .k-autocomplete
        {
            width: 250px;
        }
    </style>
<demo:footer />