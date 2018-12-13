---
title: Scroll Parent Grid during Child Grid Navigation
description: An example on how to scroll the parent Kendo UI Grid while navigating through the child Kendo UI Grid.
type: how-to
page_title: Change Master-Grid Scrolling Position during Child-Grid Navigation | Kendo UI Grid
slug: grid-change-master-grid-scrolling-from-child
tags: grid, scrolling, master, child, hierarchy, navigation
ticketid: 1160388
res_type: kb
---

## Environment

<table>
	<tr>
		<td>Product Version</td>
		<td>2018.2.516</td>
	</tr>
	<tr>
		<td>Product</td>
		<td>Grid for Progress® Kendo UI®</td>
	</tr>
</table>

## Description

How can I change the scrolling position of the master Grid during the navigation of a non-scrollable child Grid?

## Solution

1. Handle the [`navigate`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/navigate) event of the child Grid.
1. In the `navigate` event handler, based on the `offset` of the element, manually scroll the container of the parent Grid.

```dojo
<div id="example">
    <div id="grid"></div>

    <script>
        $(document).ready(function() {
            var element = $("#grid").kendoGrid({
                dataSource: {
                    type: "odata",
                    transport: {
                        read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Employees"
                    },
                    pageSize: 9,
                    serverPaging: true,
                    serverSorting: true
                },
                height: 600,
                sortable: true,
                pageable: true,
                navigatable: true,
                detailInit: detailInit,
                dataBound: function() {
                    this.expandRow(this.tbody.find("tr.k-master-row").first());
                },
                columns: [{
                        field: "FirstName",
                        title: "First Name",
                        width: "110px"
                    },
                    {
                        field: "LastName",
                        title: "Last Name",
                        width: "110px"
                    },
                    {
                        field: "Country",
                        width: "110px"
                    },
                    {
                        field: "City",
                        width: "110px"
                    },
                    {
                        field: "Title"
                    }
                ]
            });
        });

        function detailInit(e) {
            $("<div/>").appendTo(e.detailCell).kendoGrid({
                dataSource: {
                    type: "odata",
                    transport: {
                        read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
                    },
                    serverPaging: true,
                    serverSorting: true,
                    serverFiltering: true,
                    pageSize: 100,
                    filter: {
                        field: "EmployeeID",
                        operator: "eq",
                        value: e.data.EmployeeID
                    }
                },
                scrollable: true,
                sortable: false,
                navigatable: true,
                navigate: function(e) {
                    var masterGrid = $("#grid").data("kendoGrid");
                    var elementOffset = e.element.offset().top;
                    var masterGridScrollContainer = masterGrid.table.parent();
                    var masterGridScrollContainerHeight = masterGridScrollContainer.height();
                    var currentScroll = masterGridScrollContainer.scrollTop();

                    if (elementOffset > masterGridScrollContainerHeight) {
                        masterGridScrollContainer.scrollTop(currentScroll + (elementOffset - masterGridScrollContainerHeight));
                    } else if (elementOffset < 48) { //48 is the row height*1.5
                        e.element[0].scrollIntoView();
                    }
                },
                pageable: true,
                columns: [{
                        field: "OrderID",
                        width: "110px"
                    },
                    {
                        field: "ShipCountry",
                        title: "Ship Country",
                        width: "110px"
                    },
                    {
                        field: "ShipAddress",
                        title: "Ship Address"
                    },
                    {
                        field: "ShipName",
                        title: "Ship Name",
                        width: "300px"
                    }
                ]
            });
        }
    </script>
</div>
```
