---
title: Drag and Drop Sortable ListView Items
description: An example on how to configure the drag-and-drop functionality in the ListView to perform a copy instead of a move operation while sorting is enabled.
type: how-to
page_title: Copy with Drag-and-Drop and Sorting Enabled | Kendo UI ListView
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

* I need to create a reorganizable list that can be populated by dragging in items from a static master list. I tried to use the `Draggable` and `DropTarget` features but it seems they do not work together with the sortable feature because it contains a draggable functionality within itself which causes conflicts.
* I also tried to use the sortable feature together with the ListView feature and I am able to sort my newly created list. However, I am unable to find a straightforward way to keep my master list because the items can be transferred to the new list but not copied.

How can I create an interactive list by using the drag-and-drop functionality in a Kendo UI ListView and perform a copy instead of a move operation while sorting is enabled?

## Solution

The suggested approach applies to the following scenario:

* Two ListView boxes.
* One of the boxes contains all the predefined items and the other box is initially empty.
* You want to allow the dragging and dropping of items from the initial to the target ListView.
* The source ListView has to always display all the initial items while the user has to be able to remove items from the target by dragging them back to the source.
* The target ListView has to allow the manual sorting of its items.

To fulfil the scenario, use the following suggested approach:

1. Handle the [`Sortable.change`](https://docs.telerik.com/kendo-ui/api/javascript/ui/sortable/events/change) event.
1. Reset the DataSource of the source ListView under some conditions.

The following example demonstrates the full implementation of the suggested approach.

```dojo
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
