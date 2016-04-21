---
title: Prevent Dragging Nodes to Deep Levels
page_title: Prevent Dragging Nodes to Deep Levels | Kendo UI TreeView
description: "Learn how to handle the Kendo UI TreeView drag event to prevent nodes from being dragged to a deep level of the tree."
slug: howto_preventdragging_nodestodeeplevels_treeview
---

# Prevent Dragging Nodes to Deep Levels

The example below demonstrates how to handle the Kendo UI TreeView `drag` event to prevent nodes from being dragged to a deep level of the tree.

###### Example

```html
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

How-to examples on Kendo UI TreeView in AngularJS:

* [How to Edit Nodes via Form]({% slug howto_editnodesviaform_angularjs_treeview %})
* [How to Scroll to Item]({% slug howto_scrolltoitem_angularjs_treeview %})
* [How to Toggle Nodes with Single Click]({% slug howto_togglenodeswithsingleclick_angularjs_treeview %})

Articles and other how-to examples on Kendo UI TreeView:

* [TreeView JavaScript API Reference](/api/javascript/ui/treeview)
* [How to Attach Methods to Data Items]({% slug howto_attache_methodsto_dataitems_treeview %})
* [How to Check Nodes Programatically]({% slug howto_checknodeprogramatically_treeview %})
* [How to Combine Local Data with Remote Loading]({% slug howto_combinelocaldatawithremoteloading_treeview %})
* [How to Edit Nodes via Form]({% slug howto_editnodesviaform_treeview %})
* [How to Expand All Nodes upon Check]({% slug howto_expandallnodes_uponcheck_treeview %})
* [How to Expand Nodes during Drag]({% slug howto_expandnodesduringdrag_treeview %})
* [How to Filter Out Search Results]({% slug howto_filetroutserachresults_treeview %})
* [How to Hide Checkboxes for Root Level]({% slug howto_hidecheckboxesforrootlevel_treeview %})
* [How to Persist Expanded State]({% slug howto_persistexpandedstate_treeview %})
* [How to Render Multiple TreeViews Using HTML Source Binding]({% slug howto_rendermultipleusing_htmlsourcebinding_mvvm_treeview %})
* [How to Scroll to Selected Item]({% slug howto_scrolltoselecteditem_treeview %})
* [How to Show Lines between Nodes]({% slug howto_showlinesbetweennodes_treeview %})
* [How to Show Node Context Menu]({% slug howto_shiwnodecontextmenu_treeview %})
* [How to Sort Child Nodes]({% slug howto_sortchildnodes_treeview %})
* [How to Use FontAwesome Icons]({% slug howto_usefontawesomeicons_treeview %})
