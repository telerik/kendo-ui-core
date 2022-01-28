---
title: ListBox Reordering Is Not Working
description: The indexes of the items in the dataSource of the Kendo UI ListBox are not reordered.
type: troubleshooting
page_title: Reordering Does Not Update the Indexes in dataSource | Kendo UI ListBox for jQuery
slug: list-box-reordering-not-working
tags: listbox, reorder
ticketid: 1112413
res_type: kb
component: listbox
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI ListBox</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 7 64bit</td>
 </tr>
 <tr>
  <td>Browser</td>
  <td>Google Chrome</td>
 </tr>
 <tr>
  <td>Browser Version</td>
  <td>Latest</td>
 </tr>
</table>


## Description

I want to use the ListBox to reorder items in a bound data source but although the items of the ListBox visually reorder on the screen, these changes are not reflected in the data source behind it.

How can I get the displayed order in sync with the data source? 

## Suggested Workarounds

The Kendo UI ListBox does not provide a built-in solution for achieving this behavior. However, you can still work around the issue.

Apply custom logic on the [`reorder`](/api/javascript/ui/listbox/events/reorder) event of the widget by manually removing the item from one position and then inserting it in the new one. Get the index of the item with the data source [`indexOf()`](/api/javascript/data/datasource/methods/indexof) method and insert it with its [`insert()`](/api/javascript/data/datasource/methods/insert) method. Adding the `k-state-selected` class to the reordered listbox items preserves the selection:

```
<script>
    function onReorder(e) {
        e.preventDefault();
        var dataSource = e.sender.dataSource;

        var dataItem = e.dataItems[0]
        var index = dataSource.indexOf(dataItem) + e.offset;
        dataSource.remove(dataItem);
        dataSource.insert(index, dataItem);
        e.sender.wrapper.find("[data-uid='" + dataItem.uid + "']").addClass("k-state-selected");
    }
</script>
```



```dojo
    <div id="listbox"></div>

    <script type="text/javascript">
			var items = [
			  { id: 1, text: "Item 1" },
			  { id: 2, text: "Item 2" },
			  { id: 3, text: "Item 3" },
			  { id: 4, text: "Item 4" },
			  { id: 5, text: "Item 5" }
			];

			$(document).ready(function(e) {
			  $("#listbox").kendoListBox({
			    draggable: true,
			    dataSource: items,
			    dataTextField: "text",
			    dataValueField: "id",
			    toolbar: {
			      position: "right",
			      tools: ["moveUp", "moveDown"]
			    },
			    reorder: function(e) {
			      e.preventDefault();
			      var dataSource = e.sender.dataSource;

			      var dataItem = e.dataItems[0]
			      var index = dataSource.indexOf(dataItem) + e.offset;
			      dataSource.remove(dataItem);
			      dataSource.insert(index, dataItem);
			      e.sender.wrapper.find("[data-uid='" + dataItem.uid + "']").addClass("k-state-selected");
			      console.log("First item ID is now: " + dataSource.data()[0].id);
			    }
			  });
			});
    </script>  
```
