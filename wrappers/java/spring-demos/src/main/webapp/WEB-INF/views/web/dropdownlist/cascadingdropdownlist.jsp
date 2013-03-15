<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>

<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<c:url value="/web/dropdownlist/cascadingdropdownlist/categories" var="categoriesUrl" />
<c:url value="/web/dropdownlist/cascadingdropdownlist/products" var="productsUrl" />
<c:url value="/web/dropdownlist/cascadingdropdownlist/orders" var="ordersUrl" />

<demo:header />
    <div class="demo-section">
        <h2>View Order Details</h2>
        <p>
            <label for="categories">Categories:</label>

            <kendo:dropDownList name="categories" dataTextField="categoryName" dataValueField="categoryId"
                            optionLabel="Select category...">
                <kendo:dataSource>
                    <kendo:dataSource-transport>
                       <kendo:dataSource-transport-read url="${categoriesUrl}" type="POST" contentType="application/json"/>
                       <kendo:dataSource-transport-parameterMap>
                           function(options){return JSON.stringify(options);}
                       </kendo:dataSource-transport-parameterMap>
                    </kendo:dataSource-transport>
                    <kendo:dataSource-schema data="data" total="total">
                    </kendo:dataSource-schema>
                </kendo:dataSource>
            </kendo:dropDownList>
        </p>
        <p>
            <label for="products">Products:</label>

            <kendo:dropDownList name="products" dataTextField="productName" dataValueField="productId"
                            optionLabel="Select product..." cascadeFrom="categories" autoBind="false">
                <kendo:dataSource serverFiltering="true">
                    <kendo:dataSource-transport>
                       <kendo:dataSource-transport-read url="${productsUrl}" type="POST" contentType="application/json"/>
                       <kendo:dataSource-transport-parameterMap>
                           function(options){return JSON.stringify(options);}
                       </kendo:dataSource-transport-parameterMap>
                    </kendo:dataSource-transport>
                    <kendo:dataSource-schema data="data" total="total">
                    </kendo:dataSource-schema>
                </kendo:dataSource>
            </kendo:dropDownList>
        </p>
        <p>
            <label for="orders">Orders:</label>

            <kendo:dropDownList name="orders" dataTextField="shipCity" dataValueField="orderId"
                            optionLabel="Select order..." cascadeFrom="products" autoBind="false">
                <kendo:dataSource serverFiltering="true">
                    <kendo:dataSource-transport>
                       <kendo:dataSource-transport-read url="${ordersUrl}" type="POST" contentType="application/json"/>
                       <kendo:dataSource-transport-parameterMap>
                           function(options){return JSON.stringify(options);}
                       </kendo:dataSource-transport-parameterMap>
                    </kendo:dataSource-transport>
                </kendo:dataSource>
            </kendo:dropDownList>
        </p>
        <button class="k-button" id="get">View Order</button>
    </div>
    <script>
        $(document).ready(function () {
            var categories = $("#categories").data("kendoDropDownList"),
                products = $("#products").data("kendoDropDownList"),
                orders = $("#orders").data("kendoDropDownList");

            $("#get").click(function () {
                var categoryInfo = "\nCategory: { id: " + categories.value() + ", name: " + categories.text() + " }",
                    productInfo = "\nProduct: { id: " + products.value() + ", name: " + products.text() + " }",
                    orderInfo = "\nOrder: { id: " + orders.value() + ", name: " + orders.text() + " }";

                alert("Order details:\n" + categoryInfo + productInfo + orderInfo);
            });
        });
    </script>
    <style scoped>
        .demo-section {
            width: 460px;
            padding: 30px;
        }
        .demo-section h2 {
            text-transform: uppercase;
            font-size: 1.2em;
            margin-bottom: 30px;
        }
        .demo-section label {
            display: inline-block;
            width: 120px;
            padding-right: 5px;
            text-align: right;
        }
        .demo-section .k-button {
            margin: 20px 0 0 125px;
        }
        .k-readonly
        {
            color: gray;
        }
    </style>
<demo:footer />
