<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<demo:header />
        <c:url value="/web/multiselect/template/read" var="readUrl" />

        <%
        String itemTemplate = "<img src=\"/spring-demos/resources/web/Customers/#:data.customerId#.jpg\" alt=\"#:data.customerId#\" />" +
				              "<h3>#: data.ContactName #</h3>" +
					          "<p>#: data.CompanyName #</p>";
					          
        String tagTemplate = "<img class=\"tag-image\" src=\"/spring-demos/resources/web/Customers/#:data.customerId#.jpg\" alt=\"#:data.customerId#\" />" +
				              "#: data.ContactName #";
        %>
        
    <div class="demo-section">
        <h3 class="title">Select customers</h3>
        
        <kendo:multiSelect name="customers" placeholder="type 'John' ..." itenTemplate="<%=itemTemplate%>" height="300"
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
        </kendo:multiSelect>
        
        <script>
	    $(document).ready(function() {
	    	var customers = $("#customers").data("kendoMultiSelect");
            customers.wrapper.attr("id", "customers-wrapper");     
	    });
	    </script>
	    <style scoped>
           .demo-section {
               width: 450px;
               margin-top: 40px;
           }

           .tag-image {
               width: auto;
               height: 1.4em;
               margin-right: 3px;
           }

           #customers-wrapper .k-multiselect-wrap .k-input {
               height: 1.8em;
               line-height: 1.8em;
           }

           #customers-list .k-item {
               overflow: hidden; /* clear floated images */
           }

           #customers-list img {
               -moz-box-shadow: 0 0 2px rgba(0,0,0,.4);
               -webkit-box-shadow: 0 0 2px rgba(0,0,0,.4);
               box-shadow: 0 0 2px rgba(0,0,0,.4);
               float: left;
               margin: 5px 20px 5px 5px;
           }
           #customers-list h3 {
               margin: 30px 0 10px 0;
               font-size: 2em;
           }
           #customers-list p {
               margin: 0;
           }
       </style>
    </div>
<demo:footer />