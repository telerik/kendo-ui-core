---
title: Drag and Drop Sortable ListView Items
description: An example on how to configure ListView drag-and-drop to perform copy instead of move, while sorting is also enabled
type: how-to
page_title: Copy in Drag-Drop and Sorting | Kendo UI ListView
slug: listview-drag-drop-sortable-items
tags: kendo, kendo-ui, listview, sortable, drag, drop, drag-drop, droptarget, draggable
ticketid: 1163175
res_type: kb
---

## Environment
<table>
    <tr>
        <td>Product</td>
        <td>Drag and Drop for Progress® Kendo UI®</td>
    </tr>
    <tr>
    <td>Product</td>
        <td>ListView for Progress® Kendo UI®</td>
    </tr>
</table>


## Description
I have been having some issues creating an interactive list using Drag and Drop in Kendo UI. I am attempting to create a reorganizable list that can be populated by dragging in items from a static master list. I have attempted to do so using the Draggable and DropTarget features, however have come to find that these do not work along side the Sortable feature as it contains the former within itself and creates conflicts.

I have also attempted to use the Sortable feature in combination with the ListView feature, in this case I can sort my newly created list, however I am unable to find a straight forward way to keep my master list maintained, the items want to be transferred to the new list rather than be copied.

## Solution
If you have a scenario, in which there are two ListView boxes. One of the boxes contain all the predefined items, while the other is initially empty. You need to allow drag-drop of items from the initial to the target ListView. The source ListView should always display all the initial items, while the user should be able to remove items from the target by dragging them back to the source. Also, the target widget should allow manual sorting of its items.

If this is the case, you will need to handle the [Sortable.change](https://docs.telerik.com/kendo-ui/api/javascript/ui/sortable/events/change) event and reset the DataSource of the source ListView under some conditions.

Below you will find an example implementing such scenario:

```html
<div style="padding:30px;">
  <table>
    <tr>
      <td>
        <h2>All Items</h2>
      </td>
      <td>
        <h2>New Routine</h2>
      </td>
    </tr>
    <tr>
      <td>
        <div id="itemlist" class="itempanel"></div>
      </td>
      <td>
        <div id="newlist" class="itempanel"></div>
      </td>
    </tr>
  </table>
</div>

<script>
  var allitems_list = [
    { 'ID': 001, 'Name': "Have A Shower" },
    { 'ID': 002, 'Name': "Choose Clothes" },
    { 'ID': 003, 'Name': "Make Breakfast" },
    { 'ID': 004, 'Name': "Take Medication" },
    { 'ID': 005, 'Name': "Brush Teeth" },
    { 'ID': 006, 'Name': "Watch TV" },
    { 'ID': 007, 'Name': "Listen to Radio" },
    { 'ID': 008, 'Name': "Read a Book" },
    { 'ID': 009, 'Name': "Contact Caregiver" },
  ];
  var allitems_datasource = new kendo.data.DataSource({
    data: allitems_list
  });
  var newitems_list = [];
  var newitems_datasource = new kendo.data.DataSource({
    data: newitems_list
  });

  $('#itemlist').kendoListView({
    dataSource: allitems_datasource,
    template: "<div class='tags k-block move'> #:Name# </div>"
  });

  $('#newlist').kendoListView({
    dataSource: newitems_datasource,
    template: "<div class='tags k-block move'> #:Name# </div>"
  });

  $('#itemlist').kendoSortable({
    connectWith: "#newlist",
    change: function(e) {
      var sender = e.draggableEvent.sender;
      var senderElement = sender.element;
      var senderId = senderElement.attr('id');

      if (senderId === 'newlist') {
        var itemlist = $('#itemlist').getKendoListView();
        itemlist.setDataSource(allitems_datasource)
      }
    }
  });

  $('#newlist').kendoSortable({
    connectWith: "#itemlist",
    change: function(e) {
      var sender = e.draggableEvent.sender;
      var senderElement = sender.element;
      var senderId = senderElement.attr('id');

      if (senderId === 'itemlist') {
        var itemlist = $('#itemlist').getKendoListView();
        itemlist.setDataSource(allitems_datasource)
      }
    }
  });
</script>

<style>
  .move {
    cursor: move;
  }

  .itempanel {
    width: 300px;
    height: 400px;
    border: 3px solid black;
    border-radius: 3px;
  }

  .tags {
    margin: 5px;
    padding: 5px;
    color: black;
  }

  .tagitemcls {
    width: 24px;
    margin-left: 0px;
    margin-top: 5px;
    padding-top: 6px;
    padding-bottom: 8px;
    padding-left: 2px;
  }

  table>div {
    border: 1px solid grey;
  }
</style>
```

## See Also

* [API Reference of the ListView](https://docs.telerik.com/kendo-ui/api/javascript/ui/listview)
* [API Reference of the Draggable](https://docs.telerik.com/kendo-ui/api/javascript/ui/draggable)
* [API Reference of the DropTarget](https://docs.telerik.com/kendo-ui/api/javascript/ui/droptarget)
