<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<demo:header />
    <c:url value="/web/multiselect/template/read" var="readUrl" />

    <%
    String itemTemplate = "<img src=\"../../resources/web/Customers/#:data.customerId#.jpg\"  alt=\"#:data.customerId#\" />" +
                          "<h3>#: data.ContactName #</h3>" +
                          "<p>#: data.CompanyName #</p>";

    String tagTemplate = "<img class=\"tag-image\" src=\"../../resources/web/Customers/#:data.customerId#.jpg\" alt=\"#:data.customerId#\" />" +
                          "#: data.ContactName #";
    %>

    <div class="demo-section">
        <h2>Select Customers</h2>

        <kendo:multiSelect name="customers" placeholder="type 'John' ..." itemTemplate="<%=itemTemplate%>" tagTemplate="<%=tagTemplate%>"
            height="300" dataTextField="contactName" dataValueField="customerID">
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
    </div>
    <div class="demo-section">
                <h2>Information</h2>
                <p>
                    Click the MultiSelect to see the customized appearance of the items.
                </p>
    </div>
    <script>
        $(document).ready(function() {
            var customers = $("#customers").data("kendoMultiSelect");
            customers.wrapper.attr("id", "customers-wrapper");
        });
    </script>
    <style scoped>
        .demo-section {
            width: 400px;
            margin: 30px auto 50px;
            padding: 30px;
        }
        .demo-section h2 {
            text-transform: uppercase;
            font-size: 1.2em;
            margin-bottom: 10px;
        }
        .tag-image {
            width: auto;
            height: 18px;
            margin-right: 5px;
            vertical-align: top;
        }
        #customers-list .k-item {
            overflow: hidden; /* clear floated images */
        }
        #customers-list img {
            -moz-box-shadow: 0 0 2px rgba(0,0,0,.4);
            -webkit-box-shadow: 0 0 2px rgba(0,0,0,.4);
            box-shadow: 0 0 2px rgba(0,0,0,.4);
            float: left;
            margin: 5px 20px 5px 0;
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
