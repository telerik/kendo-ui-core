---
title: Adding and Removing Items in Kendo UI for jQuery ListView
description: Learn how to properly implement the add and remove functionality in Kendo UI for jQuery ListView.
type: how-to
page_title: How to Add and Remove Items in Kendo UI for jQuery ListView
meta_title: How to Add and Remove Items in Kendo UI for jQuery ListView
slug: adding-removing-items-kendo-ui-jquery-listview
tags: listview, jquery, add-method, remove-method, sortable
res_type: kb
ticketid: 1694847
---

## Environment

<table>
<tbody>
<tr>
<td>Product</td>
<td>Kendo UI for jQuery ListView</td>
</tr>
<tr>
<td>Version</td>
<td>2026.1.212</td>
</tr>
</tbody>
</table>

## Description

When implementing the add and remove functionality in the [Kendo UI for jQuery ListView](https://www.telerik.com/kendo-jquery-ui/documentation/controls/listview/overview), the [`add()`](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/listview/methods/add) and [`remove()`](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/listview/methods/remove) methods behave differently. The `add()` method inserts an empty item into the ListView and opens it in edit mode. The `remove()` method requires the jQuery object of the item to be removed.

Additionally, for moving items between two ListViews or implementing drag-and-drop functionality, the Sortable component can be utilized. 

This knowledge base article also answers the following questions:
- How to implement add and remove methods in Kendo UI for jQuery ListView?
- How to move items between two ListViews in Kendo UI for jQuery?
- How to enable drag-and-drop functionality in Kendo UI for jQuery ListView?

## Solution

### Implementing `add()` and `remove()` methods

To remove an item from the ListView, pass the jQuery object of the item you want to remove:

```javascript
var listViewA = $("#itemlist").data("kendoListView");
listViewA.remove($(listViewA.content.children()[2])); // Removes the third item
```

To add items to another ListView, update its DataSource directly:

```javascript
var listViewB = $("#newlist").data("kendoListView");
listViewB.dataSource.insert(0, { ID: "newID", Name: "newName" }); // Adds a new item at position 0
```

### Moving items between two ListViews using a button

Use the following approach to move selected items between two ListViews:

```javascript
click: function (e) {
    var listViewA = $("#itemlist").data("kendoListView");
    var listViewB = $("#newlist").data("kendoListView");
    var selected = listViewA.select();
    
    selected.each((index, item) => {
        var dataItem = listViewA.dataItem(item);         
        listViewB.dataSource.insert(0, { ID: dataItem.ID, Name: dataItem.Name }); // Add to the second ListView
    });

    listViewA.remove(selected); // Remove from the first ListView
}
```

### Drag-and-Drop Functionality

The ListView does not support built-in drag-and-drop functionality. Use the Sortable component to enable this feature. Below is an example:

```javascript
$("#sortable").kendoSortable({
    connectWith: "#sortable2",
    filter: ">div",
    hint: function(element) {
        return element.clone();
    }
});
```

For a complete example, refer to the example below.

```dojo
  <div style="padding: 30px">
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
            <button id="button" type="button">Move select list >>></button>
          </td>
          <td>
            <div id="newlist" class="itempanel"></div>
          </td>
        </tr>
      </table>
    </div>
    <script>
      var allitems_list = [
        { ID: 001, Name: "Have A Shower" },
        { ID: 002, Name: "Choose Clothes" },
        { ID: 003, Name: "Make Breakfast" },
        { ID: 004, Name: "Take Medication" },
        { ID: 005, Name: "Brush Teeth" },
        { ID: 006, Name: "Watch TV" },
        { ID: 007, Name: "Listen to Radio" },
        { ID: 008, Name: "Read a Book" },
        { ID: 009, Name: "Contact Caregiver" },
      ];

      $("#button").kendoButton({
        click: function (e) {
          var listViewA = $("#itemlist").data("kendoListView");
          var listViewB = $("#newlist").data("kendoListView");
          var selected = listViewA.select();
         
          selected.each( (index, item) => {
            var di = listViewA.dataItem(item);         	
          	listViewB.dataSource.insert(0, { ID: di.ID, Name: di.Name });
          })

          listViewA.remove(selected);
          
        },
      });
      var allitems_datasource = new kendo.data.DataSource({
        data: allitems_list,
      });
      var newitems_list = [];
      var newitems_datasource = new kendo.data.DataSource({
        data: newitems_list,
      });

      $("#itemlist").kendoListView({
        dataSource: allitems_datasource,
        scrollable: "endless",
        selectable: "multiple",
        template: "<div class='tags k-block move'> #:Name# </div>",
      });

      $("#newlist").kendoListView({
        dataSource: newitems_datasource,
        scrollable: "endless",
        selectable: "multiple",
        template: "<div class='tags k-block move'> #:Name# </div>",
      });

      $("#itemlist").kendoSortable({
        filter: ".k-listview-content .tags",
        connectWith: "#newlist",
        change: function (e) {
          var sender = e.draggableEvent.sender;
          var senderElement = sender.element;
          var senderId = senderElement.attr("id");

          if (senderId === "newlist") {
            var itemlist = $("#itemlist").getKendoListView();
            itemlist.setDataSource(allitems_datasource);
          }
        },
      });

      $("#newlist").kendoSortable({
        filter: ".k-listview-content ",
        connectWith: "#itemlist",
        change: function (e) {
          var sender = e.draggableEvent.sender;
          var senderElement = sender.element;
          var senderId = senderElement.attr("id");

          if (senderId === "itemlist") {
            var itemlist = $("#itemlist").getKendoListView();
            itemlist.setDataSource(allitems_datasource);
          }
        },
      });
    </script>
    <style>
      .move {
        cursor: move;
      }

      .itempanel {
        width: 300px;
        height: 400px;
        border: 2px solid grey;
        border-radius: 3px;
      }

      .tags {
        margin: 5px;
        padding: 5px;
        color: black;
      }
    </style>
```

## See Also

- [Kendo UI for jQuery ListView Documentation](https://www.telerik.com/kendo-jquery-ui/documentation/controls/listview/overview) 
- [Sortable Component Documentation](https://www.telerik.com/kendo-jquery-ui/documentation/controls/sortable/overview)
