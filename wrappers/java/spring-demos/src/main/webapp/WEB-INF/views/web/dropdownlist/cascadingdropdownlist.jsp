<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>

<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<c:url value="/web/dropdownlist/cascadingdropdownlist/categories" var="categoriesUrl" />
<c:url value="/web/dropdownlist/cascadingdropdownlist/products" var="productsUrl" />
<c:url value="/web/dropdownlist/cascadingdropdownlist/orders" var="ordersUrl" />

<demo:header />
    <div>
    <p>
        <label for="categories">Categories:</label>
        
        <kendo:dropDownList name="categories" dataTextField="categoryName" dataValueField="categoryId"
                        optionLabel="Select category...">
            <kendo:dataSource>
                <kendo:dataSource-transport>
                   <kendo:dataSource-transport-read url="${categoriesUrl}" type="POST" contentType="application/json"/>
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
                </kendo:dataSource-transport>
            </kendo:dataSource>
        </kendo:dropDownList>
    </p>
    </div>
<demo:footer />