---
title: Resize the Grid When a Column Is Resized
description: An example on how to change the width of the Grid after resizing any of its columns.
type: how-to
page_title: Resize the Widget after Its Column Is Resized | Kendo UI Grid
slug: grid-resize-container-on-column-resize
tags: grid, scroll, scrollbar, vertical
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

How can I resize the Grid after one of its columns is resized, so that it adjusts its width accordingly and without distorting the widths of the other columns?

## Solution

Manually change the width of the Grid-wrapping element to match the width of the table element for the data. For resizing the wrapping container, the following example utilizes the `columnResize` event.

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
```
