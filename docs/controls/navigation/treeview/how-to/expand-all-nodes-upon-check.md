---
title: Expand All Nodes upon Check
page_title: Expand All Nodes upon Check | Kendo UI TreeView
description: "Learn how to expand all child nodes of a Kendo UI TreeView widget when checking a root node."
slug: howto_expandallnodes_uponcheck_treeview
---

# Expand All Nodes upon Check

The example below demonstrates how to expand all child nodes of a Kendo UI TreeView widget when checking a root node.

###### Example

```html
  <div id="tree"></div>

  <script>
    $("#tree").kendoTreeView({
      checkboxes: {
        checkChildren: true
      },
      check: function(e) {
        this.expandRoot = e.node;

        this.expand($(this.expandRoot).find(".k-item").addBack());
      },
      dataBound: function(e) {
        if (this.expandRoot) {
          this.expand(e.node.find(".k-item"));
        }
      },

      // mocked datasource for the example
      dataSource: {
        transport: {
          read: function(options) {
            if (!window.counter) window.counter = 1;

            // stub server
            setTimeout(function() {
              if (counter < 20) {
                options.success([
                  { text: "item " + (counter++) },
                  { text: "item " + (counter++) },
                  { text: "item " + (counter++), hasChildren: false }
                ]);
              } else {
                options.success([]);
              }
            }, 500);
          }
        },
        schema: {
          model: {
            id: "id",
            hasChildren: "hasChildren"
          }
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
* [How to Expand Nodes during Drag]({% slug howto_expandnodesduringdrag_treeview %})
* [How to Filter Out Search Results]({% slug howto_filetroutserachresults_treeview %})
* [How to Hide Checkboxes for Root Level]({% slug howto_hidecheckboxesforrootlevel_treeview %})
* [How to Persist Expanded State]({% slug howto_persistexpandedstate_treeview %})
* [How to Prevent Dragging Nodes to Deep Levels]({% slug howto_preventdragging_nodestodeeplevels_treeview %})
* [How to Prevent Dragging Nodes to Root Level]({% slug howto_preventdragging_nodestorootlevel_treeview %})
* [How to Render Multiple TreeViews Using HTML Source Binding]({% slug howto_rendermultipleusing_htmlsourcebinding_mvvm_treeview %})
* [How to Scroll to Selected Item]({% slug howto_scrolltoselecteditem_treeview %})
* [How to Show Lines between Nodes]({% slug howto_showlinesbetweennodes_treeview %})
* [How to Show Node Context Menu]({% slug howto_shiwnodecontextmenu_treeview %})
* [How to Sort Child Nodes]({% slug howto_sortchildnodes_treeview %})
* [How to Use FontAwesome Icons]({% slug howto_usefontawesomeicons_treeview %})
