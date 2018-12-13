---
title: Conditionally Show ColumnMenu Options per Grid Column
description: An example on how to conditionally show the filter and sort options in the columnMenu of the Kendo UI Grid.
type: how-to
page_title: Show columnMenu Options for Specific Columns | Kendo UI Grid
slug: grid-conditional-columnMenu
tags: grid, columnMenu, columns
res_type: kb
component: grid
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

How can I show the `columnMenu` options for some columns only and keep the filtering options for other columns only?

## Solution

Customize the `columnMenu` within the `columnMenuInit` event per column.

The following example demonstrates how to hide the `columnMenu` options for some of the columns and expose the filtering for them directly in the popup.

```dojo
       <div id="example">
            <div id="grid"></div>

            <script>
            	$(document).ready(function () {
            		$("#grid").kendoGrid({
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
            			columnMenuInit: function(e) {
            				var menu = e.container.find(".k-menu").data("kendoMenu");
            				var field = e.field;
                    //Only the OrderID and ShipAddress columnMenu will show Columns and Sorting options
                    //ShipCountry and ShipName will display only the filter menu (directly in the columnMenu)
            				if (field != "OrderID" && field != "ShipAddress") {                      
            					menu.element.find(">li:not(.k-filter-item)").hide();                      
                      menu.element.find(">li.k-filter-item>ul").unwrap("li").show().prev().hide();
            				}
            			},
            			height: 550,
            			sortable: true,
            			filterable: true,
            			pageable: true,
						columnMenu: true,
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
            				filterable: false
            			}
            			]
            		});
            	});
            </script>
        </div>

```
