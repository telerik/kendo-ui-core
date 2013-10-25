<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<demo:header />
        <c:url value="/web/autocomplete/template/read" var="readUrl" />

        <%
        String headertemplate = "<div class=\"k-widget k-header dropdown-header\">' +
            "<span class=\"first\">Photo</span>" +
            "<span class=\"last\">Contact info</span>" +
            "</div>";

        String template = "<img src=\"../../resources/web/Customers/#:data.customerId#.jpg\" alt=\"#:data.customerId#\" />" +
                "<dl>" +
                "<dt>Contact:</dt><dd>#:data.contactName#</dd>" +
                "<dt>Company:</dt><dd>#:data.companyName#</dd>" +
            "</dl>";
        %>

        <div class="demo-section">
            <h2>Customers</h2>
            <kendo:autoComplete name="customers" dataTextField="contactName" placeholder="type 'John' ..."
                headerTemplate="<%=headerTemplate%>" template="<%=template%>" height="370"
                minLength="1" style="width:400px">
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
                margin: 35px auto 50px;
                padding: 30px;
            }
            .demo-section h2 {
                text-transform: uppercase;
                font-size: 1.2em;
                margin-bottom: 10px;
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
                margin: 5px 20px 5px 0px;
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
