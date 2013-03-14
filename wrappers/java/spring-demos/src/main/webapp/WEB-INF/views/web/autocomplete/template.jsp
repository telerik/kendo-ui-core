<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<demo:header />
        <c:url value="/web/autocomplete/template/read" var="readUrl" />

        <%
        String template = "<img src=\"/spring-demos/resources/web/Customers/#:data.customerId#.jpg\" alt=\"#:data.customerId#\" />" +
                "<dl>" +
                "<dt>Contact:</dt><dd>#:data.contactName#</dd>" +
                "<dt>Company:</dt><dd>#:data.companyName#</dd>" +
            "</dl>";
        %>

		<div class="demo-section">
            <h2>Customers</h2>
	        <kendo:autoComplete name="customers" dataTextField="contactName" placeholder="type 'John' ..." template="<%=template%>" height="370" minLength="1" style="width:400px">
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
			<p>
                Start typing to find a customer.
            </p>
        </div>

        <style scoped>
            .demo-section {
                width: 400px;
                margin: 35px auto 50px;
                padding: 30px;
            }
            .demo-section h2 {
                text-transform: uppercase;
                font-size: 1.2em;
                margin-bottom: 10px;
            }
            #customers-list .k-item {
                overflow: hidden; /* clear floated images */
            }
            #customers-list img {
                -moz-box-shadow: 0 0 2px rgba(0,0,0,.4);
                -webkit-box-shadow: 0 0 2px rgba(0,0,0,.4);
                box-shadow: 0 0 2px rgba(0,0,0,.4);
                float: left;
                margin: 5px 20px 5px 0px;
            }
            #customers-list h3 {
                margin: 30px 0 10px 0;
                font-size: 2em;
            }
            #customers-list p {
                margin: 0;
            }
        </style>

<demo:footer />
