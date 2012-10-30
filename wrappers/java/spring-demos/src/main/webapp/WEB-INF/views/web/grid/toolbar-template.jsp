<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>

<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<c:url value="/web/grid/toolbar-template/read" var="transportReadUrl" />
<c:url value="/web/grid/toolbar-template/categories" var="categoriesReadUrl" />

<demo:header />
    <kendo:grid name="grid" pageable="true">
    	<kendo:grid-toolbarTemplate>
    		<div class="toolbar">
    			<label class="category-label" for="categories">Show products by category:</label>
	    		<kendo:dropDownList name="categories" optionLabel="All" dataTextField="categoryName" 
	    				dataValueField="categoryId" autoBind="false" change="categoriesChange">
	    			<kendo:dataSource>
		    			<kendo:dataSource-transport>            	
			                <kendo:dataSource-transport-read url="${categoriesReadUrl}" />                
			            </kendo:dataSource-transport>
	    			</kendo:dataSource>    			   			    			
	    		</kendo:dropDownList>
    		</div>    		
    	</kendo:grid-toolbarTemplate>
        <kendo:grid-columns>
            <kendo:grid-column title="Product Name" field="productName" />
            <kendo:grid-column title="Unit Price" field="unitPrice" format="{0:c}" />
            <kendo:grid-column title="Units In Stock" field="unitsInStock" />
        </kendo:grid-columns>
        <kendo:dataSource pageSize="10">
            <kendo:dataSource-transport>            	
                <kendo:dataSource-transport-read url="${transportReadUrl}" type="POST" contentType="application/json"/>                
            </kendo:dataSource-transport>
            <kendo:dataSource-schema data="data" total="total">                    
            </kendo:dataSource-schema>
        </kendo:dataSource>
    </kendo:grid>
    
<script type="text/javascript">
	function categoriesChange() {	
		 var value = this.value(),
		 	 grid = $("#grid").data("kendoGrid");
		 
         if (value) {
             grid.dataSource.filter({ field: "categoryId", operator: "eq", value: parseInt(value) });
         } else {
             grid.dataSource.filter({});
         }
	}
</script>
 <style scoped="scoped">
     #grid .k-toolbar
     {
         min-height: 27px;
     }
     .category-label
     {
         vertical-align: middle;
         padding-right: .5em;
     }
     #categories
     {
         vertical-align: middle;
     }
     .toolbar {
         float: right;
         margin-right: .8em;
     }
 </style>
<demo:footer />