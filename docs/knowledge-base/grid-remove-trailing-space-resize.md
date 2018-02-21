---
title: Remove Trailing Space When Resizing Grid Columns
description: An example on how to fill empty space when resizing columns in Kendo UI Grid.
type: how-to
page_title: Remove empty space in Grid on resize | Kendo UI Grid
slug: grid-remove-trailing-space-resize
tags: grid, resize, column, empty, space, blank, trailing, size
ticketid: 1084792
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

I have a Grid with resizable columns. When the columns are resized to less than the Grid width there is blank space after the last column.

## Solution

To remove the empty space that can be observed when columns are resized you can add empty column to the Grid. The width for it can be calculated manually so it fills the available space when columns are resized. 

If the columns are wider than the Grid the empty column would be hidden.


```html
<style>
    .k-grid {
        width: 700px;
    }
</style>

<div id="grid1"></div>

<script>
    function getMasterColumnsWidth(tbl) {
        var result = 0;
        tbl.children("colgroup").find("col").not(":last").each(function (idx, element) {
            result += parseInt($(element).outerWidth() || 0, 10);
        });

        return result;
    }

    function adjustLastColumn() {
        var grid = $("#grid1").data("kendoGrid");
        var contentDiv = grid.wrapper.children(".k-grid-content");
        var masterHeaderTable = grid.thead.parent();
        var masterBodyTable = contentDiv.children("table");
        var gridDivWidth = contentDiv.width() - kendo.support.scrollbar();

        masterHeaderTable.width("");
        masterBodyTable.width("");

        var headerWidth = getMasterColumnsWidth(masterHeaderTable),
            lastHeaderColElement = grid.thead.parent().find("col").last(),
            lastDataColElement = grid.tbody.parent().children("colgroup").find("col").last(),
            delta = parseInt(gridDivWidth, 10) - parseInt(headerWidth, 10);

        if (delta > 0) {
            delta = Math.abs(delta);
            lastHeaderColElement.width(delta);
            lastDataColElement.width(delta);
        } else {
            lastHeaderColElement.width(0);
            lastDataColElement.width(0);
        }

        contentDiv.scrollLeft(contentDiv.scrollLeft() - 1);
        contentDiv.scrollLeft(contentDiv.scrollLeft() + 1);
    }


    $("#grid1").kendoGrid({
        dataSource: {
            type: "odata",
            transport: {
                read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Employees"
            },
            pageSize: 6,
            serverPaging: true,
            serverSorting: true
        },
        height: 430,
        pageable: true,
        resizable: true,
        columnResize: adjustLastColumn,
        dataBound: adjustLastColumn,
        columns: [{
            field: "FirstName",
            title: "First Name",
            width: "100px"
        }, {
            field: "LastName",
            title: "Last Name",
            width: "150px"
        }, {
            field: "Country",
            width: "100px"
        }, {
            field: "City",
            width: "100px"
        }, {
            field: "Title",
            width: "200px"
        }, {
            template: "&nbsp;"
        }]
    });
</script>
```
