---
title: Find the dataItem target of a drag and drop in ListView
description: An example on how to identify ListView entry that is the target of a dragdrop operation
type: how-to
page_title: Target DataItem on Drop | Kendo UI ListView for jQuery
slug: listview-drop-target-dataitem
tags: grid, drag, drop, target, under, cursor, dataItem, hover, listview, mouse
res_type: kb
ticketid: 1491644
component: listview
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI ListView</td>
 </tr>
 <tr>
  <td>Created with Kendo UI version</td>
  <td>Created with version 2020.3.915</td>
 </tr>
</table>

## Description

I have defined a ListView as the target of a drag-drop operation. I have found many examples online that help me to identify the item being dragged. My problem comes in trying to identify the specific ListView entry that is the target of the **drop** operation.  How can I do that?

## Solution

We can use the `clientX` and `clientY` and see what is under the mouse. The only trouble is that at that moment in time, the draggable hint is under the mouse, so we need to hide it to reveal the ListView item target:

1. Add a [`drop`](/api/javascript/ui/droptarget/events/drop) event handler in the DropTarget definition.
1. Hide the draggable hint
1. Get the element under the cursor
1. Use the [`dataItem()`](/api/javascript/ui/listview/methods/dataitem) method to obtain the dataItem bound to the target item

  ```
    drop: function (e) {
      e.draggable.hint.hide();
      var listViewItemTarget = document.elementFromPoint(e.clientX,e.clientY);
      console.log(lv.dataItem(listViewItemTarget));
    }
  ```

```dojo
  <script type="text/x-kendo-template" id="template">
        <div class="person">
            <h3>#:ID# #:Name#</h3>
      </div>
    </script>
    <div id="grid1" style="width:150px;"></div>
    <br /><br /><br />
    <div id="listview"></div>
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

        var lv = $("#listview").kendoListView({
          dataSource: dataSource2,
          template: kendo.template($("#template").html())
        }).data("kendoListView");


        $(grid1.element).kendoDraggable({
          filter: "tr",
          hint: function (e) {
            var item = $('<div class="person" style="background-color: DarkOrange; color: black;">' + e.html() + '</div>');
            return item;
          },
          group: "gridGroup1",
        });


        $(lv.element).kendoDraggable({
          filter: ".person",
          hint: function (e) {
            var item = $('<div class="person" style="background-color: aliceblue; color: black;">' + e.html() + '</div>');
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

        lv.wrapper.kendoDropTarget({
          drop: function (e) {
            e.draggable.hint.hide();
            var listViewItemTarget = document.elementFromPoint(e.clientX,e.clientY);
            kendo.alert("Dropped on " + $(listViewItemTarget).text());
            console.log(lv.dataItem(listViewItemTarget));
            e.draggable.hint.show();
            var dataItem = dataSource1.getByUid(e.draggable.currentTarget.data("uid"));
            dataSource1.remove(dataItem);
            dataSource2.add(dataItem);
          },
          group: "gridGroup1",
        });
      });
    </script>
    <style>
      .person {
        float: left;
        position: relative;
        width: 111px;
        height: 170px;
        margin: 0 5px;
        padding: 0;
        border: 1px solid gray;
        border-radius:5px;
      }
    </style>
```
