---
title: Drag and Drop rows between two grids.
page_title: Drag and Drop rows between two grids.
description: Kendo UI Grid example that demonstrates how to Drag and Drop rows between two grids.
---

# Drag and Drop rows between two grids

This examples demonstrates how to Drag and Drop rows between two grids.


#### Example:

```html
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
            item = $('<div class="k-grid k-widget" style="background-color: DarkOrange; color: black;"><table><tbody><tr>' + e.html() + '</tr></tbody></table></div>');
            return item;
          },
          group: "gridGroup1",
        });


        $(grid2.element).kendoDraggable({
          filter: "tr",
          hint: function (e) {
            item = $('<div class="k-grid k-widget" style="background-color: MediumVioletRed; color: black;"><table><tbody><tr>' + e.html() + '</tr></tbody></table></div>');
            return item;
          },
          group: "gridGroup2",
        });


        grid1.table.kendoDropTarget({
          drop: function (e) {
            var dataItem = dataSource2.getByUid(e.draggable.currentTarget.data("uid"));
            dataSource2.remove(dataItem);
            dataSource1.add(dataItem);            
          },
          group: "gridGroup2",
        });

        grid2.table.kendoDropTarget({
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
