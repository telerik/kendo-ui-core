<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<demo:header />
    <div>
        <c:url value="/web/dropdownlist/template/read" var="readUrl" />

        <%
        String template = "<img src=\"/spring-demos/resources/web/Customers/#:data.customerId#.jpg\" alt=\"#:data.customerId#\" />" +
                "<dl>" +
                "<dt>Contact:</dt><dd>#:data.contactName#</dd>" +
                "<dt>Company:</dt><dd>#:data.companyName#</dd>" +
            "</dl>";
        %>
        
        <label for="customers">Choose customer:</label>
        
        <kendo:dropDownList name="customers" template="<%=template%>" height="300"
            dataTextField="contactName" dataValueField="customerID">
            <kendo:dataSource>
                <kendo:dataSource-transport>
                   <kendo:dataSource-transport-read url="${readUrl}" type="POST" contentType="application/json"/>
                   <kendo:dataSource-transport-parameterMap>
	                	<script>
		                	function parameterMap(options,type) { 		                		
		                		return JSON.stringify(options);		                		
		                	}
	                	</script>
	                </kendo:dataSource-transport-parameterMap>
                </kendo:dataSource-transport>
                <kendo:dataSource-schema data="data" total="total">
                </kendo:dataSource-schema>
            </kendo:dataSource>
        </kendo:dropDownList>
        
        <script>
	    $(document).ready(function() {
	        var ddl = $("#customers").data("kendoDropDownList");
	
	        // set width of the drop-down list
	        ddl.list.width(400);
	    });
	    </script>
    </div>
<demo:footer />