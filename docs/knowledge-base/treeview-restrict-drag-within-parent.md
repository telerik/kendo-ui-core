---
title: Restrict a Dragging Node Only Within Its Parent in the TreeView
description: Learn how to restrict a dragging of a node only within its parent in the Kendo UI TreeView widget.
type: how-to
page_title: Restrict Dragging Node Within Parent - Kendo UI TreeView for jQuery
slug: treeview-restrict-drag-within-parent
tags: treeview, restrict, drag, parent
res_type: kb
component: treeview
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® TreeView for jQuery</td>
 </tr>
</table>

## Description

I want to allow the user to drag nodes but only within the parent of the node. I want to prevent the user to drag a node to a different parent or different level. 
How can I achieve that?

## Solution

Handle the [`drag`](/api/javascript/ui/treeview/events/drag) event of the TreeView. In that event handler, check for the hierarchy of the dragged and target node and deny dragging if necessary.

```dojo
    <div id="treeview"></div>

    <script>
      $(document).ready(function() {
        $("#treeview").kendoTreeView({
          checkboxes: true,
          sortable: true,
          editable: {
            move: true
          },
          dataSource: [
            { text: "Furniture", expanded: true, items: [
              { text: "Tables & Chairs" },
              { text: "Sofas" },
              { text: "Occasional Furniture" }
            ] },
            { text: "Decor", items: [
              { text: "Bed Linen" },
              { text: "Curtains & Blinds" },
              { text: "Carpets" }
            ] },
            { text: "Storage" }
          ],

          sortable:true,
          dragAndDrop: true,
          drag: function(e) {             
            if(e.sourceNode.parentNode != e.dropTarget.closest("ul") || e.statusClass === "plus") {
              e.setStatusClass('cancel');
            }
          },
        });
      });
    </script>
```
