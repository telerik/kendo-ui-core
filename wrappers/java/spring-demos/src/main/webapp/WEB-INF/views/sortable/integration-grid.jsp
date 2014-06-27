<%@page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>

<demo:header />
    <kendo:grid name="grid" scrollable="false">	
        <kendo:grid-columns>
            <kendo:grid-column title="Product Name" field="productName" />
            <kendo:grid-column title="Unit Price" field="unitPrice" format="{0:c}" width="130px"/>
            <kendo:grid-column title="Units In Stock" field="unitsInStock" width="130px"/>
            <kendo:grid-column title="Discontinued" field="discontinued" width="130px"/>
        </kendo:grid-columns>
        <kendo:dataSource data="${products}" pageSize="16">
            <kendo:dataSource-schema>
                <kendo:dataSource-schema-model>
                    <kendo:dataSource-schema-model-fields>
                        <kendo:dataSource-schema-model-field name="productName" type="string" />
                        <kendo:dataSource-schema-model-field name="unitPrice" type="number" />
                        <kendo:dataSource-schema-model-field name="unitsInStock" type="number" />
                        <kendo:dataSource-schema-model-field name="discontinued" type="boolean" />
                    </kendo:dataSource-schema-model-fields>
                </kendo:dataSource-schema-model>
            </kendo:dataSource-schema>
        </kendo:dataSource>
    </kendo:grid>

	<kendo:sortable name="#grid" filter="table > tbody > tr" hint="noHint"
		placeholder="placeholder" container="#grid tbody" cursor="move" change="onChange"></kendo:sortable>
		
	<script>
		var noHint = $.noop;
	
	    function placeholder(element) {
	        return element.clone().addClass("k-state-hover").css("opacity", 0.65);
	    }
	
	    function onChange(e) {
	        var grid = $("#grid").data("kendoGrid"),
	            skip = grid.dataSource.skip(),
	            oldIndex = e.oldIndex + skip,
	            newIndex = e.newIndex + skip,
	            data = grid.dataSource.data(),
	            dataItem = grid.dataSource.getByUid(e.item.data("uid"));
	
	        grid.dataSource.remove(dataItem);
	        grid.dataSource.insert(newIndex, dataItem);
	    }
	</script>
	
    <style>
         .k-grid tbody tr {
             cursor: move;
         }
    </style>
    
<demo:footer />
