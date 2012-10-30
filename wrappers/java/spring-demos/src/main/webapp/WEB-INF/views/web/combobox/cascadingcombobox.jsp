<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>

<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<c:url value="/web/combobox/cascadingcombobox/categories" var="categoriesUrl" />
<c:url value="/web/combobox/cascadingcombobox/products" var="productsUrl" />
<c:url value="/web/combobox/cascadingcombobox/orders" var="ordersUrl" />

<demo:header />
    <div>
    <p>
        <label for="categories">Categories:</label>
        
        <kendo:comboBox name="categories" dataTextField="categoryName" dataValueField="categoryId"
                        placeholder="Select category...">
            <kendo:dataSource>
                <kendo:dataSource-transport>
                   <kendo:dataSource-transport-read url="${categoriesUrl}" type="POST" contentType="application/json"/>
                </kendo:dataSource-transport>
                <kendo:dataSource-schema data="data" total="total">
                </kendo:dataSource-schema>
            </kendo:dataSource>
        </kendo:comboBox>
    </p>
    <p> 
        <label for="products">Products:</label>
        
        <kendo:comboBox name="products" dataTextField="productName" dataValueField="productID"
                        placeholder="Select product...">
            <kendo:dataSource serverFiltering="true">
                <kendo:dataSource-transport>
                   <kendo:dataSource-transport-read url="${productsUrl}" type="POST" contentType="application/json"/>
                </kendo:dataSource-transport>
                <kendo:dataSource-schema data="data" total="total">
                </kendo:dataSource-schema>
            </kendo:dataSource>
        </kendo:comboBox>
    </p>
    <p> 
        <label for="orders">Orders:</label>
        
        <kendo:comboBox name="orders" dataTextField="shipCity" dataValueField="orderID"
                        placeholder="Select order...">
            <kendo:dataSource serverFiltering="true">
                <kendo:dataSource-transport>
                   <kendo:dataSource-transport-read url="${ordersUrl}" type="POST" contentType="application/json"/>
                </kendo:dataSource-transport>
                <kendo:dataSource-schema data="data" total="total">
                </kendo:dataSource-schema>
            </kendo:dataSource>
        </kendo:comboBox>
    </p>
    </div>
<demo:footer />