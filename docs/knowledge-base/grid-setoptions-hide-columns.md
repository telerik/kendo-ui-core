---
title: Persist Hidden Columns after setOptions Is Applied
description: An example on how to hide columns after the setOptions method is applied to the Kendo UI Grid.
type: how-to
page_title: Persist Hidden Columns after setOptions | Kendo UI Grid
slug: grid-setoptions-hide-columns
tags: grid, persist, state, columns, hide
ticketid: 1166018
res_type: kb
---

## Environment

<table>
	<tr>
		<td>Product Version</td>
		<td>2018.2.620</td>
	</tr>
	<tr>
		<td>Product</td>
		<td>Grid for Progress® Kendo UI®</td>
	</tr>
</table>


## Description

How can I persist the hidden columns after setting the options of the Grid?

## Solution

1. Handle the [`dataBound`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/databound) event.
1. In the `dataBound` event handler, based on the `columns.hidden` property, use the [`hideColumn`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/hidecolumn) method.

```dojo
<div id="example">
    <div class="box wide">
        <a href="#" class="k-button" id="save">Save State</a>
        <a href="#" class="k-button" id="load">Load State</a>
    </div>
    <div id="grid"></div>

    <script>
        $(document).ready(function() {
            $("#grid").kendoGrid({
                dataSource: {
                    type: "odata",
                    transport: {
                        read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Customers"
                    },
                    pageSize: 20
                },
                height: 550,
                columnMenu: true,
                dataBound: function(e) {
                    var grid = e.sender;
                    var columns = grid.columns;

                    columns.forEach(function(e, i) {
                        if (e.hidden === false) {
                            grid.hideColumn(e);
                        }
                    });
                },
                pageable: true,
                columns: [{
                    field: "ContactName",
                    title: "Contact Name",
                    minScreenWidth: 700,
                    width: 250
                }, {
                    field: "ContactTitle",
                    title: "Contact Title",
                    minScreenWidth: 700,
                    width: 350
                }, {
                    field: "CompanyName",
                    title: "Company Name",
                    minScreenWidth: 700,
                    width: 350
                }, {
                    field: "Country",
                    minScreenWidth: 700,
                    width: 450
                }]
            });

            var grid = $("#grid").data("kendoGrid");

            $("#save").click(function(e) {
                e.preventDefault();
                localStorage["kendo-grid-options"] = kendo.stringify(grid.getOptions());
            });

            $("#load").click(function(e) {
                e.preventDefault();
                var options = localStorage["kendo-grid-options"];
                if (options) {
                    var parsedOptions = JSON.parse(options);
                    grid.setOptions({
                        columns: parsedOptions.columns
                    });
                }
            });
        });
    </script>
</div>
```
