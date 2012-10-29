<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>

<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<c:url value="/web/combobox/remote-data/read" var="readUrl" />

<demo:header />
    <div>
        <label for="products">Choose product:</label>
        
        <kendo:comboBox name="products" dataTextField="productName" dataValueField="productId" filter="startswith">
            <kendo:dataSource serverFiltering="false">
                <kendo:dataSource-transport>
                   <kendo:dataSource-transport-read url="${readUrl}" type="POST" contentType="application/json"/>
                </kendo:dataSource-transport>
                <kendo:dataSource-schema data="data" total="total">
                </kendo:dataSource-schema>
            </kendo:dataSource>
        </kendo:comboBox>
    </div>
<demo:footer />