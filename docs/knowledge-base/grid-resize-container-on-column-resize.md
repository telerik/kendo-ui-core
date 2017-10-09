---
title: How to resize the Kendo UI Grid when a column resized
description: Changing the width of the Grid after column resize
type: troubleshooting
page_title: Resizing the Grid after column is resized
slug: grid-resize-container-on-column-resize
tags: grid, scroll, scrollbar, vertical
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

I need the Kendo UI Grid to resize after a column is resized, so it could adjust its width accordingly, without distoring the other columns width.

## Solution

The requirement could be achieved by manually changing the width of the wrapping element of the Grid to match the width of the table element for the data. In the example below we are using the columnResize event for resizing the wrapping container.

#### Example
````html
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
            							ShipCity: { type: "string" },
            							ShipName: { type: "string" },
            							OrderDate: { type: "date" },
            							ShippedDate: { type: "date" }
            						}
            					}
            				},
            				pageSize: 10
            			},
            			height: 550,
						width: 1000,
            			sortable: true,
            			resizable: true,
            			pageable: true,
            			columnResize: function (e) {
            				e.sender.element.width(e.sender.table.width() + 17);
            			},
            			columns: [
                            {
                            	field: "OrderDate",
                            	title: "Order Date",
                            	width: 120,
                            	format: "{0:MM/dd/yyyy}"
                            },
                            {
                            	field: "ShipCountry",
                            	title: "Ship Country"
                            },
                            {
                            	field: "ShipCity",
                            	title: "Ship City"
                            },
                            {
                            	field: "ShipName",
                            	title: "Ship Name"
                            },
                            {
                            	field: "ShippedDate",
                            	title: "Shipped Date",
                            	format: "{0:MM/dd/yyyy}",
                            	width: 200
                            },
                            {
                            	field: "OrderID",
                            	title: "ID",
                            	width: 80
                            }
            			]
            		});
            	});
            </script>
        </div>
````
