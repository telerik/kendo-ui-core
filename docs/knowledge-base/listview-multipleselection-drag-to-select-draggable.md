---
title: Kendo Draggable and Kendo Dropable not working in ListView and Grid.
description: implement drag-to-select and gragable in listview with multiple selection
type: how-to
page_title:
slug: listview-multipleselection-drag-to-select-draggable
position: 0
tags: grid, listview, multipleselection, drag-to-select, draggable
teampulseid:
ticketid: 1116847
pitsid:

---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>Drag and Drop for Progress® Kendo UI®</td>
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
Drag-to-select and dragable functionalities are not working in Kendo ListView or Kendo Grid with multiple selection enabled.

## Solution

Prevent the start and move events of the selectable elements in the dataBound even of the used widget (ListView or Grid):

````html
 dataBound: function() {
              this.selectable.userEvents._events.start = null
              this.selectable.userEvents._events.move = null
              ............
 }
````

## Example

````html


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
````
