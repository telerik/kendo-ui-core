<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<demo:header />
    <div>
        <c:url value="/web/combobox/template/read" var="readUrl" />

        <%
        String template = "<img src='/spring-demos/resources/web/Customers/#:data.customerId#.jpg' alt='#:data.customerId#' />" +
                "<dl>" +
                "<dt>Contact:</dt><dd>#:data.contactName#</dd>" +
                "<dt>Company:</dt><dd>#:data.companyName#</dd>" +
            "</dl>";
        %>
        
        <label for="customers">Select customer:</label>
        
        <kendo:comboBox name="customers" template="<%=template%>" height="300"
            dataTextField="contactName" dataValueField="customerID">
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
        </kendo:comboBox>
        
        <script>
	    $(document).ready(function() {
	        var combobox = $("#customers").data("kendoComboBox");
	
	        // set width of the drop-down list
	        combobox.list.width(400);
	    });
	    </script>
    </div>
    <style scoped>
	    #customers-list .k-item {
	        overflow: hidden; /* clear floated images */
	    }
	
	    #customers-list img {
	        box-shadow: 0 0 4px rgba(255,255,255,.7);
	        float: left;
	        margin: 5px;
	    }
	
	    #customers-list dl {
	        margin-left: 85px;
	    }
	
	    #customers-list dt,
	    #customers-list dd {
	        margin: 0;
	        padding: 0;
	    }
	
	    #customers-list dt {
	        font-weight: bold;
	        padding-top: .5em;
	    }
	
	    #customers-list dd {
	        padding-bottom: .3em;
	    }
	</style>
<demo:footer />