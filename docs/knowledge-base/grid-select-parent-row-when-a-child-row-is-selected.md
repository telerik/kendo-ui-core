---
title: Select a parent row if any of the child rows are selected in the Grid
description: An example on how to select a parent row when any row of the child is selected in the Grid.
type: how-to
page_title: Select Parent Row when any Child Grid Row is Selected | Kendo UI Grid
slug: grid-select-parent-row-when-a-child-row-is-selected
tags: grid, selection, parent, master, child, hierarchy, checkbox, select, row, any
ticketid: 1147793
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid</td>
 </tr>
</table>


## Description

I have a hierarchical Kendo Grid with checkboxes for selection. On selection of any of the child grid items, the parent grid row must be selected. How do I select/deselect the parent grid row based on selection of child grid row selection?

## Solution

1. Add an event handler to the [`change`](/api/javascript/ui/grid/events/change) event of the child grid.
1. Use the [`select()`](/api/javascript/ui/grid/methods/select) method to check if there are any selected rows
1. Get a reference to the master row and add or remove the `k-state-selected` class if there are any selected rows in the child grid.

```
    change: function(e){
        var masterRow = this.element.closest("tr").prev();
        if(this.select().length){
            masterRow.addClass("k-state-selected");
        } else {
            masterRow.removeClass("k-state-selected");
        }
    },
```


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
                            pageSize: 6,
                            serverPaging: true,
                            serverSorting: true
                        },
                        height: 600,
                        sortable: true,
                        pageable: true,
                        detailInit: detailInit,
                        dataBound: function() {
                            this.expandRow(this.tbody.find("tr.k-master-row").first());
                        },
                        columns: [{
                                field: "FirstName",
                                title: "First Name",
                                width: "110px"
                            },{
                                field: "LastName",
                                title: "Last Name",
                                width: "110px"
                            },{
                                field: "Country",
                                width: "110px"
                            },{
                                field: "City",
                                width: "110px"
                            },{
                                field: "Title"
                            }]
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
                            pageSize: 10,
                            filter: { field: "EmployeeID", operator: "eq", value: e.data.EmployeeID }
                        },
                        scrollable: false,
                        sortable: true,
                        pageable: true,
                      	change: function(e){
                          var masterRow = this.element.closest("tr").prev();
                          if(this.select().length){
                            masterRow.addClass("k-state-selected");
                          } else {
                            masterRow.removeClass("k-state-selected");
                          }
                        },
                        columns: [
                            { selectable: true },
                            { field: "OrderID", width: "110px" },
                            { field: "ShipCountry", title:"Ship Country", width: "110px" },
                            { field: "ShipAddress", title:"Ship Address" },
                            { field: "ShipName", title: "Ship Name", width: "300px" }
                        ]
                    });
                }
            </script>
        </div>
```
