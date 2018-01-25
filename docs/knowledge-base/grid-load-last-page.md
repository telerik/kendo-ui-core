---
title: Load Grid on Last Page
description: An example on how to show the last page in the Kendo UI Grid.
type: how-to
page_title: Show Last Page by Default | Kendo UI Grid
slug: grid-load-last-page
tags: grid, pager, page
ticketid: 1149264
res_type: kb
---

## Environment
<table>
	<tr>
		<td>Product Version</td>
		<td>2017.1 117</td>
	</tr>
	<tr>
		<td>Product</td>
		<td>Grid for Progress® Kendo UI®</td>
	</tr>
</table>


## Description

How can I make the Kendo UI Grid show the last page by default?

## Solution

To show the last page:

1. Handle the first [`dataBound`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/databound) event of the Grid.
1. In the event handler:
	1. Use the [`data`](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource#methods-data) method of the `dataSource` to get the length of the items.
	1. Use the [`pageSize`](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource#methods-pageSize) method of the `dataSource` to get the current page size.
	1. Divide these numbers, parse, and increment the result.
    1. Use the final result to set the new `pageSize`. 

    ```html
    <div id="example">
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
                    groupable: true,
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
                        title: "Contact Title"
                    }, {
                        field: "CompanyName",
                        title: "Company Name"
                    }, {
                        field: "Country",
                        width: 150
                    }]
                });

                var grid = $("#grid").data("kendoGrid");
                grid.one("dataBound", function(e) {
                    var dataSource = e.sender.dataSource;
                    var items = dataSource.data().length;
                    var pageSize = dataSource.pageSize();
                    var pageNum = parseInt(items / pageSize) + 1;

                    dataSource.page(pageNum);
                });

            });
        </script>
    </div>

    <style type="text/css">
        .customer-photo {
            display: inline-block;
            width: 32px;
            height: 32px;
            border-radius: 50%;
            background-size: 32px 35px;
            background-position: center center;
            vertical-align: middle;
            line-height: 32px;
            box-shadow: inset 0 0 1px #999, inset 0 0 10px rgba(0, 0, 0, .2);
            margin-left: 5px;
        }

        .customer-name {
            display: inline-block;
            vertical-align: middle;
            line-height: 32px;
            padding-left: 3px;
        }
    </style>
    ```