<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>

<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<c:url value="/web/multiselect/remote-data/read" var="readUrl" />

<demo:header />
    <div class="demo-section">
        <h3 class="title">Select Products</h3>
        
        <kendo:multiSelect name="products" dataTextField="productName" dataValueField="productId" filter="startswith">
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
    <style scoped>
        .demo-section {
            width: 450px;
            margin-top: 40px;
        }
    </style>
<demo:footer />