<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>

<demo:header />

<div class="demo-section">
    <strong>Inline data (default settings)</strong>
   <kendo:treeView name="treeview-left">
        <kendo:dataSource data="${inlineDefault}">                                      
        </kendo:dataSource>
   </kendo:treeView>
</div>

<div class="demo-section">
    <strong>Inline data</strong>
    <kendo:treeView name="treeview-right" dataTextField="<%= new String[]{\"categoryName\", \"subCategoryName\"} %>">
        <kendo:dataSource data="${inline}"> 
        	<kendo:dataSource-schema>
        		<kendo:dataSource-schema-hierarchical-model children="subCategories" />
        	</kendo:dataSource-schema>                                     
        </kendo:dataSource>
    </kendo:treeView>
</div>
 <style scoped>
	  #example {
	      text-align: center;
	  }
	
	  .demo-section {
	      display: inline-block;
	      vertical-align: top;
	      width: 220px;
	      text-align: left;
	      margin: 0 2em;
	  }
</style>
<demo:footer />
