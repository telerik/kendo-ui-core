---
title: Persist Single-Row Selection on Virtual Scrolling in Grid
description: An example on how to persist the single-row selection functionality of the Kendo UI Grid when you use it together with virtualization.
type: how-to
page_title: Persist Single Row Selection with Virtual Scrolling | Kendo UI Grid
slug: grid-virtual-scrolling-with-persist-single-selection
tags: grid, selection, virtual
ticketid: 1139830
res_type: kb
---

## Environment

<table>
	<tr>
		<td>Product Version</td>
		<td>2018.1 117</td>
	</tr>
	<tr>
		<td>Product</td>
		<td>Grid for Progress® Kendo UI®</td>
	</tr>
</table>

## Description

When the user selects a row on the first page, scrolls to the second page, and selects a row, the Grid has two selected items.

* How can I persist the single-row selection when the virtual scrolling functionality of the Grid is used?
* How can I ensure I always have only one selected row when using the virtually scrollable Grid?

## Solution

Programmatically handle the collection of item selection on the [`change`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/change) event of the Grid.

````dojo
    <div id="example">
            <div id="grid"></div>
            <script>
                $(document).ready(function() {
                    $("#grid").kendoGrid({
                        dataSource: {
                            type: "odata",
                            serverPaging: true,
                            serverSorting: true,
                            pageSize: 100,
                            transport: {
                                read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
                            },
                          	schema: {
                               model: {
                                  id:"OrderID"
                                }
                        	}
                        },
                        height: 543,
                        scrollable: {
                            virtual: true
                        },
                        change: function(e) {
    					  var selectedRows = this.select();
    					  var dataItem = this.dataItem(selectedRows[0]);
   						  e.sender._selectedIds= {};
                          e.sender._selectedIds[ dataItem.OrderID ]= true;
  						},
                        selectable:true,
                      	persistSelection:true,
                        sortable: true,
                        columns: [
                            { field: "OrderID", title: "Order ID", width: 110 },
                            { field: "CustomerID", title: "Customer ID", width: 130},
                            { field: "ShipName", title: "Ship Name", width: 280 },
                            { field: "ShipAddress", title: "Ship Address" },
                            { field: "ShipCity", title: "Ship City", width: 160 },
                            { field: "ShipCountry", title: "Ship Country", width: 160 }
                        ]
                    });
                });
            </script>
            <style>

                /*A horizontal Grid scrollbar appears if the browser window is shrunk too much.*/
                #grid table
                {
                    min-width: 1190px;
                }

            </style>
    </div>
```
