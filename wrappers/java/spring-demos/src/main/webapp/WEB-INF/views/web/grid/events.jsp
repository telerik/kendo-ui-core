<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>

<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<c:url value="/web/grid/events/read" var="transportReadUrl" />

<demo:header />

	<script>
		function onChange(arg) {
	        var selected = $.map(this.select(), function(item) {
	            return $(item).text();
	        });
	
	        kendoConsole.log("Selected: " + selected.length + " item(s), [" + selected.join(", ") + "]");
	    }
	
	    function onDataBound(arg) {
	        kendoConsole.log("Grid data bound");
	    }
	    
	    function onDataBinding(arg) {
	        kendoConsole.log("Grid data binding");
	    }
	</script>
			
    <kendo:grid name="grid" pageable="true" sortable="true" selectable="true"
    	change="onChange" dataBound="onDataBound" dataBinding="onDataBinding">
        <kendo:grid-columns>
            <kendo:grid-column title="Product Name" field="productName" />
            <kendo:grid-column title="Unit Price" field="unitPrice" format="{0:c}" />
            <kendo:grid-column title="Units In Stock" field="unitsInStock" />
        </kendo:grid-columns>
        <kendo:dataSource pageSize="10">             
            <kendo:dataSource-transport>
                <kendo:dataSource-transport-read url="${transportReadUrl}"/>
            </kendo:dataSource-transport>
        </kendo:dataSource>       
    </kendo:grid>    
    <div class="console"></div>    
<demo:footer />