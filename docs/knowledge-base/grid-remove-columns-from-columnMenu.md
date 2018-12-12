---
title: Remove Specific Grid Columns from ColumnMenu
description: An example on how to hide columns from the columnMenu in the Kendo UI Grid.
type: how-to
page_title: Remove Specific Column from ColumnMenu | Kendo UI Grid
slug: grid-remove-columns-from-columnmenu
tags: Grid, ColumnMenu, Columns
ticketid: 1131816
res_type: kb
---

## Environment

<table>
	<tr>
		<td>Product</td>
		<td>Grid for Progress® Kendo UI®</td>
	</tr>
</table>


## Description

How can I remove specific columns from the columnMenu of the Grid?

## Solution

Manipulate the columnMenu within the `columnMenuInit` event of the Grid&mdah;with this approach, the specific elements cannot be found based on the field name that is bound to the column, and removed from the DOM.

````dojo
        <div id="example">
            <div id="grid"></div>

            <script>
              function removeColumnsFromColumnMenu(columns, eventArg){
                var mylist = eventArg.container.find(".k-columns-item>ul li");
            		var listitems = mylist.children('li').get();
                columns.forEach(function(col){
                	mylist.find("[data-field="+ col +"]").closest("li").remove();  
                })            		
              }

            	$(document).ready(function () {
            		$("#grid").kendoGrid({
            			columnMenuInit: function (e) {
                    //here we pass an array with field names that we want removed from the columnMenu
                    removeColumnsFromColumnMenu(["OrderID", "ShipCountry"], e);            				
            			},
            			dataSource: {
            				type: "odata",
            				transport: {
            					read: "//demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
            				},
            				schema: {
            					model: {
            						fields: {
            							OrderID: { type: "number" },
            							ShipCountry: { type: "string" },
            							ShipName: { type: "string" },
            							ShipAddress: { type: "string" }
            						}
            					}
            				},
            				pageSize: 30,
            				serverPaging: true,
            				serverFiltering: true,
            				serverSorting: true
            			},
            			height: 550,
            			sortable: true,
            			filterable: true,
            			columnMenu: true,
            			pageable: true,
            			columns: [{
            				field: "OrderID",
            				title: "Order ID",
            				width: 120
            			}, {
            				field: "ShipCountry",
            				title: "Ship Country"
            			}, {
            				field: "ShipName",
            				title: "Ship Name"
            			}, {
            				field: "ShipAddress",
                    title: "Ship Address",
            				filterable: false
            			}
            			]
            		});
            	});
            </script>
        </div>
````
