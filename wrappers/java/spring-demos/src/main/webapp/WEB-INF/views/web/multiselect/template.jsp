<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<demo:header />
    <c:url value="/web/multiselect/template/read" var="readUrl" />

    <%
    String headertemplate = "<div class=\"k-widget k-header dropdown-header\">' +
                            "<span class=\"first\">Photo</span>" +
                            "<span class=\"last\">Contact info</span>" +
                            "</div>";

    String itemTemplate = "<img src=\"../../resources/web/Customers/#:data.customerId#.jpg\"  alt=\"#:data.customerId#\" />" +
                          "<h3>#: data.ContactName #</h3>" +
                          "<p>#: data.CompanyName #</p>";

    String tagTemplate = "<img class=\"tag-image\" src=\"../../resources/web/Customers/#:data.customerId#.jpg\" alt=\"#:data.customerId#\" />" +
                          "#: data.ContactName #";
    %>

    <div class="demo-section">
        <h2>Select Customers</h2>

        <kendo:multiSelect name="customers" placeholder="type 'John' ..."
            headerTemplate="<%=headerTemplate%>" itemTemplate="<%=itemTemplate%>" tagTemplate="<%=tagTemplate%>"
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
    <style>
        .dropdown-header {
            overflow:hidden;
            font-size: 1.3em;
            padding: 5px 2px;
            margin: -2px -2px 0;
            border-width: 0 0 1px;
        }

        .dropdown-header .first {
            width: 65px;
            margin-left:4px;
            display: block;
            float: left;
            text-align: left;
        }

        .dropdown-header .last {
            margin-left: 22px;
            float: left;
        }

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
        #customers-list {
            padding-bottom: 30px;
        }
        #customers-list .k-item {
            overflow: hidden; /* clear floated images */
        }
        #customers-list img {
            -moz-box-shadow: 0 0 2px rgba(0,0,0,.4);
            -webkit-box-shadow: 0 0 2px rgba(0,0,0,.4);
            box-shadow: 0 0 2px rgba(0,0,0,.4);
            float: left;
            width: 70px;
            height: 70px;
            margin: 5px 20px 5px 0;
        }
        #customers-list h3 {
            margin: 20px 0 5px 0;
            font-size: 1.6em;
        }
        #customers-list p {
            margin: 0;
        }
    </style>
<demo:footer />
