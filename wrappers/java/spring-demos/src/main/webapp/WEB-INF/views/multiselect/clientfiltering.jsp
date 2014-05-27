<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>

<demo:header />
    <div class="demo-section">
        <h3 class="title">Select Products</h3>

        <kendo:multiSelect name="products" dataTextField="productName" dataValueField="productId" filter="startswith">
            <kendo:dataSource data="${products}"></kendo:dataSource>
        </kendo:multiSelect>
    </div>
    <style scoped>
        .demo-section {
            width: 450px;
            margin-top: 40px;
        }
    </style>
<demo:footer />
