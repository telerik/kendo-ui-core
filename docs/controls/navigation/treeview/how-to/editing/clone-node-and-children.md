---
title: Clone a TreeView Node and Its Children
page_title: Clone a TreeView Node and Its Children | Kendo UI TreeView
description: "Learn how to clone (copy) the selected node and its children in a Kendo UI TreeView."
slug: howto_clonenodeandchildren_treeview
---

# Clone a TreeView Node and Its Children

The following example demonstrates how to clone (copy) a TreeView node together with its children.

To achieve this behavior:
* Use the [`select`](/api/javascript/ui/treeview/methods/select) method of the TreeView to obtain the selected node as a jQuery object. The second example below uses a Context Menu instead.
* Use the [`parent`](/api/javascript/ui/treeview/methods/parent) method to get the parent node of the selected node.
* Use the [`dataItem`](/api/javascript/ui/treeview/methods/dataitem) method to obtain the data item (Kendo UI Model), which corresponds to the selected node.
* Use the [`toJSON`](/api/javascript/data/model/methods/tojson) method of the Model to strip proprietary information from the data item and its children, and convert them to a plain JavaScript object.
* (Optional) Deselect and collapse the cloned node before appending it to the TreeView.
* Use the [`append`](/api/javascript/ui/treeview/methods/append), [`insertAfter`](/api/javascript/ui/treeview/methods/insertafter), or [`insertBefore`](/api/javascript/ui/treeview/methods/insertbefore) method of the TreeView to add the cloned node to the desired location in the item structure of the widget. In this example, nodes are cloned at the same level.

The following example demonstrates how to copy the selected node together with its children.

```dojo
    <p><button class="k-button" id="cloneNode">Clone selected node</button></p>

    <div id="treeview"></div>

    <script>
      $(function() {
        var treeview = $("#treeview").kendoTreeView({
          dataSource: {
            data: [
              { text: "Item 1", expanded: true, items: [
                { text: "Item 1.1" },
                { text: "Item 1.2" },
                { text: "Item 1.3" }
              ] },
              { text: "Item 2", items: [
                { text: "Item 2.1" },
                { text: "Item 2.2" },
                { text: "Item 2.3" }
              ] },
              { text: "Item 3" }
            ]
          },
          loadOnDemand: false
        }).data("kendoTreeView");

        $("#cloneNode").click(function() {
          var selectedNode = treeview.select();

          if (!selectedNode[0]) {
            selectedNode = treeview.wrapper.find("li.k-item").first();
          }

          // Find the parent node of the selected node.
          // Passing a falsy value as the second append() parameter
          // will append the node to the root group.
          var referenceNode = treeview.parent(selectedNode);
          if (!referenceNode[0]) {
            referenceNode = null
          }

          // (Optional) Remove the selection from the cloned node.
          var clonedNode = treeview.dataItem(selectedNode).toJSON();
          clonedNode.selected = false;

          // (Optional) Collapse the cloned node.
          delete clonedNode.expanded;

          treeview.append(
            clonedNode,
            referenceNode
          );
        });
      });
    </script>
```

The following example provides a variation of the previous approach and demonstrates how to copy the right-clicked node. It relies on a Context Menu click instead of a selection.

```dojo
<div id="treeview"></div>
<ul id="context-menu">
    <li>Clone</li>
</ul>

<script>
    $(function () {
        var treeview = $("#treeview").kendoTreeView({
            dataSource: {
                data: [
                  {
                      text: "Item 1", expanded: true, items: [
                      { text: "Item 1.1" },
                      { text: "Item 1.2" },
                      { text: "Item 1.3" }
                      ]
                  },
                  {
                      text: "Item 2", items: [
                      { text: "Item 2.1" },
                      { text: "Item 2.2" },
                      { text: "Item 2.3" }
                      ]
                  },
                  { text: "Item 3" }
                ]
            },
            loadOnDemand: false
        }).data("kendoTreeView");

        $("#context-menu").kendoContextMenu({
            target: "#treeview",
            direction: "top",
            filter: ".k-in",
            alignToAnchor: true,
            select: function (e) {
                var selectedNode = e.target;

                // Find the parent node of the selected node.
                // Passing a falsy value as the second append() parameter
                // will append the node to the root group.
                var referenceNode = treeview.parent(selectedNode);
                if (!referenceNode[0]) {
                    referenceNode = null
                }

                // (Optional) Remove the selection from the cloned node.
                var clonedNode = treeview.dataItem(selectedNode).toJSON();
                clonedNode.selected = false;

                // (Optional) Collapse the cloned node.
                delete clonedNode.expanded;

                treeview.append(
                  clonedNode,
                  referenceNode
                );
            }
        });
    });
</script>
```

## See Also

* [Basic Usage of the TreeView (Demo)](https://demos.telerik.com/kendo-ui/treeview/index)
* [Using the API of the TreeView (Demo)](https://demos.telerik.com/kendo-ui/treeview/api)
* [JavaScript API Reference of the TreeView](/api/javascript/ui/treeview)
