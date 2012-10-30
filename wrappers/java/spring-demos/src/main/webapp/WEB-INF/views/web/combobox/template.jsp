<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<demo:header />
    <div>
        <c:url value="/web/combobox/template/read" var="readUrl" />

        <%
        String template = "<img src=\"/spring-demos/resources/web/Customers/#:data.customerID#.jpg\" alt=\"#:data.customerID#\" />" +
                "<dl>" +
                "<dt>Contact:</dt><dd>#:data.contactName#</dd>" +
                "<dt>Company:</dt><dd>#:data.companyName#</dd>" +
            "</dl>";
        %>
        
        <label for="customers">Choose customer:</label>
        
        <kendo:comboBox name="customers" placeholder="type 'John' ..." template="<%=template%>" height="300"
            dataTextField="contactName" dataValueField="customerID">
            <kendo:dataSource serverFiltering="true">
                <kendo:dataSource-transport>
                   <kendo:dataSource-transport-read url="${readUrl}" type="POST" contentType="application/json"/>
                </kendo:dataSource-transport>
                <kendo:dataSource-schema data="data" total="total">
                </kendo:dataSource-schema>
            </kendo:dataSource>
        </kendo:comboBox>
        
        <script>
	    $(document).ready(function() {
	        var combobox = $("#customers").data("kendoComboBox");
	
	        // set width of the drop-down list
	        combobox.list.width(400);
	    });
	    </script>
    </div>
<demo:footer />