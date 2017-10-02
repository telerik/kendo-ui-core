---
title: How to Implement Calculated Column with Batch Editing in Kendo UI Grid
description: Calculated column in Grid with enabled Batch(InCell) editing
type: how-to
page_title: Calculated column from multiple fields in Grid with Batch edit mode
slug: grid-calculated-column-with-batch-editing
tags: grid, batch, incell, calculated
res_type: kb
---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid</td>
 </tr>
</table>


## Description

I have a Grid with Batch (InCell) edit mode and I want to display calculated value in a template column, using the values from other fields of the row.

## Solution
  
If the calculated field will not be a part of the model and the calculated value will be only visible in the Grid for the end user, you could create a template column where you could wrap the initially calculated value in an element with some class name for example (so that we can easily get reference to it later). As for changing the calculated value dynamically, we can handle the **edit** event of the Grid, calculate the new value from the updated model, get reference to the wrapping element holding the calculated value and finally, update the HTML its content. Here is an example demonstrating the implementation: 

````html
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
````

For more complex calculations, the template in the column could call a function:
````
   {template: "<span class='totalSpan'>#= calculateValue(data) #</span>"
   ...
   
   function calculateValue(dataItem){
       var total = dataItem.UnitsInStock * dataItem.UnitPrice;
       return total;
   }
````

