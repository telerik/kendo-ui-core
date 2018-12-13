---
title: Implement Draggable and Droppable Functionality in ListView and Grid
description: An example on how to implement the drag-to-select and draggable functionalities with multiple selection in the Kendo UI ListView.
type: how-to
page_title: Implement Drag-and-Drop with Multiple Selection in ListView and Grid | Kendo UI for jQuery
slug: listview-multiselection-drag-to-select-draggable
tags: grid, listview, multipleselection, drag to select, draggable
ticketid: 1116847
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Drag and Drop</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
 <tr>
  <td>Browser</td>
  <td>IE For PC</td>
 </tr>
 <tr>
  <td>Browser Version</td>
  <td>11</td>
 </tr>
</table>


## Description

How can I implement the drag-to-select and draggable functionalities in a Kendo UI ListView or Grid when multiple selection is enabled?

## Solution

Prevent the `start` and `move` events of the selectable elements in the `dataBound` even of the ListView or Grid you use.

```dojo
 dataBound: function() {
              this.selectable.userEvents._events.start = null
              this.selectable.userEvents._events.move = null
              ............
 }
```

The following example demonstrates the full implementation of the approach.

```dojo
<div style="padding-bottom: 20px">
<label>List View Drop Area</label>
<div id="list-view-drop" style="height: 400px; width: 400px;border: 1px solid black"></div>
<label>List View</label>
<div id="listview"></div>
</div>
  <script>
    $(function() {
        var dataSource = new kendo.data.DataSource({
            data: [{ name: "" }, {name: ""}],
            pageSize: 21
        });

        $("#listview").kendoListView({
            dataSource: dataSource,
            selectable: "multiple",
            template: kendo.template("<div class='draggable' style='height:100px;width:100px;border:1px solid black'>You should be able to drag this</div>"),
            dataBound: function() {
              this.selectable.userEvents._events.start = null
              this.selectable.userEvents._events.move = null;
                $("#listview").kendoDraggable({
                  filter: ".draggable",
                    hint: function(element) {
                        return element.clone();
                    }
                });
            }
        });

        $("#list-view-drop")
          .kendoDropTarget({
          drop: function (e) {
            alert("Item Dropped!");
          },
        });

    });
</script>
```
