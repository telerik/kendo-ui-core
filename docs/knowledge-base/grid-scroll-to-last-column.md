---
title: Scroll to Last Grid column
description: An example on how to scroll the last column in Kendo Grid into view.
type: how-to
page_title: Scroll last column into view | Kendo UI Grid
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

I have a grid with a lot of columns and would like to scroll the last column into view when the Grid is loaded initially.

## Solution

1. Handle the Grid [dataBound event](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/databound). 
1. In the handler get reference of the last column and its offset. 
1. Call [scrollLeft method](https://api.jquery.com/scrollleft/) with the acquired offset.


```html
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
