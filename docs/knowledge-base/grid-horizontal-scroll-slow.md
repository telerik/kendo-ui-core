---
title: The Horizontal Scrollbar of the Grid Moves Slowly
description: The horizontal scrollbar of the Kendo UI Grid moves very slowly.
type: troubleshooting
page_title: The Horizontal Scrollbar Moves Slowly | Kendo UI Grid
slug: grid-horizontal-scroll-slow
position:
tags: grid, scroll, horizontal, moving, slow, not, working, scrollbar
ticketid: 1149398
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
		<td>Progress Kendo UI Grid</td>
	</tr>
</table>


## Description

The horizontal scrollbar in the Grid does not behave correctly. When I click on the empty space in the scrollbar, it moves only little by little.

## Cause

By default, the Grid uses two event handlers to synchronize its horizontal scrolling&mdash;one for the Grid data area and the other one for the headers. This approach is implemented to address some edge cases where the data cells and the header can get misaligned. This feature may cause the horizontal scrollbar to move slower and with smaller increments.

## Solution

To change the default behavior:

1. Detach the scroll handler for the Grid header.

    **JavaScript**

        $("#grid").data("kendoGrid").wrapper.find(".k-grid-header-wrap").off("scroll.kendoGrid");
    

1. If the page contains multiple Grid components, iterate through them when the page is loaded and detach the header scroll handler for each one.

    **JavaScript**

        $.each($(".k-grid"), function (index, value) {
            $(value).data("kendoGrid").wrapper.find(".k-grid-header-wrap").off("scroll.kendoGrid");
            }
        );
    

The following example demonstrates the implementation of the suggested approach.

```dojo
<div id="grid" style="width: 600px;"></div>
<script>
    $(document).ready(function () {
        $("#grid").kendoGrid({
            dataSource: {
                type: "odata",
                transport: {
                    read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Customers"
                },
                pageSize: 20
            },
            height: 550,
            sortable: true,
            pageable: {
                refresh: true,
                pageSizes: true,
                buttonCount: 5
            },
            columns: [{
                field: "ContactName",
                title: "Contact Name",
                width: 240
            }, {
                field: "ContactTitle",
                title: "Contact Title",
                width: 400
            }, {
                field: "CompanyName",
                title: "Company Name",
                width: 500
            }, {
                field: "Country",
                width: 150
            }]
        });

        $("#grid").data("kendoGrid").wrapper.find(".k-grid-header-wrap").off("scroll.kendoGrid");
    });
</script>
```
