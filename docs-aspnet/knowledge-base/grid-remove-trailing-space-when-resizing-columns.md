---
title: Remove Trailing Space When Resizing Grid Columns
description: How can I avoid the rendering of the blank space after the last column when the columns are resized to less than the width of a resizable Grid?
type: how-to
page_title: Remove Trailing Space When Resizing Grid Columns
slug: grid-remove-trailing-space-when-resizing-columns
tags: aspnet, mvc, grid, remove, avoid, trailing, spaces, blank, resizing, columns
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Grid for Progress® Telerik® UI for {{ site.product_short }} </td>
 </tr>
</table>

## Description

How can I avoid the rendering of the blank space after the last column when the columns are resized to less than the width of a resizable Grid?

## Solution 

Add an empty column to the Grid. You can manually calculate its width, so that it fills the available space when the columns are resized. If the columns are wider than the Grid, the empty column is hidden.

```Grid.cshtml

@(Html.Kendo().Grid<MyGrid.Models.OrderViewModel>()
    .Name("grid")
    .Pageable()
    .Scrollable()
    .HtmlAttributes(new { style = "height:430px; width: 750px;" })
    .Columns(columns =>
    {
        columns.Bound(o => o.OrderDate).Width(110).Format("{0:MM/dd/yyyy}");
        columns.Bound(o => o.ShipCity).Width(110);
        columns.Bound(o => o.ShipName).Width(200);
        columns.Bound(o => o.Freight).Width(200);
        columns.Bound(o => o.OrderID).Width(60).Title("ID");
        columns.Bound("").ClientTemplate("&nbsp");
    })
    .Events(ev=>ev.DataBound("onDataBound").ColumnResize("onColumnResize"))
    .DataSource(dataSource => dataSource
        .Ajax()
        .PageSize(15)
        .Read(read => read.Action("Orders_Read", "Grid"))
     )
    .Resizable(resize => resize.Columns(true))
)

```
```script.js

    function getMasterColumnsWidth(tbl) {
        var result = 0;
        tbl.children("colgroup").find("col").not(":last").each(function (idx, element) {
            result += parseInt($(element).outerWidth() || 0, 10);
        });

        return result;
    }
    function onDataBound(){
        adjustLastColumn()
    }
    function onColumnResize(){
        adjustLastColumn()
    }
    function adjustLastColumn() {
        var grid = $("#grid").data("kendoGrid");
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

```
