<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<demo:header />
    <div>
        <c:url value="/web/dropdownlist/template/read" var="readUrl" />

        <%
        String template = "<img src='<c:url value=\"/resources/web/Customers/\"/>/#:data.customerId#.jpg' alt='#:data.customerId#' />" +
                "<dl>" +
                "<dt>Contact:</dt><dd>#:data.contactName#</dd>" +
                "<dt>Company:</dt><dd>#:data.companyName#</dd>" +
            "</dl>";
        %>

        <div class="demo-section">
            <h2>Customers</h2>
            <kendo:dropDownList name="customers" template="<%=template%>" height="300"
                dataTextField="contactName" dataValueField="customerId" style="width:400px">
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
        </div>

        <style scoped>
            .demo-section {
                width: 400px;
                padding: 30px;
            }
            .demo-section h2 {
                text-transform: uppercase;
                font-size: 1.2em;
                margin-bottom: 10px;
            }
            #titles-list .k-item {
                overflow: hidden; /* clear floated images */
            }
            #titles-list img {
                -moz-box-shadow: 0 0 2px rgba(0,0,0,.4);
                -webkit-box-shadow: 0 0 2px rgba(0,0,0,.4);
                box-shadow: 0 0 2px rgba(0,0,0,.4);
                float: left;
                margin: 5px 20px 5px 0;
            }
            #titles-list h3 {
                margin: 30px 0 10px 0;
                font-size: 2em;
            }
            #titles-list p {
                margin: 0;
            }
        </style>
    </div>
<demo:footer />
