---
title: Implement Calculated Columns with Batch Editing in Grids
description: An example on how to implement a calculated column in a Kendo UI Grid for jQuery with enabled Batch (InCell) editing.
type: how-to
page_title: Implement Calculated Columns from Multiple Fields in a Grid with the Batch Edit Mode Enabled | Kendo UI Grid for jQuery
slug: grid-calculated-column-with-batch-editing
tags: grid, batch, incell, calculated
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid</td>
 </tr>
</table>

## Description

How can I display a calculated value in a template column of a Grid in the batch (InCell) edit mode by using values from other fields of the row?

## Solution

If the calculated field will not be part of the model and if only the calculated value will be visible in the Grid for the end user:

1. Create a template column.  
1. In the template column, wrap the initially calculated value in an element with, for example, a class name, so that you can refer to it later.

To change the calculated value dynamically:

1. Handle the `edit` event of the Grid.
1. Calculate the new value from the updated model.
1. Get a reference to the wrapping element which holds the calculated value.
1. Update the HTML content.

```dojo
<div id="example">
    <div id="grid"></div>

    <script>
    	$(document).ready(function () {
    		var crudServiceBaseUrl = "//demos.telerik.com/kendo-ui/service",
                dataSource = new kendo.data.DataSource({
                	transport: {
                        		read: {
                        			url: crudServiceBaseUrl + "/Products",
                        			dataType: "jsonp"
                        		},
                        		update: {
                        			url: crudServiceBaseUrl + "/Products/Update",
                        			dataType: "jsonp"
                        		},
                        		destroy: {
                        			url: crudServiceBaseUrl + "/Products/Destroy",
                        			dataType: "jsonp"
                        		},
                        		create: {
                        			url: crudServiceBaseUrl + "/Products/Create",
                        			dataType: "jsonp"
                        		},
                        		parameterMap: function (options, operation) {
                        			if (operation !== "read" && options.models) {
                        				return { models: kendo.stringify(options.models) };
                        			}
                        		}
                        	},
                        	batch: true,
                        	pageSize: 20,
                        	schema: {
                        		model: {
                        			id: "ProductID",
                        			fields: {
                        				ProductID: { editable: false, nullable: true },
                        				UnitPrice: { type: "number", validation: { required: true, min: 1 } },
                        				UnitsInStock: { type: "number", validation: { min: 0, required: true } }
                        			},
                        		}
                        	}
                        });

            		$("#grid").kendoGrid({
            			dataSource: dataSource,
            			save: function (e) {
            				if (e.values.hasOwnProperty("UnitPrice") ||
							  	 e.values.hasOwnProperty("UnitsInStock")) {
            					var totalSpan = e.container.closest("TR").find(".totalSpan");
            					if (e.values.hasOwnProperty("UnitPrice")) {
            						totalSpan.html(e.values.UnitPrice * e.model.UnitsInStock);
            					}
            					else {
            						totalSpan.html(e.values.UnitsInStock * e.model.UnitPrice);
            					}
            				}
            			},
            			navigatable: true,
            			pageable: true,
            			height: 550,
            			toolbar: ["create", "save", "cancel"],
            			columns: [
                            { field: "UnitPrice", title: "Unit Price", format: "{0:c}", width: 120 },
                            { field: "UnitsInStock", title: "Units In Stock", width: 120 },
                            { /*field: "Total",*/ title: "Total", width: 100, template: "<span class='totalSpan'>#= UnitsInStock * UnitPrice #</span>", editable: false }],
            			editable: true
            		});
            	});
            </script>
        </div>
```

For more complex calculations, set the template in the column to call a function.

```
   {template: "<span class='totalSpan'>#= calculateValue(data) #</span>"
   ...

   function calculateValue(dataItem){
       var total = dataItem.UnitsInStock * dataItem.UnitPrice;
       return total;
   }
```
