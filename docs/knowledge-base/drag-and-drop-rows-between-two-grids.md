---
title: Drag and Drop Rows between Grids
page_title: Drag and Drop Rows Between Grids | Kendo UI Grid for jQuery
description: "An example on how to drag and drop rows between two Kendo UI Grids for jQuery."
previous_url: /controls/data-management/grid/how-to/drag-and-drop-rows-between-two-grids, /aspne-mvc/controls/data-management/grid/how-to/drag-and-drop-rows-between-two-grids, /controls/data-management/grid/how-to/various/drag-and-drop-rows-between-two-grids
slug: howto_dragand_drop_rows_between_twogrids_grid
tags: grid, drag, drop, rows, between
component: grid
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid for jQuery</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How can I drag and drop rows between two Kendo UI Grids for jQuery?

## Solution

The following example demonstrates how to drag and drop rows between two Kendo UI Grids.

```dojo
    <div id="grid1"></div>
    <br /><br /><br />
    <div id="grid2"></div>
    <script>
      $(document).ready(function () {
        var dataSource1 = new kendo.data.DataSource({
          data: [
            { "ID": 1, "Name": "James" },
            { "ID": 2, "Name": "John" },
            { "ID": 3, "Name": "Jane" },
          ],
          pageSize: 5
        });

        var dataSource2 = new kendo.data.DataSource({
          data: [
            { "ID": 4, "Name": "Alex" },
            { "ID": 5, "Name": "Allen" },
            { "ID": 6, "Name": "Anton" },
          ],
          pageSize: 5
        });


        var grid1 = $("#grid1").kendoGrid({
          dataSource: dataSource1,
          columns: [
            { field: "ID" },
            { field: "Name" }
          ]
        }).data("kendoGrid");

        var grid2 = $("#grid2").kendoGrid({
          dataSource: dataSource2,
          columns: [
            { field: "ID" },
            { field: "Name" }
          ]
        }).data("kendoGrid");


        $(grid1.element).kendoDraggable({
          filter: "tr",
          hint: function (e) {
            var item = $('<div class="k-grid k-widget" style="background-color: DarkOrange; color: black;"><table><tbody><tr>' + e.html() + '</tr></tbody></table></div>');
            return item;
          },
          group: "gridGroup1",
        });


        $(grid2.element).kendoDraggable({
          filter: "tr",
          hint: function (e) {
            var item = $('<div class="k-grid k-widget" style="background-color: MediumVioletRed; color: black;"><table><tbody><tr>' + e.html() + '</tr></tbody></table></div>');
            return item;
          },
          group: "gridGroup2",
        });


        grid1.wrapper.kendoDropTarget({
          drop: function (e) {
            var dataItem = dataSource2.getByUid(e.draggable.currentTarget.data("uid"));
            dataSource2.remove(dataItem);
            dataSource1.add(dataItem);
          },
          group: "gridGroup2",
        });
        grid2.wrapper.kendoDropTarget({
          drop: function (e) {
            var dataItem = dataSource1.getByUid(e.draggable.currentTarget.data("uid"));
            dataSource1.remove(dataItem);
            dataSource2.add(dataItem);
          },
          group: "gridGroup1",
        });
      });
    </script>
```

## See Also

* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
