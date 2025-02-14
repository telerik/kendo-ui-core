---
title: Drag and Drop Rows between Grids
page_title: Drag and Drop Rows Between Grids - Kendo UI for jQuery Data Grid
description: "Learn how to drag and drop rows between two Kendo UI Grids for jQuery."
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
  <td>Progress® Kendo UI® Grid for jQuery</td>
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

In order to achieve the requirement, you can utilize the [Kendo Draggable](https://docs.telerik.com/kendo-ui/api/javascript/ui/draggable) and the [Kendo DropTarget](https://docs.telerik.com/kendo-ui/api/javascript/ui/droptarget) components. Here you will find a small summary of the example below:

* Create `Kendo Draggable` components from the same `div` elements which are used to create the two Grids. Make sure to configure the [group](/api/javascript/ui/draggable/configuration/group) option.
* Select the wrapper elements of the Grids in order to create a `Kendo DropTarget`. Configuring the [group](/api/javascript/ui/droptarget/configuration/group) here as well will let the `DropTarget` component know that there's a `Draggable` component with the same group. That will allow the `DropTarget` to accept items which are being dragged from the `Draggable` instance. 
* In the [drop](/api/javascript/ui/droptarget/events/drop) event, you can use the [DataSource API](/api/javascript/data/datasource) to remove the dropped item from one dataSource and add it in the other.

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
          filter: "tbody>tr",
          hint: function (e) {
            var item = $('<div class="k-grid k-widget" style="background-color: DarkOrange; color: black;"><table><tbody><tr>' + e.html() + '</tr></tbody></table></div>');
            return item;
          },
          group: "gridGroup1",
        });


        $(grid2.element).kendoDraggable({
          filter: "tbody>tr",
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

* [JavaScript API Reference of the Data Grid](/api/javascript/ui/grid)
