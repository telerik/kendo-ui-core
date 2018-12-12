---
title: Show Pager on Top and Bottom
description: An example on how to show the Kendo UI Grid pager on top and bottom.
type: how-to
page_title: Duplicate Pager | Kendo UI Grid
slug: grid-show-pager-top-bottom
tags: grid, pager, duplicate, top, bottom, multiply, clone
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
  <td>Created with version 2018.1.117</td>
 </tr>
</table>

## Description

How can I show the pager in the Grid both above and below the items?

## Solution

The following example demonstrates how you can duplicate and add the Pager above the Grid items.

```dojo
<div id="grid"></div>
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
        var wrapper = $('<div class="k-pager-wrap k-grid-pager pagerTop"/>').insertBefore(grid.element.children(".k-grid-header"));
        grid.pagerTop = new kendo.ui.Pager(wrapper, $.extend({}, grid.options.pageable, { dataSource: grid.dataSource }));
        grid.element.height("").find(".pagerTop").css("border-width", "0 0 1px 0");
    });
</script>
```
