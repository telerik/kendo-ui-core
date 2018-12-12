---
title: Remove Trailing Space When Resizing Grid Columns
description: An example on how to fill the empty space when the columns in the Kendo UI Grid are resized.
type: how-to
page_title: Remove Empty Space on Resizing | Kendo UI Grid
slug: grid-remove-trailing-space-resize
tags: grid, resize, column, empty, space, blank, trailing, size, zero, width
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

How can I avoid the rendering of the blank space after the last column when the columns are resized to less than the width of a resizable Grid?

## Solution

Add an empty column to the Grid. You can manually calculate its width, so that it fills the available space when the columns are resized. If the columns are wider than the Grid, the empty column is hidden.

```dojo
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
