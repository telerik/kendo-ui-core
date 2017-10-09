---
title: How to Display Frozen Rows in Kendo UI Grid
description: Display frozen rows in Kendo UI Grid based on a value from the model
type: troubleshooting
page_title: Render frozen rows in the Grid
slug: grid-frozen-rows
tags: grid, frozen rows, frozen, row, data item, model
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid</td>
 </tr>
 <tr>
  <td>Progress Kendo UI version</td>
  <td>2017.3.913</td>
 </tr>
</table>

## Description

I want to have frozen rows in Grid based on some condition or a value from the model.

## Possible Solution

For simple scenario where you only need to display particular rows at the top of the Grid, even after scrolling, you can clone the rendered records and append them to the header of the Grid. Following is an example with such implementation, where we are using a value from the model to determine whether or not to add the records to the header.

#### Example
````html
	<style>
		.customHeaderRowStyles td{
			background: #bde0ed!important;
			background-image: none;
		}
	</style>
<div id="example">
    <div id="grid"></div>
    <script>
    	$(document).ready(function () {
    		$("#grid").kendoGrid({
    			dataSource: {
    				type: "odata",
    				transport: {
    					read: "//demos.telerik.com/kendo-ui/service/Northwind.svc/Customers"
    				},
    				pageSize: 20
    			},
    			height: 350,
    			sortable: true,
    			dataBound: function (e) {
    				e.sender.element.find(".customHeaderRowStyles").remove();
            var items = e.sender.items();
            e.sender.element.height(e.sender.options.height);   
            items.each(function(){
              var row = $(this);
              var dataItem = e.sender.dataItem(row);
              if(dataItem.ContactTitle == "Marketing Manager"){
                  var item = row.clone();                
                  item.addClass("customHeaderRowStyles");
                  var thead = e.sender.element.find(".k-grid-header table thead");
                  thead.append(item); 
                	e.sender.element.height(e.sender.element.height() + row.height());                
                  row.hide();
              }
            })
    				
    			},
    			pageable: {
    				refresh: true,
    				pageSizes: true,
    				buttonCount: 5
    			},
    			columns: [{    				
    				field: "ContactName",
    				title: "Contact Name",
    				width: 240
    			}, {
    				field: "ContactTitle",
    				title: "Contact Title"
    			}, {
    				field: "CompanyName",
    				title: "Company Name"
    			}, {
    				field: "Country",
    				width: 150
    			}]
    		});
    	});
    </script>
</div>
````
