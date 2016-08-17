---
title: Clone a TreeView Node and Its Children
page_title: Clone a TreeView Node and Its Children | Kendo UI TreeView
description: "Learn how to clone (copy) the selected node and its children in a Kendo UI TreeView."
slug: howto_clonenodeandchildren_treeview
---

# Clone a TreeView Node and Its Children

The example below demonstrates how to clone (copy) a Kendo UI TreeView node together with its children.

The notable steps to achieve this behavior are:
* Use the [`select`](/api/javascript/ui/treeview#methods-select) method of the TreeView to obtain the selected node as a jQuery object. The second example below uses a context menu instead.
* Use the [`parent`](/api/javascript/ui/treeview#methods-parent) method to get the parent node of the selected node.
* Use the [`dataItem`](/api/javascript/ui/treeview#methods-dataItem) method to obtain the data item (Kendo UI Model), which corresponds to the selected node.
* Use the [`toJSON`](/api/javascript/data/model#methods-toJSON) method of the Model to strip proprietary information from the data item and its children, and convert them to a plain JavaScript object.
* (Optional) Deselect and collapse the cloned node before appending it to the TreeView.
* Use the [`append`](/api/javascript/ui/treeview#methods-append), [`insertAfter`](/api/javascript/ui/treeview#methods-insertAfter), or [`insertBefore`](/api/javascript/ui/treeview#methods-insertBefore) method of the TreeView to add the cloned node to the desired location in the item structure of the widget. In this example, nodes are cloned at the same level.

The example below demonstrates how to copy the selected node.

###### Example

```html
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

          // find the parent node of the selected node;
          // passing a falsy value as the second append() parameter
          // will append the node to the root group
          var referenceNode = treeview.parent(selectedNode);
          if (!referenceNode[0]) {
            referenceNode = null
          }

          // remove selection from the cloned node (optional)
          var clonedNode = treeview.dataItem(selectedNode).toJSON();
          clonedNode.selected = false;

          // collapse the cloned node (optional)
          delete clonedNode.expanded;

          treeview.append(
            clonedNode,
            referenceNode
          );
        });
      });
    </script>
```

Here is a variation of the above approach, which relies on a context menu click, instead of selection.

The example below demonstrates how to copy the right-clicked node.

###### Example

```html
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

                // find the parent node of the selected node;
                // passing a falsy value as the second append() parameter
                // will append the node to the root group
                var referenceNode = treeview.parent(selectedNode);
                if (!referenceNode[0]) {
                    referenceNode = null
                }

                // remove selection from the cloned node (optional)
                var clonedNode = treeview.dataItem(selectedNode).toJSON();
                clonedNode.selected = false;

                // collapse the cloned node (optional)
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

Other articles on the Kendo UI TreeView:

* [TreeView JavaScript API Reference](/api/javascript/ui/treeview)
* [How to Edit Nodes via Form]({% slug howto_editnodesviaform_treeview %})
* [How to Filter Out Search Results]({% slug howto_filetroutserachresults_treeview %})
* [How to Hide Checkboxes for Root Level]({% slug howto_hidecheckboxesforrootlevel_treeview %})
* [How to Persist Expanded State]({% slug howto_persistexpandedstate_treeview %})
* [How to Render Multiple TreeViews Using HTML Source Binding]({% slug howto_rendermultipleusing_htmlsourcebinding_mvvm_treeview %})
* [How to Scroll to Selected Item]({% slug howto_scrolltoselecteditem_treeview %})
* [How to Use FontAwesome Icons]({% slug howto_usefontawesomeicons_treeview %})

For more runnable examples on the Kendo UI TreeView, browse its [**How To** documentation folder]({% slug howto_editnodesviaform_angularjs_treeview %}).
