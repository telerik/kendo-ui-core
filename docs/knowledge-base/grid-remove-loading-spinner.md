---
title: Hide the Grid Loading Spinner
description: An example on how to remove the loading indicator in the Kendo UI Grid.
type: how-to
page_title: Remove the Loading Icon | Kendo UI Grid for jQuery
slug: grid-remove-loading-spinner
tags: grid, spinner, loading
ticketid: 1138280
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
  <td>Created with the 2017.3.1026 version</td>
 </tr>
</table>

## Description

How can I remove the loading spinner from the Kendo UI Grid?

## Solution

1. Use a jQuery selector to get the `div` with the `k-loading-image` class.
1. Use the [`hide`](https://api.jquery.com/hide/) jQuery method.

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
                                Freight: {
                                    type: "number"
                                },
                                ShipName: {
                                    type: "string"
                                },
                                OrderDate: {
                                    type: "date"
                                },
                                ShipCity: {
                                    type: "string"
                                }
                            }
                        }
                    },
                    pageSize: 1000,
                    serverPaging: true,
                    serverFiltering: true,
                    serverSorting: true,
                    requestStart: function(e) {
                        setTimeout(function(e) {
                            $(".k-loading-image").hide();
                        })
                    }
                },
                height: 550,
                filterable: true,
                sortable: true,
                pageable: true,
                columns: [{
                        field: "OrderID",
                        filterable: false
                    },
                    "Freight",
                    {
                        field: "OrderDate",
                        title: "Order Date",
                        format: "{0:MM/dd/yyyy}"
                    }, {
                        field: "ShipName",
                        title: "Ship Name"
                    }, {
                        field: "ShipCity",
                        title: "Ship City"
                    }
                ]
            });
        });
    </script>
</div>
```
