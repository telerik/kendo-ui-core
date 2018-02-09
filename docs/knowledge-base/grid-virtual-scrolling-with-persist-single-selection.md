---
title: How to Maintain Row Selection on Virtual Scrolling
description: An example on how to persist single selection with virtualization
type: troubleshooting
page_title: Virtual Scrolling With Persist Single Selection
slug: grid-virtual-scrolling-with-persist-single-selection
position: 
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

I want to persist selection when the virtual scrolling is used.

## Solution

This could be achieved by programmatically handling the items selection collection on the Grid [change event](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/change).

Please check the following example demonstrating this:

````html
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

                /*horizontal Grid scrollbar should appear if the browser window is shrinked too much*/
                #grid table
                {
                    min-width: 1190px;
                }

            </style>
        </div>
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

                /*horizontal Grid scrollbar should appear if the browser window is shrinked too much*/
                #grid table
                {
                    min-width: 1190px;
                }

            </style>
        </div>

````