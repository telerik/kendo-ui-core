---
title: Horizontal Scrollbar Moving Slow
description: The Grid component horizontal scrollbar moves very slow
type: troubleshooting
page_title: Grid Slow Horizontal Scroll
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
		<td>Grid for Progress® Kendo UI®</td>
	</tr>
</table>


## Description
The horizontal scrollbar in the Grid does not behave correctly. When I click on the empty space in the scrollbar it moves very little.

## Cause\Possible Cause(s)
By default the Grid is using two event handlers to synchronize horizontal scrolling. One is for the Grid data area and one is for the headers. This is done to address some edge cases where the data cells and the header can get misaligned. This feature may cause the horizontal scrollbar to move slower and with smaller increments.

## Solution
In order to change the behavior you can detach the scroll handler for the Grid header: 

```JavaScript
$("#grid").data("kendoGrid").wrapper.find(".k-grid-header-wrap").off("scroll.kendoGrid");
```

If there are multiple Grid components on the page it is possible to iterrate through them when the page is loaded and detach the header scroll handler for each one:


```JavaScript
$.each($(".k-grid"), function (index, value) {
    $(value).data("kendoGrid").wrapper.find(".k-grid-header-wrap").off("scroll.kendoGrid");
    }
);
```

The example below illustrates the approach:

```html
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

