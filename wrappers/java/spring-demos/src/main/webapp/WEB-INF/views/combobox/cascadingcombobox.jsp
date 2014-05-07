<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>

<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<c:url value="/web/combobox/cascadingcombobox/categories" var="categoriesUrl" />
<c:url value="/web/combobox/cascadingcombobox/products" var="productsUrl" />
<c:url value="/web/combobox/cascadingcombobox/orders" var="ordersUrl" />

<demo:header />
<div class="demo-section">
    <h2>View Order Details</h2>
    <p>
        <label for="categories">Categories:</label>

        <kendo:comboBox name="categories" dataTextField="categoryName" dataValueField="categoryId" filter="contains"
                        placeholder="Select category..." style="width:300px">
            <kendo:dataSource>
                <kendo:dataSource-transport>
                   <kendo:dataSource-transport-read url="${categoriesUrl}" type="POST" contentType="application/json"/>
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
        </kendo:comboBox>
    </p>
    <p>
        <label for="products">Products:</label>

        <kendo:comboBox name="products" dataTextField="productName" dataValueField="productId" filter="contains"
                        placeholder="Select product..." cascadeFrom="categories" autoBind="false" style="width:300px">
            <kendo:dataSource serverFiltering="true">
                <kendo:dataSource-transport>
                   <kendo:dataSource-transport-read url="${productsUrl}" type="POST" contentType="application/json"/>
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
        </kendo:comboBox>
    </p>
    <p>
        <label for="orders">Orders:</label>

        <kendo:comboBox name="orders" dataTextField="shipCity" dataValueField="orderId" filter="contains"
                        placeholder="Select order..." cascadeFrom="products" autoBind="false" style="width:300px">
            <kendo:dataSource serverFiltering="true">
                <kendo:dataSource-transport>
                   <kendo:dataSource-transport-read url="${ordersUrl}" type="POST" contentType="application/json"/>
                   <kendo:dataSource-transport-parameterMap>
	                	<script>
		                	function parameterMap(options,type) {
		                		return JSON.stringify(options);
		                	}
	                	</script>
	                </kendo:dataSource-transport-parameterMap>
                </kendo:dataSource-transport>
            </kendo:dataSource>
        </kendo:comboBox>
    </p>
</div>
<script>
    $(document).ready(function () {
        var categories = $("#categories").data("kendoComboBox"),
            products = $("#products").data("kendoComboBox"),
            orders = $("#orders").data("kendoComboBox");

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
