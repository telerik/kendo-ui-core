---
title: Conditionally Show ColumnMenu Options per Column
description: I want to show the filter and sort options in the columnMenu conditionally
type: how-to
page_title: Showing columnMenu options for specific columns
slug: grid-conditional-columnMenu
tags: grid, columnMenu, columns
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

How to show the __columnMenu__ options for few column only and keep only the filtering options for other.

## Solution

The __columnMenu__ could be customized within the __columnMenuInit__ even per column. In the following example, we are hiding the __columnMenu__ options for few columns and we are exposing the filtering for them directly in the popup:

#### Example

```html
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
