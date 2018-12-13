---
title: Dynamically Add Hierarchical Grid
description: An example on how to dynamically add hierarchy levels to the Kendo UI Grid.
type: how-to
page_title: Create Hierarchy Levels at Runtime | Kendo UI Grid
slug: grid-add-hierarchy-runtime
tags: grid, hierarchy, setoptions, runtime
ticketid: 1135018
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
  <td>Created with the 2017.3.1026 version</td>
 </tr>
</table>

## Description

How can I dynamically add hierarchy levels to the Grid?

## Solution

1. Use the [`setOptions`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/setoptions) method of the Grid.
1. In the `setOptions` properties, add the [`detailTemplate`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/detailtemplate) configuration and the [`detailInit`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/detailinit) event.

```dojo
<div id="example">
    <button id="button">Create Hierarchy</button>
    <div id="grid"></div>

    <script type="text/x-kendo-template" id="template">
        <div class="orders"></div>
    </script>

    <script>
        $(document).ready(function() {
            var element = $("#grid").kendoGrid({
                dataSource: {
                    type: "odata",
                    transport: {
                        read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Employees"
                    },
                    pageSize: 20,
                    serverPaging: true,
                    serverSorting: true
                },
                height: 550,
                sortable: true,
                pageable: false,
                columns: [{
                        field: "FirstName",
                        title: "First Name",
                        width: "120px"
                    },
                    {
                        field: "LastName",
                        title: "Last Name",
                        width: "120px"
                    },
                    {
                        field: "Country",
                        width: "120px"
                    },
                    {
                        field: "City",
                        width: "120px"
                    },
                    {
                        field: "Title"
                    }
                ]
            });

            $("#button").kendoButton({
                click: function(e) {
                    var grid = $("#grid").data("kendoGrid");
                    grid.setOptions({
                        detailTemplate: kendo.template($("#template").html()),
                        detailInit: detailInit
                    })
                }
            });

        });

        function detailInit(e) {
            var detailRow = e.detailRow;

            detailRow.find(".orders").kendoGrid({
                dataSource: {
                    type: "odata",
                    transport: {
                        read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
                    },
                    serverPaging: true,
                    serverSorting: true,
                    serverFiltering: true,
                    pageSize: 7,
                    filter: {
                        field: "EmployeeID",
                        operator: "eq",
                        value: e.data.EmployeeID
                    }
                },
                scrollable: false,
                sortable: true,
                pageable: true,
                columns: [{
                        field: "OrderID",
                        title: "ID",
                        width: "70px"
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
    <style>
        .k-detail-cell .k-tabstrip .k-content {
            padding: 0.2em;
        }

        .employee-details ul {
            list-style: none;
            font-style: italic;
            margin: 15px;
            padding: 0;
        }

        .employee-details ul li {
            margin: 0;
            line-height: 1.7em;
        }

        .employee-details label {
            display: inline-block;
            width: 90px;
            padding-right: 10px;
            text-align: right;
            font-style: normal;
            font-weight: bold;
        }
    </style>
</div>
```
