---
title: Define Checkbox Filtering with Search Box in Grid
description: An example on how to show a multi-check filtering with a search box in the Kendo UI Grid.
type: how-to
page_title: Display Search with Multi-Check Filtering | Kendo UI Grid
slug: grid-multicheck-filtering-search-box
tags: grid, multicheck, filtering, search box
ticketid:
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
  <td>Created with the 2017.3.1018 version</td>
 </tr>
</table>

## Description

How can I show a search box when the checkbox filtering of a Kendo UI Grid is enabled?

## Solution

1. Set the [`columns.filterable.multi`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/columns.filterable.multi) configuration to `true`.
1. Set the [`columns.filterable.search`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/columns.filterable.search) configuration to `true`.

```dojo
<div id="example">
    <div id="grid"></div>

    <script>
        $(document).ready(function() {
            $("#grid").kendoGrid({
                dataSource: {
                    type: "odata",
                    transport: {
                        read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
                    },
                    schema: {
                        model: {
                            fields: {
                                OrderID: {
                                    type: "number"
                                },
                                ShipCountry: {
                                    type: "string"
                                },
                                ShipName: {
                                    type: "string"
                                },
                                ShipAddress: {
                                    type: "string"
                                }
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
                groupable: true,
                columns: [{
                    field: "OrderID",
                    title: "Order ID",
                    width: 120,
                    filterable: {
                        multi: true,
                        search: true
                    },

                }, {
                    field: "ShipCountry",
                    title: "Ship Country",
                    filterable: {
                        multi: true,
                        search: true
                    }
                }, {
                    field: "ShipName",
                    title: "Ship Name",
                    filterable: {
                        multi: true,
                        search: true
                    }
                }, {
                    field: "ShipAddress",
                    filterable: false,
                    filterable: {
                        multi: true,
                        search: true
                    }
                }]
            });
        });
    </script>
</div>
```
