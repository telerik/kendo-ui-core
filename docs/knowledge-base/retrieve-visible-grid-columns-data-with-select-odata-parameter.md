---
title: Retrieve Only the Visible Grid Columns Data with the $select oData Parameter
description: An example on how to retrieve only the visible columns data with the $select oData parameter in the Kendo UI Grid.
type: how-to
page_title: Retrieve Visible Columns Data with the $select oData Parameter | Kendo UI Grid
slug: retrieve-visible-grid-columns-data-with-select-odata-parameter
tags: retrieve, visible, columns, data, $select, odata
ticketid: 1138950
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

How can I retrieve the columns data that is visible only from the remote service by using the `$select` oData parameter?

## Solution

1. Pass additional parameters to the oData service by using the `transport.read.data` option.
1. Query the oData service to retrieve only the visible columns data.

```dojo
<div id="example">
    <div id="grid"></div>
</div>

<script>
    $(document).ready(function() {
        $("#grid").kendoGrid({
            dataSource: {
                type: "odata",
                transport: {
                    read: {
                        url: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders",
                        data: {
                        $select: getColumns
                        }
                    }
                },
                schema: {
                    model: {
                        fields: {
                            OrderID: { type: "number" },
                            Freight: { type: "number" },
                            ShipName: { type: "string" },
                            OrderDate: { type: "date" },
                            ShipCity: { type: "string" }
                        }
                    }
                },
                pageSize: 20,
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true
            },
            height: 550,
            filterable: true,
            sortable: true,
            pageable: true,
            columnMenu: true,
            columnShow: function() {
                this.dataSource.read();
            },
            columns: [{
                field:"OrderID",
                filterable: false
                },
                "Freight",
                {
                    field: "OrderDate",
                    title: "Order Date",
                    format: "{0:MM/dd/yyyy}"
                },
                {
                    field: "ShipName",
                    title: "Ship Name"
                },
                {
                    field: "ShipCity",
                    title: "Ship City"
            }]
        });

        function getColumns() {
            return $("#grid").data("kendoGrid")
                .columns
                .filter(item => !item.hidden)
                .map(function(item) {
                    return item.field
                }).join(",");
        }
    });
  </script>
```

## See Also

* [API Reference of the Grid](http://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
