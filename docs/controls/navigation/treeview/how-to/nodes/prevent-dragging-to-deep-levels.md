---
title: Prevent Dragging Nodes to Deep Levels
page_title: Prevent Dragging Nodes to Deep Levels | Kendo UI TreeView
description: "Learn how to handle the Kendo UI TreeView drag event to prevent nodes from being dragged to a deep level of the tree."
slug: howto_preventdragging_nodestodeeplevels_treeview
---

# Prevent Dragging Nodes to Deep Levels

Your project might require you to prevent the TreeView nodes from being dragged to a deeper level of the tree.

The following example demonstrates how to handle the `drag` event to achieve this behavior.

###### Example

```dojo
    <div id="treeview"></div>
    <script>
    $("#treeview").kendoTreeView({
      dragAndDrop: true,
      dataSource: [
        { text: "foo", expanded: true, items: [
          { text: "bar", expanded: true, items: [
            { text: "baz", expanded: true, items: [
              { text: "qux" },
              { text: "cat" },
              { text: "dog" }
            ] }
          ] }
        ] }
      ]
    });

    var treeview = $("#treeview").data("kendoTreeView");

    treeview.bind("drag", function(e) {
      // if the current status is "add", then the node will be appended
      if (e.statusClass == "add") {
        var destination = this.dataItem(e.dropTarget);

        // If the (zero-based) destination level is 3,
        // allowing the operation will result in a 5-level tree.
        if (destination.level() == 3) {
          // Deny the operation
          e.setStatusClass("k-denied");
        }
      }
    });
    </script>
```

## See Also

* [TreeView JavaScript API Reference](/api/javascript/ui/treeview)
* [How to Check Nodes Programmatically]({% slug howto_checknodeprogramatically_treeview %})
* [How to Edit Nodes via Form]({% slug howto_editnodesviaform_treeview %})
* [How to Filter Out Search Results]({% slug howto_filetroutserachresults_treeview %})
* [How to Hide Checkboxes for Root Level]({% slug howto_hidecheckboxesforrootlevel_treeview %})
* [How to Persist Expanded State]({% slug howto_persistexpandedstate_treeview %})
* [How to Render Multiple TreeViews Using HTML Source Binding]({% slug howto_rendermultipleusing_htmlsourcebinding_mvvm_treeview %})
* [How to Scroll to Selected Item]({% slug howto_scrolltoselecteditem_treeview %})
* [How to Use FontAwesome Icons]({% slug howto_usefontawesomeicons_treeview %})

For more runnable examples on the Kendo UI TreeView, browse its [**How To** documentation folder]({% slug howto_bindcheckedstatecustommodelfields_angulartreeview %}).
