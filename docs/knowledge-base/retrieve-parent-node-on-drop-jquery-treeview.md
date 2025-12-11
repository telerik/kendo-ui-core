---
title: Retrieving Correct Parent Node on Drop in Kendo UI for jQuery TreeView
description: Learn how to correctly retrieve the parent node when dragging and dropping nodes in the Kendo UI for jQuery TreeView.
type: how-to
page_title: Correctly Identifying Parent Node on Drag-and-Drop in jQuery TreeView
meta_title: Correctly Identifying Parent Node on Drag-and-Drop in jQuery TreeView
slug: retrieve-parent-node-on-drop-jquery-treeview
tags: treeview, drop, parentnode, dropPosition, destinationNode
res_type: kb
components: ["treeview"]
ticketid: 1692918
---

## Environment

<table>
<tbody>
<tr>
<td> Product </td>
<td> 
TreeView for Kendo UI for jQuery
</td>
</tr>
<tr>
<td> Version </td>
<td> 2025.2.520 </td>
</tr>
</tbody>
</table>

## Description

I want to correctly identify the parent node under which a dragged node is dropped in the [Kendo UI for jQuery TreeView](https://docs.telerik.com/kendo-ui/api/javascript/ui/treeview). The `e.dropTarget` does not provide the parent node but rather the element the node is dropped over. Similarly, the `e.destinationNode` represents the related node based on the drop operation. Understanding drop positions like "before," "after," and "over" is critical to determine the new parent node.

This knowledge base article also answers the following questions:
- How do I find the parent node after dropping a node in jQuery TreeView?
- How can I use dropPosition to identify the parent node in Kendo TreeView?
- How do I retrieve the parent node when a node is dropped in Kendo TreeView?

## Solution

To retrieve the correct parent node of a dropped node in the Kendo UI for jQuery TreeView, in the [drop](/api/javascript/ui/treeview/events/drop) event handler, use the `e.dropPosition` and `e.destinationNode`. Based on the drop position, determine if the node is dropped inside another node ("over") or as a sibling ("before" or "after"). For sibling operations, utilize the [`parentNode()`](/api/javascript/data/node/methods/parentnode) method of the TreeView.

Follow these steps:

1. Define the `drop` event handler for the TreeView.
2. Use the `e.dropPosition` to determine the drop operation.
3. For "before" or "after" drop positions, retrieve the parent node using `parentNode()`.
4. For the "over" drop position, the destination node itself is the new parent.

Here is the implementation:

```javascript
drop: function (e) {
    var tree = e.sender;
    var destinationNode = $(e.destinationNode);
    var destinationItem = tree.dataItem(destinationNode);

    var newParent;
    if (e.dropPosition == "before" || e.dropPosition == "after") {
        newParent = destinationItem.parentNode();
    } else {
        // dropPosition "over"
        newParent = destinationItem;
    }
    console.log(newParent); // Logs the new parent node
},
```

Use the above logic to correctly identify the parent node on drag-and-drop operations.

### Example

You can test this functionality using the following runnable example:

```dojo
 <div id="treeview"></div>
    <script>
      $("#treeview").kendoTreeView({
        dataSource: [
          {
            text: "Fruits",
            expanded: true,
            items: [{ text: "Banana" }, { text: "Apple" }, { text: "Blueberry" }],
          },
          {
            text: "Drinks",
            expanded: true,
            items: [{ text: "Milk" }, { text: "Juice" }, { text: "Water" }],
          },
        ],
        dragAndDrop: true,
        drop: function (e) {
          var tree = e.sender;
          var destinationNode = $(e.destinationNode);
         
          var destinationItem = tree.dataItem(destinationNode);
           //console.log(destinationItem)

          var newParent;
          if (e.dropPosition == "before" || e.dropPosition == "after") {
            newParent = destinationItem.parentNode();
          } else {
            // dropPosition "over"
            newParent = destinationItem;
          }
         console.log(newParent)
        },
      });
    </script>
```

## See Also

- [Kendo UI for jQuery TreeView API Overview](https://docs.telerik.com/kendo-ui/api/javascript/ui/treeview)
- [Node ParentNode Method](https://docs.telerik.com/kendo-ui/api/javascript/data/node/methods/parentnode) 
- [Drag-and-Drop Functionality in TreeView](https://docs.telerik.com/kendo-ui/controls/navigation/treeview/drag-drop)
