---
title: Scroll to the Last Grid Column
description: An example on how to scroll the last column of the Kendo UI Grid into view.
type: how-to
page_title: Scroll the Last Column into View | Kendo UI Grid
slug: grid-scroll-to-last-column
tags: kendoui, kendo, grid, column, scroll, view, move
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

How can I scroll the last column into view when a Grid with many columns is initially loaded?

## Solution

1. Handle the [`dataBound`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/databound) event of the Grid.
1. In the handler, get a reference of the last column and its offset.
1. Call the [`scrollLeft`](https://api.jquery.com/scrollleft/) method with the acquired offset.

```dojo
<div id="grid" style="width: 400px;"></div>
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
            width: 400,
            groupable: true,
            sortable: true,
            pageable: {
                refresh: true,
                pageSizes: true,
                buttonCount: 5
            },

            dataBound: onDataBoundhandler,

            columns: [{
                template: "<div class='customer-photo'" +
                    "style='background-image: url(../content/web/Customers/#:data.CustomerID#.jpg);'></div>" +
                    "<div class='customer-name'>#: ContactName #</div>",
                field: "ContactName",
                title: "Contact Name",
                width: 240
            }, {
                field: "ContactTitle",
                title: "Contact Title",
                width: 200,
            }, {
                field: "CompanyName",
                title: "Company Name",
                width: 250
            }, {
                field: "Country",
                width: 150
            }]
        });

        function onDataBoundhandler(e) {
            var grid = this;
            var numberOfColumns = grid.columns.length;
            var lastColumnField = grid.columns[numberOfColumns - 1].field;
            var lastColumnOffset = $("th[data-field='" + lastColumnField + "']").offset().left;

            grid.content.scrollLeft(lastColumnOffset);

        }
    });
</script>
```
