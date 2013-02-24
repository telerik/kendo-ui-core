<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>

<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<c:url value="/web/autocomplete/remote-data/read" var="readUrl" />

<demo:header />
    <div class="demo-section">
        <label for="products">Select product:</label>
        
        <kendo:autoComplete name="products" dataTextField="productName" filter="contains" minLength="3">
            <kendo:dataSource serverFiltering="true">
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
        </kendo:autoComplete>
    </div>
    <style scoped="scoped">
        .demo-section
        {
            width: 250px;
        }
    </style>
<demo:footer />