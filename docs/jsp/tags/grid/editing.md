---
title: Ajax Editing
---

# Editing

## Getting started

To configure Kendo Grid for JSP for editing follow these steps (using Spring MVC framework):

1.  Define a command column for the `Edit` and `Destroy` commands:

	       <kendo:grid name="grid">
		        <kendo:grid-columns>
		            <kendo:grid-column title="Product Name" field="productName" />
		            <kendo:grid-column title="Unit Price" field="unitPrice" format="{0:c}" />
		            <kendo:grid-column title="Units In Stock" field="unitsInStock" />
		            <kendo:grid-column title="Discontinued" field="discontinued" />
		            <kendo:grid-column title="&nbsp;">
		            	<kendo:grid-column-command>
		            		<kendo:grid-column-commandItem name="edit" />
		            		<kendo:grid-column-commandItem name="destroy" />
		            	</kendo:grid-column-command>
		            </kendo:grid-column>
		        </kendo:grid-columns>
		    </kendo:grid>

2.  Set the editing mode to `InLine`:

        <kendo:grid name="grid">
    		<kendo:grid-editable mode="inline"/>
	        <kendo:grid-columns>
	            <kendo:grid-column title="Product Name" field="productName" />
	            <kendo:grid-column title="Unit Price" field="unitPrice" format="{0:c}" />
	            <kendo:grid-column title="Units In Stock" field="unitsInStock" />
	            <kendo:grid-column title="Discontinued" field="discontinued" />
	            <kendo:grid-column title="&nbsp;">
	            	<kendo:grid-column-command>
	            		<kendo:grid-column-commandItem name="edit" />
	            		<kendo:grid-column-commandItem name="destroy" />
	            	</kendo:grid-column-command>
	            </kendo:grid-column>
	        </kendo:grid-columns>
	    </kendo:grid>

3.  Add the `Create` command to the grid toolbar:

        <kendo:grid name="grid">
			<kendo:grid-toolbar>
            	<kendo:grid-toolbarItem name="create"/>
	        </kendo:grid-toolbar>
    		<kendo:grid-editable mode="inline"/>
	        <kendo:grid-columns>
	            <kendo:grid-column title="Product Name" field="productName" />
	            <kendo:grid-column title="Unit Price" field="unitPrice" format="{0:c}" />
	            <kendo:grid-column title="Units In Stock" field="unitsInStock" />
	            <kendo:grid-column title="Discontinued" field="discontinued" />
	            <kendo:grid-column title="&nbsp;">
	            	<kendo:grid-column-command>
	            		<kendo:grid-column-commandItem name="edit" />
	            		<kendo:grid-column-commandItem name="destroy" />
	            	</kendo:grid-column-command>
	            </kendo:grid-column>
	        </kendo:grid-columns>
	    </kendo:grid>

4.  Specify the parameterMap and the action methods which will handle the Create, Update and Destroy operations:

   		<kendo:grid name="grid">
			<kendo:grid-toolbar>
            	<kendo:grid-toolbarItem name="create"/>
	        </kendo:grid-toolbar>
    		<kendo:grid-editable mode="inline"/>
	        <kendo:grid-columns>
	            <kendo:grid-column title="Product Name" field="productName" />
	            <kendo:grid-column title="Unit Price" field="unitPrice" format="{0:c}" />
	            <kendo:grid-column title="Units In Stock" field="unitsInStock" />
	            <kendo:grid-column title="Discontinued" field="discontinued" />
	            <kendo:grid-column title="&nbsp;">
	            	<kendo:grid-column-command>
	            		<kendo:grid-column-commandItem name="edit" />
	            		<kendo:grid-column-commandItem name="destroy" />
	            	</kendo:grid-column-command>
	            </kendo:grid-column>
	        </kendo:grid-columns>
			<kendo:dataSource pageSize="10">
            	<kendo:dataSource-transport>
	                <kendo:dataSource-transport-create url="${createUrl}" dataType="json" type="POST" contentType="application/json" />
	                <kendo:dataSource-transport-read url="${readUrl}" dataType="json" type="POST" contentType="application/json"/>
	                <kendo:dataSource-transport-update url="${updateUrl}" dataType="json" type="POST" contentType="application/json" />
	                <kendo:dataSource-transport-destroy url="${destroyUrl}" dataType="json" type="POST" contentType="application/json" />
					<kendo:dataSource-transport-parameterMap>
						<script>
							function parameterMap(options,type) { 	                		
								return JSON.stringify(options);	                		
							}
						</script>
					</kendo:dataSource-transport-parameterMap>
	            </kendo:dataSource-transport>
	        </kendo:dataSource>
	    </kendo:grid>

5.  Specify the properties of the model as well as the unique identifier (primary key):

        <kendo:grid name="grid">
			<kendo:grid-toolbar>
            	<kendo:grid-toolbarItem name="create"/>
	        </kendo:grid-toolbar>
    		<kendo:grid-editable mode="inline"/>
	        <kendo:grid-columns>
	            <kendo:grid-column title="Product Name" field="productName" />
	            <kendo:grid-column title="Unit Price" field="unitPrice" format="{0:c}" />
	            <kendo:grid-column title="Units In Stock" field="unitsInStock" />
	            <kendo:grid-column title="Discontinued" field="discontinued" />
	            <kendo:grid-column title="&nbsp;">
	            	<kendo:grid-column-command>
	            		<kendo:grid-column-commandItem name="edit" />
	            		<kendo:grid-column-commandItem name="destroy" />
	            	</kendo:grid-column-command>
	            </kendo:grid-column>
	        </kendo:grid-columns>
			<kendo:dataSource pageSize="10">
            	<kendo:dataSource-transport>
	                <kendo:dataSource-transport-create url="${createUrl}" dataType="json" type="POST" contentType="application/json" />
	                <kendo:dataSource-transport-read url="${readUrl}" dataType="json" type="POST" contentType="application/json"/>
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
6.  Implement the `Read` action method:

		@Autowired
		private ProductDao product;

		@RequestMapping(value = "/editing-inline/read", method = RequestMethod.POST)
		public @ResponseBody List<Product> read() {
			return product.getList();
		}

7.  Implement the `Create` action method:

		@RequestMapping(value = "/editing-inline/create", method = RequestMethod.POST)
    	public @ResponseBody Product create(@RequestBody Map<String, Object> model) {
        	Product target = new Product();

        	target.setProductName((String)model.get("productName"));
	        target.setUnitPrice(Double.parseDouble(model.get("unitPrice").toString()));
	        target.setUnitsInStock((int)model.get("unitsInStock"));
	        target.setDiscontinued((boolean)model.get("discontinued"));

	        product.saveOrUpdate(target);

	        return target;
	    }

8.  Implement the `Update` action method:

        @RequestMapping(value = "/editing-inline/update", method = RequestMethod.POST)
		public @ResponseBody Product update(@RequestBody Map<String, Object> model) {
	        Product target = new Product();

	        target.setProductId((int)model.get("productId"));
	        target.setProductName((String)model.get("productName"));
	        target.setUnitPrice(Double.parseDouble(model.get("unitPrice").toString()));
	        target.setUnitsInStock((int)model.get("unitsInStock"));
	        target.setDiscontinued((boolean)model.get("discontinued"));
	        target.setCategoryId((int)model.get("categoryId"));

	        product.saveOrUpdate(target);

	        return target;
	    }
9.  Implement the `Destroy` action method:

        @RequestMapping(value = "/editing-inline/destroy", method = RequestMethod.POST)
    	public @ResponseBody Product destroy(@RequestBody Map<String, Object> model) {
	        Product target = new Product();

	        target.setProductId((int)model.get("productId"));

	        product.delete(target);

	        return target;
	    }
