<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>

<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<c:url value="/web/listview/selection_read" var="transportReadUrl" />

<demo:header />
<div class="demo-section">
<kendo:listView name="listView" template="template" selectable="multiple" pageable="true">	
	<kendo:dataSource pageSize="12" serverPaging="true">
		<kendo:dataSource-transport>
			<kendo:dataSource-transport-read url="${transportReadUrl}" contentType="application/json" type="POST"/>
			 <kendo:dataSource-transport-parameterMap>
               	<script>
                	function parameterMap(options,type) {
                		return JSON.stringify(options);                		
                	}
               	</script>
               </kendo:dataSource-transport-parameterMap>
		</kendo:dataSource-transport>
		<kendo:dataSource-schema data="data" total="total"></kendo:dataSource-schema>
	</kendo:dataSource>
	<kendo:listView-dataBound>
		<script>
			function onDataBound(arg) {
		        kendoConsole.log("ListView data bound");
		    }
		</script>
	</kendo:listView-dataBound>		
	<kendo:listView-change>
		<script>
			function onChange(arg) {
		        var selected = $.map(this.select(), function(item) {
		            return $(item).text();
		        });
	
		        kendoConsole.log("Selected: " + selected.length + " item(s), [" + selected.join(", ") + "]");
		    }
		</script>
	</kendo:listView-change>
</kendo:listView>
</div>

<script type="text/x-kendo-tmpl" id="template">
    <div class="product">
        <img src="../../resources/web/foods/#=productId#.jpg" alt="#=productName# image" />
        <h3>#=productName#</h3>
    </div>
</script>

<div class="demo-section">
    <div class="console"></div>
</div>

<style scoped>
    .demo-section {
    padding: 15px;
    width: 692px;
}
.demo-section h2 {
    font-size: 1.2em;
    margin-bottom: 10px;
    text-transform: uppercase;
}
.demo-section .console {
    margin: 0;
}
.product
    {
        float: left;
        width: 220px;
        height: 110px;
        margin: 0;
        padding: 5px;
        cursor: pointer;
    }
    .product img
    {
        float: left;
        width: 110px;
        height: 110px;
    }
    .product h3
    {
        margin: 0;
        padding: 10px 0 0 10px;
        font-size: .9em;
    overflow: hidden;
    font-weight: normal;
        float: left;
        max-width: 100px;
        text-transform: uppercase;
    }
.k-pager-wrap
    {
        border-top: 0;
    }
    .k-listview:after
    {
        content: ".";
        display: block;
        height: 0;
        clear: both;
        visibility: hidden;
    }
.k-listview
    {
        padding: 0;
        min-width: 690px;
    min-height: 360px;
    }
</style>

            
<demo:footer />