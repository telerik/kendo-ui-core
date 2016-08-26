---
title: Expand Nodes during Drag
page_title: Expand Nodes during Drag | Kendo UI TreeView
description: "Learn how to expand Kendo UI TreeView items that are hovered when the user drags a node."
slug: howto_expandnodesduringdrag_treeview
---

# Expand Nodes during Drag

The example below demonstrates how to expand Kendo UI TreeView items that are hovered when the user drags a node.

###### Example

```html
    <div id="treeview"></div>

    <script>
      $("#treeview").kendoTreeView({
        dragAndDrop: true,
        dataSource: [
          { text: "foo", items: [
            { text: "bar" },
            { text: "baz" }
          ] },
          { text: "qux", items: [
            { text: "cat" },
            { text: "dog" }
          ] }
        ],

        drag: function(e) {
            var dataItem = this.dataItem(e.dropTarget);
            if (dataItem) {
                dataItem.set("expanded", true);
            }
        }
      });
    </script>
```

## See Also

Other articles on the Kendo UI TreeView:

* [TreeView JavaScript API Reference](/api/javascript/ui/treeview)
* [How to Check Nodes Programmatically]({% slug howto_checknodeprogramatically_treeview %})
* [How to Edit Nodes via Form]({% slug howto_editnodesviaform_treeview %})
* [How to Filter Out Search Results]({% slug howto_filetroutserachresults_treeview %})
* [How to Hide Checkboxes for Root Level]({% slug howto_hidecheckboxesforrootlevel_treeview %})
* [How to Persist Expanded State]({% slug howto_persistexpandedstate_treeview %})
* [How to Render Multiple TreeViews Using HTML Source Binding]({% slug howto_rendermultipleusing_htmlsourcebinding_mvvm_treeview %})
* [How to Scroll to Selected Item]({% slug howto_scrolltoselecteditem_treeview %})
* [How to Use FontAwesome Icons]({% slug howto_usefontawesomeicons_treeview %})

For more runnable examples on the Kendo UI TreeView, browse its [**How To** documentation folder]({% slug howto_editnodesviaform_angularjs_treeview %}).
