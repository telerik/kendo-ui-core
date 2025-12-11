---
title: Ensure Dropping in First Level in Kendo UI for jQuery TreeView
description: Learn how to restrict the Kendo UI for jQuery TreeView to a single level hierarchy to prevent nested items.
type: how-to
page_title: How to Implement a Single-Level TreeView in Kendo UI for jQuery
slug: single-level-treeview-kendo-ui-jquery
tags: kendo-ui-for-jquery, treeview, single-level, hierarchy
res_type: kb
components: ["treeview"]
ticketid: 1683570
---

## Environment

<table>
<tbody>
<tr>
<td>Product</td>
<td>Progress® Kendo UI® TreeView for jQuery</td>
</tr>
</tbody>
</table>

## Description

When implementing a TreeView in a jQuery application, it's sometimes necessary to restrict the hierarchy to a single level. This prevents users from creating nested items by dropping one item onto another. The goal is to ensure that all items remain at the root level, maintaining a flat structure.

This knowledge base article also answers the following questions:

- How can I prevent nested nodes in Kendo UI for jQuery TreeView?
- Is it possible to create a TreeView with only one level of hierarchy?
- How do I manage drag and drop operations to ensure a flat structure in TreeView?

## Solution

To create a TreeView with just one level of hierarchy and prevent the creation of nested items during drag-and-drop operations, handle the TreeView's [`drop`](/api/javascript/ui/treeview/events/drop) event. In the event handler, use the [`level`](/api/javascript/data/node/methods/level) method to determine the level of the targeted node. If the level is not 0 (indicating it's not a root-level item), prevent the drop operation.

Below is an example that demonstrates how to configure the TreeView component to achieve this behavior.

```dojo
  <div class="demo-section">
        <div>
          <h4>Treeview One</h4>
          <div id="treeview-left"></div>
        </div>
        <div>
          <h4>Treeview Two</h4>
          <div id="treeview-right"></div>
        </div>
      </div>

      <script>
        $("#treeview-left").kendoTreeView({
          dragAndDrop: false,
          noRecords: true,
          checkboxes: {
            checkChildren: true,
          },
          dataSource: [
            {
              text: "Furniture",
              expanded: true,
              items: [{ text: "Sofas" }, { text: "Occasional Furniture" }],
            },
            { text: "Tables & Chairs" },
            {
              text: "Decor",
              items: [
                { text: "Bed Linen" },
                { text: "Curtains & Blinds" },
                { text: "Carpets" },
              ],
            },
          ],
        });

        $("#treeview-right").kendoTreeView({
          dragAndDrop: true,
          noRecords: true,
          drop: function (e) {
            let level = $("#treeview-left")
              .data("kendoTreeView")
              .dataItem(e.dropTarget)
              .level();
            if (level != 0) {
              e.preventDefault();
              alert("Droppping only on main level is allowed");
            }
          },
          checkboxes: {
            checkChildren: true,
          },
          dataSource: [
            {
              text: "Storage",
              expanded: true,
              items: [
                { text: "Wall Shelving" },
                { text: "Floor Shelving" },
                { text: "Kids Storage" },
              ],
            },
            {
              text: "Lights",
              items: [
                { text: "Ceiling" },
                { text: "Table" },
                { text: "Floor" },
              ],
            },
          ],
        });
      </script>      
```

In this code, the `drop` event handler checks the level of the node where an item is dropped. If the `level` is not 0, the event is prevented, which stops the item from being nested under another item. This ensures that all items remain at the root level, maintaining a single-level hierarchy.

## See Also

- [Kendo UI for jQuery TreeView Overview](https://docs.telerik.com/kendo-ui/controls/treeview/overview)
- [TreeView API Reference](https://docs.telerik.com/kendo-ui/api/javascript/ui/treeview)
- [Handling the Drop Event in TreeView](https://docs.telerik.com/kendo-ui/api/javascript/ui/treeview/events/drop)
- [Node Level Method in TreeView](https://docs.telerik.com/kendo-ui/api/javascript/data/node/methods/level)
