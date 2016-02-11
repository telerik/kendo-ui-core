---
title: Batch Editing
page_title: Batch Editing | Grid JSP Tag
description: "Apply cell editing and batch updates to the Grid JSP tag in Kendo UI."
slug: batchediting_grid_uiforjsp
position: 2
---

# Batch Editing

## Getting Started

The cell editing mode of the Grid allows the user to edit data in a way similar to popular spreadsheet programs&mdash;double-clicking a cell puts it in editing mode. Clicking outside the cell accepts the new value. All modified Grid records are updated (saved, inserted, or deleted) when the **Save changes** button is clicked.

### Configuration

Below are listed the steps for you to follow when enabling this mode for the Kendo UI Grid (using the Spring MVC framework).

**Step 1** Set the edit mode to `InCell`.

###### Example

        <kendo:grid name="grid">
			<kendo:grid-editable mode="incell"/>
	    </kendo:grid>


**Step 2** Add the `Create` and `Save` commands.

###### Example

		 <kendo:grid name="grid">
			<kendo:grid-editable mode="incell"/>
			// Command configuration -->
	        <kendo:grid-toolbar>
	            <kendo:grid-toolbarItem name="create"/>
	            <kendo:grid-toolbarItem name="save"/>
	            <kendo:grid-toolbarItem name="cancel"/>
	        </kendo:grid-toolbar>
			// <-- Command configuration
	        <kendo:grid-columns>
	            <kendo:grid-column title="Product Name" field="productName" />
	            <kendo:grid-column title="Unit Price" field="unitPrice" format="{0:c}" />
	            <kendo:grid-column title="Units In Stock" field="unitsInStock" />
	            <kendo:grid-column title="Discontinued" field="discontinued" />
	            <kendo:grid-column command="destroy" title="&nbsp;" />
	        </kendo:grid-columns>
	    </kendo:grid>

**Step 3** Specify the `parameterMap` and the action methods which will handle the `Create`, `Update` and `Destroy` operations.

###### Example

	       <kendo:grid name="grid">
				<kendo:grid-editable mode="incell"/>
		        <kendo:grid-toolbar>
		            <kendo:grid-toolbarItem name="create"/>
		            <kendo:grid-toolbarItem name="save"/>
		            <kendo:grid-toolbarItem name="cancel"/>
		        </kendo:grid-toolbar>
		        <kendo:grid-columns>
		            <kendo:grid-column title="Product Name" field="productName" />
		            <kendo:grid-column title="Unit Price" field="unitPrice" format="{0:c}" />
		            <kendo:grid-column title="Units In Stock" field="unitsInStock" />
		            <kendo:grid-column title="Discontinued" field="discontinued" />
		            <kendo:grid-column command="destroy" title="&nbsp;" />
		        </kendo:grid-columns>
		        <kendo:dataSource batch="true">
					// CRUD configuration -->
		            <kendo:dataSource-transport>
		                <kendo:dataSource-transport-create url="${createUrl}" dataType="json" type="POST" contentType="application/json" />
		                <kendo:dataSource-transport-read url="${readUrl}" dataType="json" type="POST" contentType="application/json" />
		                <kendo:dataSource-transport-update url="${updateUrl}" dataType="json" type="POST" contentType="application/json" />
		                <kendo:dataSource-transport-destroy url="${destroyUrl}" dataType="json" type="POST" contentType="application/json" />
						<kendo:dataSource-transport-parameterMap>
							<script>
								function parameterMap(options,type) {
									if(type==="read"){
										return JSON.stringify(options);
									} else {
										return JSON.stringify(options.models);
									}
								}
							</script>
						</kendo:dataSource-transport-parameterMap>
		            </kendo:dataSource-transport>
					// <-- CRUD configuration
		        </kendo:dataSource>
		    </kendo:grid>

**Step 4** Specify the property of the model which is the unique identifier (primary key).

###### Example

    	<kendo:grid name="grid">
			<kendo:grid-editable mode="incell"/>
	        <kendo:grid-toolbar>
	            <kendo:grid-toolbarItem name="create"/>
	            <kendo:grid-toolbarItem name="save"/>
	            <kendo:grid-toolbarItem name="cancel"/>
	        </kendo:grid-toolbar>
	        <kendo:grid-columns>
	            <kendo:grid-column title="Product Name" field="productName" />
	            <kendo:grid-column title="Unit Price" field="unitPrice" format="{0:c}" />
	            <kendo:grid-column title="Units In Stock" field="unitsInStock" />
	            <kendo:grid-column title="Discontinued" field="discontinued" />
	            <kendo:grid-column command="destroy" title="&nbsp;" />
	        </kendo:grid-columns>
	        <kendo:dataSource>
	            <kendo:dataSource-transport>
	                <kendo:dataSource-transport-create url="${createUrl}" dataType="json" type="POST" contentType="application/json" />
	                <kendo:dataSource-transport-read url="${readUrl}" dataType="json" type="POST" contentType="application/json" />
	                <kendo:dataSource-transport-update url="${updateUrl}" dataType="json" type="POST" contentType="application/json" />
	                <kendo:dataSource-transport-destroy url="${destroyUrl}" dataType="json" type="POST" contentType="application/json" />
	            </kendo:dataSource-transport>
				<kendo:dataSource-schema>
                	<kendo:dataSource-schema-model id="productId">
	                    <kendo:dataSource-schema-model-fields>
	                        <kendo:dataSource-schema-model-field name="productName" type="string">
	                        	<kendo:dataSource-schema-model-field-validation required="true" />
	                        </kendo:dataSource-schema-model-field>
	                        <kendo:dataSource-schema-model-field name="unitPrice" type="number">
	                        	<kendo:dataSource-schema-model-field-validation required="true" min="1" />
	                        </kendo:dataSource-schema-model-field>
	                        <kendo:dataSource-schema-model-field name="unitsInStock" type="number">
	                        	<kendo:dataSource-schema-model-field-validation required="true" min="0" />
	                        </kendo:dataSource-schema-model-field>
	                        <kendo:dataSource-schema-model-field name="discontinued" type="boolean" />
	                    </kendo:dataSource-schema-model-fields>
	                </kendo:dataSource-schema-model>
	            </kendo:dataSource-schema>
	        </kendo:dataSource>
	    </kendo:grid>

**Step 5** Enable the batch mode.

###### Example

   		<kendo:grid name="grid">
			<kendo:grid-editable mode="incell"/>
	        <kendo:grid-toolbar>
	            <kendo:grid-toolbarItem name="create"/>
	            <kendo:grid-toolbarItem name="save"/>
	            <kendo:grid-toolbarItem name="cancel"/>
	        </kendo:grid-toolbar>
	        <kendo:grid-columns>
	            <kendo:grid-column title="Product Name" field="productName" />
	            <kendo:grid-column title="Unit Price" field="unitPrice" format="{0:c}" />
	            <kendo:grid-column title="Units In Stock" field="unitsInStock" />
	            <kendo:grid-column title="Discontinued" field="discontinued" />
	            <kendo:grid-column command="destroy" title="&nbsp;" />
	        </kendo:grid-columns>
	        <kendo:dataSource batch="true">
	           <%-- ... --%>
	        </kendo:dataSource>
	    </kendo:grid>

**Step 6** Implement the `Read` action method.

###### Example

		@Autowired
		private ProductDao product;

		@RequestMapping(value = "/editing/read", method = RequestMethod.POST)
		public @ResponseBody List<Product> read() {
			return product.getList();
		}

**Step 7** Implement the `Create` action method.

###### Example

        @RequestMapping(value = "/editing/create", method = RequestMethod.POST)
    	public @ResponseBody List<Product> create(@RequestBody ArrayList<Map<String, Object>> models) {
	        List<Product> products = new ArrayList<Product>();

	        for (Map<String, Object> model : models) {
	            Product product = new Product();

	            product.setProductName((String)model.get("productName"));
	            product.setUnitPrice(Double.parseDouble(model.get("unitPrice").toString()));
	            product.setUnitsInStock((int)model.get("unitsInStock"));
	            product.setDiscontinued((boolean)model.get("discontinued"));

	            products.add(product);
	        }

	        product.saveOrUpdate(products);

	        return products;
	    }

**Step 8** Implement the `Update` action method.

###### Example

        @RequestMapping(value = "/editing/update", method = RequestMethod.POST)
    	public @ResponseBody List<Product> update(@RequestBody ArrayList<Map<String, Object>> models) {
	        List<Product> products = new ArrayList<Product>();

	        for (Map<String, Object> model : models) {
	            Product product = new Product();

	            product.setProductId((int)model.get("productId"));
	            product.setProductName((String)model.get("productName"));
	            product.setUnitPrice(Double.parseDouble(model.get("unitPrice").toString()));
	            product.setUnitsInStock((int)model.get("unitsInStock"));
	            product.setDiscontinued((boolean)model.get("discontinued"));
	            product.setCategoryId((int)model.get("categoryId"));

	            products.add(product);
	        }

	        product.saveOrUpdate(products);

	        return products;
	    }

**Step 9** Implement the `Destroy` action method.

###### Example

	    @RequestMapping(value = "/editing/destroy", method = RequestMethod.POST)
   		public @ResponseBody List<Product> destroy(@RequestBody ArrayList<Map<String, Object>> models) {
	        List<Product> products = new ArrayList<Product>();

	        for (Map<String, Object> model : models) {
	            Product product = new Product();

	            product.setProductId((int)model.get("productId"));

	            products.add(product);
	        }

	        product.delete(products);

	        return products;
	    }

## See Also

Other articles on Telerik UI for JSP and on the Grid:

* [Overview of the Grid JSP Tag]({% slug overview_grid_uiforjsp %})
* [Ajax Binding of the Grid]({% slug ajaxbinding_grid_uiforjsp %})
* [Ajax Editing of the Grid]({% slug ajaxediting_grid_uiforjsp %})
* [Overview of the Kendo UI Grid Widget]({% slug overview_kendoui_grid_widget %})
* [Telerik UI for JSP API Reference Folder](/api/jsp/autocomplete/animation)
* [Telerik UI for JSP Tags Folder]({% slug overview_autocomplete_uiforjsp %})
